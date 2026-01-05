import { type NextRequest, NextResponse } from "next/server"

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    // Allow access to login page
    if (pathname === "/admin" || pathname === "/admin/login" || pathname === "/admin/login/") {
      return NextResponse.next()
    }

    // For other admin routes, check auth cookie
    const adminToken = request.cookies.get("admin_token")?.value

    const expectedToken = "authenticated"

    if (!adminToken || adminToken !== expectedToken) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
