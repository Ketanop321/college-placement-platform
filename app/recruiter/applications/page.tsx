"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Application {
  _id: string
  jobId: string
  studentId: string
  status: string
  appliedAt: string
  studentName: string
  jobTitle: string
}

export default function ApplicationReview() {
  const { data: session } = useSession()
  const [applications, setApplications] = useState<Application[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchApplications() {
      try {
        const response = await fetch("/api/recruiter/applications")
        if (response.ok) {
          const data = await response.json()
          setApplications(data)
        } else {
          throw new Error("Failed to fetch applications")
        }
      } catch (error) {
        console.error("Error fetching applications:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchApplications()
  }, [])

  async function handleUpdateStatus(applicationId: string, newStatus: string) {
    try {
      const response = await fetch(`/api/recruiter/applications/${applicationId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })
      if (response.ok) {
        setApplications(applications.map((app) => (app._id === applicationId ? { ...app, status: newStatus } : app)))
      } else {
        throw new Error("Failed to update application status")
      }
    } catch (error) {
      console.error("Error updating application status:", error)
    }
  }

  if (!session || session.user.role !== "recruiter") {
    return <div>Access denied. Recruiter privileges required.</div>
  }

  if (isLoading) {
    return <div>Loading applications...</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Application Review</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student Name</TableHead>
            <TableHead>Job Title</TableHead>
            <TableHead>Applied At</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((application) => (
            <TableRow key={application._id}>
              <TableCell>{application.studentName}</TableCell>
              <TableCell>{application.jobTitle}</TableCell>
              <TableCell>{new Date(application.appliedAt).toLocaleDateString()}</TableCell>
              <TableCell>{application.status}</TableCell>
              <TableCell>
                <Button onClick={() => handleUpdateStatus(application._id, "accepted")} className="mr-2">
                  Accept
                </Button>
                <Button onClick={() => handleUpdateStatus(application._id, "rejected")} variant="destructive">
                  Reject
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

