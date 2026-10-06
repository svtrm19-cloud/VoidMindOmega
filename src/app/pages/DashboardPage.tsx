import {
  TrendingUp,
  Calendar,
  AlertCircle,
  BookOpen,
  Award,
  Brain,
  Sparkles,
  Activity
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

export function DashboardPage() {
  const performanceData = [
    { month: "Fev", nota: 7.5 },
    { month: "Mar", nota: 8.2 },
    { month: "Abr", nota: 8.8 },
    { month: "Mai", nota: 9.1 },
  ];

  const subjectData = [
    { name: "Mat", value: 9.2 },
    { name: "Fís", value: 8.8 },
    { name: "Quí", value: 9.0 },
    { name: "Port", value: 8.5 },
  ];

  const COLORS = ['#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'];

  return (
    <div className="min-h-screen bg-black">
      {/* Header with Student Info */}
      <div className="relative bg-gradient-to-br from-gray-900 via-black to-cyan-950 border-b border-cyan-500/20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDYsIDE4MiwgMjEyLCAwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>

        <div className="relative max-w-lg mx-auto px-5 py-8">
          {/* Logo and School Name */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight">CETI CONNECT</h1>
              <p className="text-xs text-cyan-400 font-medium">Desbº Heli Sobral</p>
            </div>
          </div>

          {/* Student Profile Card */}
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-xl rounded-2xl border border-cyan-500/30 p-5 shadow-2xl shadow-cyan-500/10">
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-cyan-500/40">
                  SV
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-black flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Student Info */}
              <div className="flex-1">
                <h2 className="text-xl font-bold text-white mb-1">Samuel Victor da Silva Ribeiro</h2>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs font-bold border border-cyan-500/30">
                    TURMA 3C
                  </span>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-bold border border-blue-500/30">
                    MAT: 2024030145
                  </span>
                </div>
                <p className="text-sm text-gray-400">
                  <span className="text-cyan-400 font-semibold">Bem-vindo de volta! 🚀</span>
                  <br />
                  Continue com esse desempenho excelente!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-lg mx-auto px-5 py-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Overall Average */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl border border-cyan-500/30 p-4 shadow-lg shadow-cyan-500/5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                <Award className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="text-xs text-gray-400 font-semibold">Média Geral</span>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-white">8.9</span>
              <span className="text-green-400 text-sm font-bold mb-1 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                +0.3
              </span>
            </div>
            <div className="mt-2 h-1 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500" style={{ width: '89%' }}></div>
            </div>
          </div>

          {/* Attendance */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl border border-blue-500/30 p-4 shadow-lg shadow-blue-500/5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-400" />
              </div>
              <span className="text-xs text-gray-400 font-semibold">Frequência</span>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-white">95%</span>
              <span className="text-green-400 text-sm font-bold mb-1">Ótimo</span>
            </div>
            <div className="mt-2 h-1 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500" style={{ width: '95%' }}></div>
            </div>
          </div>

          {/* Pending Tasks */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl border border-purple-500/30 p-4 shadow-lg shadow-purple-500/5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-purple-400" />
              </div>
              <span className="text-xs text-gray-400 font-semibold">Tarefas</span>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-white">5</span>
              <span className="text-gray-400 text-sm font-bold mb-1">pendentes</span>
            </div>
            <p className="text-xs text-purple-400 mt-2">2 para hoje</p>
          </div>

          {/* Absences */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl border border-pink-500/30 p-4 shadow-lg shadow-pink-500/5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-pink-500/20 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-pink-400" />
              </div>
              <span className="text-xs text-gray-400 font-semibold">Faltas</span>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-white">3</span>
              <span className="text-gray-400 text-sm font-bold mb-1">/ 60 dias</span>
            </div>
            <p className="text-xs text-green-400 mt-2">Dentro do limite</p>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl border border-cyan-500/30 p-5 shadow-lg shadow-cyan-500/5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white font-bold text-lg mb-1">Evolução de Desempenho</h3>
              <p className="text-xs text-gray-400">Últimos 4 meses</p>
            </div>
            <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center">
              <Activity className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} domain={[0, 10]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #06b6d4',
                  borderRadius: '12px',
                  color: '#fff'
                }}
              />
              <Line
                type="monotone"
                dataKey="nota"
                stroke="#06b6d4"
                strokeWidth={3}
                dot={{ fill: '#06b6d4', r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Upcoming Exams */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl border border-blue-500/30 p-5 shadow-lg shadow-blue-500/5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold text-lg">Próximas Avaliações</h3>
            <Brain className="w-5 h-5 text-blue-400" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-black/40 rounded-xl border border-cyan-500/20">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex flex-col items-center justify-center">
                <span className="text-cyan-400 text-lg font-bold">26</span>
                <span className="text-cyan-400 text-[10px]">MAI</span>
              </div>
              <div className="flex-1">
                <h4 className="text-white font-semibold text-sm">Prova de Matemática</h4>
                <p className="text-xs text-gray-400">Funções e Equações</p>
              </div>
              <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded-lg text-xs font-bold">Amanhã</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-black/40 rounded-xl border border-blue-500/20">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex flex-col items-center justify-center">
                <span className="text-blue-400 text-lg font-bold">28</span>
                <span className="text-blue-400 text-[10px]">MAI</span>
              </div>
              <div className="flex-1">
                <h4 className="text-white font-semibold text-sm">Trabalho de Física</h4>
                <p className="text-xs text-gray-400">Óptica Geométrica</p>
              </div>
              <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-lg text-xs font-bold">3 dias</span>
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-gradient-to-br from-purple-900/30 to-gray-950 rounded-2xl border border-purple-500/30 p-5 shadow-lg shadow-purple-500/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <Brain className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="text-white font-bold">Análise IA</h3>
              <p className="text-xs text-purple-400">Assistente Inteligente</p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-300">
              ✨ Seu desempenho em <span className="text-cyan-400 font-semibold">Matemática</span> está excepcional! Continue assim.
            </p>
            <p className="text-sm text-gray-300">
              📚 Recomendamos revisar <span className="text-blue-400 font-semibold">Química Orgânica</span> antes da próxima prova.
            </p>
            <p className="text-sm text-gray-300">
              🎯 Você está no top <span className="text-purple-400 font-semibold">15%</span> da sua turma!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
