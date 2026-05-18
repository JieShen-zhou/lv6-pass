import { NavLink } from "react-router-dom"
import { Home, BookOpen, BookMarked, GraduationCap } from "lucide-react"

const navItems = [
  { path: "/", label: "首页", icon: Home },
  { path: "/sentence", label: "长难句", icon: BookOpen },
  { path: "/wordbook", label: "错词本", icon: BookMarked },
  { path: "/practice", label: "训练", icon: GraduationCap },
]

export default function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border safe-area-bottom">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 text-xs no-underline transition-colors ${
                isActive ? "text-accent" : "text-text-secondary"
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
