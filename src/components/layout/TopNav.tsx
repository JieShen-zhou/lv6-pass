import { NavLink } from "react-router-dom"
import { BookOpen } from "lucide-react"

const navItems = [
  { path: "/", label: "首页" },
  { path: "/sentence", label: "长难句" },
  { path: "/wordbook", label: "错词本" },
  { path: "/practice", label: "真题训练" },
]

export default function TopNav() {
  return (
    <header className="bg-card shadow-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 text-accent font-bold text-lg no-underline">
          <BookOpen className="w-6 h-6" />
          <span className="font-serif tracking-wide">Lv.6 Pass</span>
        </NavLink>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-md text-sm transition-colors no-underline ${
                  isActive
                    ? "bg-accent text-white"
                    : "text-text-secondary hover:text-accent hover:bg-accent/10"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
