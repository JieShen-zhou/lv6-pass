import { Trash2, AlertTriangle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import type { WordBookEntry } from "../../hooks/useWordBook"
import { words } from "../../data/words"

interface WordBookListProps {
  entries: WordBookEntry[]
  onRemove: (id: number) => void
  onClearAll: () => void
}

export default function WordBookList({ entries, onRemove, onClearAll }: WordBookListProps) {
  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-text-secondary">
        <AlertTriangle className="w-12 h-12 mb-4 opacity-30" />
        <p className="text-lg">错词本还是空的</p>
        <p className="text-sm mt-1">在单词闪卡中点击"没记住"来添加单词</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-text-secondary">共 {entries.length} 个错词</span>
        <button
          onClick={onClearAll}
          className="text-sm text-wrong hover:underline"
        >
          一键清空
        </button>
      </div>

      <AnimatePresence>
        {entries.map((entry) => {
          const word = words.find((w) => w.id === entry.id)
          if (!word) return null
          return (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-card rounded-xl shadow-sm border border-border p-4 flex items-center justify-between"
            >
              <div>
                <span className="font-serif text-lg text-accent">{word.word}</span>
                <span className="text-sm text-text-secondary ml-2">{word.phonetic}</span>
                <p className="text-sm text-text mt-1">{word.meaning}</p>
                <p className="text-xs text-text-secondary italic mt-1">"{word.example}"</p>
              </div>
              <button
                onClick={() => onRemove(entry.id)}
                className="text-text-secondary hover:text-wrong transition-colors shrink-0 ml-4"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
