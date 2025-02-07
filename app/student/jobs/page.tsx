"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface Job {
  _id: string
  title: string
  company: string
  location: string
  description: string
}

export default function JobListings() {
  const { data: session } = useSession()
  const [jobs, setJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await fetch("/api/jobs")
        if (response.ok) {
          const data = await response.json()
          setJobs(data)
        } else {
          throw new Error("Failed to fetch jobs")
        }
      } catch (error) {
        console.error("Error fetching jobs:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchJobs()
  }, [])

  async function handleApply(jobId: string) {
    try {
      const response = await fetch("/api/student/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobId }),
      })
      if (response.ok) {
        alert("Application submitted successfully!")
      } else {
        throw new Error("Failed to submit application")
      }
    } catch (error) {
      console.error("Error submitting application:", error)
      alert("Failed to submit application. Please try again.")
    }
  }

  if (!session) {
    return <div>Please sign in to view job listings.</div>
  }

  if (isLoading) {
    return <div>Loading job listings...</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Job Listings</h1>
      {jobs.map((job) => (
        <Card key={job._id}>
          <CardHeader>
            <CardTitle>{job.title}</CardTitle>
            <CardDescription>
              {job.company} - {job.location}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>{job.description}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => handleApply(job._id)}>Apply</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

