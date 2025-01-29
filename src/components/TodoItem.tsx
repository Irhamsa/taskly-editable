import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { updateTodo, deleteTodo, Todo } from '@/lib/todoStorage';
import { Check, X, Edit, Trash, Calendar, Clock, CheckSquare, Square } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from 'sonner';

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

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd MMMM yyyy HH:mm', { locale: id });
  };

  return (
    <div className={`flex flex-col gap-2 p-4 rounded-lg shadow-sm border transition-colors ${
      todo.completed ? 'bg-gray-50' : 'bg-white'
    }`}>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggle}
          className={todo.completed ? "text-green-500" : "text-gray-400"}
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
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Trash className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Hapus Tugas</AlertDialogTitle>
                    <AlertDialogDescription>
                      Apakah Anda yakin ingin menghapus tugas ini? Tindakan ini tidak dapat dibatalkan.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Hapus</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
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