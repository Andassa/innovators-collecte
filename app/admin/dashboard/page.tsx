import { DashboardHeader } from "@/components/admin/dashboard-header"
import { DashboardForm } from "@/components/admin/dashboard-form"

export const metadata = {
  title: "Dashboard - Admin",
}

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="p-6 sm:p-8 max-w-6xl mx-auto">
        <DashboardForm />
      </div>
    </main>
  )
}
