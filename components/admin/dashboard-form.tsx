"use client"

import type React from "react"

import { useState, useEffect } from "react"

interface FormData {
  cash: number
  orangeMoney: number
  airtelMoney: number
  mvola: number
  leetchi: number
  exchangeRate: number
  goal: number
}

export function DashboardForm() {
  const [formData, setFormData] = useState<FormData>({
    cash: 0,
    orangeMoney: 0,
    airtelMoney: 0,
    mvola: 0,
    leetchi: 0,
    exchangeRate: 3650,
    goal: 10000,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  useEffect(() => {
    // Load current data
    const loadData = async () => {
      try {
        const response = await fetch("/api/admin/donations")
        if (response.ok) {
          const data = await response.json()
          setFormData(data)
        }
      } catch (error) {
        console.error("Error loading data:", error)
      }
    }

    loadData()
  }, [])

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: Number.parseFloat(value) || 0,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    try {
      const response = await fetch("/api/admin/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({ type: "success", text: "Donations updated successfully!" })
      } else {
        setMessage({ type: "error", text: data.message || "Failed to update donations" })
      }
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred. Please try again." })
      console.error("Submit error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {message && (
        <div
          className={`px-6 py-4 rounded-lg border ${
            message.type === "success"
              ? "bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-400"
              : "bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-400"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Donation Sources Section */}
        <div className="bg-card/40 backdrop-blur-xl border border-foreground/10 rounded-xl p-8 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-2">Donation Sources</h2>
            <p className="text-sm text-foreground/60">Enter amounts in original currency</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cash */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Cash (Ariary)</label>
              <input
                type="number"
                value={formData.cash}
                onChange={(e) => handleChange("cash", e.target.value)}
                placeholder="0"
                className="w-full px-4 py-2 bg-background border border-foreground/20 rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary transition-colors"
                disabled={isLoading}
              />
            </div>

            {/* Orange Money */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Orange Money (Ariary)</label>
              <input
                type="number"
                value={formData.orangeMoney}
                onChange={(e) => handleChange("orangeMoney", e.target.value)}
                placeholder="0"
                className="w-full px-4 py-2 bg-background border border-foreground/20 rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary transition-colors"
                disabled={isLoading}
              />
            </div>

            {/* Airtel Money */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Airtel Money (Ariary)</label>
              <input
                type="number"
                value={formData.airtelMoney}
                onChange={(e) => handleChange("airtelMoney", e.target.value)}
                placeholder="0"
                className="w-full px-4 py-2 bg-background border border-foreground/20 rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary transition-colors"
                disabled={isLoading}
              />
            </div>

            {/* MVola */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">MVola (Ariary)</label>
              <input
                type="number"
                value={formData.mvola}
                onChange={(e) => handleChange("mvola", e.target.value)}
                placeholder="0"
                className="w-full px-4 py-2 bg-background border border-foreground/20 rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary transition-colors"
                disabled={isLoading}
              />
            </div>

            {/* Leetchi */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Leetchi (Euro)</label>
              <input
                type="number"
                step="0.01"
                value={formData.leetchi}
                onChange={(e) => handleChange("leetchi", e.target.value)}
                placeholder="0"
                className="w-full px-4 py-2 bg-background border border-foreground/20 rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary transition-colors"
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

        {/* Settings Section */}
        <div className="bg-card/40 backdrop-blur-xl border border-foreground/10 rounded-xl p-8 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-2">Settings</h2>
            <p className="text-sm text-foreground/60">Configure exchange rate and fundraising goal</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Exchange Rate */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Exchange Rate (Ariary → Euro)</label>
              <input
                type="number"
                step="0.01"
                value={formData.exchangeRate}
                onChange={(e) => handleChange("exchangeRate", e.target.value)}
                placeholder="3650"
                className="w-full px-4 py-2 bg-background border border-foreground/20 rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary transition-colors"
                disabled={isLoading}
              />
              <p className="text-xs text-foreground/50 mt-2">1 EUR = {formData.exchangeRate.toFixed(2)} Ariary</p>
            </div>

            {/* Goal */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Fundraising Goal (Euro)</label>
              <input
                type="number"
                step="0.01"
                value={formData.goal}
                onChange={(e) => handleChange("goal", e.target.value)}
                placeholder="10000"
                className="w-full px-4 py-2 bg-background border border-foreground/20 rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary transition-colors"
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20 rounded-xl p-8 space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Preview</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-foreground/60">Total Ariary</p>
              <p className="text-xl font-bold text-foreground">
                {(formData.cash + formData.orangeMoney + formData.airtelMoney + formData.mvola).toLocaleString("fr-FR")}
              </p>
            </div>
            <div>
              <p className="text-foreground/60">Ariary to EUR</p>
              <p className="text-xl font-bold text-foreground">
                {Math.round(
                  ((formData.cash + formData.orangeMoney + formData.airtelMoney + formData.mvola) /
                    formData.exchangeRate) *
                    100,
                ) / 100}
              </p>
            </div>
            <div>
              <p className="text-foreground/60">Total EUR</p>
              <p className="text-xl font-bold text-foreground">
                {(
                  Math.round(
                    ((formData.cash + formData.orangeMoney + formData.airtelMoney + formData.mvola) /
                      formData.exchangeRate) *
                      100,
                  ) /
                    100 +
                  formData.leetchi
                ).toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  )
}
