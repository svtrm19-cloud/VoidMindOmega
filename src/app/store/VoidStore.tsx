import { createContext, useContext, useReducer, useEffect, useRef, ReactNode } from "react";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface JournalEntry {
  id: string;
  title?: string;      // título do registro (opcional para compatibilidade com entradas antigas)
  content: string;
  timestamp: number;
  emotion: string;     // emoção detectada automaticamente
  intensity: number;
  category?: string;   // categoria escolhida pelo usuário
  humor?: string;      // humor manual escolhido pelo usuário
}

export interface Mission {
  id: string;
  name: string;
  category: string;
  frequency: "daily" | "weekly" | "once";
  completedDates: string[];
  xpReward: number;
  createdAt: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  color: string;
  unlocked: boolean;
  unlockedAt?: number;
}

export interface XPEvent {
  id: string;
  timestamp: number;
  date: string;
  amount: number;
  reason: string;
}

export interface VoidState {
  userName: string;
  xp: number;
  journal: JournalEntry[];
  missions: Mission[];
  achievements: Achievement[];
  xpEvents: XPEvent[];
  streak: number;
  lastActiveDate: string;
  onboardingCompleted: boolean;
  levelUpPending: boolean;
  prevLevel: number;
  dailyBonusGiven: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export const getLevel = (xp: number) => Math.floor(xp / 1000) + 1;
export const getXPInLevel = (xp: number) => xp % 1000;
export const getXPToNextLevel = () => 1000;
export const todayStr = () => new Date().toISOString().split("T")[0];

const yesterdayStr = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
};

export function getLast7Days(): string[] {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split("T")[0];
  });
}

export function getLast30Days(): string[] {
  return Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    return d.toISOString().split("T")[0];
  });
}

export function formatDateLabel(dateStr: string): string {
  const [, m, d] = dateStr.split("-");
  return `${d}/${m}`;
}

// ─── Initial Achievements ────────────────────────────────────────────────────

