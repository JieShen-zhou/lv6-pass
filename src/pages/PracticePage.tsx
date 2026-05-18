import { Link } from "react-router-dom"
import { BookOpen, Headphones, Languages, ArrowRight } from "lucide-react"
import { usePracticeHistory } from "../hooks/usePracticeHistory"
import ScoreChart from "../components/practice/ScoreChart"

const modes = [
  {
    path: "/practice/reading",
    icon: BookOpen,
    title: "阅读理解",
    desc: "真题短文 + 选择题，即时判断对错",
    color: "bg-blue-50 text-blue-600",
  },
  {
    path: "/practice/listening",
    icon: Headphones,
    title: "听力填空",
    desc: "听写模式，填入缺失的单词",
    color: "bg-purple-50 text-purple-600",
  },
  {
    path: "/practice/translation",
    icon: Languages,
    title: "翻译练习",
    desc: "汉译英练习，逐词对比纠错",
    color: "bg-amber-50 text-amber-600",
  },
]

export default function PracticePage() {
  const { recentRecords } = usePracticeHistory()

  return (
    <div className="py-6 space-y-6">
      <h2 className="font-serif text-xl font-bold text-accent">真题训练</h2>

      <div className="grid gap-4 sm:grid-cols-3">
        {modes.map((mode) => (
          <Link
            key={mode.path}
            to={mode.path}
            className="bg-card rounded-2xl shadow-sm border border-border p-5 no-underline hover:shadow-md transition-shadow group"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${mode.color}`}>
              <mode.icon className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-text mb-1">{mode.title}</h3>
            <p className="text-xs text-text-secondary leading-relaxed">{mode.desc}</p>
            <div className="flex items-center gap-1 text-accent text-xs mt-3">
              <span>开始练习</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      <ScoreChart records={recentRecords} />
    </div>
  )
}
