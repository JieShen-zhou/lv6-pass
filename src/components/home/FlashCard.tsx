import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, RotateCw, Volume2 } from "lucide-react"
import { words } from "../../data/words"

interface FlashCardProps {
  onMarkUnknown?: (wordId: number) => void
}

export default function FlashCard({ onMarkUnknown }: FlashCardProps) {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [direction, setDirection] = useState(0)

  const current = words[index % words.length]
  const total = words.length
  const learned = index + 1

  const goTo = useCallback(
    (dir: number) => {
      setDirection(dir)
      setFlipped(false)
      setIndex((prev) => {
        const next = prev + dir
        if (next < 0) return total - 1
        if (next >= total) return 0
        return next
      })
    },
    [total]
  )

  const speak = useCallback((word: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(word)
      utterance.lang = "en-US"
      utterance.rate = 0.8
      speechSynthesis.speak(utterance)
    }
  }, [])

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-sm text-text-secondary">
        今日已学：{learned}/{total}
      </div>

      <div
        className="relative w-full max-w-sm aspect-[3/4] cursor-pointer"
        style={{ perspective: "1000px" }}
        onClick={() => setFlipped(!flipped)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ x: direction * 120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -direction * 120, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="relative w-full h-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div
              className="absolute inset-0 rounded-2xl shadow-md border border-border bg-card flex flex-col items-center justify-center p-6"
              style={{ backfaceVisibility: "hidden" }}
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  speak(current.word)
                }}
                className="absolute top-4 right-4 text-text-secondary hover:text-accent transition-colors"
                title="朗读"
              >
                <Volume2 className="w-5 h-5" />
              </button>

              <span className="font-serif text-4xl md:text-5xl text-accent mb-3">
                {current.word}
              </span>
              <span className="text-sm text-text-secondary">{current.phonetic}</span>
              <p className="text-xs text-text-secondary mt-6">点击卡片翻转</p>
            </motion.div>

            <motion.div
              className="absolute inset-0 rounded-2xl shadow-md border border-accent/20 bg-card flex flex-col items-center justify-center p-6"
              style={{ backfaceVisibility: "hidden", rotateY: 180 }}
              animate={{ rotateY: flipped ? 0 : 180 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            >
              <span className="text-xl font-semibold text-accent mb-3">{current.meaning}</span>
              <div className="w-12 h-px bg-border my-2" />
              <p className="text-sm text-text-secondary italic text-center leading-relaxed">
                "{current.example}"
              </p>
              <p className="text-xs text-text-secondary mt-2 text-center">
                {current.exampleCn}
              </p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={(e) => {
            e.stopPropagation()
            goTo(-1)
          }}
          className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center hover:bg-accent hover:text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation()
            setFlipped(!flipped)
          }}
          className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center hover:bg-accent/10 transition-colors"
        >
          <RotateCw className="w-4 h-4 text-text-secondary" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation()
            goTo(1)
          }}
          className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center hover:bg-accent hover:text-white transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation()
          onMarkUnknown?.(current.id)
        }}
        className="px-5 py-2 rounded-full border border-wrong text-wrong text-sm hover:bg-wrong-bg transition-colors"
      >
        没记住，加入错词本
      </button>
    </div>
  )
}
