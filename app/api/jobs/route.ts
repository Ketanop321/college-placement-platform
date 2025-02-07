import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import type { Job } from "@/models/Job"

export async function GET() {
  const client = await clientPromise
  const db = client.db()
  const jobs = await db.collection<Job>("jobs").find().toArray()
  return NextResponse.json(jobs)
}

export async function POST(request: Request) {
  const session = await getServerSession()
  if (!session || session.user.role !== "recruiter") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
  }

  const client = await clientPromise
  const db = client.db()
  const newJob: Omit<Job, "_id"> = await request.json()
  const result = await db.collection<Job>("jobs").insertOne({
    ...newJob,
    postedBy: new ObjectId(session.user.id),
    collegeId: new ObjectId(newJob.collegeId),
  } as Job)
  return NextResponse.json(result, { status: 201 })
}

