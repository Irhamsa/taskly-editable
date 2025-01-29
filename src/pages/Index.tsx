import AddTodo from '@/components/AddTodo';
import TodoList from '@/components/TodoList';
import ThemeToggle from '@/components/ThemeToggle';
import { useState } from 'react';

const Index = () => {
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      <ThemeToggle />
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-6 text-primary">
          Daftar Tugas
        </h1>
        <div className="space-y-4">
          <div className="bg-card rounded-lg shadow-sm border p-4">
            <AddTodo onAdd={() => setRefresh(prev => prev + 1)} />
          </div>
          <TodoList key={refresh} />
        </div>
      </div>
    </div>
  );
};

export default Index;