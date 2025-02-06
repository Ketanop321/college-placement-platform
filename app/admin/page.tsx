import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function AdminDashboard() {
  const session = await getServerSession()

  if (!session || session.user.role !== "admin") {
    redirect("/api/auth/signin")
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">College Setup</h2>
          <p className="mb-4">Customize your college portal settings</p>
          <Link href="/admin/college-setup">
            <Button>Manage College Setup</Button>
          </Link>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Manage Recruiters</h2>
          <p className="mb-4">View and manage recruiter accounts</p>
          <Link href="/admin/manage-recruiters">
            <Button>Manage Recruiters</Button>
          </Link>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Manage Students</h2>
          <p className="mb-4">View and manage student accounts</p>
          <Link href="/admin/manage-students">
            <Button>Manage Students</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

