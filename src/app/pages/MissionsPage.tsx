import { useState } from "react";
import { Target, Plus, Trash2, CheckCircle2, Circle, Flame, Zap, ChevronDown, X } from "lucide-react";
import { useVoid, todayStr, getLevel, getXPInLevel, getXPToNextLevel } from "../store/VoidStore";

const CATEGORIES = ["Educação", "Saúde", "Mental", "Social", "Desenvolvimento", "Outro"];
const CATEGORY_COLORS: Record<string, string> = {
  Educação: "text-blue-400 bg-blue-500/10 border-blue-500/30",
  Saúde: "text-green-400 bg-green-500/10 border-green-500/30",
  Mental: "text-purple-400 bg-purple-500/10 border-purple-500/30",
  Social: "text-pink-400 bg-pink-500/10 border-pink-500/30",
  Desenvolvimento: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
  Outro: "text-gray-400 bg-gray-500/10 border-gray-500/30",
};

const FREQ_LABELS: Record<string, string> = {
  daily: "Diária",
  weekly: "Semanal",
  once: "Uma vez",
};

const SUGGESTION_MISSIONS = [
  { name: "Estudar", category: "Educação", frequency: "daily" as const, xpReward: 50 },
  { name: "Ler", category: "Desenvolvimento", frequency: "daily" as const, xpReward: 30 },
  { name: "Treinar", category: "Saúde", frequency: "daily" as const, xpReward: 50 },
  { name: "Registrar no Diário", category: "Mental", frequency: "daily" as const, xpReward: 25 },
  { name: "Meditar", category: "Mental", frequency: "daily" as const, xpReward: 30 },
  { name: "Organizar tarefas", category: "Desenvolvimento", frequency: "daily" as const, xpReward: 20 },
];

export function MissionsPage() {
  const { state, dispatch } = useVoid();
  const today = todayStr();

  const [showForm, setShowForm] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "Educação",
    frequency: "daily" as "daily" | "weekly" | "once",
    xpReward: 50,
  });

  const dailyMissions = state.missions.filter((m) => m.frequency === "daily");
  const weeklyMissions = state.missions.filter((m) => m.frequency === "weekly");
  const onceMissions = state.missions.filter((m) => m.frequency === "once");

  const todayCompleted = dailyMissions.filter((m) => m.completedDates.includes(today)).length;
  const todayTotal = dailyMissions.length;
  const todayProgress = todayTotal > 0 ? (todayCompleted / todayTotal) * 100 : 0;

  const todayXP = state.xpEvents
    .filter((e) => e.date === today)
    .reduce((sum, e) => sum + e.amount, 0);

  const level = getLevel(state.xp);
  const xpInLevel = getXPInLevel(state.xp);
  const xpToNext = getXPToNextLevel();

  const handleToggle = (id: string, completed: boolean) => {
    if (completed) {
      dispatch({ type: "UNCOMPLETE_MISSION", payload: { id, date: today } });
    } else {
      dispatch({ type: "COMPLETE_MISSION", payload: { id, date: today } });
    }
  };

  const handleCreate = () => {
    if (!form.name.trim()) return;
    dispatch({
      type: "ADD_MISSION",
      payload: {
        id: Date.now().toString(),
        name: form.name.trim(),
        category: form.category,
        frequency: form.frequency,
        completedDates: [],
        xpReward: form.xpReward,
        createdAt: Date.now(),
      },
    });
    setForm({ name: "", category: "Educação", frequency: "daily", xpReward: 50 });
    setShowForm(false);
  };

  const handleSuggestion = (s: typeof SUGGESTION_MISSIONS[0]) => {
    dispatch({
      type: "ADD_MISSION",
      payload: {
        id: Date.now().toString() + Math.random(),
        ...s,
        completedDates: [],
        createdAt: Date.now(),
      },
    });
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="backdrop-blur-xl bg-black/40 border-b border-purple-500/20 px-6 py-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Target className="w-6 h-6 text-purple-400" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  MISSÕES
                </h1>
                <p className="text-xs text-gray-400 tracking-wider">SISTEMA DE HÁBITOS E TAREFAS</p>
              </div>
            </div>
            <button
              onClick={() => { setShowForm(true); setShowSuggestions(false); }}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold text-sm hover:from-purple-500 hover:to-blue-500 transition-all shadow-lg shadow-purple-500/20"
            >
              <Plus className="w-4 h-4" /> Nova
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-6 space-y-5">
        {/* Daily Summary */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl border border-purple-500/30 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Flame className={`w-5 h-5 ${state.streak > 0 ? "text-orange-400" : "text-gray-600"}`} />
                <span className="text-white font-bold">{state.streak}</span>
                <span className="text-gray-400 text-sm">dias seguidos</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400 font-bold">+{todayXP} XP hoje</span>
            </div>
          </div>

          <div className="mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Missões de Hoje</span>
              <span className="text-sm font-bold text-white">{todayCompleted}/{todayTotal}</span>
            </div>
            <div className="h-2 bg-black/40 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-700 shadow-lg shadow-purple-500/30"
                style={{ width: `${todayProgress}%` }}
              />
            </div>
          </div>

          {/* Level mini */}
          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-white/10">
            <div className="px-3 py-1 bg-purple-500/20 border border-purple-500/40 rounded-lg">
              <span className="text-sm font-bold text-purple-300">Nível {level}</span>
            </div>
            <div className="flex-1">
              <div className="h-1.5 bg-black/40 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all"
                  style={{ width: `${(xpInLevel / xpToNext) * 100}%` }}
                />
              </div>
            </div>
            <span className="text-xs text-gray-500">{xpInLevel}/{xpToNext} XP</span>
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-purple-500/30 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Nova Missão</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Nome da missão..."
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all"
                onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Categoria</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500/50 transition-all"
                  >
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Frequência</label>
                  <select
                    value={form.frequency}
                    onChange={(e) => setForm({ ...form, frequency: e.target.value as "daily" | "weekly" | "once" })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500/50 transition-all"
                  >
                    <option value="daily">Diária</option>
                    <option value="weekly">Semanal</option>
                    <option value="once">Uma vez</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-1 block">Recompensa de XP: {form.xpReward} XP</label>
                <input
                  type="range"
                  min={10}
                  max={200}
                  step={10}
                  value={form.xpReward}
                  onChange={(e) => setForm({ ...form, xpReward: Number(e.target.value) })}
                  className="w-full accent-purple-500"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => { setShowForm(false); setShowSuggestions(true); }}
                  className="flex-1 py-2.5 bg-white/5 border border-white/10 text-gray-400 rounded-xl text-sm hover:bg-white/10 transition-all"
                >
                  Ver Sugestões
                </button>
                <button
                  onClick={handleCreate}
                  disabled={!form.name.trim()}
                  className="flex-1 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold text-sm hover:from-purple-500 hover:to-blue-500 transition-all disabled:opacity-40"
                >
                  Criar Missão
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Suggestions */}
        {showSuggestions && (
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-cyan-500/20 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Sugestões</h3>
              <button onClick={() => setShowSuggestions(false)} className="text-gray-500 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {SUGGESTION_MISSIONS.map((s) => {
                const alreadyExists = state.missions.some((m) => m.name === s.name);
                return (
                  <button
                    key={s.name}
                    onClick={() => { if (!alreadyExists) { handleSuggestion(s); } }}
                    disabled={alreadyExists}
                    className={`text-left p-3 rounded-xl border transition-all ${
                      alreadyExists
                        ? "border-white/5 bg-white/2 opacity-40 cursor-not-allowed"
                        : "border-white/10 bg-white/5 hover:border-purple-500/40 hover:bg-purple-500/10"
                    }`}
                  >
                    <div className="text-white text-sm font-semibold">{s.name}</div>
                    <div className="flex items-center gap-1 mt-1">
                      <Zap className="w-3 h-3 text-yellow-400" />
                      <span className="text-xs text-gray-400">+{s.xpReward} XP</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty state */}
        {state.missions.length === 0 && !showForm && !showSuggestions && (
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-12 text-center">
            <Target className="w-16 h-16 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-400 text-lg mb-2">Nenhuma missão ainda</p>
            <p className="text-gray-600 text-sm mb-6">Complete sua primeira missão para começar sua evolução</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowForm(true)}
                className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold text-sm hover:from-purple-500 hover:to-blue-500 transition-all"
              >
                Criar Missão
              </button>
              <button
                onClick={() => setShowSuggestions(true)}
                className="px-5 py-2.5 bg-white/5 border border-white/10 text-gray-400 rounded-xl text-sm hover:bg-white/10 transition-all"
              >
                Ver Sugestões
              </button>
            </div>
          </div>
        )}

        {/* Daily Missions */}
        {dailyMissions.length > 0 && (
          <MissionGroup
            title="Missões Diárias"
            missions={dailyMissions}
            today={today}
            onToggle={handleToggle}
            onDelete={(id) => dispatch({ type: "DELETE_MISSION", payload: id })}
          />
        )}

        {/* Weekly Missions */}
        {weeklyMissions.length > 0 && (
          <MissionGroup
            title="Missões Semanais"
            missions={weeklyMissions}
            today={today}
            onToggle={handleToggle}
            onDelete={(id) => dispatch({ type: "DELETE_MISSION", payload: id })}
          />
        )}

        {/* Once Missions */}
        {onceMissions.length > 0 && (
          <MissionGroup
            title="Missões Únicas"
            missions={onceMissions}
            today={today}
            onToggle={handleToggle}
            onDelete={(id) => dispatch({ type: "DELETE_MISSION", payload: id })}
          />
        )}
      </div>
    </div>
  );
}

