import { useState, useMemo } from "react";
import {
  BookOpen, Plus, Trash2, Brain, Calendar, Clock,
  Search, Filter, SlidersHorizontal, X, ArrowUpDown,
} from "lucide-react";
import { useVoid } from "../store/VoidStore";

// ─── Constantes ───────────────────────────────────────────────────────────────

const CATEGORIES = ["Pensamentos", "Estudos", "Ideias", "Reflexões", "Trabalho", "Outros"];

const HUMORES = ["Excelente", "Bem", "Normal", "Cansado", "Triste", "Ansioso"];

type SortOrder = "newest" | "oldest" | "az" | "za";

// ─── Funções de Pesquisa, Filtro e Ordenação ─────────────────────────────────

/**
 * filterJournalEntries — aplica pesquisa + filtros sobre a lista de entradas.
 * Usa .toLowerCase() e .includes() para comparação case-insensitive.
 */
function filterJournalEntries(
  entries: ReturnType<typeof useVoid>["state"]["journal"],
  search: string,
  categoryFilter: string,
  humorFilter: string
) {
  const q = search.toLowerCase().trim();

  return entries.filter((entry) => {
    // ── PESQUISA: busca em título, texto, emoção, humor e categoria ──
    if (q) {
      const inTitle    = (entry.title    ?? "").toLowerCase().includes(q);
      const inContent  = entry.content.toLowerCase().includes(q);
      const inEmotion  = entry.emotion.toLowerCase().includes(q);
      const inHumor    = (entry.humor    ?? "").toLowerCase().includes(q);
      const inCategory = (entry.category ?? "").toLowerCase().includes(q);
      if (!inTitle && !inContent && !inEmotion && !inHumor && !inCategory) return false;
    }

    // ── FILTRO POR CATEGORIA ──
    if (categoryFilter !== "all") {
      const entryCategory = entry.category ?? "Outros";
      if (entryCategory !== categoryFilter) return false;
    }

    // ── FILTRO POR HUMOR ──
    if (humorFilter !== "all") {
      const entryHumor = entry.humor ?? "Normal";
      if (entryHumor !== humorFilter) return false;
    }

    return true;
  });
}

/**
 * sortJournalEntries — ordena a lista filtrada pelo critério escolhido.
 */
function sortJournalEntries(
  entries: ReturnType<typeof useVoid>["state"]["journal"],
  order: SortOrder
) {
  const copy = [...entries];
  switch (order) {
    case "newest": return copy.sort((a, b) => b.timestamp - a.timestamp);
    case "oldest": return copy.sort((a, b) => a.timestamp - b.timestamp);
    case "az":
      return copy.sort((a, b) =>
        (a.title ?? a.content).localeCompare(b.title ?? b.content, "pt-BR")
      );
    case "za":
      return copy.sort((a, b) =>
        (b.title ?? b.content).localeCompare(a.title ?? a.content, "pt-BR")
      );
  }
}

/**
 * updateResultCount — retorna o texto de quantidade de resultados.
 */
function updateResultCount(count: number): string {
  if (count === 0) return "Nenhum resultado encontrado.";
  if (count === 1) return "1 resultado encontrado";
  return `${count} resultados encontrados`;
}

// ─── Utilitários de emoção detectada ─────────────────────────────────────────

function analyzeEmotion(text: string): { emotion: string; intensity: number } {
  const t = text.toLowerCase();
  if (t.includes("ansiedade") || t.includes("ansioso") || t.includes("preocup"))
    return { emotion: "Ansiedade", intensity: 75 };
  if (t.includes("triste") || t.includes("sozinho") || t.includes("vazio"))
    return { emotion: "Melancolia", intensity: 68 };
  if (t.includes("feliz") || t.includes("alegre") || t.includes("bem"))
    return { emotion: "Alegria", intensity: 85 };
  if (t.includes("raiva") || t.includes("irritado") || t.includes("bravo"))
    return { emotion: "Raiva", intensity: 70 };
  if (t.includes("calm") || t.includes("paz") || t.includes("tranquil"))
    return { emotion: "Serenidade", intensity: 90 };
  if (t.includes("pens") || t.includes("reflet") || t.includes("contempla"))
    return { emotion: "Contemplação", intensity: 82 };
  return { emotion: "Neutro", intensity: 50 };
}

