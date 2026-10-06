import { BookOpen, Calendar, Clock } from "lucide-react";

interface ExamCardProps {
  subject: string;
  title: string;
  date: string;
  time: string;
  daysUntil: number;
}

export function ExamCard({ subject, title, date, time, daysUntil }: ExamCardProps) {
  const getUrgencyColor = () => {
    if (daysUntil === 0) return "from-red-500/20 to-red-600/10 border-red-500/30";
    if (daysUntil <= 2) return "from-amber-500/20 to-amber-600/10 border-amber-500/30";
    return "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30";
  };

  const getBadgeColor = () => {
    if (daysUntil === 0) return "bg-red-500/20 text-red-400 ring-1 ring-red-500/30";
    if (daysUntil <= 2) return "bg-amber-500/20 text-amber-400 ring-1 ring-amber-500/30";
    return "bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/30";
  };

  return (
    <div className={`bg-gradient-to-br ${getUrgencyColor()} rounded-2xl border backdrop-blur-sm p-5 hover:shadow-lg transition-all duration-300`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-bold text-lg mb-1">{subject}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{title}</p>
          </div>
        </div>
        
        <div className={`px-3 py-1.5 rounded-full ${getBadgeColor()} shrink-0 ml-2`}>
          <span className="text-xs font-bold uppercase tracking-wide">
            {daysUntil === 0 ? 'HOJE' : daysUntil === 1 ? 'AMANHÃ' : `${daysUntil}d`}
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-4 text-sm text-gray-400">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span className="font-medium">{date}</span>
        </div>
        <span>•</span>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span className="font-medium">{time}</span>
        </div>
      </div>
    </div>
  );
}