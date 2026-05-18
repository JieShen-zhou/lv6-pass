import { useWordBook } from "../hooks/useWordBook"
import WordBookList from "../components/wordbook/WordBookList"

export default function WordBookPage() {
  const { entries, removeWord, clearAll } = useWordBook()

  return (
    <div className="py-6">
      <h2 className="font-serif text-xl font-bold text-accent mb-6">我的错词本</h2>
      <WordBookList entries={entries} onRemove={removeWord} onClearAll={clearAll} />
    </div>
  )
}
