import type { PracticeRecord } from "../../hooks/usePracticeHistory"

interface ScoreChartProps {
  records: PracticeRecord[]
}

const typeLabels: Record<string, string> = {
  reading: "阅读",
  listening: "听力",
  translation: "翻译",
}

export default function ScoreChart({ records }: ScoreChartProps) {
  if (records.length === 0) {
    return (
      <p className="text-sm text-text-secondary text-center py-8">
        暂无练习记录，完成一次真题训练后这里会显示成绩趋势
      </p>
    )
  }

  const recent = [...records].reverse()

  return (
    <div className="bg-card rounded-2xl shadow-sm border border-border p-5">
      <h3 className="font-semibold text-accent mb-4">最近练习成绩</h3>
      <div className="flex items-end gap-3 h-32">
        {recent.map((rec) => (
          <div key={rec.id} className="flex-1 flex flex-col items-center gap-1">
            <span className="text-xs font-semibold text-text">
              {rec.percentage}%
            </span>
            <div
              className="w-full rounded-t-md transition-all duration-500"
              style={{
                height: `${Math.max(rec.percentage, 4)}%`,
                backgroundColor:
                  rec.percentage >= 80
                    ? "#2E7D32"
                    : rec.percentage >= 60
                    ? "#F59E0B"
                    : "#E65100",
              }}
            />
            <span className="text-[10px] text-text-secondary truncate w-full text-center">
              {typeLabels[rec.type] || rec.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
