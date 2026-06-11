import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { verifyPassword, createToken } from "@/lib/auth"
import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password } = loginSchema.parse(body)
    const normalizedEmail = email.trim().toLowerCase()

    // Find user case-insensitively so existing accounts still login
    const user = await prisma.user.findFirst({
      where: {
        email: {
          equals: normalizedEmail,
          mode: "insensitive",
        },
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      )
    }

    // Verify password
    const passwordValid = await verifyPassword(password, user.password)

    if (!passwordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      )
    }

    // Create token
    const token = createToken(user.id)

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    })
  } catch (error) {
    console.error("Login error:", error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json(
      { error: "Failed to login" },
      { status: 500 }
    )
  }
}
