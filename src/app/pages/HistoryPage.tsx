import { useState } from "react";
import { Clock, Zap, BookOpen, Target, TrendingUp } from "lucide-react";
import {
  BarChart, Bar, AreaChart, Area, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { useVoid, getLast7Days, getLast30Days, formatDateLabel, todayStr } from "../store/VoidStore";

type Period = "today" | "7d" | "30d";

export function HistoryPage() {
  const { state } = useVoid();
  const [period, setPeriod] = useState<Period>("7d");

  const days = period === "today" ? [todayStr()] : period === "7d" ? getLast7Days() : getLast30Days();

  // XP per day
  const xpByDay = days.map((date) => ({
    label: period === "today" ? "Hoje" : formatDateLabel(date),
    xp: state.xpEvents.filter((e) => e.date === date).reduce((sum, e) => sum + e.amount, 0),
  }));

  // Journal entries per day
  const journalByDay = days.map((date) => ({
    label: period === "today" ? "Hoje" : formatDateLabel(date),
    entries: state.journal.filter((e) => {
      const d = new Date(e.timestamp).toISOString().split("T")[0];
      return d === date;
    }).length,
  }));

  // Missions completed per day
  const missionsByDay = days.map((date) => ({
    label: period === "today" ? "Hoje" : formatDateLabel(date),
    completed: state.missions.reduce((sum, m) => sum + (m.completedDates.includes(date) ? 1 : 0), 0),
  }));

  // XP accumulated (running total)
  const xpAccumulated: { label: string; xp: number }[] = [];
  let running = 0;
  for (const d of days) {
    const dayXP = state.xpEvents.filter((e) => e.date === d).reduce((sum, e) => sum + e.amount, 0);
    running += dayXP;
    xpAccumulated.push({ label: period === "today" ? "Hoje" : formatDateLabel(d), xp: running });
  }

  const totalXP = xpByDay.reduce((s, d) => s + d.xp, 0);
  const totalJournal = journalByDay.reduce((s, d) => s + d.entries, 0);
  const totalMissions = missionsByDay.reduce((s, d) => s + d.completed, 0);

  const tooltipStyle = {
    backgroundColor: "#1f2937",
    border: "1px solid #8b5cf6",
    borderRadius: "12px",
    color: "#fff",
  };

  const PERIODS: { key: Period; label: string }[] = [
    { key: "today", label: "Hoje" },
    { key: "7d", label: "7 Dias" },
    { key: "30d", label: "30 Dias" },
  ];

  const isEmpty = totalXP === 0 && totalJournal === 0 && totalMissions === 0;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="backdrop-blur-xl bg-black/40 border-b border-purple-500/20 px-6 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-cyan-400" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  HISTÓRICO
                </h1>
                <p className="text-xs text-gray-400 tracking-wider">EVOLUÇÃO AO LONGO DO TEMPO</p>
              </div>
            </div>

            {/* Period selector */}
            <div className="flex gap-1 p-1 bg-white/5 border border-white/10 rounded-xl">
              {PERIODS.map((p) => (
                <button
                  key={p.key}
                  onClick={() => setPeriod(p.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    period === p.key
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-6 space-y-6">
        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-yellow-500/20 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-xs text-gray-400">XP GANHO</span>
            </div>
            <div className="text-2xl font-bold text-yellow-400">+{totalXP}</div>
          </div>
          <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-cyan-500/20 p-4">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span className="text-xs text-gray-400">REGISTROS</span>
            </div>
            <div className="text-2xl font-bold text-cyan-400">{totalJournal}</div>
          </div>
          <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-purple-500/20 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-purple-400" />
              <span className="text-xs text-gray-400">MISSÕES</span>
            </div>
            <div className="text-2xl font-bold text-purple-400">{totalMissions}</div>
          </div>
        </div>

        {isEmpty ? (
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-16 text-center">
            <TrendingUp className="w-16 h-16 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-400 text-lg mb-2">Seu histórico ainda está vazio</p>
            <p className="text-gray-600 text-sm">
              {period === "today"
                ? "Registre seu primeiro pensamento ou complete uma missão hoje"
                : "Use o app por alguns dias para ver sua evolução aqui"}
            </p>
          </div>
        ) : (
          <>
            {/* XP per day */}
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-yellow-500/20 p-6">
              <div className="flex items-center gap-2 mb-5">
                <Zap className="w-5 h-5 text-yellow-400" />
                <h3 className="text-lg font-bold text-white">XP por Dia</h3>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={xpByDay}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="label" stroke="#9ca3af" style={{ fontSize: "10px" }} />
                  <YAxis stroke="#9ca3af" style={{ fontSize: "10px" }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="xp" fill="#eab308" radius={[6, 6, 0, 0]} name="XP"
                    filter="drop-shadow(0 0 6px rgba(234, 179, 8, 0.5))" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* XP accumulated */}
            {period !== "today" && (
              <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-purple-500/20 p-6">
                <div className="flex items-center gap-2 mb-5">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                  <h3 className="text-lg font-bold text-white">XP Acumulado</h3>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={xpAccumulated}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="label" stroke="#9ca3af" style={{ fontSize: "10px" }} />
                    <YAxis stroke="#9ca3af" style={{ fontSize: "10px" }} />
                    <Tooltip contentStyle={{ ...tooltipStyle, border: "1px solid #8b5cf6" }} />
                    <Area type="monotone" dataKey="xp" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2}
                      name="XP Total" filter="drop-shadow(0 0 8px rgba(139, 92, 246, 0.5))" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Journal + Missions */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-cyan-500/20 p-6">
                <div className="flex items-center gap-2 mb-5">
                  <BookOpen className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-lg font-bold text-white">Registros no Diário</h3>
                </div>
                <ResponsiveContainer width="100%" height={160}>
                  <LineChart data={journalByDay}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="label" stroke="#9ca3af" style={{ fontSize: "10px" }} />
                    <YAxis stroke="#9ca3af" style={{ fontSize: "10px" }} allowDecimals={false} />
                    <Tooltip contentStyle={{ ...tooltipStyle, border: "1px solid #06b6d4" }} />
                    <Line type="monotone" dataKey="entries" stroke="#06b6d4" strokeWidth={2}
                      dot={{ fill: "#06b6d4", r: 4 }} name="Registros"
                      filter="drop-shadow(0 0 6px rgba(6, 182, 212, 0.5))" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-purple-500/20 p-6">
                <div className="flex items-center gap-2 mb-5">
                  <Target className="w-5 h-5 text-purple-400" />
                  <h3 className="text-lg font-bold text-white">Missões Concluídas</h3>
                </div>
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={missionsByDay}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="label" stroke="#9ca3af" style={{ fontSize: "10px" }} />
                    <YAxis stroke="#9ca3af" style={{ fontSize: "10px" }} allowDecimals={false} />
                    <Tooltip contentStyle={{ ...tooltipStyle, border: "1px solid #8b5cf6" }} />
                    <Bar dataKey="completed" fill="#8b5cf6" radius={[6, 6, 0, 0]} name="Missões"
                      filter="drop-shadow(0 0 6px rgba(139, 92, 246, 0.5))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* XP Events log */}
            {state.xpEvents.length > 0 && (
              <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6">
                <h3 className="text-lg font-bold text-white mb-4">Eventos de XP Recentes</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {state.xpEvents.slice(0, 20).map((ev) => (
                    <div key={ev.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                      <div>
                        <span className="text-sm text-gray-300">{ev.reason}</span>
                        <span className="text-xs text-gray-600 ml-2">{formatDateLabel(ev.date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Zap className="w-3 h-3 text-yellow-400" />
                        <span className="text-sm font-bold text-yellow-400">+{ev.amount}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
