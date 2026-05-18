import { Quote as QuoteIcon } from "lucide-react"
import { getDailyQuote } from "../../data/quotes"

export default function DailyQuote() {
  const quote = getDailyQuote()

  return (
    <div className="bg-card rounded-2xl shadow-sm border border-border p-5 text-center">
      <QuoteIcon className="w-5 h-5 text-accent mx-auto mb-2" />
      <p className="font-serif italic text-lg text-accent leading-relaxed">
        "{quote.en}"
      </p>
      <p className="text-sm text-text-secondary mt-2">{quote.cn}</p>
    </div>
  )
}
