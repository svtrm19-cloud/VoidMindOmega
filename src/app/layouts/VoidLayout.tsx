import { Outlet, NavLink } from "react-router";
import { Brain, Sparkles, BookOpen, BarChart3, User, Circle, Target } from "lucide-react";
import { useVoid } from "../store/VoidStore";
import { OnboardingPage } from "../pages/OnboardingPage";

export function VoidLayout() {
  const { state } = useVoid();

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black" />
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxMzksIDkyLCAyNDYsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />

      {/* Glow Effects — cores controladas pela preferência de Cor de Destaque */}
      <div className="void-glow-a fixed top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="void-glow-b fixed bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

      {/* Onboarding overlay — stable wrapper prevents removeChild reconciliation errors */}
      <div aria-hidden={state.onboardingCompleted || undefined}>
        {!state.onboardingCompleted && <OnboardingPage />}
      </div>

      {/* Level-up overlay */}
      <div aria-hidden={!state.levelUpPending || undefined}>
        {state.levelUpPending && <LevelUpOverlay level={state.prevLevel + 1} />}
      </div>

      {/* Content */}
      <div className="relative z-10 pb-20">
        <Outlet />
      </div>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-2xl bg-black/60 border-t border-purple-500/20">
        <div className="max-w-lg mx-auto px-2 py-2">
          <div className="flex items-center justify-around">
            <NavItem to="/" icon={Brain} label="NEURAL" activeColor="text-blue-400" glowColor="bg-blue-500/30" />
            <NavItem to="/ai" icon={Sparkles} label="VOID IA" activeColor="text-purple-400" glowColor="bg-purple-500/30" />
            <NavItem to="/missions" icon={Target} label="MISSÕES" activeColor="text-pink-400" glowColor="bg-pink-500/30" />
            <NavItem to="/journal" icon={BookOpen} label="DIÁRIO" activeColor="text-cyan-400" glowColor="bg-cyan-500/30" />
            <NavItem to="/stats" icon={BarChart3} label="DADOS" activeColor="text-pink-400" glowColor="bg-pink-500/30" />
            <NavItem to="/profile" icon={User} label="PERFIL" activeColor="text-violet-400" glowColor="bg-violet-500/30" />
            <NavItem to="/void" icon={Circle} label="VOID" activeColor="text-indigo-400" glowColor="bg-indigo-500/30" />
          </div>
        </div>
      </nav>
    </div>
  );
}

function NavItem({
  to,
  icon: Icon,
  label,
  activeColor,
  glowColor,
}: {
  to: string;
  icon: React.ElementType;
  label: string;
  activeColor: string;
  glowColor: string;
}) {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      className={({ isActive }) =>
        `flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl transition-all duration-300 ${
          isActive ? activeColor : "text-gray-600 hover:text-gray-400"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <div className="relative">
            <Icon className="w-5 h-5" />
            {isActive && (
              <div className={`absolute inset-0 ${glowColor} rounded-full blur-lg`} />
            )}
          </div>
          <span className="text-[9px] font-bold tracking-wider">{label}</span>
        </>
      )}
    </NavLink>
  );
}

function LevelUpOverlay({ level }: { level: number }) {
  const { dispatch } = useVoid();
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-pointer"
      onClick={() => dispatch({ type: "DISMISS_LEVEL_UP" })}
    >
      <div className="text-center px-8">
        <div className="relative mb-6 flex justify-center">
          <div className="absolute w-40 h-40 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-3xl animate-pulse opacity-60" />
          <div className="relative w-36 h-36 bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 rounded-full flex items-center justify-center border-4 border-purple-400/50 shadow-2xl">
            <div className="text-center">
              <div className="text-xs text-purple-200 font-bold tracking-wider">NÍVEL</div>
              <div className="text-5xl font-black text-white">{level}</div>
            </div>
          </div>
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-2">
          Subiu de Nível!
        </h2>
        <p className="text-gray-400 text-sm">Sua consciência continua evoluindo</p>
        <p className="text-gray-600 text-xs mt-4">Toque para continuar</p>
      </div>
    </div>
  );
}
