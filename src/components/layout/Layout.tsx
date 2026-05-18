import { Outlet } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { useLocation } from "react-router-dom"
import TopNav from "./TopNav"
import BottomNav from "./BottomNav"

export default function Layout() {
  const location = useLocation()

  return (
    <div className="min-h-[100svh] flex flex-col bg-bg">
      <TopNav />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 pb-24 md:pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <BottomNav />
    </div>
  )
}
