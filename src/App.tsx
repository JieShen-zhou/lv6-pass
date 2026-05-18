import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/layout/Layout"
import HomePage from "./pages/HomePage"
import SentencePage from "./pages/SentencePage"
import WordBookPage from "./pages/WordBookPage"
import PracticePage from "./pages/PracticePage"
import ReadingPage from "./pages/ReadingPage"
import ListeningPage from "./pages/ListeningPage"
import TranslationPage from "./pages/TranslationPage"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/sentence" element={<SentencePage />} />
          <Route path="/wordbook" element={<WordBookPage />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/practice/reading" element={<ReadingPage />} />
          <Route path="/practice/listening" element={<ListeningPage />} />
          <Route path="/practice/translation" element={<TranslationPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
