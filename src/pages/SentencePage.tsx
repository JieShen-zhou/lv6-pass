import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { sentences } from "../data/sentences"
import SentenceDisplay from "../components/sentence/SentenceDisplay"
import StructureDiagram from "../components/sentence/StructureDiagram"

export default function SentencePage() {
  const [index, setIndex] = useState(0)
  const data = sentences[index % sentences.length]

  return (
    <div className="py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-xl font-bold text-accent">真题长难句解析</h2>
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <button
            onClick={() => setIndex((p) => (p - 1 + sentences.length) % sentences.length)}
            className="w-8 h-8 rounded-full border border-border bg-card flex items-center justify-center hover:bg-accent/10"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span>
            {index + 1} / {sentences.length}
          </span>
          <button
            onClick={() => setIndex((p) => (p + 1) % sentences.length)}
            className="w-8 h-8 rounded-full border border-border bg-card flex items-center justify-center hover:bg-accent/10"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="bg-card rounded-2xl shadow-sm border border-border p-5">
        <p className="text-xs text-text-secondary mb-3">点击句中带下划线的单词查看释义</p>
        <SentenceDisplay data={data} />
      </div>

      <StructureDiagram structure={data.structure} translation={data.translation} />
    </div>
  )
}
