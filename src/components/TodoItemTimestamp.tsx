import { Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface TodoItemTimestampProps {
  createdAt: string;
  updatedAt: string;
}

const TodoItemTimestamp = ({ createdAt, updatedAt }: TodoItemTimestampProps) => {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd MMMM yyyy HH:mm', { locale: id });
  };

  return (
    <div className="flex flex-col gap-1 text-xs text-muted-foreground">
      <div className="flex items-center gap-1">
        <Calendar className="h-3 w-3" />
        <span>Dibuat: {formatDate(createdAt)}</span>
      </div>
      {updatedAt !== createdAt && (
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>Diubah: {formatDate(updatedAt)}</span>
        </div>
      )}
    </div>
  );
};

export default TodoItemTimestamp;