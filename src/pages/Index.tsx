import AddTodo from '@/components/AddTodo';
import TodoList from '@/components/TodoList';
import { useState } from 'react';

const Index = () => {
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-6 text-primary">
          Daftar Tugas
        </h1>
        <div className="bg-white rounded-lg shadow-sm border">
          <AddTodo onAdd={() => setRefresh(prev => prev + 1)} />
          <TodoList key={refresh} />
        </div>
      </div>
    </div>
  );
};

export default Index;