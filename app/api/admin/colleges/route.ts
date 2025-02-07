import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  const session = await getServerSession()

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const client = await clientPromise
  const db = client.db()

  const colleges = await db.collection("colleges").find().toArray()

  return NextResponse.json(colleges)
}

export async function POST(req: Request) {
  const session = await getServerSession()

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const client = await clientPromise
  const db = client.db()

  const { name, location } = await req.json()

  const result = await db.collection("colleges").insertOne({ name, location })

  return NextResponse.json({ _id: result.insertedId, name, location })
}

