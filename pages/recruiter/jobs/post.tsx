"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import Layout from "@/components/Layout"
import { generateJobDescription } from "@/lib/gemini"

export default function PostJob() {
  const { data: session } = useSession()
  const router = useRouter()
  const [jobTitle, setJobTitle] = useState("")
  const [company, setCompany] = useState("")
  const [industry, setIndustry] = useState("")
  const [description, setDescription] = useState("")

  const handleGenerateDescription = async () => {
    const generatedDescription = await generateJobDescription(jobTitle, company, industry)
    setDescription(generatedDescription)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: jobTitle, company, description }),
    })
    if (response.ok) {
      router.push("/recruiter/jobs")
    }
  }

  if (!session || session.user.role !== "recruiter") {
    return (
      <Layout>
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p>You must be signed in as a recruiter to view this page.</p>
      </Layout>
    )
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">Post a New Job</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="jobTitle" className="block mb-1">
            Job Title
          </label>
          <input
            type="text"
            id="jobTitle"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="company" className="block mb-1">
            Company
          </label>
          <input
            type="text"
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="industry" className="block mb-1">
            Industry
          </label>
          <input
            type="text"
            id="industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1">
            Job Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded h-40"
          />
        </div>
        <div>
          <button
            type="button"
            onClick={handleGenerateDescription}
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          >
            Generate AI Description
          </button>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Post Job
          </button>
        </div>
      </form>
    </Layout>
  )
}

