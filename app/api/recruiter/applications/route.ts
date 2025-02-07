import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  const session = await getServerSession()

  if (!session || session.user.role !== "recruiter") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const client = await clientPromise
  const db = client.db()

  const applications = await db
    .collection("applications")
    .aggregate([
      {
        $lookup: {
          from: "students",
          localField: "studentId",
          foreignField: "_id",
          as: "student",
        },
      },
      {
        $lookup: {
          from: "jobs",
          localField: "jobId",
          foreignField: "_id",
          as: "job",
        },
      },
      {
        $project: {
          _id: 1,
          status: 1,
          appliedAt: 1,
          studentName: { $arrayElemAt: ["$student.fullName", 0] },
          jobTitle: { $arrayElemAt: ["$job.title", 0] },
        },
      },
    ])
    .toArray()

  return NextResponse.json(applications)
}

