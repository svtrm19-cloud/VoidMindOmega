import { FileText, Clock, CheckCircle2, AlertCircle, XCircle, Filter } from "lucide-react";
import { useState } from "react";

interface Activity {
  id: number;
  title: string;
  subject: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "completed" | "late";
  description: string;
  icon: string;
  color: string;
}

export function ActivitiesPage() {
  const [filter, setFilter] = useState<"all" | "pending" | "completed" | "late">("all");

  const activities: Activity[] = [
    {
      id: 1,
      title: "Relatório de Experimento - Densidade",
      subject: "Física",
      dueDate: "Hoje às 23:59",
      priority: "high",
      status: "pending",
      description: "Elaborar relatório completo do experimento sobre densidade dos materiais",
      icon: "⚡",
      color: "purple"
    },
    {
      id: 2,
      title: "Exercícios de Álgebra - Cap. 5",
      subject: "Matemática",
      dueDate: "Amanhã às 08:00",
      priority: "high",
      status: "pending",
      description: "Resolver todos os exercícios do capítulo 5 sobre funções quadráticas",
      icon: "📐",
      color: "cyan"
    },
    {
      id: 3,
      title: "Resumo - Ciclo da Água",
      subject: "Biologia",
      dueDate: "Entregue",
      priority: "low",
      status: "completed",
      description: "Resumo sobre o ciclo da água e sua importância",
      icon: "🧬",
      color: "emerald"
    },
    {
      id: 4,
      title: "Trabalho em Grupo - Guerra Fria",
      subject: "História",
      dueDate: "28/05 às 23:59",
      priority: "medium",
      status: "pending",
      description: "Apresentação em grupo sobre a Guerra Fria e suas consequências",
      icon: "🏛️",
      color: "amber"
    },
    {
      id: 5,
      title: "Lista de Exercícios - Química Orgânica",
      subject: "Química",
      dueDate: "30/05 às 23:59",
      priority: "medium",
      status: "pending",
      description: "Resolver lista de exercícios sobre funções orgânicas",
      icon: "🧪",
      color: "green"
    },
    {
      id: 6,
      title: "Leitura - Capítulo 3",
      subject: "Português",
      dueDate: "Atrasado - 24/05",
      priority: "high",
      status: "late",
      description: "Leitura do capítulo 3 do livro e responder questionário",
      icon: "📚",
      color: "blue"
    },
    {
      id: 7,
      title: "Projeto - Site Escolar",
      subject: "Informática",
      dueDate: "Entregue",
      priority: "medium",
      status: "completed",
      description: "Desenvolvimento de site responsivo para a escola",
      icon: "💻",
      color: "indigo"
    },
    {
      id: 8,
      title: "Mapa Mental - Relevo Brasileiro",
      subject: "Geografia",
      dueDate: "02/06 às 23:59",
      priority: "low",
      status: "pending",
      description: "Criar mapa mental sobre as formas de relevo do Brasil",
      icon: "🌍",
      color: "teal"
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, any> = {
      cyan: { bg: "from-cyan-500/20", border: "border-cyan-500/30", text: "text-cyan-400", badge: "bg-cyan-500/20" },
      blue: { bg: "from-blue-500/20", border: "border-blue-500/30", text: "text-blue-400", badge: "bg-blue-500/20" },
      purple: { bg: "from-purple-500/20", border: "border-purple-500/30", text: "text-purple-400", badge: "bg-purple-500/20" },
      green: { bg: "from-green-500/20", border: "border-green-500/30", text: "text-green-400", badge: "bg-green-500/20" },
      emerald: { bg: "from-emerald-500/20", border: "border-emerald-500/30", text: "text-emerald-400", badge: "bg-emerald-500/20" },
      amber: { bg: "from-amber-500/20", border: "border-amber-500/30", text: "text-amber-400", badge: "bg-amber-500/20" },
      teal: { bg: "from-teal-500/20", border: "border-teal-500/30", text: "text-teal-400", badge: "bg-teal-500/20" },
      indigo: { bg: "from-indigo-500/20", border: "border-indigo-500/30", text: "text-indigo-400", badge: "bg-indigo-500/20" },
    };
    return colors[color] || colors.cyan;
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded-lg text-[10px] font-bold border border-red-500/30">URGENTE</span>;
      case "medium":
        return <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-lg text-[10px] font-bold border border-yellow-500/30">MÉDIA</span>;
      case "low":
        return <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-lg text-[10px] font-bold border border-green-500/30">BAIXA</span>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-green-400" />;
      case "late":
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Clock className="w-5 h-5 text-cyan-400" />;
    }
  };

  const filteredActivities = activities.filter(activity => {
    if (filter === "all") return true;
    return activity.status === filter;
  });

  const stats = {
    total: activities.length,
    pending: activities.filter(a => a.status === "pending").length,
    completed: activities.filter(a => a.status === "completed").length,
    late: activities.filter(a => a.status === "late").length,
  };

  return (
    <div className="min-h-screen bg-black pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 via-black to-cyan-950 border-b border-cyan-500/20 sticky top-0 z-40 backdrop-blur-xl">
        <div className="max-w-lg mx-auto px-5 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">Atividades</h1>
              <p className="text-sm text-gray-400">Tarefas e trabalhos escolares</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-2xl flex items-center justify-center border border-cyan-500/30">
              <FileText className="w-6 h-6 text-cyan-400" />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-black/40 rounded-xl p-3 border border-cyan-500/20">
              <p className="text-xs text-gray-400 mb-1">Total</p>
              <p className="text-xl font-bold text-cyan-400">{stats.total}</p>
            </div>
            <div className="bg-black/40 rounded-xl p-3 border border-yellow-500/20">
              <p className="text-xs text-gray-400 mb-1">Pendente</p>
              <p className="text-xl font-bold text-yellow-400">{stats.pending}</p>
            </div>
            <div className="bg-black/40 rounded-xl p-3 border border-green-500/20">
              <p className="text-xs text-gray-400 mb-1">Feitas</p>
              <p className="text-xl font-bold text-green-400">{stats.completed}</p>
            </div>
            <div className="bg-black/40 rounded-xl p-3 border border-red-500/20">
              <p className="text-xs text-gray-400 mb-1">Atraso</p>
              <p className="text-xl font-bold text-red-400">{stats.late}</p>
            </div>
          </div>

          {/* Filters */}
          <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-2">
            <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
            {[
              { value: "all", label: "Todas" },
              { value: "pending", label: "Pendentes" },
              { value: "completed", label: "Concluídas" },
              { value: "late", label: "Atrasadas" },
            ].map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  filter === f.value
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30"
                    : "bg-gray-800/50 text-gray-400 hover:text-white border border-gray-700"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-5 py-6 space-y-3">
        {filteredActivities.map((activity) => {
          const colors = getColorClasses(activity.color);

          return (
            <div
              key={activity.id}
              className={`bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl border ${
                activity.status === "late" ? "border-red-500/30" : colors.border
              } p-4 shadow-lg hover:scale-[1.02] transition-all duration-300 ${
                activity.status === "completed" ? "opacity-70" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Checkbox */}
                <div
                  className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center cursor-pointer transition-all ${
                    activity.status === "completed"
                      ? "bg-green-500/20 border-green-500"
                      : activity.status === "late"
                      ? "bg-red-500/20 border-red-500"
                      : "border-gray-600 hover:border-cyan-500"
                  }`}
                >
                  {activity.status === "completed" && <CheckCircle2 className="w-4 h-4 text-green-400" />}
                  {activity.status === "late" && <XCircle className="w-4 h-4 text-red-400" />}
                </div>

                {/* Icon */}
                <div className={`w-12 h-12 bg-gradient-to-br ${colors.bg} to-gray-900 rounded-xl flex items-center justify-center text-2xl border ${colors.border} flex-shrink-0`}>
                  {activity.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className={`font-bold ${colors.text} text-sm ${activity.status === "completed" ? "line-through" : ""}`}>
                      {activity.title}
                    </h3>
                    {getPriorityBadge(activity.priority)}
                  </div>

                  <p className="text-xs text-gray-400 mb-2 line-clamp-2">{activity.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 ${colors.badge} ${colors.text} rounded-lg text-[10px] font-bold border ${colors.border}`}>
                        {activity.subject}
                      </span>
                    </div>

                    <div className={`flex items-center gap-1 text-[10px] font-semibold ${
                      activity.status === "late" ? "text-red-400" : activity.status === "completed" ? "text-green-400" : "text-gray-400"
                    }`}>
                      {getStatusIcon(activity.status)}
                      <span>{activity.dueDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {filteredActivities.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-10 h-10 text-cyan-400" />
            </div>
            <p className="text-gray-400 font-semibold text-lg">Nenhuma atividade encontrada</p>
            <p className="text-gray-600 text-sm mt-2">Altere os filtros para ver mais atividades</p>
          </div>
        )}
      </div>
    </div>
  );
}
