import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function RecruiterDashboard() {
  const session = await getServerSession()

  if (!session || session.user.role !== "recruiter") {
    redirect("/api/auth/signin")
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Recruiter Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Job Posting</h2>
          <p className="mb-4">Create new job openings</p>
          <Link href="/recruiter/job-posting">
            <Button>Post a Job</Button>
          </Link>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Applicant Management</h2>
          <p className="mb-4">View and manage applicants</p>
          <Link href="/recruiter/applicants">
            <Button>Manage Applicants</Button>
          </Link>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Process Management</h2>
          <p className="mb-4">Manage recruitment stages</p>
          <Link href="/recruiter/process">
            <Button>Manage Process</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

