import { useState, useEffect } from 'react';
import { getTodos, Todo } from '@/lib/todoStorage';
import TodoItem from './TodoItem';
import SearchAndFilter from './SearchAndFilter';
import TodoStats from './TodoStats';
import { motion, AnimatePresence } from 'framer-motion';

interface TodoListProps {
  defaultFilter?: string;
}

const TodoList = ({ defaultFilter = 'all' }: TodoListProps) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState(defaultFilter);

  const loadTodos = () => {
    setTodos(getTodos());
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = 
      filter === 'all' ? true :
      filter === 'active' ? !todo.completed :
      filter === 'completed' ? todo.completed :
      true;
    return matchesSearch && matchesFilter;
  });

  const incompleteTodos = filteredTodos.filter(todo => !todo.completed);
  const completedTodos = filteredTodos.filter(todo => todo.completed);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      className="flex flex-col gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <TodoStats todos={todos} />
      
      <SearchAndFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filter={filter}
        onFilterChange={setFilter}
      />

      <div className="flex flex-col gap-4">
        {filter !== 'completed' && (
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold text-primary">Tugas Aktif</h2>
            <AnimatePresence mode="popLayout">
              {incompleteTodos.map((todo) => (
                <motion.div
                  key={todo.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ 
                    duration: 0.2,
                    type: "spring",
                    stiffness: 500,
                    damping: 25
                  }}
                  className="group"
                  whileHover={{ scale: 1.01 }}
                >
                  <TodoItem todo={todo} onUpdate={loadTodos} />
                </motion.div>
              ))}
            </AnimatePresence>
            {incompleteTodos.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-muted-foreground py-8 rounded-lg border border-dashed"
              >
                Belum ada tugas aktif
              </motion.div>
            )}
          </div>
        )}

        {filter !== 'active' && completedTodos.length > 0 && (
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold text-primary">Tugas Selesai</h2>
            <AnimatePresence mode="popLayout">
              {completedTodos.map((todo) => (
                <motion.div
                  key={todo.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ 
                    duration: 0.2,
                    type: "spring",
                    stiffness: 500,
                    damping: 25
                  }}
                  className="group"
                  whileHover={{ scale: 1.01 }}
                >
                  <TodoItem todo={todo} onUpdate={loadTodos} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TodoList;