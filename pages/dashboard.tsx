import { useSession } from "next-auth/react"
import Layout from "@/components/Layout"
import AdminDashboard from "@/components/AdminDashboard"
import StudentDashboard from "@/components/StudentDashboard"
import RecruiterDashboard from "@/components/RecruiterDashboard"

export default function Dashboard() {
  const { data: session } = useSession()

  if (!session) {
    return (
      <Layout>
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p>You must be signed in to view this page.</p>
      </Layout>
    )
  }

  return (
    <Layout>
      {session.user.role === "admin" && <AdminDashboard />}
      {session.user.role === "student" && <StudentDashboard />}
      {session.user.role === "recruiter" && <RecruiterDashboard />}
    </Layout>
  )
}