function getEmotionColor(emotion: string) {
  const map: Record<string, string> = {
    Ansiedade:   "text-yellow-400 border-yellow-500/30 bg-yellow-500/10",
    Melancolia:  "text-blue-400 border-blue-500/30 bg-blue-500/10",
    Alegria:     "text-green-400 border-green-500/30 bg-green-500/10",
    Raiva:       "text-red-400 border-red-500/30 bg-red-500/10",
    Serenidade:  "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    Contemplação:"text-purple-400 border-purple-500/30 bg-purple-500/10",
    Neutro:      "text-gray-400 border-gray-500/30 bg-gray-500/10",
  };
  return map[emotion] ?? map.Neutro;
}

function getCategoryColor(cat: string) {
  const map: Record<string, string> = {
    Pensamentos: "text-violet-400 border-violet-500/30 bg-violet-500/10",
    Estudos:     "text-blue-400 border-blue-500/30 bg-blue-500/10",
    Ideias:      "text-yellow-400 border-yellow-500/30 bg-yellow-500/10",
    Reflexões:   "text-purple-400 border-purple-500/30 bg-purple-500/10",
    Trabalho:    "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    Outros:      "text-gray-400 border-gray-500/30 bg-gray-500/10",
  };
  return map[cat] ?? map.Outros;
}

function getHumorColor(h: string) {
  const map: Record<string, string> = {
    Excelente: "text-green-400 border-green-500/30 bg-green-500/10",
    Bem:       "text-teal-400 border-teal-500/30 bg-teal-500/10",
    Normal:    "text-gray-400 border-gray-500/30 bg-gray-500/10",
    Cansado:   "text-orange-400 border-orange-500/30 bg-orange-500/10",
    Triste:    "text-blue-400 border-blue-500/30 bg-blue-500/10",
    Ansioso:   "text-yellow-400 border-yellow-500/30 bg-yellow-500/10",
  };
  return map[h] ?? map.Normal;
}

// ─── Componente Principal ─────────────────────────────────────────────────────

