import { useCallback } from "react"
import { useLocalStorage } from "./useLocalStorage"

export interface PracticeRecord {
  id: string
  type: "reading" | "listening" | "translation"
  score: number
  total: number
  percentage: number
  duration: number
  date: string
}

export function usePracticeHistory() {
  const [records, setRecords] = useLocalStorage<PracticeRecord[]>("lv6-history", [])

  const addRecord = useCallback(
    (record: Omit<PracticeRecord, "id" | "date">) => {
      const newRecord: PracticeRecord = {
        ...record,
        id: Date.now().toString(36),
        date: new Date().toISOString(),
      }
      setRecords((prev) => [newRecord, ...prev].slice(0, 50))
    },
    [setRecords]
  )

  const recentRecords = records.slice(0, 5)

  return { records, recentRecords, addRecord }
}
