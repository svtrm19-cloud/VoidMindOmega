import { Clock, CheckCircle2, Circle } from "lucide-react";
import { useState } from "react";

interface TaskCardProps {
  title: string;
  subject: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  completed?: boolean;
}

export function TaskCard({ title, subject, dueDate, priority, completed = false }: TaskCardProps) {
  const [isCompleted, setIsCompleted] = useState(completed);

  const priorityColors = {
    high: "border-red-500/20 bg-red-500/5",
    medium: "border-amber-500/20 bg-amber-500/5",
    low: "border-emerald-500/20 bg-emerald-500/5",
  };

  const priorityLabels = {
    high: "Alta",
    medium: "Média",
    low: "Baixa",
  };

  const priorityTextColors = {
    high: "text-red-400",
    medium: "text-amber-400",
    low: "text-emerald-400",
  };

  const priorityDots = {
    high: "bg-red-500",
    medium: "bg-amber-500",
    low: "bg-emerald-500",
  };

  return (
    <div className={`bg-[#1a1a1a] rounded-2xl border ${priorityColors[priority]} p-4 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/5 hover:border-gray-700/50 group`}>
      <div className="flex items-start gap-3">
        <button
          onClick={() => setIsCompleted(!isCompleted)}
          className="mt-0.5 flex-shrink-0 transition-transform active:scale-90"
        >
          {isCompleted ? (
            <CheckCircle2 className="w-6 h-6 text-emerald-500 fill-emerald-500/20" />
          ) : (
            <Circle className="w-6 h-6 text-gray-600 group-hover:text-gray-400 transition-colors" />
          )}
        </button>
        
        <div className="flex-1 min-w-0">
          <h3 className={`text-white font-semibold mb-2 leading-tight ${isCompleted ? 'line-through opacity-50' : ''}`}>
            {title}
          </h3>
          
          <div className="flex items-center gap-2 flex-wrap mb-3">
            <span className="text-emerald-400 text-sm font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-lg">
              {subject}
            </span>
            <div className="flex items-center gap-1.5">
              <div className={`w-1.5 h-1.5 rounded-full ${priorityDots[priority]}`} />
              <span className={`text-xs font-bold ${priorityTextColors[priority]}`}>
                {priorityLabels[priority]}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-1.5 text-gray-400 text-sm">
            <Clock className="w-4 h-4" />
            <span>{dueDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}