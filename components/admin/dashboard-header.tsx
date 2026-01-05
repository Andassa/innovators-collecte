"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export function DashboardHeader() {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await fetch("/api/admin/logout", { method: "POST" })
      router.push("/admin/login")
    } catch (error) {
      console.error("Logout error:", error)
      setIsLoggingOut(false)
    }
  }

  return (
    <header className="bg-card border-b border-foreground/10">
      <div className="px-6 sm:px-8 py-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Donation Dashboard</h1>
          <p className="text-sm text-foreground/60 mt-1">Manage fundraising donations and settings</p>
        </div>
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground border border-foreground/20 rounded-lg hover:border-foreground/40 transition-colors disabled:opacity-50"
        >
          {isLoggingOut ? "Logging out..." : "Logout"}
        </button>
      </div>
    </header>
  )
}
