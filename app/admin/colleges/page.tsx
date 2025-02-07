"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface College {
  _id: string
  name: string
  location: string
}

export default function CollegeManagement() {
  const { data: session } = useSession()
  const [colleges, setColleges] = useState<College[]>([])
  const [newCollege, setNewCollege] = useState({ name: "", location: "" })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchColleges() {
      try {
        const response = await fetch("/api/admin/colleges")
        if (response.ok) {
          const data = await response.json()
          setColleges(data)
        } else {
          throw new Error("Failed to fetch colleges")
        }
      } catch (error) {
        console.error("Error fetching colleges:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchColleges()
  }, [])

  async function handleAddCollege(e: React.FormEvent) {
    e.preventDefault()
    try {
      const response = await fetch("/api/admin/colleges", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCollege),
      })
      if (response.ok) {
        const addedCollege = await response.json()
        setColleges([...colleges, addedCollege])
        setNewCollege({ name: "", location: "" })
      } else {
        throw new Error("Failed to add college")
      }
    } catch (error) {
      console.error("Error adding college:", error)
    }
  }

  if (!session || session.user.role !== "admin") {
    return <div>Access denied. Admin privileges required.</div>
  }

  if (isLoading) {
    return <div>Loading colleges...</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">College Management</h1>
      <form onSubmit={handleAddCollege} className="space-y-4">
        <Input
          placeholder="College Name"
          value={newCollege.name}
          onChange={(e) => setNewCollege({ ...newCollege, name: e.target.value })}
        />
        <Input
          placeholder="Location"
          value={newCollege.location}
          onChange={(e) => setNewCollege({ ...newCollege, location: e.target.value })}
        />
        <Button type="submit">Add College</Button>
      </form>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Location</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {colleges.map((college) => (
            <TableRow key={college._id}>
              <TableCell>{college.name}</TableCell>
              <TableCell>{college.location}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

