import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url))
  }

  if (token) {
    if (token.role === "admin" && !req.nextUrl.pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/admin", req.url))
    }
    if (token.role === "student" && !req.nextUrl.pathname.startsWith("/student")) {
      return NextResponse.redirect(new URL("/student", req.url))
    }
    if (token.role === "recruiter" && !req.nextUrl.pathname.startsWith("/recruiter")) {
      return NextResponse.redirect(new URL("/recruiter", req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/student/:path*", "/recruiter/:path*"],
}

