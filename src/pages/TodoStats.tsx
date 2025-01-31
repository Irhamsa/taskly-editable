import { motion } from "framer-motion"
import TodoList from "@/components/TodoList"
import TodoStatsComponent from "@/components/TodoStats"
import { useTodos } from "@/lib/todoStorage"

const TodoStats = () => {
  const { todos } = useTodos()

  return (
    <div className="p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
          Total Tugas
        </h1>
        <p className="text-center text-muted-foreground mb-8">
          Ringkasan semua tugas Anda
        </p>
      </motion.div>

      <TodoStatsComponent todos={todos} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <TodoList />
      </motion.div>
    </div>
  )
}

export default TodoStats