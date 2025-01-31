import TodoList from '@/components/TodoList';
import AddTodo from '@/components/AddTodo';
import { useState } from 'react';
import { motion } from 'framer-motion';

const ActiveTodos = () => {
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
          Tugas Aktif
        </h1>
        <p className="text-center text-muted-foreground mb-8">
          Kelola tugas yang sedang berlangsung
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-xl shadow-lg dark:shadow-primary/5 border border-border/50 overflow-hidden"
      >
        <AddTodo onAdd={() => setRefresh(prev => prev + 1)} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <TodoList key={refresh} defaultFilter="active" />
      </motion.div>
    </div>
  );
};

export default ActiveTodos;