import "./globals.css"
import { Inter } from "next/font/google"
import { MainNav } from "@/components/MainNav"
import { AuthProvider } from "@/components/AuthProvider"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "College Placement Platform",
  description: "Streamline your college placement process",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex min-h-screen flex-col">
            <MainNav />
            <main className="flex-1 container mx-auto py-6 px-4">{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}

