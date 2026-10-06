import { TrendingUp, Circle } from "lucide-react";

interface ProgressCardProps {
  subject: string;
  completed: number;
  total: number;
  percentage: number;
}

export function ProgressCard({ subject, completed, total, percentage }: ProgressCardProps) {
  const getProgressColor = () => {
    if (percentage >= 80) return "from-emerald-500 to-teal-500";
    if (percentage >= 50) return "from-amber-500 to-orange-500";
    return "from-red-500 to-rose-500";
  };

  return (
    <div className="bg-[#1a1a1a] rounded-2xl border border-gray-800/50 p-5 hover:border-gray-700/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-bold text-lg">{subject}</h3>
        <div className="flex items-center gap-2">
          <span className="text-emerald-400 text-sm font-bold">{percentage}%</span>
          <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
        </div>
      </div>
      
      <div className="relative h-2.5 bg-gray-800/50 rounded-full overflow-hidden mb-3">
        <div 
          className={`absolute inset-y-0 left-0 bg-gradient-to-r ${getProgressColor()} rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse" />
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-sm font-medium">
          {completed} de {total} tarefas concluídas
        </span>
        {percentage >= 80 && (
          <span className="text-emerald-400 text-xs font-bold flex items-center gap-1">
            <Circle className="w-2 h-2 fill-emerald-400" />
            Excelente
          </span>
        )}
      </div>
    </div>
  );
}