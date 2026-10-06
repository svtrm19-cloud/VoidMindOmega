import { Brain, Zap, Target, TrendingUp, Activity, Eye, Cpu, Waves, Flame, BookOpen, ChevronRight } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router";
import { useVoid, getLevel, getXPInLevel, getXPToNextLevel, todayStr, getLast7Days, formatDateLabel } from "../store/VoidStore";

export function VoidDashboard() {
  const { state } = useVoid();
  const navigate = useNavigate();
  const today = todayStr();
  const level = getLevel(state.xp);
  const xpInLevel = getXPInLevel(state.xp);
  const xpToNext = getXPToNextLevel();

  // Today's stats
  const todayXP = state.xpEvents.filter((e) => e.date === today).reduce((s, e) => s + e.amount, 0);
  const todayJournal = state.journal.filter((e) => new Date(e.timestamp).toISOString().split("T")[0] === today).length;
  const todayMissionsTotal = state.missions.filter((m) => m.frequency === "daily").length;
  const todayMissionsDone = state.missions.filter((m) => m.frequency === "daily" && m.completedDates.includes(today)).length;

  // XP chart (last 7 days)
  const last7 = getLast7Days();
  const xpChartData = last7.map((date) => ({
    time: formatDateLabel(date),
    value: state.xpEvents.filter((e) => e.date === date).reduce((s, e) => s + e.amount, 0),
  }));

  // Mental stats (derived from usage)
  const totalJournals = state.journal.length;
  const totalMissionsCompleted = state.missions.reduce((s, m) => s + m.completedDates.length, 0);
  const focusVal = Math.min(100, 50 + Math.min(50, totalMissionsCompleted * 5));
  const energyVal = Math.min(100, 40 + Math.min(60, state.xp / 20));
  const stabilityVal = Math.min(100, 50 + Math.min(50, state.streak * 7));
  const clarityVal = Math.min(100, 50 + Math.min(50, totalJournals * 3));
  const productivityVal = Math.min(100, Math.round((todayMissionsDone / Math.max(1, todayMissionsTotal)) * 100));
  const consistencyVal = Math.min(100, 50 + Math.min(50, state.streak * 5));

  const stats = [
    { label: "Energia Mental", value: Math.round(energyVal), color: "blue", icon: Zap },
    { label: "Produtividade", value: Math.round(productivityVal || 50), color: "purple", icon: Target },
    { label: "Nível de Foco", value: Math.round(focusVal), color: "cyan", icon: Eye },
    { label: "Consistência", value: Math.round(consistencyVal), color: "pink", icon: Activity },
    { label: "Estabilidade Emocional", value: Math.round(stabilityVal), color: "violet", icon: Waves },
    { label: "Evolução Cognitiva", value: Math.round(clarityVal), color: "indigo", icon: TrendingUp },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, any> = {
      blue: { text: "text-blue-400", bg: "bg-blue-500", glow: "shadow-blue-500/50", border: "border-blue-500/30" },
      purple: { text: "text-purple-400", bg: "bg-purple-500", glow: "shadow-purple-500/50", border: "border-purple-500/30" },
      cyan: { text: "text-cyan-400", bg: "bg-cyan-500", glow: "shadow-cyan-500/50", border: "border-cyan-500/30" },
      pink: { text: "text-pink-400", bg: "bg-pink-500", glow: "shadow-pink-500/50", border: "border-pink-500/30" },
      violet: { text: "text-violet-400", bg: "bg-violet-500", glow: "shadow-violet-500/50", border: "border-violet-500/30" },
      indigo: { text: "text-indigo-400", bg: "bg-indigo-500", glow: "shadow-indigo-500/50", border: "border-indigo-500/30" },
    };
    return colors[color];
  };

  // Insights based on real data
  const insights: { color: string; text: string }[] = [];
  if (totalJournals > 0) insights.push({ color: "blue", text: `Você tem ${totalJournals} registro${totalJournals > 1 ? "s" : ""} no diário. Continue!` });
  if (totalMissionsCompleted > 0) insights.push({ color: "purple", text: `${totalMissionsCompleted} missão${totalMissionsCompleted > 1 ? "ões" : ""} concluída${totalMissionsCompleted > 1 ? "s" : ""} no total.` });
  if (state.streak > 0) insights.push({ color: "cyan", text: `Sequência ativa: ${state.streak} dia${state.streak > 1 ? "s" : ""} consecutivo${state.streak > 1 ? "s" : ""}.` });
  if (insights.length === 0) {
    insights.push({ color: "blue", text: "Comece registrando seus pensamentos no Diário." });
    insights.push({ color: "purple", text: "Crie suas primeiras missões em MISSÕES." });
    insights.push({ color: "cyan", text: "Complete missões diárias para construir uma sequência." });
  }

  const now = new Date();
  const timeStr = now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  const dateStr = now.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="backdrop-blur-xl bg-black/40 border-b border-purple-500/20">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="relative">
                  <Brain className="w-8 h-8 text-blue-400" />
                  <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-xl animate-pulse" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  VoidMind Omega
                </h1>
              </div>
              <p className="text-sm text-gray-400 tracking-wider">PAINEL NEURAL • MONITORAMENTO EM TEMPO REAL</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-400">{timeStr}</div>
              <div className="text-xs text-gray-500">{dateStr}</div>
            </div>
          </div>

          {/* User Status */}
          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
                  <div className="absolute inset-1 bg-black rounded-full flex items-center justify-center">
                    <Cpu className="w-8 h-8 text-purple-400" />
                  </div>
                </div>
                <div>
                  <div className="text-xl font-bold text-white mb-1">{state.userName}</div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-sm text-gray-400">Link Neural Ativo</span>
                    </div>
                    {state.streak > 0 && (
                      <div className="flex items-center gap-1">
                        <Flame className="w-4 h-4 text-orange-400" />
                        <span className="text-sm text-orange-400 font-bold">{state.streak}d</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400 mb-1">Nível Mental</div>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {level}
                </div>
                <div className="mt-2 w-24">
                  <div className="h-1.5 bg-black/40 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all"
                      style={{ width: `${(xpInLevel / xpToNext) * 100}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-gray-600 mt-1">{xpInLevel}/{xpToNext} XP</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* MISSÕES DE HOJE */}
        <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-purple-500/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-bold text-white">MISSÕES DE HOJE</h3>
            </div>
            <button
              onClick={() => navigate("/missions")}
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-purple-400 transition-colors"
            >
              Ver todas <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          {state.missions.filter((m) => m.frequency === "daily").length === 0 ? (
            <div className="text-center py-6">
              <p className="text-gray-600 text-sm mb-3">Nenhuma missão diária criada ainda</p>
              <button
                onClick={() => navigate("/missions")}
                className="px-4 py-2 bg-purple-600/20 border border-purple-500/30 text-purple-400 rounded-xl text-sm hover:bg-purple-600/30 transition-all"
              >
                Criar Missões
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-400">{todayMissionsDone}/{todayMissionsTotal} concluídas</span>
                <div className="flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-yellow-400" />
                  <span className="text-sm font-bold text-yellow-400">+{todayXP} XP hoje</span>
                </div>
              </div>
              <div className="h-2 bg-black/40 rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-700"
                  style={{ width: `${(todayMissionsDone / Math.max(1, todayMissionsTotal)) * 100}%` }}
                />
              </div>
              <div className="space-y-2">
                {state.missions
                  .filter((m) => m.frequency === "daily")
                  .slice(0, 4)
                  .map((m) => {
                    const done = m.completedDates.includes(today);
                    return (
                      <div key={m.id} className="flex items-center gap-3 text-sm">
                        <div className={`w-2 h-2 rounded-full ${done ? "bg-purple-400" : "bg-gray-700"}`} />
                        <span className={done ? "line-through text-gray-600" : "text-gray-300"}>{m.name}</span>
                        {done && <span className="ml-auto text-xs text-yellow-400">+{m.xpReward} XP</span>}
                      </div>
                    );
                  })}
              </div>
            </>
          )}
        </div>

        {/* Mental Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((stat) => {
            const colors = getColorClasses(stat.color);
            const Icon = stat.icon;
            const percentage = stat.value;
            return (
              <div
                key={stat.label}
                className="group relative backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-5 hover:border-purple-500/40 transition-all duration-500"
              >
                <div className={`absolute inset-0 ${colors.bg} opacity-0 group-hover:opacity-5 rounded-2xl blur-xl transition-opacity duration-500`} />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${stat.color}-500/20 to-transparent border border-${stat.color}-500/30 flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <div className={`text-3xl font-bold ${colors.text}`}>{stat.value}</div>
                  </div>
                  <div className="mb-3">
                    <div className="text-sm text-gray-400 mb-2 uppercase tracking-wider">{stat.label}</div>
                    <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${colors.bg} rounded-full transition-all duration-1000 ${colors.glow} shadow-lg`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 ${colors.bg} rounded-full animate-pulse`} />
                    <span className="text-xs text-gray-500">
                      {percentage >= 80 ? "Ótimo" : percentage >= 60 ? "Estável" : "Baixo"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* EVOLUÇÃO RECENTE - XP Chart */}
        <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-purple-500/20 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">EVOLUÇÃO RECENTE</h3>
              <p className="text-sm text-gray-400">XP acumulado nos últimos 7 dias</p>
            </div>
            <button onClick={() => navigate("/history")} className="text-xs text-gray-500 hover:text-purple-400 transition-colors flex items-center gap-1">
              Histórico <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          {state.xpEvents.length === 0 ? (
            <div className="h-[120px] flex items-center justify-center">
              <p className="text-gray-600 text-sm">Nenhuma atividade ainda. Complete missões e registre no diário!</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={120}>
              <LineChart data={xpChartData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  dot={false}
                  filter="drop-shadow(0 0 8px rgba(139, 92, 246, 0.6))"
                />
              </LineChart>
            </ResponsiveContainer>
          )}

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/5">
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">Total XP</div>
              <div className="text-lg font-bold text-purple-400">{state.xp.toLocaleString()}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">Registros</div>
              <div className="text-lg font-bold text-cyan-400">{totalJournals}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">Missões</div>
              <div className="text-lg font-bold text-pink-400">{totalMissionsCompleted}</div>
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl border border-purple-500/30 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-ping absolute" />
              <div className="w-3 h-3 bg-purple-500 rounded-full" />
            </div>
            <h3 className="text-lg font-bold text-purple-400">VOID IA • Análise ao Vivo</h3>
          </div>
          <div className="space-y-3">
            {insights.map((ins, i) => {
              const dotColors: Record<string, string> = { blue: "bg-blue-500", purple: "bg-purple-500", cyan: "bg-cyan-500", pink: "bg-pink-500" };
              return (
                <div key={i} className="flex items-start gap-3 text-sm text-gray-300">
                  <div className={`w-1 h-1 ${dotColors[ins.color] ?? "bg-gray-500"} rounded-full mt-2 flex-shrink-0`} />
                  <p>{ins.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
