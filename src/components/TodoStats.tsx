import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Todo } from '@/lib/todoStorage';

interface TodoStatsProps {
  todos: Todo[];
}

const TodoStats = ({ todos }: TodoStatsProps) => {
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const activeTodos = totalTodos - completedTodos;
  const completionRate = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="p-4">
          <CardTitle className="text-sm font-medium">Total Tugas</CardTitle>
        </CardHeader>
        <CardContent className="pb-4 pt-0 px-4">
          <div className="text-2xl font-bold">{totalTodos}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="p-4">
          <CardTitle className="text-sm font-medium">Tugas Aktif</CardTitle>
        </CardHeader>
        <CardContent className="pb-4 pt-0 px-4">
          <div className="text-2xl font-bold text-blue-600">{activeTodos}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="p-4">
          <CardTitle className="text-sm font-medium">Tugas Selesai</CardTitle>
        </CardHeader>
        <CardContent className="pb-4 pt-0 px-4">
          <div className="text-2xl font-bold text-green-600">{completedTodos}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="p-4">
          <CardTitle className="text-sm font-medium">Tingkat Penyelesaian</CardTitle>
        </CardHeader>
        <CardContent className="pb-4 pt-0 px-4">
          <div className="text-2xl font-bold text-purple-600">{completionRate}%</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TodoStats;