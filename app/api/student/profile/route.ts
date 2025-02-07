import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import clientPromise from "@/lib/mongodb"

export async function POST(req: Request) {
  const session = await getServerSession()

  if (!session || session.user.role !== "student") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const client = await clientPromise
  const db = client.db()

  const profileData = await req.json()

  try {
    await db.collection("students").updateOne(
      { email: session.user.email },
      {
        $set: {
          ...profileData,
          updatedAt: new Date(),
        },
      },
      { upsert: true },
    )

    return NextResponse.json({ message: "Profile updated successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error updating profile:", error)
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
}

