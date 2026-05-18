import { useState, useEffect } from "react"
import { Clock } from "lucide-react"

const TARGET_DATE = new Date("2026-12-12T00:00:00+08:00")

function calcRemaining() {
  const now = new Date()
  const diff = TARGET_DATE.getTime() - now.getTime()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0 }
  const days = Math.floor(diff / 86400000)
  const hours = Math.floor((diff % 86400000) / 3600000)
  const minutes = Math.floor((diff % 3600000) / 60000)
  return { days, hours, minutes }
}

export default function Countdown() {
  const [remaining, setRemaining] = useState(calcRemaining)

  useEffect(() => {
    const timer = setInterval(() => setRemaining(calcRemaining), 60000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-card rounded-2xl shadow-sm border border-border p-5 text-center">
      <div className="flex items-center justify-center gap-2 text-text-secondary mb-2">
        <Clock className="w-4 h-4" />
        <span className="text-sm">距离六级考试还有</span>
      </div>
      <div className="flex items-baseline justify-center gap-1 font-serif">
        <span className="text-5xl font-bold text-accent">{remaining.days}</span>
        <span className="text-lg text-text-secondary">天</span>
      </div>
      <div className="text-xs text-text-secondary mt-1">
        {remaining.hours} 小时 {remaining.minutes} 分钟 · 2026年12月12日
      </div>
    </div>
  )
}
