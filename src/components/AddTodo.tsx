import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { addTodo } from '@/lib/todoStorage';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <form onSubmit={handleSubmit} className="p-6">
      <div className="flex gap-3">
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Tambah tugas baru..."
          className="flex-1 bg-background/50 border-border/50 focus-visible:ring-primary/30"
        />
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button 
            type="submit" 
            size="icon"
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </form>
  );
};

export default AddTodo;