import { useState, useEffect } from 'react';
import { getTodos, Todo } from '@/lib/todoStorage';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const loadTodos = () => {
    setTodos(getTodos());
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const incompleteTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-primary">Tugas Aktif</h2>
        {incompleteTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onUpdate={loadTodos} />
        ))}
        {incompleteTodos.length === 0 && (
          <div className="text-center text-gray-500 py-4">
            Belum ada tugas aktif
          </div>
        )}
      </div>

      {completedTodos.length > 0 && (
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-primary">Tugas Selesai</h2>
          {completedTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onUpdate={loadTodos} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;