import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { addTodo } from '@/lib/todoStorage';
import { Plus } from 'lucide-react';

interface AddTodoProps {
  onAdd: () => void;
}

const AddTodo = ({ onAdd }: AddTodoProps) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText('');
      onAdd();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4">
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Tambah tugas baru..."
        className="flex-1"
      />
      <Button type="submit" size="icon">
        <Plus className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default AddTodo;