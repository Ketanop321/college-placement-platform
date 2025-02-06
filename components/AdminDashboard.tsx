import Link from "next/link"

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/admin/colleges" className="p-4 bg-blue-100 rounded-lg">
          Manage Colleges
        </Link>
        <Link href="/admin/users" className="p-4 bg-green-100 rounded-lg">
          Manage Users
        </Link>
        <Link href="/admin/reports" className="p-4 bg-yellow-100 rounded-lg">
          View Reports
        </Link>
      </div>
    </div>
  )
}