function MissionGroup({
  title,
  missions,
  today,
  onToggle,
  onDelete,
}: {
  title: string;
  missions: ReturnType<typeof useVoid>["state"]["missions"];
  today: string;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/5 transition-colors"
      >
        <span className="text-sm font-bold text-gray-300 tracking-wider">{title.toUpperCase()}</span>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500">
            {missions.filter((m) => m.completedDates.includes(today)).length}/{missions.length}
          </span>
          <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${collapsed ? "-rotate-90" : ""}`} />
        </div>
      </button>

      {!collapsed && (
        <div className="divide-y divide-white/5">
          {missions.map((mission) => {
            const completed = mission.completedDates.includes(today);
            const catColor = CATEGORY_COLORS[mission.category] ?? CATEGORY_COLORS["Outro"];
            return (
              <div
                key={mission.id}
                className={`flex items-center gap-4 px-5 py-4 transition-all group ${
                  completed ? "opacity-60" : ""
                }`}
              >
                <button
                  onClick={() => onToggle(mission.id, completed)}
                  className="flex-shrink-0 transition-transform hover:scale-110"
                >
                  {completed ? (
                    <CheckCircle2 className="w-6 h-6 text-purple-400" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-600 hover:text-purple-400 transition-colors" />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <div className={`font-semibold text-sm ${completed ? "line-through text-gray-500" : "text-white"}`}>
                    {mission.name}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${catColor}`}>
                      {mission.category}
                    </span>
                    <span className="text-[10px] text-gray-600">{FREQ_LABELS[mission.frequency]}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-yellow-400" />
                    <span className="text-xs text-yellow-400 font-bold">+{mission.xpReward}</span>
                  </div>
                  <button
                    onClick={() => onDelete(mission.id)}
                    className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
