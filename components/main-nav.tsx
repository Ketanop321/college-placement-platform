"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link
        href="/"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Home
      </Link>
      <Link
        href="/admin"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/admin" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Admin
      </Link>
      <Link
        href="/student"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/student" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Student
      </Link>
      <Link
        href="/recruiter"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/recruiter" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Recruiter
      </Link>
    </nav>
  )
}

