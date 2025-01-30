import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { updateTodo, deleteTodo, Todo } from '@/lib/todoStorage';
import { Check, X, CheckSquare, Square } from 'lucide-react';
import { toast } from 'sonner';
import TodoItemActions from './TodoItemActions';
import TodoItemTimestamp from './TodoItemTimestamp';

interface TodoItemProps {
  todo: Todo;
  onUpdate: () => void;
}

const TodoItem = ({ todo, onUpdate }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleUpdate = () => {
    if (editText.trim() !== todo.text) {
      updateTodo(todo.id, { text: editText.trim() });
      toast.success('Tugas berhasil diperbarui');
      onUpdate();
    }
    setIsEditing(false);
  };

  const handleToggle = () => {
    updateTodo(todo.id, { completed: !todo.completed });
    toast.success(todo.completed ? 'Tugas ditandai belum selesai' : 'Tugas ditandai selesai');
    onUpdate();
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
    toast.success('Tugas berhasil dihapus');
    onUpdate();
  };

  return (
    <div 
      className={`flex flex-col gap-2 p-4 rounded-lg border transition-all duration-200
        ${todo.completed 
          ? 'bg-muted/50 dark:bg-muted/10' 
          : 'bg-card hover:shadow-md dark:bg-card/50'
        }
        group-hover:border-primary/20
        hover:scale-[1.01] transform transition-all duration-200
      `}
    >
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggle}
          className={`${todo.completed ? "text-green-500" : "text-muted-foreground"} 
            hover:text-primary transition-colors`}
        >
          {todo.completed ? (
            <CheckSquare className="h-4 w-4" />
          ) : (
            <Square className="h-4 w-4" />
          )}
        </Button>

        {isEditing ? (
          <div className="flex gap-2 flex-1">
            <Input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="flex-1"
              autoFocus
            />
            <Button size="icon" onClick={handleUpdate}>
              <Check className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" onClick={() => setIsEditing(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex justify-between items-center flex-1">
            <span className={`${todo.completed ? "line-through text-muted-foreground" : ""}`}>
              {todo.text}
            </span>
            <TodoItemActions 
              onEdit={() => setIsEditing(true)}
              onDelete={handleDelete}
            />
          </div>
        )}
      </div>

      <TodoItemTimestamp 
        createdAt={todo.createdAt}
        updatedAt={todo.updatedAt}
      />
    </div>
  );
};

export default TodoItem;