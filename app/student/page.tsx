import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function StudentDashboard() {
  const session = await getServerSession()

  if (!session || session.user.role !== "student") {
    redirect("/api/auth/signin")
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Student Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Profile Management</h2>
          <p className="mb-4">Update your personal information and resume</p>
          <Link href="/student/profile">
            <Button>Manage Profile</Button>
          </Link>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Job Applications</h2>
          <p className="mb-4">View and apply to job openings</p>
          <Link href="/student/job-applications">
            <Button>View Jobs</Button>
          </Link>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Application Status</h2>
          <p className="mb-4">Track your application progress</p>
          <Link href="/student/application-status">
            <Button>Check Status</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

