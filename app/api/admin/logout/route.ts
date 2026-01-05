import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ message: "Logged out" }, { status: 200 })

  // Clear auth cookie
  response.cookies.set("admin_token", "", {
    maxAge: 0,
    path: "/",
    httpOnly: true,
  })

  return response
}
