"use client"

interface ProgressBarProps {
  percentage: number
}

export function ProgressBar({ percentage }: ProgressBarProps) {
  return (
    <div className="space-y-3">
      <div className="relative h-3 bg-card border border-foreground/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-foreground">{Math.round(percentage)}% towards goal</p>
      </div>
    </div>
  )
}
