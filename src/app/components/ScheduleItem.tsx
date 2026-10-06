import { Clock, MapPin, User } from "lucide-react";

interface ScheduleItemProps {
  subject: string;
  teacher: string;
  time: string;
  room: string;
  color: string;
  isActive?: boolean;
}

export function ScheduleItem({ subject, teacher, time, room, color, isActive = false }: ScheduleItemProps) {
  return (
    <div className={`bg-[#1a1a1a] rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-lg ${
      isActive 
        ? 'border-emerald-500/50 shadow-emerald-500/10' 
        : 'border-gray-800/50 hover:border-gray-700/50'
    }`}>
      <div className={`h-1.5 ${color}`} />
      
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-white font-bold text-lg mb-1.5">{subject}</h3>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <User className="w-4 h-4" />
              <span className="font-medium">{teacher}</span>
            </div>
          </div>
          
          <div className={`px-4 py-2 rounded-xl ${
            isActive 
              ? 'bg-emerald-500/20 border border-emerald-500/30' 
              : 'bg-gray-800/50'
          }`}>
            <div className="flex items-center gap-2">
              <Clock className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-gray-400'}`} />
              <span className={`text-sm font-bold ${isActive ? 'text-emerald-400' : 'text-white'}`}>
                {time}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-gray-500 text-sm bg-gray-800/30 rounded-lg px-3 py-2 w-fit">
          <MapPin className="w-4 h-4" />
          <span className="font-semibold">Sala {room}</span>
        </div>
        
        {isActive && (
          <div className="mt-3 pt-3 border-t border-gray-800/50">
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span>Aula em andamento</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}