import type React from "react"
export const metadata = {
  title: "Admin Dashboard - Charity Fundraiser",
  description: "Manage donations and fundraising settings",
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
