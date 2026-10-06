/**
 * PERSISTÊNCIA DE DADOS — LocalStorage
 *
 * Este módulo salva e recupera preferências do usuário usando LocalStorage.
 *
 * Fluxo:
 *   usuário escolhe → localStorage.setItem() salva
 *   página abre → localStorage.getItem() recupera → preferência é aplicada
 *
 * Chave usada: "voidmind_prefs"
 * Dados guardados: cor de destaque + tamanho da interface
 *
 * NÃO guardar senhas ou dados sensíveis aqui.
 */

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// ─── Tipos ────────────────────────────────────────────────────────────────────

export type AccentColor = "void" | "neural" | "omega";
export type FontSize = "compact" | "normal" | "large";

export interface Preferences {
  accent: AccentColor;
  fontSize: FontSize;
}

// ─── Constantes ───────────────────────────────────────────────────────────────

const STORAGE_KEY = "voidmind_prefs";

const DEFAULTS: Preferences = {
  accent: "void",
  fontSize: "normal",
};

// Cores de destaque por tema
export const ACCENT_VARS: Record<AccentColor, { a: string; b: string; name: string }> = {
  void:   { a: "139 92 246",  b: "59 130 246",  name: "VOID"   },  // roxo + azul
  neural: { a: "6 182 212",   b: "59 130 246",  name: "NEURAL" },  // ciano + azul
  omega:  { a: "236 72 153",  b: "168 85 247",  name: "OMEGA"  },  // rosa + roxo
};

// Tamanhos de fonte
export const FONT_SIZE_MAP: Record<FontSize, { px: string; label: string; desc: string }> = {
  compact: { px: "13px", label: "Compacto", desc: "Texto menor, mais conteúdo visível" },
  normal:  { px: "16px", label: "Normal",   desc: "Tamanho padrão" },
  large:   { px: "19px", label: "Ampliado", desc: "Texto maior, melhor legibilidade" },
};

// ─── Helpers de LocalStorage ──────────────────────────────────────────────────

function loadPrefs(): Preferences {
  // PASSO 2 — Recuperar ao abrir: lê o que foi salvo anteriormente
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return { ...DEFAULTS, ...JSON.parse(raw) };
    }
  } catch (_) {
    // JSON inválido → usa padrões
  }
  return DEFAULTS;
}

function savePrefs(prefs: Preferences): void {
  // PASSO 1 — Salvar com LocalStorage: persiste a escolha do usuário
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
}

// ─── Aplicar preferências ao DOM ─────────────────────────────────────────────

function applyPrefs(prefs: Preferences): void {
  const root = document.documentElement;

  // Preferência 1 — Tamanho da fonte
  // Sobrescreve a variável --font-size que theme.css já aplica ao html
  root.style.setProperty("--font-size", FONT_SIZE_MAP[prefs.fontSize].px);

  // Preferência 2 — Cor de destaque
  // Define as variáveis CSS que o layout usa para as luzes de fundo e destaques
  const { a, b } = ACCENT_VARS[prefs.accent];
  root.style.setProperty("--neon-a", a);
  root.style.setProperty("--neon-b", b);
  root.setAttribute("data-accent", prefs.accent);
}

// ─── Contexto ─────────────────────────────────────────────────────────────────

interface PrefsContextValue {
  prefs: Preferences;
  setAccent: (v: AccentColor) => void;
  setFontSize: (v: FontSize) => void;
}

const PrefsContext = createContext<PrefsContextValue | null>(null);

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState<Preferences>(() => {
    const loaded = loadPrefs();
    // PASSO 4 — Aplicar automaticamente ao carregar
    applyPrefs(loaded);
    return loaded;
  });

  const update = (next: Preferences) => {
    setPrefs(next);
    savePrefs(next);   // PASSO 1 — salva no LocalStorage
    applyPrefs(next);  // PASSO 4 — aplica imediatamente
  };

  return (
    <PrefsContext.Provider
      value={{
        prefs,
        setAccent: (accent) => update({ ...prefs, accent }),
        setFontSize: (fontSize) => update({ ...prefs, fontSize }),
      }}
    >
      {children}
    </PrefsContext.Provider>
  );
}

export function usePreferences() {
  const ctx = useContext(PrefsContext);
  if (!ctx) throw new Error("usePreferences must be used within PreferencesProvider");
  return ctx;
}
