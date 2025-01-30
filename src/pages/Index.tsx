import AddTodo from '@/components/AddTodo';
import TodoList from '@/components/TodoList';
import ThemeToggle from '@/components/ThemeToggle';
import { useState } from 'react';
import { motion } from 'framer-motion';

const Index = () => {
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="min-h-screen bg-background bg-gradient-to-br from-background to-muted/50 dark:from-background dark:to-background">
      <div className="fixed top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="max-w-2xl mx-auto p-6 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Daftar Tugas
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            Kelola tugas Anda dengan mudah dan efisien
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
          <TodoList key={refresh} />
        </motion.div>
      </div>
    </div>
  );
};

export default Index;