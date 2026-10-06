import { Calendar, CheckCircle, XCircle, AlertTriangle, TrendingUp } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export function AttendancePage() {
  const attendanceData = [
    { name: "Presente", value: 57, color: "#06b6d4" },
    { name: "Faltas Just.", value: 2, color: "#fbbf24" },
    { name: "Faltas", value: 1, color: "#ef4444" },
  ];

  const monthlyData = [
    { month: "Jan", presencas: 20, faltas: 0 },
    { month: "Fev", presencas: 18, faltas: 1 },
    { month: "Mar", presencas: 22, faltas: 0 },
    { month: "Abr", presencas: 19, faltas: 1 },
    { month: "Mai", presencas: 15, faltas: 1 },
  ];

  // Calendar data for May 2026
  const daysInMonth = 31;
  const startDay = 5; // Thursday (0 = Sunday)
  const presentDays = [1, 2, 4, 5, 6, 8, 9, 11, 12, 13, 15, 16, 18, 19, 20, 22, 23];
  const absentDays = [25];
  const justifiedAbsent = [27];

  const getDayStatus = (day: number) => {
    if (presentDays.includes(day)) return "present";
    if (absentDays.includes(day)) return "absent";
    if (justifiedAbsent.includes(day)) return "justified";
    if (day > 25) return "future";
    return "weekend";
  };

  const getDayClasses = (status: string) => {
    switch (status) {
      case "present":
        return "bg-cyan-500/20 text-cyan-400 border-cyan-500/40";
      case "absent":
        return "bg-red-500/20 text-red-400 border-red-500/40";
      case "justified":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/40";
      case "future":
        return "bg-gray-800/40 text-gray-600 border-gray-700/40";
      default:
        return "bg-gray-900/40 text-gray-700 border-gray-800/40";
    }
  };

  return (
    <div className="min-h-screen bg-black pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 via-black to-cyan-950 border-b border-cyan-500/20 sticky top-0 z-40 backdrop-blur-xl">
        <div className="max-w-lg mx-auto px-5 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">Frequência</h1>
              <p className="text-sm text-gray-400">Registro de presença</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-2xl flex items-center justify-center border border-cyan-500/30">
              <Calendar className="w-6 h-6 text-cyan-400" />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-black/40 rounded-xl p-3 border border-cyan-500/20">
              <p className="text-xs text-gray-400 mb-1">Frequência</p>
              <p className="text-2xl font-bold text-cyan-400">95%</p>
            </div>
            <div className="bg-black/40 rounded-xl p-3 border border-green-500/20">
              <p className="text-xs text-gray-400 mb-1">Presenças</p>
              <p className="text-2xl font-bold text-green-400">57</p>
            </div>
            <div className="bg-black/40 rounded-xl p-3 border border-red-500/20">
              <p className="text-xs text-gray-400 mb-1">Faltas</p>
              <p className="text-2xl font-bold text-red-400">3</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-5 py-6 space-y-6">
        {/* Pie Chart */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl border border-cyan-500/30 p-5 shadow-lg">
          <h3 className="text-white font-bold mb-4">Distribuição de Presença</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={attendanceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {attendanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="bg-black/40 rounded-lg p-2 border border-cyan-500/20">
              <div className="flex items-center gap-1 mb-1">
                <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                <span className="text-[10px] text-gray-400">Presente</span>
              </div>
              <p className="text-lg font-bold text-cyan-400">57</p>
            </div>
            <div className="bg-black/40 rounded-lg p-2 border border-yellow-500/20">
              <div className="flex items-center gap-1 mb-1">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-[10px] text-gray-400">Just.</span>
              </div>
              <p className="text-lg font-bold text-yellow-400">2</p>
            </div>
            <div className="bg-black/40 rounded-lg p-2 border border-red-500/20">
              <div className="flex items-center gap-1 mb-1">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-[10px] text-gray-400">Faltas</span>
              </div>
              <p className="text-lg font-bold text-red-400">1</p>
            </div>
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl border border-cyan-500/30 p-5 shadow-lg">
          <h3 className="text-white font-bold mb-4">Maio 2026</h3>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {["D", "S", "T", "Q", "Q", "S", "S"].map((day, idx) => (
              <div key={idx} className="text-center text-xs text-gray-400 font-semibold">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-2">
            {/* Empty cells for days before month starts */}
            {Array.from({ length: startDay }).map((_, idx) => (
              <div key={`empty-${idx}`} className="aspect-square"></div>
            ))}

            {/* Days of the month */}
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const day = idx + 1;
              const status = getDayStatus(day);

              return (
                <div
                  key={day}
                  className={`aspect-square rounded-lg border flex items-center justify-center text-sm font-semibold transition-all ${getDayClasses(status)}`}
                >
                  {day}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-gray-800">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-cyan-500/20 border border-cyan-500/40 rounded"></div>
              <span className="text-xs text-gray-400">Presente</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500/20 border border-red-500/40 rounded"></div>
              <span className="text-xs text-gray-400">Falta</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500/20 border border-yellow-500/40 rounded"></div>
              <span className="text-xs text-gray-400">Justificada</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-800/40 border border-gray-700/40 rounded"></div>
              <span className="text-xs text-gray-400">Futuro</span>
            </div>
          </div>
        </div>

        {/* Monthly Comparison */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl border border-cyan-500/30 p-5 shadow-lg">
          <h3 className="text-white font-bold mb-4">Comparativo Mensal</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #06b6d4',
                  borderRadius: '12px',
                  color: '#fff'
                }}
              />
              <Bar dataKey="presencas" fill="#06b6d4" radius={[8, 8, 0, 0]} />
              <Bar dataKey="faltas" fill="#ef4444" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Absences */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl border border-red-500/30 p-5 shadow-lg">
          <h3 className="text-white font-bold mb-4">Registro de Faltas</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-black/40 rounded-xl border border-yellow-500/20">
              <div className="w-10 h-10 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold text-sm">27 de Maio - Justificada</p>
                <p className="text-xs text-gray-400">Atestado médico anexado</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-black/40 rounded-xl border border-red-500/20">
              <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-400" />
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold text-sm">25 de Maio - Não justificada</p>
                <p className="text-xs text-gray-400">Aguardando justificativa</p>
              </div>
            </div>
          </div>
        </div>

        {/* Status Card */}
        <div className="bg-gradient-to-br from-green-900/30 to-gray-950 rounded-2xl border border-green-500/30 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h3 className="text-white font-bold">Status Excelente</h3>
              <p className="text-xs text-green-400">Frequência acima da média</p>
            </div>
          </div>
          <div className="space-y-2 text-sm text-gray-300">
            <p>✅ Sua frequência está em <span className="text-cyan-400 font-semibold">95%</span></p>
            <p>📊 Você pode faltar mais <span className="text-green-400 font-semibold">12 dias</span> sem problemas</p>
            <p>🎯 Continue mantendo essa presença!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
