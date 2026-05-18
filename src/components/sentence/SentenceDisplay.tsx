import { useState } from "react"
import type { SentenceData } from "../../data/sentences"
import WordPopup from "./WordPopup"

interface SentenceDisplayProps {
  data: SentenceData
}

export default function SentenceDisplay({ data }: SentenceDisplayProps) {
  const [popupWord, setPopupWord] = useState<string | null>(null)
  const [popupPos, setPopupPos] = useState({ x: 0, y: 0 })

  const handleWordClick = (word: string, e: React.MouseEvent) => {
    const clean = word.replace(/[^a-zA-Z]/g, "").toLowerCase()
    if (!clean || !data.wordMap[clean]) return
    setPopupWord(clean)
    setPopupPos({ x: e.clientX, y: e.clientY })
  }

  const words = data.sentence.split(/(\s+)/)

  return (
    <div className="relative">
      <p className="text-lg leading-loose font-serif text-text">
        {words.map((token, i) => {
          const clean = token.replace(/[^a-zA-Z]/g, "").toLowerCase()
          const hasDef = clean && data.wordMap[clean]
          return (
            <span
              key={i}
              className={`${hasDef ? "cursor-pointer border-b border-dashed border-accent/40 hover:text-accent hover:border-accent transition-colors" : ""}`}
              onClick={(e) => handleWordClick(token, e)}
            >
              {token}
            </span>
          )
        })}
      </p>

      {popupWord && data.wordMap[popupWord] && (
        <WordPopup
          word={popupWord}
          definition={data.wordMap[popupWord]}
          position={popupPos}
          onClose={() => setPopupWord(null)}
        />
      )}
    </div>
  )
}
