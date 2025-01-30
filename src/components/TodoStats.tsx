import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Todo } from '@/lib/todoStorage';
import { motion } from 'framer-motion';
import { CheckCircle2, ListTodo, CircleDot, Percent } from 'lucide-react';

interface TodoStatsProps {
  todos: Todo[];
}

const TodoStats = ({ todos }: TodoStatsProps) => {
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const activeTodos = totalTodos - completedTodos;
  const completionRate = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

  const cards = [
    {
      title: "Total Tugas",
      value: totalTodos,
      icon: ListTodo,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Tugas Aktif",
      value: activeTodos,
      icon: CircleDot,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      title: "Tugas Selesai",
      value: completedTodos,
      icon: CheckCircle2,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Tingkat Penyelesaian",
      value: `${completionRate}%`,
      icon: Percent,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          className="group"
        >
          <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{card.value}</span>
                <div className={`p-2 rounded-full ${card.bgColor} ${card.color} transition-colors duration-200`}>
                  <card.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default TodoStats;