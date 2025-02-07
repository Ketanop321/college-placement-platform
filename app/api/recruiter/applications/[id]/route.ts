import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession()

  if (!session || session.user.role !== "recruiter") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const client = await clientPromise
  const db = client.db()

  const { status } = await req.json()

  try {
    await db.collection("applications").updateOne({ _id: new ObjectId(params.id) }, { $set: { status } })

    return NextResponse.json({ message: "Application status updated successfully" })
  } catch (error) {
    console.error("Error updating application status:", error)
    return NextResponse.json({ error: "Failed to update application status" }, { status: 500 })
  }
}

