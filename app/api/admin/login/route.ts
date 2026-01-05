import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { password } = await request.json()
    console.log(" Login attempt received")

    const adminPassword = process.env.ADMIN_PASSWORD || "admin"
    console.log("Checking password against:", adminPassword === password ? "MATCH" : "MISMATCH")

    if (password !== adminPassword) {
      console.log(" Invalid password attempt")
      return NextResponse.json({ message: "Invalid password" }, { status: 401 })
    }

    console.log( "Password valid, setting cookie")
    const response = NextResponse.json({ message: "Login successful" }, { status: 200 })

    // Set cookie without Secure flag for localhost testing
    response.cookies.set("admin_token", "authenticated", {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
