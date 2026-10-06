import { useState } from "react";
import { Settings, User, Download, Trash2, RefreshCw, Info, ChevronRight, AlertTriangle, Palette, Type } from "lucide-react";
import { useVoid } from "../store/VoidStore";
import { usePreferences, ACCENT_VARS, FONT_SIZE_MAP, type AccentColor, type FontSize } from "../store/PreferencesStore";

export function SettingsPage() {
  const { state, dispatch } = useVoid();
  const { prefs, setAccent, setFontSize } = usePreferences();
  const [name, setName] = useState(state.userName);
  const [nameSaved, setNameSaved] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSaveName = () => {
    if (name.trim()) {
      dispatch({ type: "UPDATE_USER_NAME", payload: name.trim() });
      setNameSaved(true);
      setTimeout(() => setNameSaved(false), 2000);
    }
  };

  const handleExport = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      user: { name: state.userName, xp: state.xp, streak: state.streak },
      journal: state.journal,
      missions: state.missions,
      achievements: state.achievements.filter((a) => a.unlocked),
      xpEvents: state.xpEvents,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `voidmind-export-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDelete = () => {
    dispatch({ type: "RESET_ALL_DATA" });
    setShowDeleteConfirm(false);
  };

  const handleReviewOnboarding = () => {
    dispatch({ type: "RESET_ALL_DATA" });
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="backdrop-blur-xl bg-black/40 border-b border-purple-500/20 px-6 py-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <Settings className="w-6 h-6 text-gray-400" />
            <div>
              <h1 className="text-2xl font-bold text-white">CONFIGURAÇÕES</h1>
              <p className="text-xs text-gray-400 tracking-wider">PREFERÊNCIAS DO SISTEMA</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-6 space-y-4">
        {/* Profile */}
        <Section title="Perfil" icon={User} color="purple">
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-500 mb-1.5 block">Nome de Usuário</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSaveName()}
                  className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all text-sm"
                />
                <button
                  onClick={handleSaveName}
                  className={`px-5 py-3 rounded-xl font-bold text-sm transition-all ${
                    nameSaved
                      ? "bg-green-600 text-white"
                      : "bg-purple-600 text-white hover:bg-purple-500"
                  }`}
                >
                  {nameSaved ? "Salvo!" : "Salvar"}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-2">
              <Stat label="Nível" value={String(Math.floor(state.xp / 1000) + 1)} />
              <Stat label="XP Total" value={state.xp.toLocaleString()} />
              <Stat label="Sequência" value={`${state.streak}d`} />
            </div>
          </div>
        </Section>

        {/* ─── PREFERÊNCIAS — persistidas via LocalStorage ("voidmind_prefs") ─── */}
        <Section title="Preferências" icon={Palette} color="purple">
          <div className="space-y-5">
            {/* Preferência 1: Cor de Destaque */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Palette className="w-4 h-4 text-purple-400" />
                <label className="text-sm font-bold text-gray-300">Cor de Destaque</label>
              </div>
              <p className="text-xs text-gray-600 mb-3">
                Escolha a cor principal da interface. Salvo automaticamente no LocalStorage.
              </p>
              <div className="grid grid-cols-3 gap-2">
                {(Object.entries(ACCENT_VARS) as [AccentColor, typeof ACCENT_VARS[AccentColor]][]).map(([key, val]) => {
                  const colorMap: Record<AccentColor, { ring: string; bg: string; dot: string }> = {
                    void:   { ring: "border-purple-500 ring-purple-500/30", bg: "bg-purple-500/20", dot: "bg-purple-500" },
                    neural: { ring: "border-cyan-500 ring-cyan-500/30",     bg: "bg-cyan-500/20",   dot: "bg-cyan-500"   },
                    omega:  { ring: "border-pink-500 ring-pink-500/30",     bg: "bg-pink-500/20",   dot: "bg-pink-500"   },
                  };
                  const c = colorMap[key];
                  const isActive = prefs.accent === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setAccent(key)}
                      className={`p-3 rounded-xl border-2 transition-all text-center ${
                        isActive
                          ? `${c.ring} ${c.bg} ring-2`
                          : "border-white/10 bg-white/5 hover:border-white/20"
                      }`}
                    >
                      <div className={`w-4 h-4 ${c.dot} rounded-full mx-auto mb-2`} />
                      <div className={`text-xs font-bold ${isActive ? "text-white" : "text-gray-500"}`}>
                        {val.name}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Preferência 2: Tamanho da Interface */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Type className="w-4 h-4 text-blue-400" />
                <label className="text-sm font-bold text-gray-300">Tamanho da Interface</label>
              </div>
              <p className="text-xs text-gray-600 mb-3">
                Ajusta o tamanho do texto. Salvo automaticamente no LocalStorage.
              </p>
              <div className="grid grid-cols-3 gap-2">
                {(Object.entries(FONT_SIZE_MAP) as [FontSize, typeof FONT_SIZE_MAP[FontSize]][]).map(([key, val]) => {
                  const isActive = prefs.fontSize === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setFontSize(key)}
                      className={`p-3 rounded-xl border-2 transition-all text-center ${
                        isActive
                          ? "border-blue-500 bg-blue-500/20 ring-2 ring-blue-500/30"
                          : "border-white/10 bg-white/5 hover:border-white/20"
                      }`}
                    >
                      <div className={`font-bold mx-auto mb-1 ${
                        key === "compact" ? "text-xs" : key === "large" ? "text-base" : "text-sm"
                      } ${isActive ? "text-white" : "text-gray-500"}`}>
                        Aa
                      </div>
                      <div className={`text-[10px] font-bold ${isActive ? "text-blue-400" : "text-gray-600"}`}>
                        {val.label}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Explicação didática */}
            <div className="bg-black/30 border border-white/5 rounded-xl p-3 text-xs text-gray-600 space-y-1">
              <p className="text-gray-500 font-bold mb-1">Como funciona (LocalStorage):</p>
              <p>• <span className="text-purple-400">setItem()</span> — salva sua escolha ao clicar</p>
              <p>• <span className="text-cyan-400">getItem()</span> — recupera ao abrir o app</p>
              <p>• Persiste mesmo após fechar o navegador</p>
              <p>• Chave: <span className="text-gray-400 font-mono">"voidmind_prefs"</span></p>
            </div>
          </div>
        </Section>

        {/* Data */}
        <Section title="Dados" icon={Download} color="cyan">
          <div className="space-y-2">
            <SettingItem
              icon={Download}
              label="Exportar Meus Dados"
              description="Baixar todos os dados em formato JSON"
              color="cyan"
              onClick={handleExport}
            />
            <SettingItem
              icon={RefreshCw}
              label="Rever Introdução"
              description="Ver o onboarding novamente"
              color="blue"
              onClick={handleReviewOnboarding}
            />
          </div>
        </Section>

        {/* Danger zone */}
        <Section title="Zona de Perigo" icon={AlertTriangle} color="red">
          {!showDeleteConfirm ? (
            <SettingItem
              icon={Trash2}
              label="Apagar Todos os Dados"
              description="Remove permanentemente todos os dados do VoidMind"
              color="red"
              onClick={() => setShowDeleteConfirm(true)}
              danger
            />
          ) : (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <span className="text-red-400 font-bold text-sm">Tem certeza? Esta ação é irreversível.</span>
              </div>
              <p className="text-gray-400 text-xs mb-4">
                Todos os seus dados — diário, missões, conquistas e XP — serão apagados permanentemente.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 py-2.5 bg-white/5 border border-white/10 text-gray-400 rounded-xl text-sm hover:bg-white/10 transition-all"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 py-2.5 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-500 transition-all"
                >
                  Apagar Tudo
                </button>
              </div>
            </div>
          )}
        </Section>

        {/* About */}
        <Section title="Sobre" icon={Info} color="gray">
          <div className="space-y-3 text-sm text-gray-400">
            <div className="flex items-center justify-between">
              <span>VoidMind Omega</span>
              <span className="text-gray-600">v2.0.0</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Registros no Diário</span>
              <span className="text-purple-400 font-bold">{state.journal.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Missões criadas</span>
              <span className="text-purple-400 font-bold">{state.missions.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Conquistas desbloqueadas</span>
              <span className="text-purple-400 font-bold">
                {state.achievements.filter((a) => a.unlocked).length}/{state.achievements.length}
              </span>
            </div>
            <p className="text-xs text-gray-600 pt-2 leading-relaxed border-t border-white/5">
              VoidMind Omega é uma plataforma de desenvolvimento pessoal gamificada. Todos os dados são armazenados localmente no seu dispositivo.
            </p>
          </div>
        </Section>
      </div>
    </div>
  );
}

function Section({
  title,
  icon: Icon,
  color,
  children,
}: {
  title: string;
  icon: React.ElementType;
  color: string;
  children: React.ReactNode;
}) {
  const colors: Record<string, string> = {
    purple: "text-purple-400",
    cyan: "text-cyan-400",
    blue: "text-blue-400",
    red: "text-red-400",
    gray: "text-gray-400",
  };

  return (
    <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-5">
      <div className="flex items-center gap-2 mb-4">
        <Icon className={`w-5 h-5 ${colors[color] ?? "text-gray-400"}`} />
        <h3 className="text-sm font-bold text-gray-300 tracking-wider">{title.toUpperCase()}</h3>
      </div>
      {children}
    </div>
  );
}

function SettingItem({
  icon: Icon,
  label,
  description,
  color,
  onClick,
  danger = false,
}: {
  icon: React.ElementType;
  label: string;
  description: string;
  color: string;
  onClick: () => void;
  danger?: boolean;
}) {
  const colors: Record<string, string> = {
    purple: "text-purple-400 bg-purple-500/10",
    cyan: "text-cyan-400 bg-cyan-500/10",
    blue: "text-blue-400 bg-blue-500/10",
    red: "text-red-400 bg-red-500/10",
    gray: "text-gray-400 bg-gray-500/10",
  };

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 p-4 rounded-xl border border-transparent hover:border-white/10 hover:bg-white/5 transition-all text-left group ${
        danger ? "hover:border-red-500/20 hover:bg-red-500/5" : ""
      }`}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${colors[color]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <div className={`font-semibold text-sm ${danger ? "text-red-400" : "text-white"}`}>{label}</div>
        <div className="text-xs text-gray-500 mt-0.5">{description}</div>
      </div>
      <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-400 transition-colors" />
    </button>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-black/30 rounded-xl border border-white/5 p-3 text-center">
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className="text-lg font-bold text-purple-400">{value}</div>
    </div>
  );
}
