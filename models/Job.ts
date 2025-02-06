import type { ObjectId } from "mongodb"

export interface Job {
  _id: ObjectId
  title: string
  company: string
  location: string
  description: string
  requirements: string[]
  salary: string
  applicationDeadline: Date
  postedBy: ObjectId
  collegeId: ObjectId
}

