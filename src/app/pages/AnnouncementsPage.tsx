import { Bell, AlertCircle, Info, Calendar, Award, Users, BookOpen, Megaphone } from "lucide-react";

interface Announcement {
  id: number;
  title: string;
  message: string;
  date: string;
  type: "info" | "warning" | "event" | "achievement" | "general";
  author: string;
  icon: any;
  color: string;
  read: boolean;
}

export function AnnouncementsPage() {
  const announcements: Announcement[] = [
    {
      id: 1,
      title: "Reunião de Pais - 3º Bimestre",
      message: "Convidamos os pais e responsáveis para a reunião do 3º bimestre que ocorrerá no dia 30/05 às 19h no auditório da escola. Será apresentado o desempenho dos alunos e as próximas atividades.",
      date: "Hoje às 10:30",
      type: "event",
      author: "Coordenação Pedagógica",
      icon: Calendar,
      color: "cyan",
      read: false
    },
    {
      id: 2,
      title: "Parabéns pelo Desempenho!",
      message: "Samuel, você foi destaque no último simulado de Matemática! Continue assim e você estará no quadro de honra do bimestre. A coordenação parabeniza seu esforço e dedicação.",
      date: "Hoje às 09:15",
      type: "achievement",
      author: "Prof. Carlos Silva",
      icon: Award,
      color: "amber",
      read: false
    },
    {
      id: 3,
      title: "Lembrete: Prova de Física",
      message: "Lembramos que amanhã (26/05) às 07:30 teremos a avaliação de Física sobre Óptica Geométrica. Não esqueça de trazer calculadora científica.",
      date: "Ontem às 15:45",
      type: "warning",
      author: "Prof. Roberto Lima",
      icon: AlertCircle,
      color: "red",
      read: true
    },
    {
      id: 4,
      title: "Nova Área Recreativa",
      message: "A escola inaugurou a nova área de convivência com mesas de ping-pong e espaço para jogos. O local está disponível durante o intervalo e após as aulas.",
      date: "25/05 às 11:20",
      type: "info",
      author: "Direção",
      icon: Info,
      color: "blue",
      read: true
    },
    {
      id: 5,
      title: "Feira de Ciências 2026",
      message: "Estão abertas as inscrições para a Feira de Ciências! Os interessados devem formar grupos de até 4 alunos e apresentar a proposta de projeto até 15/06. Haverá premiação para os melhores trabalhos.",
      date: "24/05 às 14:00",
      type: "event",
      author: "Coordenação de Ciências",
      icon: Users,
      color: "purple",
      read: true
    },
    {
      id: 6,
      title: "Biblioteca - Novos Livros",
      message: "A biblioteca recebeu 50 novos títulos de literatura brasileira e estrangeira. Venha conferir as novidades! Empréstimos disponíveis a partir de segunda-feira.",
      date: "23/05 às 16:30",
      type: "info",
      author: "Biblioteca Escolar",
      icon: BookOpen,
      color: "green",
      read: true
    },
    {
      id: 7,
      title: "Campanha de Solidariedade",
      message: "O grêmio estudantil está organizando uma campanha de arrecadação de alimentos não perecíveis para doação. Participe! Ponto de coleta na secretaria.",
      date: "22/05 às 10:00",
      type: "general",
      author: "Grêmio Estudantil",
      icon: Megaphone,
      color: "pink",
      read: true
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, any> = {
      cyan: { bg: "from-cyan-500/20", border: "border-cyan-500/30", text: "text-cyan-400", dot: "bg-cyan-500" },
      blue: { bg: "from-blue-500/20", border: "border-blue-500/30", text: "text-blue-400", dot: "bg-blue-500" },
      red: { bg: "from-red-500/20", border: "border-red-500/30", text: "text-red-400", dot: "bg-red-500" },
      amber: { bg: "from-amber-500/20", border: "border-amber-500/30", text: "text-amber-400", dot: "bg-amber-500" },
      purple: { bg: "from-purple-500/20", border: "border-purple-500/30", text: "text-purple-400", dot: "bg-purple-500" },
      green: { bg: "from-green-500/20", border: "border-green-500/30", text: "text-green-400", dot: "bg-green-500" },
      pink: { bg: "from-pink-500/20", border: "border-pink-500/30", text: "text-pink-400", dot: "bg-pink-500" },
    };
    return colors[color] || colors.cyan;
  };

  const unreadCount = announcements.filter(a => !a.read).length;

  return (
    <div className="min-h-screen bg-black pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 via-black to-cyan-950 border-b border-cyan-500/20 sticky top-0 z-40 backdrop-blur-xl">
        <div className="max-w-lg mx-auto px-5 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">Avisos</h1>
              <p className="text-sm text-gray-400">Comunicados e notificações</p>
            </div>
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-2xl flex items-center justify-center border border-cyan-500/30">
                <Bell className="w-6 h-6 text-cyan-400" />
              </div>
              {unreadCount > 0 && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center border-2 border-black">
                  <span className="text-white text-xs font-bold">{unreadCount}</span>
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-black/40 rounded-xl p-3 border border-cyan-500/20">
              <p className="text-xs text-gray-400 mb-1">Total</p>
              <p className="text-xl font-bold text-cyan-400">{announcements.length}</p>
            </div>
            <div className="bg-black/40 rounded-xl p-3 border border-red-500/20">
              <p className="text-xs text-gray-400 mb-1">Não lidos</p>
              <p className="text-xl font-bold text-red-400">{unreadCount}</p>
            </div>
            <div className="bg-black/40 rounded-xl p-3 border border-green-500/20">
              <p className="text-xs text-gray-400 mb-1">Lidos</p>
              <p className="text-xl font-bold text-green-400">{announcements.length - unreadCount}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-5 py-6 space-y-4">
        {announcements.map((announcement) => {
          const colors = getColorClasses(announcement.color);
          const Icon = announcement.icon;

          return (
            <div
              key={announcement.id}
              className={`bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl border ${colors.border} p-5 shadow-lg hover:scale-[1.01] transition-all duration-300 ${
                announcement.read ? "opacity-80" : "shadow-cyan-500/10"
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`w-12 h-12 bg-gradient-to-br ${colors.bg} to-gray-900 rounded-xl flex items-center justify-center border ${colors.border} flex-shrink-0 relative`}>
                  <Icon className={`w-6 h-6 ${colors.text}`} />
                  {!announcement.read && (
                    <div className={`absolute -top-1 -right-1 w-3 h-3 ${colors.dot} rounded-full border-2 border-black animate-pulse`}></div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className={`font-bold ${colors.text} mb-2`}>{announcement.title}</h3>
                  <p className="text-sm text-gray-300 mb-3 leading-relaxed">{announcement.message}</p>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 bg-gradient-to-br ${colors.bg} to-gray-900 rounded-lg flex items-center justify-center border ${colors.border}`}>
                        <span className="text-lg">👤</span>
                      </div>
                      <span className="text-gray-400">{announcement.author}</span>
                    </div>
                    <span className="text-gray-500">{announcement.date}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tips */}
      <div className="max-w-lg mx-auto px-5">
        <div className="bg-gradient-to-br from-purple-900/30 to-gray-950 rounded-2xl border border-purple-500/30 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <Info className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="text-white font-bold">Dica</h3>
              <p className="text-xs text-purple-400">Sistema de Notificações</p>
            </div>
          </div>
          <p className="text-sm text-gray-300">
            Você receberá notificações em tempo real de todos os avisos importantes. Mantenha as notificações ativadas para não perder nenhuma informação!
          </p>
        </div>
      </div>
    </div>
  );
}
