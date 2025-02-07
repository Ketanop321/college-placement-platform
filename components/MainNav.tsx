"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"

export function MainNav() {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              College Placement Platform
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {session?.user.role === "admin" && (
                <>
                  <Link
                    href="/admin"
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      pathname.startsWith("/admin")
                        ? "border-indigo-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/admin/colleges"
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      pathname === "/admin/colleges"
                        ? "border-indigo-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`}
                  >
                    Manage Colleges
                  </Link>
                </>
              )}
              {session?.user.role === "student" && (
                <>
                  <Link
                    href="/student"
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      pathname === "/student"
                        ? "border-indigo-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/student/profile"
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      pathname === "/student/profile"
                        ? "border-indigo-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/student/jobs"
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      pathname === "/student/jobs"
                        ? "border-indigo-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`}
                  >
                    Jobs
                  </Link>
                </>
              )}
              {session?.user.role === "recruiter" && (
                <>
                  <Link
                    href="/recruiter"
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      pathname === "/recruiter"
                        ? "border-indigo-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/recruiter/jobs/post"
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      pathname === "/recruiter/jobs/post"
                        ? "border-indigo-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`}
                  >
                    Post Job
                  </Link>
                  <Link
                    href="/recruiter/applications"
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      pathname === "/recruiter/applications"
                        ? "border-indigo-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`}
                  >
                    Applications
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {session ? (
              <Button onClick={() => signOut()} variant="outline">
                Sign out
              </Button>
            ) : (
              <Link href="/api/auth/signin">
                <Button variant="outline">Sign in</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