export function VoidJournal() {
  const { state, dispatch } = useVoid();

  // ── Estados do formulário de criação ──
  const [newTitle, setNewTitle]       = useState("");
  const [newEntry, setNewEntry]       = useState("");
  const [newCategory, setNewCategory] = useState("Outros");
  const [newHumor, setNewHumor]       = useState("Normal");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // ── Estados de PESQUISA, FILTRO e ORDENAÇÃO ──
  const [search, setSearch]               = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [humorFilter, setHumorFilter]     = useState("all");
  const [sortOrder, setSortOrder]         = useState<SortOrder>("newest");

  const hasActiveFilters =
    search.trim() !== "" ||
    categoryFilter !== "all" ||
    humorFilter !== "all" ||
    sortOrder !== "newest";

  /** clearJournalFilters — reseta todos os filtros de uma vez */
  const clearJournalFilters = () => {
    setSearch("");
    setCategoryFilter("all");
    setHumorFilter("all");
    setSortOrder("newest");
  };

  // ── Aplicar filtros + ordenação em tempo real (recalcula a cada mudança) ──
  /** renderFilteredEntries — computa a lista final usando filtro + ordenação */
  const filteredEntries = useMemo(() => {
    const filtered = filterJournalEntries(state.journal, search, categoryFilter, humorFilter);
    return sortJournalEntries(filtered, sortOrder);
  }, [state.journal, search, categoryFilter, humorFilter, sortOrder]);

  const resultLabel = updateResultCount(filteredEntries.length);
  const noResults   = filteredEntries.length === 0;

  // ── Salvar novo registro ──
  const handleSaveEntry = () => {
    if (!newEntry.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      const analysis = analyzeEmotion(newEntry);
      dispatch({
        type: "ADD_JOURNAL_ENTRY",
        payload: {
          id: Date.now().toString(),
          title:    newTitle.trim() || undefined,
          content:  newEntry,
          timestamp: Date.now(),
          emotion:  analysis.emotion,
          intensity: analysis.intensity,
          category: newCategory,
          humor:    newHumor,
        },
      });
      setNewTitle("");
      setNewEntry("");
      setNewCategory("Outros");
      setNewHumor("Normal");
      setIsAnalyzing(false);
    }, 1200);
  };

  const handleDeleteEntry = (id: string) => {
    dispatch({ type: "DELETE_JOURNAL_ENTRY", payload: id });
  };

  const formatDate = (ts: number) =>
    new Date(ts).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
  const formatTime = (ts: number) =>
    new Date(ts).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

  // Estatísticas gerais (sempre sobre o total, não sobre filtrados)
  const topEmotion =
    state.journal.length > 0
      ? Object.entries(
          state.journal.reduce((acc, e) => {
            acc[e.emotion] = (acc[e.emotion] || 0) + 1;
            return acc;
          }, {} as Record<string, number>)
        ).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "N/A"
      : "N/A";

  const avgIntensity =
    state.journal.length > 0
      ? Math.round(state.journal.reduce((s, e) => s + e.intensity, 0) / state.journal.length)
      : 0;

  // ── Select classes reutilizáveis ──
  const selectCls =
    "bg-black/60 border border-white/10 text-white text-sm rounded-xl px-3 py-2 " +
    "focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 " +
    "transition-all cursor-pointer appearance-none";

  return (
    <div className="min-h-screen">
      {/* ── Header ── */}
      <div className="backdrop-blur-xl bg-black/40 border-b border-purple-500/20 px-6 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-cyan-400" />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Diário Mental
              </h1>
              <p className="text-xs text-gray-400 tracking-wider">
                INTERFACE DE REGISTRO NEURAL • PESQUISA E FILTROS
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">

        {/* ── Formulário de novo registro ── */}
        <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-cyan-500/30 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-white">Novo Registro Neural</h3>
            <span className="ml-auto text-xs text-yellow-400/70">+25 XP ao salvar</span>
          </div>

          {/* Título */}
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Título do registro (opcional)..."
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all mb-3 text-sm"
          />

          {/* Conteúdo */}
          <textarea
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            placeholder="Registre seus pensamentos, emoções e reflexões..."
            className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all min-h-[120px] resize-none mb-3"
          />

          {/* Categoria + Humor */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Categoria</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className={selectCls + " w-full"}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c} className="bg-gray-900">{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Humor</label>
              <select
                value={newHumor}
                onChange={(e) => setNewHumor(e.target.value)}
                className={selectCls + " w-full"}
              >
                {HUMORES.map((h) => (
                  <option key={h} value={h} className="bg-gray-900">{h}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500">{newEntry.length} caracteres</div>
            <button
              onClick={handleSaveEntry}
              disabled={!newEntry.trim() || isAnalyzing}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-bold hover:from-cyan-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Analisando...</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Salvar Registro</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            ÁREA DE PESQUISA, FILTROS E ORDENAÇÃO
            ══════════════════════════════════════════════════════════════ */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/10 to-cyan-500/5 rounded-2xl border border-purple-500/30 p-5 space-y-4">

          {/* Título da área */}
          <div className="flex items-center gap-2 mb-1">
            <SlidersHorizontal className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-bold text-purple-300 tracking-wider">PESQUISA E FILTROS</span>
          </div>

          {/* ── 1. BARRA DE PESQUISA ── */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Pesquisar no diário..."
              className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-10 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all text-sm"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* ── 2. FILTROS e ORDENAÇÃO ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

            {/* Filtro por Categoria */}
            <div>
              <label className="text-[10px] text-gray-600 uppercase tracking-wider mb-1 block flex items-center gap-1">
                <Filter className="w-3 h-3" /> Categoria
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className={selectCls + " w-full " + (categoryFilter !== "all" ? "border-purple-500/50 text-purple-300" : "")}
              >
                <option value="all" className="bg-gray-900">Todas as categorias</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c} className="bg-gray-900">{c}</option>
                ))}
              </select>
            </div>

            {/* Filtro por Humor */}
            <div>
              <label className="text-[10px] text-gray-600 uppercase tracking-wider mb-1 block flex items-center gap-1">
                <Filter className="w-3 h-3" /> Humor
              </label>
              <select
                value={humorFilter}
                onChange={(e) => setHumorFilter(e.target.value)}
                className={selectCls + " w-full " + (humorFilter !== "all" ? "border-cyan-500/50 text-cyan-300" : "")}
              >
                <option value="all" className="bg-gray-900">Todos os humores</option>
                {HUMORES.map((h) => (
                  <option key={h} value={h} className="bg-gray-900">{h}</option>
                ))}
              </select>
            </div>

            {/* Ordenação */}
            <div>
              <label className="text-[10px] text-gray-600 uppercase tracking-wider mb-1 block flex items-center gap-1">
                <ArrowUpDown className="w-3 h-3" /> Ordenar por
              </label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                className={selectCls + " w-full " + (sortOrder !== "newest" ? "border-blue-500/50 text-blue-300" : "")}
              >
                <option value="newest" className="bg-gray-900">Mais recentes</option>
                <option value="oldest" className="bg-gray-900">Mais antigas</option>
                <option value="az"     className="bg-gray-900">Título A–Z</option>
                <option value="za"     className="bg-gray-900">Título Z–A</option>
              </select>
            </div>
          </div>

          {/* ── LIMPAR FILTROS ── */}
          {hasActiveFilters && (
            <button
              onClick={clearJournalFilters}
              className="w-full py-2.5 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-sm font-bold tracking-wider hover:bg-red-500/20 hover:border-red-500/50 transition-all flex items-center justify-center gap-2"
            >
              <X className="w-4 h-4" />
              LIMPAR FILTROS
            </button>
          )}

          {/* ── CONTADOR DE RESULTADOS ── */}
          <div className={`flex items-center gap-2 pt-1 ${noResults ? "text-red-400" : "text-gray-400"}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${noResults ? "bg-red-500" : "bg-cyan-500 animate-pulse"}`} />
            <span className="text-sm font-mono">{resultLabel}</span>
            {!noResults && state.journal.length !== filteredEntries.length && (
              <span className="text-xs text-gray-600 ml-auto">
                de {state.journal.length} total
              </span>
            )}
          </div>
        </div>

        {/* ── Lista de entradas filtradas ── */}
        <div className="space-y-4">

          {/* Estado vazio — nenhum resultado com filtros ativos */}
          {noResults && hasActiveFilters && (
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-red-500/20 p-10 text-center">
              <div className="relative w-16 h-16 mx-auto mb-4">
                <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl animate-pulse" />
                <div className="relative w-full h-full rounded-full border border-red-500/30 flex items-center justify-center">
                  <Search className="w-7 h-7 text-red-400" />
                </div>
              </div>
              <p className="text-red-400 text-lg font-bold mb-1">Nenhum resultado encontrado.</p>
              <p className="text-gray-600 text-sm mb-4">
                Nenhuma entrada corresponde à sua pesquisa ou filtros selecionados.
              </p>
              <button
                onClick={clearJournalFilters}
                className="px-5 py-2 bg-white/5 border border-white/10 text-gray-400 rounded-xl text-sm hover:bg-white/10 hover:text-white transition-all"
              >
                Limpar Filtros
              </button>
            </div>
          )}

          {/* Estado vazio — sem registros de forma alguma */}
          {noResults && !hasActiveFilters && (
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-12 text-center">
              <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg mb-2">Nenhum registro ainda</p>
              <p className="text-gray-600 text-sm">Comece a documentar sua jornada mental</p>
            </div>
          )}

          {/* Entradas filtradas */}
          {filteredEntries.map((entry) => {
            const title    = entry.title ?? "";
            const category = entry.category ?? "Outros";
            const humor    = entry.humor ?? "";

            return (
              <div
                key={entry.id}
                className="backdrop-blur-xl bg-white/5 rounded-2xl border border-purple-500/20 p-6 hover:border-purple-500/40 transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Badges: emoção detectada, categoria, humor */}
                    <span className={`px-2.5 py-0.5 rounded-lg border text-xs font-bold ${getEmotionColor(entry.emotion)}`}>
                      {entry.emotion}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-lg border text-xs font-bold ${getCategoryColor(category)}`}>
                      {category}
                    </span>
                    {humor && (
                      <span className={`px-2.5 py-0.5 rounded-lg border text-xs font-bold ${getHumorColor(humor)}`}>
                        {humor}
                      </span>
                    )}
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 ml-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(entry.timestamp)}</span>
                      <Clock className="w-3 h-3 ml-1" />
                      <span>{formatTime(entry.timestamp)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteEntry(entry.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-300 flex-shrink-0 ml-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Título (se houver) */}
                {title && (
                  <h4 className="text-white font-bold text-base mb-2">{title}</h4>
                )}

                <p className="text-gray-300 leading-relaxed mb-4 text-sm">{entry.content}</p>

                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-gray-500">Intensidade Emocional</span>
                      <span className="text-xs text-purple-400 font-bold">{entry.intensity}%</span>
                    </div>
                    <div className="h-1.5 bg-black/40 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                        style={{ width: `${entry.intensity}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-2 text-xs text-gray-500">
                  <Brain className="w-3 h-3 text-purple-400" />
                  <span>Padrão Neural: {entry.emotion} detectado com {entry.intensity}% de intensidade</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Estatísticas gerais do diário ── */}
        {state.journal.length > 0 && (
          <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl border border-purple-500/30 p-6">
            <h3 className="text-lg font-bold text-purple-400 mb-4">Estatísticas do Diário</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <div className="text-gray-400 text-xs mb-1">Total de Registros</div>
                <div className="text-2xl font-bold text-white">{state.journal.length}</div>
              </div>
              <div>
                <div className="text-gray-400 text-xs mb-1">Emoção Mais Frequente</div>
                <div className="text-2xl font-bold text-purple-400">{topEmotion}</div>
              </div>
              <div>
                <div className="text-gray-400 text-xs mb-1">Intensidade Média</div>
                <div className="text-2xl font-bold text-blue-400">{avgIntensity}%</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
