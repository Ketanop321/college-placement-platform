import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function POST(req: Request) {
  const session = await getServerSession()

  if (!session || session.user.role !== "student") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const client = await clientPromise
  const db = client.db()

  const { jobId } = await req.json()

  try {
    await db.collection("applications").insertOne({
      jobId: new ObjectId(jobId),
      studentId: new ObjectId(session.user.id),
      status: "pending",
      appliedAt: new Date(),
    })

    return NextResponse.json({ message: "Application submitted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error submitting application:", error)
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 })
  }
}

