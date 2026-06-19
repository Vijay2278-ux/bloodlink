import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { z } from "zod"

const createSchema = z.object({
  bloodGroup: z.string().min(1, "Blood group is required"),
  age: z.coerce.number().min(1, "Age must be at least 1").max(150, "Invalid age"),
  phone: z.string().min(5, "Valid phone number is required"),
  city: z.string().min(1, "City is required"),
  lastDonation: z.string().optional(),
  isAvailable: z.boolean().default(true),
})

export async function GET() {
  try {
    const donors = await prisma.donor.findMany({
      include: { user: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json({ donors })
  } catch (error) {
    console.error("Fetch donors error:", error)
    return NextResponse.json({ error: "Failed to fetch donors" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization")
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const token = authHeader.slice(7)
    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 })
    }

    const existing = await prisma.donor.findUnique({ where: { userId: payload.userId } })
    if (existing) {
      return NextResponse.json({ error: "You already have a donor profile" }, { status: 409 })
    }

    const body = await req.json()
    const data = createSchema.parse(body)

    const donor = await prisma.donor.create({
      data: {
        userId: payload.userId,
        bloodGroup: data.bloodGroup,
        age: data.age,
        phone: data.phone,
        city: data.city,
        lastDonation: data.lastDonation ? new Date(data.lastDonation) : null,
        isAvailable: data.isAvailable,
      },
    })

    return NextResponse.json({ donor }, { status: 201 })
  } catch (error) {
    console.error("Create donor error:", error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: "Failed to register as donor" }, { status: 500 })
  }
}
