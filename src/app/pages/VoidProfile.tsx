import { User, Brain, Zap, Target, Eye, Award, TrendingUp, Shield, Settings } from "lucide-react";
import { useNavigate } from "react-router";
import { useVoid, getLevel, getXPInLevel, getXPToNextLevel } from "../store/VoidStore";

export function VoidProfile() {
  const { state } = useVoid();
  const navigate = useNavigate();
  const level = getLevel(state.xp);
  const xpInLevel = getXPInLevel(state.xp);
  const xpToNext = getXPToNextLevel();
  const xpProgress = (xpInLevel / xpToNext) * 100;

  const totalMissionsCompleted = state.missions.reduce((s, m) => s + m.completedDates.length, 0);
  const initials = state.userName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const focusVal = Math.min(100, 50 + Math.min(50, totalMissionsCompleted * 5));
  const disciplineVal = Math.min(100, 50 + Math.min(50, state.streak * 7));
  const clarityVal = Math.min(100, 50 + Math.min(50, state.journal.length * 3));
  const energyVal = Math.min(100, 40 + Math.min(60, state.xp / 20));
  const resilienceVal = Math.min(100, 50 + Math.min(50, state.streak * 6));
  const evolutionVal = Math.min(100, Math.min(100, (level / 10) * 100));

  const attributes = [
    { name: "Foco Mental", value: Math.round(focusVal), max: 100, icon: Eye, color: "cyan" },
    { name: "Disciplina", value: Math.round(disciplineVal), max: 100, icon: Target, color: "purple" },
    { name: "Clareza", value: Math.round(clarityVal), max: 100, icon: Brain, color: "blue" },
    { name: "Energia", value: Math.round(energyVal), max: 100, icon: Zap, color: "pink" },
    { name: "Resiliência", value: Math.round(resilienceVal), max: 100, icon: Shield, color: "violet" },
    { name: "Evolução", value: Math.round(evolutionVal), max: 100, icon: TrendingUp, color: "indigo" },
  ];

  const achievementIconMap: Record<string, React.ElementType> = {
    first_journal: Brain,
    first_mission: Target,
    streak_7: Award,
    journals_50: Brain,
    level_10: TrendingUp,
    xp_1000: Zap,
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, any> = {
      cyan: { text: "text-cyan-400", bg: "bg-cyan-500", glow: "shadow-cyan-500/50" },
      purple: { text: "text-purple-400", bg: "bg-purple-500", glow: "shadow-purple-500/50" },
      blue: { text: "text-blue-400", bg: "bg-blue-500", glow: "shadow-blue-500/50" },
      pink: { text: "text-pink-400", bg: "bg-pink-500", glow: "shadow-pink-500/50" },
      violet: { text: "text-violet-400", bg: "bg-violet-500", glow: "shadow-violet-500/50" },
      indigo: { text: "text-indigo-400", bg: "bg-indigo-500", glow: "shadow-indigo-500/50" },
      green: { text: "text-green-400", bg: "bg-green-500", glow: "shadow-green-500/50" },
      orange: { text: "text-orange-400", bg: "bg-orange-500", glow: "shadow-orange-500/50" },
    };
    return colors[color] ?? colors.purple;
  };

  // Status insights from real data
  const statusLines: { color: string; text: string }[] = [];
  if (state.streak >= 7) statusLines.push({ color: "blue", text: "Sequência excepcional de 7+ dias. Disciplina avançada confirmada." });
  else if (state.streak > 0) statusLines.push({ color: "blue", text: `Sequência ativa de ${state.streak} dia(s). Continue para desbloquear bônus.` });
  if (state.journal.length >= 10) statusLines.push({ color: "purple", text: "Introspecção profunda: 10+ registros no diário. Padrões emergindo." });
  else if (state.journal.length > 0) statusLines.push({ color: "purple", text: `${state.journal.length} registro(s) no diário. Padrão neural em desenvolvimento.` });
  if (totalMissionsCompleted >= 5) statusLines.push({ color: "cyan", text: "Produtividade consolidada. Missões concluídas: consistência comprovada." });
  else if (totalMissionsCompleted > 0) statusLines.push({ color: "cyan", text: `${totalMissionsCompleted} missão(ões) completa(s). Trajetória de evolução iniciada.` });
  statusLines.push({ color: "pink", text: `Nível ${level} atingido. ${xpToNext - xpInLevel} XP restantes para o próximo nível.` });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="backdrop-blur-xl bg-black/40 border-b border-purple-500/20 px-6 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <User className="w-6 h-6 text-violet-400" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                  Perfil Neural
                </h1>
                <p className="text-xs text-gray-400 tracking-wider">MATRIZ DE IDENTIDADE PSICOLÓGICA</p>
              </div>
            </div>
            <button
              onClick={() => navigate("/settings")}
              className="w-10 h-10 backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 flex items-center justify-center hover:border-purple-500/50 transition-all"
            >
              <Settings className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* Profile Card */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl border border-purple-500/40 p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />

          <div className="relative flex items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur-xl animate-pulse" />
              <div className="relative w-24 h-24 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center border-4 border-purple-400/50">
                <div className="text-3xl font-bold text-white">{initials}</div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-black flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white mb-2">{state.userName}</h2>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <div className="px-3 py-1 bg-purple-500/20 backdrop-blur-sm border border-purple-500/40 rounded-lg">
                  <span className="text-sm font-bold text-purple-300">Nível {level}</span>
                </div>
                <div className="px-3 py-1 bg-blue-500/20 backdrop-blur-sm border border-blue-500/40 rounded-lg">
                  <span className="text-sm font-bold text-blue-300">{state.xp.toLocaleString()} XP Total</span>
                </div>
                <div className="flex items-center gap-1 px-3 py-1 bg-green-500/20 backdrop-blur-sm border border-green-500/40 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-bold text-green-300">ON-LINE</span>
                </div>
              </div>

              {/* XP Progress */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-400">Experiência Neural</span>
                  <span className="text-purple-400 font-bold">{xpInLevel} / {xpToNext} XP</span>
                </div>
                <div className="h-3 bg-black/40 rounded-full overflow-hidden backdrop-blur-sm">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full shadow-lg shadow-purple-500/50 transition-all duration-1000"
                    style={{ width: `${xpProgress}%` }}
                  />
                </div>
              </div>

              <p className="text-gray-300 text-sm">
                {state.streak > 0
                  ? `${state.streak} dia(s) de sequência ativa. Consciência neural em expansão.`
                  : "Inicie sua jornada de evolução neural completando missões e registros."}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-4">
          <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-purple-500/20 p-4 text-center">
            <div className="text-xs text-gray-500 mb-1">Registros</div>
            <div className="text-2xl font-bold text-cyan-400">{state.journal.length}</div>
          </div>
          <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-purple-500/20 p-4 text-center">
            <div className="text-xs text-gray-500 mb-1">Missões</div>
            <div className="text-2xl font-bold text-purple-400">{totalMissionsCompleted}</div>
          </div>
          <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-purple-500/20 p-4 text-center">
            <div className="text-xs text-gray-500 mb-1">Sequência</div>
            <div className="text-2xl font-bold text-orange-400">{state.streak}d</div>
          </div>
        </div>

        {/* Neural Attributes */}
        <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-purple-500/20 p-6">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-400" />
            Atributos Neurais
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            {attributes.map((attr) => {
              const colors = getColorClasses(attr.color);
              const Icon = attr.icon;
              const percentage = (attr.value / attr.max) * 100;
              return (
                <div key={attr.name} className="backdrop-blur-sm bg-black/20 rounded-xl border border-white/10 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-${attr.color}-500/20 to-transparent border border-${attr.color}-500/30 flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${colors.text}`} />
                      </div>
                      <span className="text-gray-300 font-semibold">{attr.name}</span>
                    </div>
                    <span className={`text-2xl font-bold ${colors.text}`}>{attr.value}</span>
                  </div>
                  <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${colors.bg} rounded-full transition-all duration-1000 ${colors.glow} shadow-lg`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Achievements */}
        <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-purple-500/20 p-6">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Award className="w-6 h-6 text-purple-400" />
            Conquistas Neurais
          </h3>

          {state.achievements.length === 0 ? (
            <p className="text-gray-600 text-sm text-center py-6">Nenhuma conquista disponível ainda.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {state.achievements.map((ach) => {
                const colors = getColorClasses(ach.color);
                const Icon = achievementIconMap[ach.id] ?? Award;
                return (
                  <div
                    key={ach.id}
                    className={`backdrop-blur-sm rounded-xl border p-5 transition-all ${
                      ach.unlocked
                        ? `bg-${ach.color}-500/10 border-${ach.color}-500/30 hover:border-${ach.color}-500/50`
                        : "bg-black/20 border-white/10 opacity-50"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${ach.unlocked ? `from-${ach.color}-500/20` : "from-gray-500/20"} to-transparent border ${ach.unlocked ? `border-${ach.color}-500/30` : "border-gray-500/30"} flex items-center justify-center mb-3 mx-auto`}
                    >
                      <Icon className={`w-6 h-6 ${ach.unlocked ? colors.text : "text-gray-600"}`} />
                    </div>
                    <p className={`text-center text-sm font-bold mb-1 ${ach.unlocked ? "text-white" : "text-gray-600"}`}>
                      {ach.name}
                    </p>
                    <p className={`text-center text-xs ${ach.unlocked ? "text-gray-400" : "text-gray-700"}`}>
                      {ach.description}
                    </p>
                    {ach.unlocked && (
                      <div className="flex items-center justify-center gap-1 mt-2">
                        <div className={`w-1.5 h-1.5 ${colors.bg} rounded-full`} />
                        <span className="text-xs text-gray-400">Desbloqueado</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Status Report */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl border border-purple-500/30 p-6">
          <h3 className="text-lg font-bold text-purple-400 mb-4">Relatório de Status Neural</h3>
          <div className="space-y-3 text-sm text-gray-300">
            {statusLines.map((line, i) => {
              const dotColors: Record<string, string> = {
                blue: "text-blue-400",
                purple: "text-purple-400",
                cyan: "text-cyan-400",
                pink: "text-pink-400",
              };
              return (
                <div key={i} className="flex items-start gap-3">
                  <span className={dotColors[line.color] ?? "text-gray-400"}>▸</span>
                  <p>{line.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
