import { useState, useCallback, useEffect } from "react"
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"
import { translationData, type TranslationData } from "../data/practice"
import { wordDiff } from "../utils/diff"
import { usePracticeHistory } from "../hooks/usePracticeHistory"

function calcScore(userTokens: { text: string; type: string }[]): number {
  const matchCount = userTokens.filter((t) => t.type === "match").length
  return userTokens.length > 0 ? Math.round((matchCount / userTokens.length) * 100) : 0
}

export default function TranslationPage() {
  const [itemIndex, setItemIndex] = useState(0)
  const [data, setData] = useState<TranslationData | null>(null)
  const [userText, setUserText] = useState("")
  const [startTime, setStartTime] = useState(Date.now())
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const d = translationData[itemIndex % translationData.length]
    setData(d)
    setUserText("")
    setSubmitted(false)
    setStartTime(Date.now())
  }, [itemIndex])

  const { addRecord } = usePracticeHistory()

  const handleSubmit = useCallback(() => {
    if (!data || !userText.trim()) return
    setSubmitted(true)
    const { userTokens } = wordDiff(userText, data.reference)
    const score = calcScore(userTokens)
    const duration = Math.round((Date.now() - startTime) / 1000)
    addRecord({ type: "translation", score, total: 100, percentage: score, duration })
  }, [data, userText, startTime, addRecord])

  if (!data) return null

  const diffResult = submitted ? wordDiff(userText, data.reference) : null
  const total = translationData.length

  return (
    <div className="py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/practice" className="text-text-secondary hover:text-accent">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h2 className="font-serif text-xl font-bold text-accent">翻译练习</h2>
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
        <h3 className="font-semibold text-accent mb-3">中文原文</h3>
        <p className="text-lg text-text leading-relaxed">{data.chinese}</p>
        {data.keywords.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            <span className="text-xs text-text-secondary">关键词提示：</span>
            {data.keywords.map((kw) => (
              <span key={kw} className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full">{kw}</span>
            ))}
          </div>
        )}
      </div>

      <div className="bg-card rounded-2xl shadow-sm border border-border p-5">
        <h3 className="font-semibold text-accent mb-3">你的翻译</h3>
        <textarea
          className="w-full h-32 p-3 rounded-xl border border-border bg-bg resize-none outline-none focus:border-accent transition-colors text-sm"
          placeholder="在此输入英文翻译..."
          value={userText}
          onChange={(e) => setUserText(e.target.value)}
          disabled={submitted}
        />
      </div>

      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={!userText.trim()}
          className="w-full py-3 rounded-xl bg-accent text-white font-semibold hover:bg-accent-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          提交翻译
        </button>
      ) : (
        <div className="space-y-4">
          <div className="bg-card rounded-2xl shadow-sm border border-border p-5">
            <h3 className="font-semibold text-accent mb-3">参考答案</h3>
            <p className="text-sm text-text leading-relaxed">{data.reference}</p>
          </div>

          {diffResult && (
            <div className="bg-card rounded-2xl shadow-sm border border-border p-5 space-y-4">
              <div>
                <h3 className="font-semibold text-accent mb-3">你的译文（逐词对比）</h3>
                <p className="text-sm leading-loose">
                  {diffResult.userTokens.map((t, i) => (
                    <span
                      key={i}
                      className={`inline-block px-1 mx-0.5 rounded text-sm ${
                        t.type === "match"
                          ? "bg-correct-bg text-correct"
                          : t.type === "extra"
                          ? "bg-wrong-bg text-wrong line-through"
                          : ""
                      }`}
                    >
                      {t.text}
                    </span>
                  ))}
                </p>
              </div>

              <div className="border-t border-border pt-4">
                <h3 className="font-semibold text-accent mb-3">参考译文（缺失标红）</h3>
                <p className="text-sm leading-loose">
                  {diffResult.refTokens.map((t, i) => (
                    <span
                      key={i}
                      className={`inline-block px-1 mx-0.5 rounded text-sm ${
                        t.type === "match"
                          ? "bg-correct-bg text-correct"
                          : t.type === "missing"
                          ? "bg-wrong-bg text-wrong"
                          : ""
                      }`}
                    >
                      {t.text}
                    </span>
                  ))}
                </p>
              </div>

              <div className="flex items-center justify-center gap-4 text-xs text-text-secondary pt-2 border-t border-border">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded bg-correct-bg border border-correct" /> 匹配
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded bg-wrong-bg border border-wrong" /> 错误/缺失
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded bg-wrong-bg border border-wrong line-through" /> 多余
                </span>
              </div>
            </div>
          )}

          <div className="bg-correct-bg border border-correct rounded-2xl p-5 text-center">
            <p className="text-lg font-semibold text-correct">
              匹配度：{calcScore(diffResult?.userTokens || [])}%
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
