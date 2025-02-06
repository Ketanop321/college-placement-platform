import type { ObjectId } from "mongodb"

export interface College {
  _id: ObjectId
  name: string
  logo: string
  primaryColor: string
  secondaryColor: string
  placementPolicy: string
}

