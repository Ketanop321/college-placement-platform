import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Here you should check the credentials against your database
        // This is just a mock implementation
        if (credentials?.username === "admin" && credentials?.password === "password") {
          return { id: "1", name: "Admin User", email: "admin@example.com", role: "admin" }
        } else if (credentials?.username === "student" && credentials?.password === "password") {
          return { id: "2", name: "Student User", email: "student@example.com", role: "student" }
        } else if (credentials?.username === "recruiter" && credentials?.password === "password") {
          return { id: "3", name: "Recruiter User", email: "recruiter@example.com", role: "recruiter" }
        }
        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      session.user.role = token.role
      return session
    },
  },
  pages: {
    signIn: "/signin",
  },
})

export { handler as GET, handler as POST }

