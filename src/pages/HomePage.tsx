import Countdown from "../components/home/Countdown"
import FlashCard from "../components/home/FlashCard"
import DailyQuote from "../components/home/DailyQuote"
import { useWordBook } from "../hooks/useWordBook"

export default function HomePage() {
  const { addWord } = useWordBook()

  return (
    <div className="py-6 space-y-6">
      <Countdown />
      <FlashCard onMarkUnknown={addWord} />
      <DailyQuote />
    </div>
  )
}
