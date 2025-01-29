import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { updateTodo, deleteTodo, Todo } from '@/lib/todoStorage';
import { Check, X, Edit, Trash, Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

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
      onUpdate();
    }
    setIsEditing(false);
  };

  const handleToggle = () => {
    updateTodo(todo.id, { completed: !todo.completed });
    onUpdate();
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
    onUpdate();
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd MMMM yyyy HH:mm', { locale: id });
  };

  return (
    <div className="flex flex-col gap-2 p-4 bg-white rounded-lg shadow-sm border">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggle}
          className={todo.completed ? "text-green-500" : "text-gray-400"}
        >
          <Check className="h-4 w-4" />
        </Button>

        {isEditing ? (
          <div className="flex gap-2 flex-1">
            <Input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="flex-1"
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
            <span className={`${todo.completed ? "line-through text-gray-400" : ""}`}>
              {todo.text}
            </span>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleDelete}>
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          <span>Dibuat: {formatDate(todo.createdAt)}</span>
        </div>
        {todo.updatedAt !== todo.createdAt && (
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>Diubah: {formatDate(todo.updatedAt)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoItem;