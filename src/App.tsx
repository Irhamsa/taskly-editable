import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { HashRouter, Routes, Route } from "react-router-dom"
import { AppSidebar } from "./components/AppSidebar"
import ActiveTodos from "./pages/ActiveTodos"
import CompletedTodos from "./pages/CompletedTodos"
import TodoStats from "./pages/TodoStats"
import NotFound from "./pages/NotFound"
import ThemeToggle from "./components/ThemeToggle"
import AddTodo from "./components/AddTodo"

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <div className="min-h-screen bg-background">
          <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
            <AddTodo onAdd={() => {}} />
            <ThemeToggle />
          </div>
          <AppSidebar />
          <div className="p-4">
            <Routes>
              <Route path="/" element={<ActiveTodos />} />
              <Route path="/completed" element={<CompletedTodos />} />
              <Route path="/stats" element={<TodoStats />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App