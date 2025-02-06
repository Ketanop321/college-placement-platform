import Link from "next/link"

export default function RecruiterDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Recruiter Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/recruiter/jobs/post" className="p-4 bg-blue-100 rounded-lg">
          Post a Job
        </Link>
        <Link href="/recruiter/applications" className="p-4 bg-green-100 rounded-lg">
          View Applications
        </Link>
        <Link href="/recruiter/company" className="p-4 bg-yellow-100 rounded-lg">
          Company Profile
        </Link>
      </div>
    </div>
  )
}

