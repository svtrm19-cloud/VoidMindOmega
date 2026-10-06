import { useEffect, useState, useMemo } from "react";
import { Sparkles, Brain, Eye, Waves, Zap, TrendingUp, BookOpen, Target, Flame } from "lucide-react";
import { useVoid, getLevel, todayStr, getLast7Days } from "../store/VoidStore";

function buildInsights(state: ReturnType<typeof useVoid>["state"]): string[] {
  const today = todayStr();
  const last7 = getLast7Days();
  const level = getLevel(state.xp);
  const totalJournals = state.journal.length;
  const totalMissionsCompleted = state.missions.reduce((s, m) => s + m.completedDates.length, 0);
  const todayJournals = state.journal.filter((e) => new Date(e.timestamp).toISOString().split("T")[0] === today).length;
  const todayXP = state.xpEvents.filter((e) => e.date === today).reduce((s, e) => s + e.amount, 0);
  const weekMissionsCompleted = state.missions.reduce(
    (s, m) => s + m.completedDates.filter((d) => last7.includes(d)).length,
    0
  );
  const dailyMissions = state.missions.filter((m) => m.frequency === "daily");
  const todayDailyDone = dailyMissions.filter((m) => m.completedDates.includes(today)).length;
  const emotionCounts = state.journal.reduce((acc, e) => {
    acc[e.emotion] = (acc[e.emotion] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const topEmotion = Object.entries(emotionCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
  const recentEmotions = state.journal.slice(0, 5).map((e) => e.emotion);
  const negativeMoods = ["Ansiedade", "Melancolia", "Raiva"];
  const recentNegative = recentEmotions.filter((e) => negativeMoods.includes(e)).length;

  const insights: string[] = [];

  // No data at all
  if (totalJournals === 0 && totalMissionsCompleted === 0 && state.xp === 0) {
    return [
      "Link neural estabelecido. Aguardando primeiros dados do usuário.",
      "Registre seu primeiro pensamento no Diário para iniciar análise emocional.",
      "Crie e complete missões para ativar o sistema de rastreamento de progresso.",
      "Todos os sistemas prontos. O VoidMind está pronto para mapear sua evolução.",
    ];
  }

  // Today activity
  if (todayXP > 0) {
    insights.push(`Atividade detectada hoje: +${todayXP} XP conquistados. Padrão de engajamento positivo.`);
  } else {
    insights.push("Sem atividade registrada hoje. Cada ação conta para manter sua sequência.");
  }

  // Journal insights
  if (totalJournals === 0) {
    insights.push("Registro de diário ausente. A introspecção é a base da evolução cognitiva.");
  } else if (totalJournals >= 50) {
    insights.push(`${totalJournals} registros no diário. Volume excepcional de introspecção documentada.`);
  } else if (totalJournals >= 10) {
    insights.push(`${totalJournals} registros no diário. Padrões emocionais começando a emergir na análise.`);
  } else {
    insights.push(`${totalJournals} registro(s) no diário. Continue documentando para revelar padrões profundos.`);
  }

  if (todayJournals > 0) {
    insights.push(`Reflexão ativa hoje: ${todayJournals} registro(s). Introspecção em tempo real detectada.`);
  }

  // Emotion analysis
  if (topEmotion) {
    const emotionInsights: Record<string, string> = {
      Ansiedade: "Padrão emocional dominante: Ansiedade. Técnicas de regulação e missões focadas podem ajudar.",
      Melancolia: "Melancolia frequente detectada. Pequenas missões diárias constroem resiliência gradual.",
      Alegria: "Alegria como estado predominante. Excelente base emocional para crescimento contínuo.",
      Serenidade: "Serenidade dominante. Estado ideal para aprendizado profundo e foco prolongado.",
      Contemplação: "Padrão contemplativo elevado. Sua mente processa em camadas profundas.",
      Raiva: "Raiva presente nos registros. Canalizar essa energia para missões aumenta produtividade.",
      Neutro: "Estado emocional estável detectado. Plataforma sólida para evolução intencional.",
    };
    if (emotionInsights[topEmotion]) insights.push(emotionInsights[topEmotion]);
  }

  if (recentNegative >= 3) {
    insights.push("Sequência de estados negativos recentes. Pequenas vitórias diárias reequilibram o sistema.");
  }

  // Mission insights
  if (dailyMissions.length > 0) {
    const pct = Math.round((todayDailyDone / dailyMissions.length) * 100);
    if (pct === 100) {
      insights.push("Todas as missões diárias concluídas! Consistência máxima atingida hoje.");
    } else if (pct >= 50) {
      insights.push(`${todayDailyDone}/${dailyMissions.length} missões diárias concluídas. Progresso sólido — finalize as restantes.`);
    } else if (pct > 0) {
      insights.push(`${todayDailyDone}/${dailyMissions.length} missões diárias concluídas. Ainda há tempo para avançar hoje.`);
    } else {
      insights.push(`${dailyMissions.length} missão(ões) diária(s) aguardando. Complete ao menos uma para manter a sequência.`);
    }
  }

  if (weekMissionsCompleted > 0) {
    insights.push(`${weekMissionsCompleted} missão(ões) concluída(s) nos últimos 7 dias. Ritmo de produtividade mensurável.`);
  }

  // Streak insights
  if (state.streak >= 14) {
    insights.push(`Sequência de ${state.streak} dias. Nível de disciplina: extraordinário. O hábito está consolidado.`);
  } else if (state.streak >= 7) {
    insights.push(`${state.streak} dias consecutivos. A disciplina neural está se solidificando em hábito.`);
  } else if (state.streak >= 3) {
    insights.push(`${state.streak} dias de sequência ativa. Continue — o padrão está ganhando força.`);
  } else if (state.streak === 1) {
    insights.push("Primeiro dia da sequência. Mantenha o ritmo amanhã para construir consistência.");
  }

  // Level insights
  if (level >= 10) {
    insights.push(`Nível ${level} atingido. Usuário avançado — evolução cognitiva em fase de aceleração.`);
  } else if (level >= 5) {
    insights.push(`Nível ${level}: progresso consistente detectado. Continue acumulando XP.`);
  }

  // XP total
  if (state.xp >= 5000) {
    insights.push(`${state.xp.toLocaleString()} XP acumulados. Comprometimento de longo prazo confirmado.`);
  }

  return insights.slice(0, 6);
}

export function VoidIA() {
  const { state } = useVoid();
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const insights = useMemo(() => buildInsights(state), [
    state.journal.length,
    state.xp,
    state.streak,
    state.missions.length,
    state.xpEvents.length,
  ]);

  useEffect(() => {
    setMessageIndex(0);
    setCharIndex(0);
    setCurrentMessage("");
    setIsTyping(true);
  }, [insights]);

  useEffect(() => {
    if (!insights.length) return;
    if (isTyping && charIndex < insights[messageIndex].length) {
      const timeout = setTimeout(() => {
        setCurrentMessage(insights[messageIndex].slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 40);
      return () => clearTimeout(timeout);
    } else if (charIndex === insights[messageIndex].length) {
      const timeout = setTimeout(() => {
        setIsTyping(false);
        setCharIndex(0);
        setCurrentMessage("");
        setMessageIndex((messageIndex + 1) % insights.length);
        setTimeout(() => setIsTyping(true), 600);
      }, 3500);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, messageIndex, isTyping, insights]);

  const today = todayStr();
  const level = getLevel(state.xp);
  const totalMissionsCompleted = state.missions.reduce((s, m) => s + m.completedDates.length, 0);
  const todayXP = state.xpEvents.filter((e) => e.date === today).reduce((s, e) => s + e.amount, 0);
  const recentEvents = state.xpEvents.slice(0, 5);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="backdrop-blur-xl bg-black/40 border-b border-purple-500/20 px-6 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                VOID IA
              </h1>
              <p className="text-xs text-gray-400 tracking-wider">INTERFACE DE CONSCIÊNCIA NEURAL</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-4xl w-full space-y-12">
          {/* Holographic Orb */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 w-64 h-64 -translate-x-32 -translate-y-32">
                <div className="absolute inset-0 border border-purple-500/20 rounded-full animate-spin" style={{ animationDuration: "20s" }} />
                <div className="absolute inset-8 border border-blue-500/20 rounded-full animate-spin" style={{ animationDuration: "15s", animationDirection: "reverse" }} />
                <div className="absolute inset-16 border border-pink-500/20 rounded-full animate-spin" style={{ animationDuration: "10s" }} />
              </div>
              <div className="relative w-32 h-32 -translate-x-16 -translate-y-16">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-2xl animate-pulse opacity-50" />
                <div className="absolute inset-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-xl animate-pulse opacity-60" style={{ animationDelay: "0.5s" }} />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 rounded-full opacity-80 animate-pulse" />
                <div className="absolute inset-2 bg-gradient-to-br from-purple-400 via-blue-400 to-pink-400 rounded-full opacity-60" />
                <div className="absolute inset-6 bg-gradient-to-br from-white via-purple-200 to-blue-200 rounded-full opacity-40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Brain className="w-12 h-12 text-white animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* AI Message Display */}
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-purple-500/30 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
                <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
              </div>
              <span className="text-xs text-gray-400 tracking-wider">ANÁLISE EM TEMPO REAL</span>
              <span className="ml-auto text-xs text-gray-600">{messageIndex + 1}/{insights.length}</span>
            </div>
            <div className="min-h-[80px] flex items-center">
              <p className="text-2xl text-gray-200 font-light leading-relaxed">
                {currentMessage}
                <span className="inline-block w-0.5 h-6 bg-purple-400 ml-1 animate-pulse" />
              </p>
            </div>
          </div>

          {/* Real-time Status */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-blue-500/20 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-gray-400">NÍVEL</span>
              </div>
              <div className="text-xl font-bold text-blue-400">{level}</div>
            </div>
            <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-purple-500/20 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-purple-400" />
                <span className="text-xs text-gray-400">XP HOJE</span>
              </div>
              <div className="text-xl font-bold text-purple-400">+{todayXP}</div>
            </div>
            <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-orange-500/20 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="w-4 h-4 text-orange-400" />
                <span className="text-xs text-gray-400">SEQUÊNCIA</span>
              </div>
              <div className="text-xl font-bold text-orange-400">{state.streak}d</div>
            </div>
            <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-cyan-500/20 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-cyan-400" />
                <span className="text-xs text-gray-400">MISSÕES</span>
              </div>
              <div className="text-xl font-bold text-cyan-400">{totalMissionsCompleted}</div>
            </div>
          </div>

          {/* Recent Activity Log */}
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-purple-500/20 p-6">
            <h3 className="text-lg font-bold text-purple-400 mb-4">Registros de Atividade Recente</h3>
            {recentEvents.length === 0 ? (
              <p className="text-gray-600 text-sm font-mono">
                [AGUARDANDO] Nenhuma atividade registrada ainda. Complete missões ou adicione registros.
              </p>
            ) : (
              <div className="space-y-2 font-mono text-xs">
                {recentEvents.map((ev) => {
                  const time = new Date(ev.timestamp).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
                  const tagColor = ev.reason.includes("Diário") ? "text-cyan-400" :
                    ev.reason.includes("Missão") ? "text-purple-400" :
                    ev.reason.includes("Bônus") ? "text-yellow-400" : "text-green-400";
                  const tag = ev.reason.includes("Diário") ? "[DIÁRIO]" :
                    ev.reason.includes("Missão") ? "[MISSÃO]" :
                    ev.reason.includes("Bônus") ? "[BÔNUS]" : "[XP]";
                  return (
                    <div key={ev.id} className="flex items-center gap-3 text-gray-400">
                      <span className="text-gray-600 flex-shrink-0">{time}</span>
                      <span className={`${tagColor} flex-shrink-0`}>{tag}</span>
                      <span className="flex-1 truncate">{ev.reason}</span>
                      <span className="text-yellow-400 font-bold flex-shrink-0">+{ev.amount} XP</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
