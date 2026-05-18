import { useState, useCallback, useEffect } from "react"
import { Check, X, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"
import { readingData, type ReadingData } from "../data/practice"
import { usePracticeHistory } from "../hooks/usePracticeHistory"

export default function ReadingPage() {
  const [itemIndex, setItemIndex] = useState(0)
  const [data, setData] = useState<ReadingData | null>(null)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [startTime, setStartTime] = useState(Date.now())
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const d = readingData[itemIndex % readingData.length]
    setData(d)
    setAnswers({})
    setSubmitted(false)
    setStartTime(Date.now())
  }, [itemIndex])

  const { addRecord } = usePracticeHistory()

  const handleSelect = useCallback(
    (qid: number, optionIdx: number) => {
      if (submitted) return
      setAnswers((prev) => ({ ...prev, [qid]: optionIdx }))
    },
    [submitted]
  )

  const handleSubmit = useCallback(() => {
    if (!data) return
    setSubmitted(true)
    const correct = data.questions.filter((q) => answers[q.id] === q.answer).length
    const total = data.questions.length
    const duration = Math.round((Date.now() - startTime) / 1000)
    addRecord({ type: "reading", score: correct, total, percentage: Math.round((correct / total) * 100), duration })
  }, [data, answers, startTime, addRecord])

  if (!data) return null

  const total = readingData.length

  return (
    <div className="py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/practice" className="text-text-secondary hover:text-accent">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h2 className="font-serif text-xl font-bold text-accent">阅读理解 · {data.title}</h2>
        </div>
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <button onClick={() => setItemIndex((p) => (p - 1 + total) % total)} className="w-7 h-7 rounded-full border border-border bg-card flex items-center justify-center hover:bg-accent/10">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span>{itemIndex + 1} / {total}</span>
          <button onClick={() => setItemIndex((p) => (p + 1) % total)} className="w-7 h-7 rounded-full border border-border bg-card flex items-center justify-center hover:bg-accent/10">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="bg-card rounded-2xl shadow-sm border border-border p-5">
        <p className="text-sm leading-relaxed text-text whitespace-pre-line">{data.passage}</p>
      </div>

      <div className="space-y-4">
        {data.questions.map((q, qi) => (
          <div key={q.id} className="bg-card rounded-2xl shadow-sm border border-border p-5">
            <p className="font-semibold text-text mb-3">{qi + 1}. {q.question}</p>
            <div className="space-y-2">
              {q.options.map((opt, oi) => {
                const isSelected = answers[q.id] === oi
                const isCorrect = oi === q.answer
                let optionStyle = "border-border hover:border-accent/40"
                if (submitted) {
                  if (isCorrect) optionStyle = "border-correct bg-correct-bg"
                  else if (isSelected && !isCorrect) optionStyle = "border-wrong bg-wrong-bg"
                } else if (isSelected) {
                  optionStyle = "border-accent bg-accent/5"
                }
                return (
                  <button
                    key={oi}
                    onClick={() => handleSelect(q.id, oi)}
                    className={`w-full text-left p-3 rounded-xl border transition-all text-sm flex items-center justify-between ${optionStyle}`}
                  >
                    <span>{opt}</span>
                    {submitted && isCorrect && <Check className="w-4 h-4 text-correct shrink-0" />}
                    {submitted && isSelected && !isCorrect && <X className="w-4 h-4 text-wrong shrink-0" />}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={Object.keys(answers).length < data.questions.length}
          className="w-full py-3 rounded-xl bg-accent text-white font-semibold hover:bg-accent-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          提交答案
        </button>
      ) : (
        <div className="bg-correct-bg border border-correct rounded-2xl p-5 text-center">
          <p className="text-lg font-semibold text-correct">
            正确率：{data.questions.filter((q) => answers[q.id] === q.answer).length}/{data.questions.length}
          </p>
        </div>
      )}
    </div>
  )
}
