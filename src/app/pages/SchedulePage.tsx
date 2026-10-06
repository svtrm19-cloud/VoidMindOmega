import { Clock, MapPin, User2 } from "lucide-react";

interface ClassItem {
  subject: string;
  teacher: string;
  time: string;
  room: string;
  color: string;
  icon: string;
}

export function SchedulePage() {
  const schedule: Record<string, ClassItem[]> = {
    Segunda: [
      { subject: "Matemática", teacher: "Prof. Carlos Silva", time: "07:30 - 08:20", room: "201", color: "cyan", icon: "📐" },
      { subject: "Português", teacher: "Prof.ª Ana Santos", time: "08:20 - 09:10", room: "102", color: "blue", icon: "📚" },
      { subject: "Física", teacher: "Prof. Roberto Lima", time: "09:30 - 10:20", room: "Lab 1", color: "purple", icon: "⚡" },
      { subject: "Química", teacher: "Prof.ª Marina Costa", time: "10:20 - 11:10", room: "Lab 2", color: "green", icon: "🧪" },
      { subject: "Informática", teacher: "Prof. João Pedro", time: "13:30 - 14:20", room: "Lab Info", color: "indigo", icon: "💻" },
    ],
    Terça: [
      { subject: "Biologia", teacher: "Prof.ª Clara Souza", time: "07:30 - 08:20", room: "203", color: "emerald", icon: "🧬" },
      { subject: "História", teacher: "Prof. Paulo Santos", time: "08:20 - 09:10", room: "305", color: "amber", icon: "🏛️" },
      { subject: "Geografia", teacher: "Prof.ª Maria Lima", time: "09:30 - 10:20", room: "304", color: "teal", icon: "🌍" },
      { subject: "Matemática", teacher: "Prof. Carlos Silva", time: "10:20 - 11:10", room: "201", color: "cyan", icon: "📐" },
      { subject: "Português", teacher: "Prof.ª Ana Santos", time: "13:30 - 14:20", room: "102", color: "blue", icon: "📚" },
    ],
    Quarta: [
      { subject: "Física", teacher: "Prof. Roberto Lima", time: "07:30 - 08:20", room: "Lab 1", color: "purple", icon: "⚡" },
      { subject: "Química", teacher: "Prof.ª Marina Costa", time: "08:20 - 09:10", room: "Lab 2", color: "green", icon: "🧪" },
      { subject: "Biologia", teacher: "Prof.ª Clara Souza", time: "09:30 - 10:20", room: "203", color: "emerald", icon: "🧬" },
      { subject: "Informática", teacher: "Prof. João Pedro", time: "10:20 - 11:10", room: "Lab Info", color: "indigo", icon: "💻" },
      { subject: "Ed. Física", teacher: "Prof. Pedro Oliveira", time: "13:30 - 14:20", room: "Quadra", color: "pink", icon: "⚽" },
    ],
    Quinta: [
      { subject: "Matemática", teacher: "Prof. Carlos Silva", time: "07:30 - 08:20", room: "201", color: "cyan", icon: "📐" },
      { subject: "Português", teacher: "Prof.ª Ana Santos", time: "08:20 - 09:10", room: "102", color: "blue", icon: "📚" },
      { subject: "História", teacher: "Prof. Paulo Santos", time: "09:30 - 10:20", room: "305", color: "amber", icon: "🏛️" },
      { subject: "Geografia", teacher: "Prof.ª Maria Lima", time: "10:20 - 11:10", room: "304", color: "teal", icon: "🌍" },
      { subject: "Física", teacher: "Prof. Roberto Lima", time: "13:30 - 14:20", room: "Lab 1", color: "purple", icon: "⚡" },
    ],
    Sexta: [
      { subject: "Química", teacher: "Prof.ª Marina Costa", time: "07:30 - 08:20", room: "Lab 2", color: "green", icon: "🧪" },
      { subject: "Biologia", teacher: "Prof.ª Clara Souza", time: "08:20 - 09:10", room: "203", color: "emerald", icon: "🧬" },
      { subject: "Informática", teacher: "Prof. João Pedro", time: "09:30 - 10:20", room: "Lab Info", color: "indigo", icon: "💻" },
      { subject: "Ed. Física", teacher: "Prof. Pedro Oliveira", time: "10:20 - 11:10", room: "Quadra", color: "pink", icon: "⚽" },
      { subject: "Matemática", teacher: "Prof. Carlos Silva", time: "13:30 - 14:20", room: "201", color: "cyan", icon: "📐" },
    ],
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, any> = {
      cyan: { bg: "from-cyan-500/20", border: "border-cyan-500/30", text: "text-cyan-400" },
      blue: { bg: "from-blue-500/20", border: "border-blue-500/30", text: "text-blue-400" },
      purple: { bg: "from-purple-500/20", border: "border-purple-500/30", text: "text-purple-400" },
      green: { bg: "from-green-500/20", border: "border-green-500/30", text: "text-green-400" },
      emerald: { bg: "from-emerald-500/20", border: "border-emerald-500/30", text: "text-emerald-400" },
      amber: { bg: "from-amber-500/20", border: "border-amber-500/30", text: "text-amber-400" },
      teal: { bg: "from-teal-500/20", border: "border-teal-500/30", text: "text-teal-400" },
      indigo: { bg: "from-indigo-500/20", border: "border-indigo-500/30", text: "text-indigo-400" },
      pink: { bg: "from-pink-500/20", border: "border-pink-500/30", text: "text-pink-400" },
    };
    return colors[color] || colors.cyan;
  };

  return (
    <div className="min-h-screen bg-black pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 via-black to-cyan-950 border-b border-cyan-500/20 sticky top-0 z-40 backdrop-blur-xl">
        <div className="max-w-lg mx-auto px-5 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">Horários</h1>
              <p className="text-sm text-gray-400">Grade semanal de aulas</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-2xl flex items-center justify-center border border-cyan-500/30">
              <Clock className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-5 py-6 space-y-6">
        {Object.entries(schedule).map(([day, classes]) => (
          <div key={day} className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl border border-cyan-500/30 p-5 shadow-lg">
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
              {day}-feira
            </h3>

            <div className="space-y-3">
              {classes.map((classItem, idx) => {
                const colors = getColorClasses(classItem.color);

                return (
                  <div
                    key={idx}
                    className={`bg-gradient-to-br ${colors.bg} to-gray-950 rounded-xl border ${colors.border} p-4 hover:scale-[1.02] transition-all duration-300`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-12 h-12 bg-gradient-to-br ${colors.bg} to-gray-900 rounded-xl flex items-center justify-center text-2xl border ${colors.border}`}>
                        {classItem.icon}
                      </div>

                      <div className="flex-1">
                        <h4 className={`font-bold ${colors.text} mb-1`}>{classItem.subject}</h4>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <User2 className="w-3 h-3" />
                            <span>{classItem.teacher}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <Clock className="w-3 h-3" />
                            <span>{classItem.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <MapPin className="w-3 h-3" />
                            <span>Sala {classItem.room}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
