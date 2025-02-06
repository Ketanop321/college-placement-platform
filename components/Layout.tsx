import type React from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            College Placement Platform
          </Link>
          <nav>
            {session ? (
              <>
                <Link href="/dashboard" className="mr-4">
                  Dashboard
                </Link>
                <button onClick={() => signOut()}>Sign out</button>
              </>
            ) : (
              <button onClick={() => signIn("google")}>Sign in</button>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4">{children}</main>
      <footer className="bg-gray-200 p-4 text-center">© 2023 College Placement Platform</footer>
    </div>
  )
}

