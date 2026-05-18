import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { X } from "lucide-react"

interface WordPopupProps {
  word: string
  definition: string
  position: { x: number; y: number }
  onClose: () => void
}

export default function WordPopup({ word, definition, position, onClose }: WordPopupProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [onClose])

  const style = {
    left: Math.min(position.x, window.innerWidth - 280),
    top: position.y + 12,
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="fixed z-[100] bg-card rounded-xl shadow-lg border border-border p-4 w-64"
      style={style}
    >
      <button onClick={onClose} className="absolute top-2 right-2 text-text-secondary hover:text-text">
        <X className="w-4 h-4" />
      </button>
      <span className="font-serif text-accent font-bold text-lg">{word}</span>
      <p className="text-sm text-text mt-1">{definition}</p>
    </motion.div>
  )
}