const ACHIEVEMENT_DEFS: Omit<Achievement, "unlocked">[] = [
  { id: "first_journal", name: "Primeiro Registro", description: "Fez seu primeiro registro no Diário", color: "cyan" },
  { id: "first_mission", name: "Primeira Missão", description: "Completou sua primeira missão", color: "green" },
  { id: "streak_7", name: "7 Dias", description: "Manteve 7 dias consecutivos ativos", color: "orange" },
  { id: "journals_50", name: "50 Registros", description: "Fez 50 registros no Diário", color: "blue" },
  { id: "level_10", name: "Nível 10", description: "Alcançou o Nível 10", color: "purple" },
  { id: "xp_1000", name: "1000 XP", description: "Acumulou 1000 XP de experiência", color: "pink" },
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = ACHIEVEMENT_DEFS.map((a) => ({
  ...a,
  unlocked: false,
}));

// ─── Streak ───────────────────────────────────────────────────────────────────

function computeStreak(state: VoidState): { streak: number; lastActiveDate: string; bonusXP: number; bonusReason: string } {
  const today = todayStr();
  const yesterday = yesterdayStr();
  if (state.lastActiveDate === today) {
    return { streak: state.streak, lastActiveDate: today, bonusXP: 0, bonusReason: "" };
  }
  const newStreak = state.lastActiveDate === yesterday ? state.streak + 1 : 1;
  const bonusXP = newStreak > 1 ? newStreak * 5 : 0;
  const bonusReason = newStreak > 1 ? `Bônus de Sequência (${newStreak} dias)` : "";
  return { streak: newStreak, lastActiveDate: today, bonusXP, bonusReason };
}

// ─── Achievement Check ────────────────────────────────────────────────────────

function checkAchievements(state: VoidState): Achievement[] {
  const level = getLevel(state.xp);
  const anyMissionCompleted = state.missions.some((m) => m.completedDates.length > 0);

  return state.achievements.map((ach) => {
    if (ach.unlocked) return ach;
    let shouldUnlock = false;
    switch (ach.id) {
      case "first_journal":   shouldUnlock = state.journal.length >= 1; break;
      case "first_mission":   shouldUnlock = anyMissionCompleted; break;
      case "streak_7":        shouldUnlock = state.streak >= 7; break;
      case "journals_50":     shouldUnlock = state.journal.length >= 50; break;
      case "level_10":        shouldUnlock = level >= 10; break;
      case "xp_1000":         shouldUnlock = state.xp >= 1000; break;
    }
    if (shouldUnlock) return { ...ach, unlocked: true, unlockedAt: Date.now() };
    return ach;
  });
}

// ─── Actions ──────────────────────────────────────────────────────────────────

export type VoidAction =
  | { type: "COMPLETE_ONBOARDING" }
  | { type: "ADD_JOURNAL_ENTRY"; payload: JournalEntry }
  | { type: "DELETE_JOURNAL_ENTRY"; payload: string }
  | { type: "ADD_MISSION"; payload: Mission }
  | { type: "COMPLETE_MISSION"; payload: { id: string; date: string } }
  | { type: "UNCOMPLETE_MISSION"; payload: { id: string; date: string } }
  | { type: "DELETE_MISSION"; payload: string }
  | { type: "ADD_XP"; payload: { amount: number; reason: string } }
  | { type: "UPDATE_USER_NAME"; payload: string }
  | { type: "DISMISS_LEVEL_UP" }
  | { type: "RESET_ALL_DATA" };

// ─── Reducer ──────────────────────────────────────────────────────────────────

function applyXP(state: VoidState, amount: number, reason: string): Partial<VoidState> {
  const newXP = state.xp + amount;
  const xpEvent: XPEvent = {
    id: Date.now().toString() + Math.random(),
    timestamp: Date.now(),
    date: todayStr(),
    amount,
    reason,
  };
  return {
    xp: newXP,
    xpEvents: [xpEvent, ...state.xpEvents],
    levelUpPending: getLevel(newXP) > getLevel(state.xp) || state.levelUpPending,
    prevLevel: state.levelUpPending ? state.prevLevel : getLevel(state.xp),
  };
}

function voidReducer(state: VoidState, action: VoidAction): VoidState {
  switch (action.type) {
    case "COMPLETE_ONBOARDING":
      return { ...state, onboardingCompleted: true };

    case "ADD_JOURNAL_ENTRY": {
      const newJournal = [action.payload, ...state.journal];
      const { streak, lastActiveDate, bonusXP, bonusReason } = computeStreak(state);
      let next: VoidState = { ...state, journal: newJournal, streak, lastActiveDate };
      next = { ...next, ...applyXP(next, 25, "Registro no Diário") };
      if (bonusXP > 0) next = { ...next, ...applyXP(next, bonusXP, bonusReason) };
      return { ...next, achievements: checkAchievements(next) };
    }

    case "DELETE_JOURNAL_ENTRY":
      return { ...state, journal: state.journal.filter((e) => e.id !== action.payload) };

    case "ADD_MISSION":
      return { ...state, missions: [...state.missions, action.payload] };

    case "COMPLETE_MISSION": {
      const { id, date } = action.payload;
      const mission = state.missions.find((m) => m.id === id);
      if (!mission || mission.completedDates.includes(date)) return state;

      const missions = state.missions.map((m) =>
        m.id === id ? { ...m, completedDates: [...m.completedDates, date] } : m
      );
      const { streak, lastActiveDate, bonusXP, bonusReason } = computeStreak(state);
      let next: VoidState = { ...state, missions, streak, lastActiveDate };
      next = { ...next, ...applyXP(next, mission.xpReward, `Missão: ${mission.name}`) };
      if (bonusXP > 0) next = { ...next, ...applyXP(next, bonusXP, bonusReason) };

      // All daily missions bonus (once per day)
      const today = todayStr();
      if (state.dailyBonusGiven !== today) {
        const allDone = missions
          .filter((m) => m.frequency === "daily")
          .every((m) => m.completedDates.includes(today));
        if (allDone && missions.filter((m) => m.frequency === "daily").length > 0) {
          next = { ...next, ...applyXP(next, 100, "Bônus: Todas as missões diárias completas!"), dailyBonusGiven: today };
        }
      }
      return { ...next, achievements: checkAchievements(next) };
    }

    case "UNCOMPLETE_MISSION":
      return {
        ...state,
        missions: state.missions.map((m) =>
          m.id === action.payload.id
            ? { ...m, completedDates: m.completedDates.filter((d) => d !== action.payload.date) }
            : m
        ),
      };

    case "DELETE_MISSION":
      return { ...state, missions: state.missions.filter((m) => m.id !== action.payload) };

    case "ADD_XP": {
      const next = { ...state, ...applyXP(state, action.payload.amount, action.payload.reason) };
      return { ...next, achievements: checkAchievements(next) };
    }

    case "UPDATE_USER_NAME":
      return { ...state, userName: action.payload };

    case "DISMISS_LEVEL_UP":
      return { ...state, levelUpPending: false };

    case "RESET_ALL_DATA":
      return { ...INITIAL_STATE };

    default:
      return state;
  }
}

// ─── Initial State ────────────────────────────────────────────────────────────

const INITIAL_STATE: VoidState = {
  userName: "Samuel Victor",
  xp: 0,
  journal: [],
  missions: [],
  achievements: INITIAL_ACHIEVEMENTS,
  xpEvents: [],
  streak: 0,
  lastActiveDate: "",
  onboardingCompleted: false,
  levelUpPending: false,
  prevLevel: 1,
  dailyBonusGiven: "",
};

const STORAGE_KEY = "voidmind_store_v2";

function loadState(): VoidState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const saved = JSON.parse(raw) as Partial<VoidState>;
      return {
        ...INITIAL_STATE,
        ...saved,
        achievements: INITIAL_ACHIEVEMENTS.map((def) => {
          const found = (saved.achievements ?? []).find((a) => a.id === def.id);
          return found ?? def;
        }),
      };
    }
    // Migrate old journal
    const oldJournal = localStorage.getItem("voidmind_journal");
    if (oldJournal) {
      return { ...INITIAL_STATE, journal: JSON.parse(oldJournal), onboardingCompleted: true };
    }
  } catch (_) {}
  return INITIAL_STATE;
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface VoidContextValue {
  state: VoidState;
  dispatch: (action: VoidAction) => void;
}

const VoidContext = createContext<VoidContextValue | null>(null);

export function VoidProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(voidReducer, undefined, loadState);
  const prevAchievements = useRef(state.achievements);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    state.achievements.forEach((ach) => {
      const prev = prevAchievements.current.find((a) => a.id === ach.id);
      if (ach.unlocked && prev && !prev.unlocked) {
        toast.success(`🏆 Conquista: ${ach.name}`, {
          description: ach.description,
          duration: 5000,
        });
      }
    });
    prevAchievements.current = state.achievements;
  }, [state.achievements]);

  return <VoidContext.Provider value={{ state, dispatch }}>{children}</VoidContext.Provider>;
}

export function useVoid() {
  const ctx = useContext(VoidContext);
  if (!ctx) throw new Error("useVoid must be used within VoidProvider");
  return ctx;
}
