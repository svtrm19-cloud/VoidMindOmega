import { Bell, Calendar, AlertCircle, Info } from "lucide-react";

interface ReminderCardProps {
  title: string;
  description: string;
  date: string;
  type: "urgent" | "important" | "info" | "event";
}

export function ReminderCard({ title, description, date, type }: ReminderCardProps) {
  const typeConfig = {
    urgent: {
      icon: AlertCircle,
      gradient: "from-red-500/20 to-red-600/10",
      border: "border-red-500/30",
      iconBg: "bg-red-500/20",
      iconColor: "text-red-400",
      dotColor: "bg-red-500",
    },
    important: {
      icon: Bell,
      gradient: "from-amber-500/20 to-amber-600/10",
      border: "border-amber-500/30",
      iconBg: "bg-amber-500/20",
      iconColor: "text-amber-400",
      dotColor: "bg-amber-500",
    },
    info: {
      icon: Info,
      gradient: "from-blue-500/20 to-blue-600/10",
      border: "border-blue-500/30",
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-400",
      dotColor: "bg-blue-500",
    },
    event: {
      icon: Calendar,
      gradient: "from-emerald-500/20 to-emerald-600/10",
      border: "border-emerald-500/30",
      iconBg: "bg-emerald-500/20",
      iconColor: "text-emerald-400",
      dotColor: "bg-emerald-500",
    },
  };

  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div className={`bg-gradient-to-br ${config.gradient} rounded-2xl border ${config.border} backdrop-blur-sm p-5 hover:shadow-lg transition-all duration-300`}>
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 ${config.iconBg} rounded-xl flex items-center justify-center shrink-0`}>
          <Icon className={`w-6 h-6 ${config.iconColor}`} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="text-white font-bold text-lg leading-tight">{title}</h3>
          </div>
          
          <p className="text-gray-400 text-sm leading-relaxed mb-3">{description}</p>
          
          <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold">
            <Calendar className="w-3.5 h-3.5" />
            <span>{date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}