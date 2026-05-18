import { useCallback } from "react"
import { useLocalStorage } from "./useLocalStorage"

export interface WordBookEntry {
  id: number
  addedAt: number
}

export function useWordBook() {
  const [entries, setEntries] = useLocalStorage<WordBookEntry[]>("lv6-wordbook", [])

  const addWord = useCallback(
    (wordId: number) => {
      setEntries((prev) => {
        if (prev.some((e) => e.id === wordId)) return prev
        return [...prev, { id: wordId, addedAt: Date.now() }]
      })
    },
    [setEntries]
  )

  const removeWord = useCallback(
    (wordId: number) => {
      setEntries((prev) => prev.filter((e) => e.id !== wordId))
    },
    [setEntries]
  )

  const clearAll = useCallback(() => {
    setEntries([])
  }, [setEntries])

  const hasWord = useCallback(
    (wordId: number) => entries.some((e) => e.id === wordId),
    [entries]
  )

  const count = entries.length

  return { entries, addWord, removeWord, clearAll, hasWord, count }
}
