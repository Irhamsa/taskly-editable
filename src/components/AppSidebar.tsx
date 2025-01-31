import { Menu, ListTodo, CheckSquare, BarChart3 } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"

export function AppSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const menuItems = [
    {
      title: "Tugas Aktif",
      path: "/",
      icon: ListTodo,
    },
    {
      title: "Tugas Selesai",
      path: "/completed",
      icon: CheckSquare,
    },
    {
      title: "Total Tugas",
      path: "/stats",
      icon: BarChart3,
    },
  ]

  const handleMenuClick = (path: string) => {
    navigate(path)
    setIsOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 hover:bg-accent rounded-md"
        aria-label="Toggle Menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 w-[60%] h-full bg-background border-r z-50 transition-transform duration-300 ease-in-out transform",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="pt-16 px-4">
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleMenuClick(item.path)}
                className="flex items-center gap-2 w-full p-3 hover:bg-accent rounded-md transition-colors text-left"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}