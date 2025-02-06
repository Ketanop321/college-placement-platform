import Link from "next/link"

export default function StudentDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Student Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/student/profile" className="p-4 bg-blue-100 rounded-lg">
          My Profile
        </Link>
        <Link href="/student/jobs" className="p-4 bg-green-100 rounded-lg">
          Browse Jobs
        </Link>
        <Link href="/student/applications" className="p-4 bg-yellow-100 rounded-lg">
          My Applications
        </Link>
      </div>
    </div>
  )
}

