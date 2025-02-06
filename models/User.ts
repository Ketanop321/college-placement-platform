import type { ObjectId } from "mongodb"

export interface User {
  _id: ObjectId
  name: string
  email: string
  image?: string
  role: "admin" | "student" | "recruiter"
  collegeId?: ObjectId
}

