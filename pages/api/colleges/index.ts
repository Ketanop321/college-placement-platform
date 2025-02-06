import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import clientPromise from "@/lib/mongodb"
import type { College } from "@/models/College"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session || session.user.role !== "admin") {
    return res.status(403).json({ message: "Unauthorized" })
  }

  const client = await clientPromise
  const db = client.db()

  switch (req.method) {
    case "GET":
      const colleges = await db.collection<College>("colleges").find().toArray()
      res.status(200).json(colleges)
      break
    case "POST":
      const newCollege: Omit<College, "_id"> = req.body
      const result = await db.collection<College>("colleges").insertOne(newCollege as College)
      res.status(201).json(result)
      break
    default:
      res.setHeader("Allow", ["GET", "POST"])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

