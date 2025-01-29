import { useState, useEffect } from 'react';
import { getTodos, Todo } from '@/lib/todoStorage';
import TodoItem from './TodoItem';
import SearchAndFilter from './SearchAndFilter';
import TodoStats from './TodoStats';
import { motion, AnimatePresence } from 'framer-motion';

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

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

  return (
    <div className="flex flex-col gap-6">
      <TodoStats todos={todos} />
      
      <SearchAndFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filter={filter}
        onFilterChange={setFilter}
      />

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-primary">Tugas Aktif</h2>
          <AnimatePresence mode="popLayout">
            {incompleteTodos.map((todo) => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
                className="group"
              >
                <TodoItem todo={todo} onUpdate={loadTodos} />
              </motion.div>
            ))}
          </AnimatePresence>
          {incompleteTodos.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-muted-foreground py-4 rounded-lg border border-dashed"
            >
              Belum ada tugas aktif
            </motion.div>
          )}
        </div>

        {completedTodos.length > 0 && (
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold text-primary">Tugas Selesai</h2>
            <AnimatePresence mode="popLayout">
              {completedTodos.map((todo) => (
                <motion.div
                  key={todo.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.2 }}
                  className="group"
                >
                  <TodoItem todo={todo} onUpdate={loadTodos} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;