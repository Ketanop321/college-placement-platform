import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import clientPromise from "@/lib/mongodb"
import type { Job } from "@/models/Job"
import { ObjectId } from "mongodb"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session) {
    return res.status(403).json({ message: "Unauthorized" })
  }

  const client = await clientPromise
  const db = client.db()

  switch (req.method) {
    case "GET":
      const jobs = await db.collection<Job>("jobs").find().toArray()
      res.status(200).json(jobs)
      break
    case "POST":
      if (session.user.role !== "recruiter") {
        return res.status(403).json({ message: "Only recruiters can post jobs" })
      }
      const newJob: Omit<Job, "_id"> = {
        ...req.body,
        postedBy: new ObjectId(session.user.id),
        collegeId: new ObjectId(req.body.collegeId),
      }
      const result = await db.collection<Job>("jobs").insertOne(newJob as Job)
      res.status(201).json(result)
      break
    default:
      res.setHeader("Allow", ["GET", "POST"])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

