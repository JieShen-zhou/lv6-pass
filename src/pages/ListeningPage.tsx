import { useState, useCallback, useEffect } from "react"
import { ArrowLeft, ChevronLeft, ChevronRight, Volume2, VolumeX, Check, X, AlertTriangle } from "lucide-react"
import { Link } from "react-router-dom"
import { listeningData, type ListeningData } from "../data/practice"
import { usePracticeHistory } from "../hooks/usePracticeHistory"

function compareAnswer(user: string, answer: string): "correct" | "partial" | "wrong" {
  const u = user.trim().toLowerCase()
  const a = answer.trim().toLowerCase()
  if (u === a) return "correct"
  if (Math.abs(u.length - a.length) <= 1 && u.length >= a.length - 1 && u.length <= a.length + 1) {
    return "partial"
  }
  return "wrong"
}

export default function ListeningPage() {
  const [itemIndex, setItemIndex] = useState(0)
  const [data, setData] = useState<ListeningData | null>(null)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [startTime, setStartTime] = useState(Date.now())
  const [submitted, setSubmitted] = useState(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const d = listeningData[itemIndex % listeningData.length]
    setData(d)
    setAnswers({})
    setSubmitted(false)
    setStartTime(Date.now())
    setPlaying(false)
  }, [itemIndex])

  const { addRecord } = usePracticeHistory()

  const handleSubmit = useCallback(() => {
    if (!data) return
    setSubmitted(true)
    let score = 0
    const total = data.blanks.length
    data.blanks.forEach((b) => {
      const result = compareAnswer(answers[b.position] || "", b.answer)
      if (result === "correct") score++
      else if (result === "partial") score += 0.5
    })
    const duration = Math.round((Date.now() - startTime) / 1000)
    addRecord({ type: "listening", score, total, percentage: Math.round((score / total) * 100), duration })
  }, [data, answers, startTime, addRecord])

  const speak = useCallback(() => {
    if (!data || !("speechSynthesis" in window)) return
    window.speechSynthesis.cancel()
    setPlaying(true)
    const readableText = data.script.replace(/___/g, "__________")
    const utterance = new SpeechSynthesisUtterance(readableText)
    utterance.lang = "en-US"
    utterance.rate = 0.85
    utterance.onend = () => setPlaying(false)
    utterance.onerror = () => setPlaying(false)
    speechSynthesis.speak(utterance)
  }, [data])

  const stopSpeech = useCallback(() => {
    window.speechSynthesis.cancel()
    setPlaying(false)
  }, [])

  if (!data) return null

  const renderScript = () => {
    const parts = data.script.split("___")
    return parts.map((part, i) => {
      const blankIndex = i + 1
      const blank = data.blanks.find((b) => b.position === blankIndex)
      return (
        <span key={i}>
          {part}
          {blank && (
            <span className="inline-flex items-center gap-1 mx-1">
              {submitted ? (
                <span
                  className={`inline-block min-w-[120px] border-b-2 px-2 py-0.5 text-center ${
                    compareAnswer(answers[blank.position] || "", blank.answer) === "correct"
                      ? "border-correct bg-correct-bg text-correct"
                      : compareAnswer(answers[blank.position] || "", blank.answer) === "partial"
                      ? "border-warning bg-warning-bg text-warning"
                      : "border-wrong bg-wrong-bg text-wrong"
                  }`}
                >
                  {answers[blank.position] || "___"}
                  {compareAnswer(answers[blank.position] || "", blank.answer) === "partial" && (
                    <AlertTriangle className="w-3 h-3 inline ml-1" />
                  )}
                </span>
              ) : (
                <input
                  type="text"
                  className="w-[120px] border-b-2 border-accent bg-transparent px-2 py-0.5 text-center outline-none text-accent font-semibold"
                  placeholder={`空 ${blankIndex}`}
                  value={answers[blank.position] || ""}
                  onChange={(e) => setAnswers((prev) => ({ ...prev, [blank.position]: e.target.value }))}
                />
              )}
              {submitted && <span className="text-xs text-text-secondary">({blank.answer})</span>}
            </span>
          )}
        </span>
      )
    })
  }

  const allFilled = data.blanks.every((b) => answers[b.position]?.trim())
  const total = listeningData.length

  return (
    <div className="py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/practice" className="text-text-secondary hover:text-accent">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h2 className="font-serif text-xl font-bold text-accent">听力填空 · {data.title}</h2>
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
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-text-secondary">
            📢 点击播放按钮朗读听力原文，在空白处填入单词（不区分大小写，1字符容错）
          </p>
          <button
            onClick={playing ? stopSpeech : speak}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
              playing
                ? "bg-wrong-bg text-wrong border border-wrong"
                : "bg-accent text-white hover:bg-accent-light"
            }`}
          >
            {playing ? (
              <><VolumeX className="w-4 h-4" /> 停止</>
            ) : (
              <><Volume2 className="w-4 h-4" /> 播放</>
            )}
          </button>
        </div>
        <p className="text-lg leading-loose">{renderScript()}</p>
      </div>

      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={!allFilled}
          className="w-full py-3 rounded-xl bg-accent text-white font-semibold hover:bg-accent-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          提交答案
        </button>
      ) : (
        <div className="bg-correct-bg border border-correct rounded-2xl p-5 text-center">
          <p className="text-lg font-semibold text-correct">
            {(() => {
              let s = 0
              data.blanks.forEach((b) => {
                const r = compareAnswer(answers[b.position] || "", b.answer)
                if (r === "correct") s++
                else if (r === "partial") s += 0.5
              })
              return `得分：${s} / ${data.blanks.length}`
            })()}
          </p>
          <div className="flex items-center justify-center gap-4 mt-2 text-xs text-text-secondary">
            <span className="flex items-center gap-1"><Check className="w-3 h-3 text-correct" /> 完全正确</span>
            <span className="flex items-center gap-1"><AlertTriangle className="w-3 h-3 text-warning" /> 半对</span>
            <span className="flex items-center gap-1"><X className="w-3 h-3 text-wrong" /> 错误</span>
          </div>
        </div>
      )}
    </div>
  )
}
