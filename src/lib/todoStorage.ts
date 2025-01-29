export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = 'todos';

export const getTodos = (): Todo[] => {
  const todos = localStorage.getItem(STORAGE_KEY);
  return todos ? JSON.parse(todos) : [];
};

export const saveTodos = (todos: Todo[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};

export const addTodo = (text: string): Todo => {
  const newTodo: Todo = {
    id: Date.now().toString(),
    text,
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const todos = getTodos();
  saveTodos([...todos, newTodo]);
  return newTodo;
};

export const updateTodo = (id: string, updates: Partial<Todo>) => {
  const todos = getTodos();
  const updatedTodos = todos.map(todo => {
    if (todo.id === id) {
      return { ...todo, ...updates, updatedAt: new Date().toISOString() };
    }
    return todo;
  });
  saveTodos(updatedTodos);
};

export const deleteTodo = (id: string) => {
  const todos = getTodos();
  saveTodos(todos.filter(todo => todo.id !== id));
};