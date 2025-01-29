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

  return (
    <div className="flex flex-col gap-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onUpdate={loadTodos} />
      ))}
      {todos.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          Belum ada tugas. Tambahkan tugas baru!
        </div>
      )}
    </div>
  );
};

export default TodoList;