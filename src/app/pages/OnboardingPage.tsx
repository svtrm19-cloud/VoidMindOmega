import { useState } from "react";
import { Brain, BookOpen, Target, Award, ChevronRight, ChevronLeft, Zap, Circle } from "lucide-react";
import { useVoid } from "../store/VoidStore";

const STEPS = [
  {
    icon: Brain,
    color: "blue",
    gradient: "from-blue-500 to-cyan-500",
    border: "border-blue-500/40",
    glow: "bg-blue-500/20",
    title: "Acompanhe sua Evolução",
    description:
      "O VoidMind rastreia sua jornada mental e mostra seu progresso em tempo real através de gráficos e métricas neurais personalizadas.",
  },
  {
    icon: BookOpen,
    color: "cyan",
    gradient: "from-cyan-500 to-teal-500",
    border: "border-cyan-500/40",
    glow: "bg-cyan-500/20",
    title: "Registre seus Pensamentos",
    description:
      "O Diário Neural analisa suas emoções e padrões cognitivos, transformando reflexões em dados sobre sua mente.",
  },
  {
    icon: Target,
    color: "purple",
    gradient: "from-purple-500 to-pink-500",
    border: "border-purple-500/40",
    glow: "bg-purple-500/20",
    title: "Complete suas Missões",
    description:
      "Crie hábitos e tarefas diárias. Cada missão concluída te aproxima da versão mais evoluída de você mesmo.",
  },
  {
    icon: Award,
    color: "pink",
    gradient: "from-pink-500 to-violet-500",
    border: "border-pink-500/40",
    glow: "bg-pink-500/20",
    title: "Ganhe XP e Conquistas",
    description:
      "Cada ação gera experiência. Suba de nível, desbloqueie conquistas e acompanhe sua evolução de forma gamificada.",
  },
];

export function OnboardingPage() {
  const { dispatch } = useVoid();
  const [step, setStep] = useState(-1); // -1 = splash

  const complete = () => dispatch({ type: "COMPLETE_ONBOARDING" });

  if (step === -1) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-black to-black" />

        {/* Animated rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] border border-purple-500/10 rounded-full animate-spin" style={{ animationDuration: "30s" }} />
          <div className="absolute w-[400px] h-[400px] border border-blue-500/10 rounded-full animate-spin" style={{ animationDuration: "20s", animationDirection: "reverse" }} />
          <div className="absolute w-[200px] h-[200px] border border-pink-500/10 rounded-full animate-spin" style={{ animationDuration: "15s" }} />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center max-w-md">
          {/* Orb */}
          <div className="relative mb-10">
            <div className="absolute inset-0 w-32 h-32 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-3xl animate-pulse opacity-60" />
            <div className="relative w-32 h-32 bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 rounded-full flex items-center justify-center border border-purple-400/30">
              <div className="absolute inset-2 bg-gradient-to-br from-purple-400 via-blue-400 to-pink-400 rounded-full opacity-40 animate-pulse" />
              <Brain className="w-14 h-14 text-white relative z-10" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3 tracking-tight">
            VOIDMIND OMEGA
          </h1>
          <p className="text-gray-400 text-lg mb-12 font-light tracking-wide">
            Expandindo a mente. Evoluindo a consciência.
          </p>

          <div className="flex flex-col gap-3 w-full max-w-xs">
            <button
              onClick={() => setStep(0)}
              className="py-4 px-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-bold text-lg tracking-widest hover:from-purple-500 hover:to-blue-500 transition-all shadow-lg shadow-purple-500/30"
            >
              INICIAR
            </button>
            <button
              onClick={complete}
              className="py-3 px-8 text-gray-500 text-sm tracking-wider hover:text-gray-300 transition-colors"
            >
              PULAR INTRODUÇÃO
            </button>
          </div>
        </div>
      </div>
    );
  }

  const current = STEPS[step];
  const Icon = current.icon;
  const isLast = step === STEPS.length - 1;

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black" />

      {/* Skip */}
      <div className="relative z-10 flex justify-end p-6">
        <button
          onClick={complete}
          className="text-gray-500 text-xs tracking-widest hover:text-gray-300 transition-colors"
        >
          PULAR INTRODUÇÃO
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8 max-w-lg mx-auto w-full">
        {/* Icon orb */}
        <div className="relative mb-10">
          <div className={`absolute inset-0 w-28 h-28 ${current.glow} rounded-full blur-2xl animate-pulse`} />
          <div className={`relative w-28 h-28 bg-gradient-to-br ${current.gradient} rounded-3xl flex items-center justify-center border ${current.border} shadow-2xl`}>
            <Icon className="w-12 h-12 text-white" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-white text-center mb-4 leading-tight">
          {current.title}
        </h2>
        <p className="text-gray-400 text-center text-lg leading-relaxed font-light max-w-sm">
          {current.description}
        </p>

        {/* XP hint */}
        <div className="mt-8 flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur rounded-xl border border-white/10">
          <Zap className="w-4 h-4 text-yellow-400" />
          <span className="text-xs text-gray-400">
            {step === 0 && "Monitore foco, energia e produtividade"}
            {step === 1 && "Cada registro ganha +25 XP"}
            {step === 2 && "Cada missão concluída ganha +50 XP"}
            {step === 3 && "Desbloqueie conquistas conforme evolui"}
          </span>
        </div>
      </div>

      {/* Step dots */}
      <div className="relative z-10 flex justify-center gap-2 py-4">
        {STEPS.map((_, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === step ? "w-8 bg-purple-400" : "w-2 bg-gray-700"
            }`}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="relative z-10 flex items-center justify-between px-8 pb-10 max-w-lg mx-auto w-full">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:border-white/20 transition-all disabled:opacity-20"
        >
          <ChevronLeft className="w-5 h-5" />
          VOLTAR
        </button>

        {isLast ? (
          <button
            onClick={complete}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold tracking-wider hover:from-purple-500 hover:to-blue-500 transition-all shadow-lg shadow-purple-500/30"
          >
            <Circle className="w-4 h-4" />
            ENTRAR NO VOIDMIND
          </button>
        ) : (
          <button
            onClick={() => setStep(step + 1)}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white rounded-xl font-bold tracking-wider hover:bg-white/15 transition-all"
          >
            PRÓXIMO
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
