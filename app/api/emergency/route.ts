import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { z } from "zod"

const createSchema = z.object({
  requesterName: z.string().min(2),
  bloodGroup: z.string().min(1),
  hospitalName: z.string().optional(),
  contactNumber: z.string().min(5),
  urgency: z.enum(["NORMAL", "URGENT", "CRITICAL"]).default("NORMAL"),
  location: z.string().optional(),
})

export async function GET() {
  try {
    const requests = await prisma.emergencyRequest.findMany({
      where: { status: "ACTIVE" },
      orderBy: [
        { urgencyLevel: "asc" },
        { createdAt: "desc" },
      ],
    })
    return NextResponse.json({ requests })
  } catch (error) {
    console.error("Fetch requests error:", error)
    return NextResponse.json({ error: "Failed to fetch requests" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = createSchema.parse(body)

    const request = await prisma.emergencyRequest.create({
      data: {
        requesterName: data.requesterName,
        bloodGroup: data.bloodGroup,
        hospitalName: data.hospitalName || "",
        location: data.location || "",
        contactNumber: data.contactNumber,
        urgencyLevel: data.urgency as any,
      },
    })

    return NextResponse.json({ request }, { status: 201 })
  } catch (error) {
    console.error("Create request error:", error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: "Failed to create request" }, { status: 500 })
  }
}
