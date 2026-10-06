import { TrendingUp, TrendingDown, Award, BookOpen, ChevronRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { useState } from "react";

interface Subject {
  name: string;
  icon: string;
  color: string;
  bimestre1: number;
  bimestre2: number;
  bimestre3: number;
  bimestre4: number;
  average: number;
  status: "approved" | "recovering" | "attention";
}

export function NotesPage() {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const subjects: Subject[] = [
    {
      name: "Matemática",
      icon: "📐",
      color: "cyan",
      bimestre1: 9.0,
      bimestre2: 9.2,
      bimestre3: 9.5,
      bimestre4: 9.3,
      average: 9.25,
      status: "approved"
    },
    {
      name: "Português",
      icon: "📚",
      color: "blue",
      bimestre1: 8.0,
      bimestre2: 8.5,
      bimestre3: 8.7,
      bimestre4: 8.8,
      average: 8.5,
      status: "approved"
    },
    {
      name: "Física",
      icon: "⚡",
      color: "purple",
      bimestre1: 8.5,
      bimestre2: 8.8,
      bimestre3: 9.0,
      bimestre4: 9.2,
      average: 8.875,
      status: "approved"
    },
    {
      name: "Química",
      icon: "🧪",
      color: "green",
      bimestre1: 8.8,
      bimestre2: 9.0,
      bimestre3: 9.2,
      bimestre4: 9.0,
      average: 9.0,
      status: "approved"
    },
    {
      name: "Biologia",
      icon: "🧬",
      color: "emerald",
      bimestre1: 8.2,
      bimestre2: 8.5,
      bimestre3: 8.8,
      bimestre4: 9.0,
      average: 8.625,
      status: "approved"
    },
    {
      name: "História",
      icon: "🏛️",
      color: "amber",
      bimestre1: 8.5,
      bimestre2: 8.7,
      bimestre3: 9.0,
      bimestre4: 8.9,
      average: 8.775,
      status: "approved"
    },
    {
      name: "Geografia",
      icon: "🌍",
      color: "teal",
      bimestre1: 8.3,
      bimestre2: 8.6,
      bimestre3: 8.8,
      bimestre4: 9.0,
      average: 8.675,
      status: "approved"
    },
    {
      name: "Informática",
      icon: "💻",
      color: "indigo",
      bimestre1: 9.5,
      bimestre2: 9.7,
      bimestre3: 9.8,
      bimestre4: 9.9,
      average: 9.725,
      status: "approved"
    }
  ];

  const radarData = subjects.map(s => ({
    subject: s.name.substring(0, 3),
    nota: s.average
  }));

  const getColorClasses = (color: string) => {
    const colors: Record<string, any> = {
      cyan: { bg: "from-cyan-500/20", border: "border-cyan-500/30", text: "text-cyan-400", badge: "bg-cyan-500/20" },
      blue: { bg: "from-blue-500/20", border: "border-blue-500/30", text: "text-blue-400", badge: "bg-blue-500/20" },
      purple: { bg: "from-purple-500/20", border: "border-purple-500/30", text: "text-purple-400", badge: "bg-purple-500/20" },
      green: { bg: "from-green-500/20", border: "border-green-500/30", text: "text-green-400", badge: "bg-green-500/20" },
      emerald: { bg: "from-emerald-500/20", border: "border-emerald-500/30", text: "text-emerald-400", badge: "bg-emerald-500/20" },
      amber: { bg: "from-amber-500/20", border: "border-amber-500/30", text: "text-amber-400", badge: "bg-amber-500/20" },
      teal: { bg: "from-teal-500/20", border: "border-teal-500/30", text: "text-teal-400", badge: "bg-teal-500/20" },
      indigo: { bg: "from-indigo-500/20", border: "border-indigo-500/30", text: "text-indigo-400", badge: "bg-indigo-500/20" },
    };
    return colors[color] || colors.cyan;
  };

  return (
    <div className="min-h-screen bg-black pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 via-black to-cyan-950 border-b border-cyan-500/20 sticky top-0 z-40 backdrop-blur-xl">
        <div className="max-w-lg mx-auto px-5 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">Notas Escolares</h1>
              <p className="text-sm text-gray-400">Desempenho por disciplina</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-2xl flex items-center justify-center border border-cyan-500/30">
              <Award className="w-6 h-6 text-cyan-400" />
            </div>
          </div>

          {/* Overall Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-black/40 rounded-xl p-3 border border-cyan-500/20">
              <p className="text-xs text-gray-400 mb-1">Média Geral</p>
              <p className="text-2xl font-bold text-cyan-400">8.9</p>
            </div>
            <div className="bg-black/40 rounded-xl p-3 border border-green-500/20">
              <p className="text-xs text-gray-400 mb-1">Aprovado</p>
              <p className="text-2xl font-bold text-green-400">8/8</p>
            </div>
            <div className="bg-black/40 rounded-xl p-3 border border-purple-500/20">
              <p className="text-xs text-gray-400 mb-1">Melhor</p>
              <p className="text-2xl font-bold text-purple-400">9.7</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-5 py-6 space-y-6">
        {/* Radar Chart */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl border border-cyan-500/30 p-5 shadow-lg">
          <h3 className="text-white font-bold mb-4">Visão Geral de Desempenho</h3>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={radarData}>
              <PolarAngleAxis dataKey="subject" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <PolarRadiusAxis stroke="#9ca3af" domain={[0, 10]} />
              <Radar name="Nota" dataKey="nota" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Subjects List */}
        <div className="space-y-3">
          {subjects.map((subject) => {
            const colors = getColorClasses(subject.color);
            const trend = subject.bimestre4 - subject.bimestre1;

            return (
              <div
                key={subject.name}
                className={`bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl border ${colors.border} p-4 shadow-lg cursor-pointer transition-all duration-300 hover:scale-[1.02]`}
                onClick={() => setSelectedSubject(selectedSubject === subject.name ? null : subject.name)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${colors.bg} to-gray-900 rounded-xl flex items-center justify-center text-2xl border ${colors.border}`}>
                      {subject.icon}
                    </div>
                    <div>
                      <h3 className="text-white font-bold">{subject.name}</h3>
                      <p className="text-xs text-gray-400">Média: {subject.average.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`px-3 py-1 ${colors.badge} rounded-lg ${colors.text} text-xs font-bold border ${colors.border} flex items-center gap-1`}>
                      {trend > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {trend > 0 ? '+' : ''}{trend.toFixed(1)}
                    </div>
                    <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${selectedSubject === subject.name ? 'rotate-90' : ''}`} />
                  </div>
                </div>

                {selectedSubject === subject.name && (
                  <div className="mt-4 pt-4 border-t border-gray-800 space-y-3 animate-in fade-in duration-300">
                    {/* Bimestre Grades */}
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { label: "1º Bim", value: subject.bimestre1 },
                        { label: "2º Bim", value: subject.bimestre2 },
                        { label: "3º Bim", value: subject.bimestre3 },
                        { label: "4º Bim", value: subject.bimestre4 },
                      ].map((bim, idx) => (
                        <div key={idx} className="bg-black/40 rounded-lg p-2 border border-gray-800">
                          <p className="text-[10px] text-gray-400 mb-1">{bim.label}</p>
                          <p className={`text-lg font-bold ${colors.text}`}>{bim.value.toFixed(1)}</p>
                        </div>
                      ))}
                    </div>

                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Progresso</span>
                        <span>{((subject.average / 10) * 100).toFixed(0)}%</span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${colors.bg} to-${subject.color}-600`}
                          style={{ width: `${(subject.average / 10) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-xs font-bold border border-green-500/30">
                        ✓ Aprovado
                      </span>
                      <span className="text-xs text-gray-400">
                        {subject.average >= 9 ? "Excelente desempenho!" : "Bom desempenho!"}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Performance Tips */}
        <div className="bg-gradient-to-br from-purple-900/30 to-gray-950 rounded-2xl border border-purple-500/30 p-5">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-5 h-5 text-purple-400" />
            <h3 className="text-white font-bold">Dicas de Desempenho</h3>
          </div>
          <div className="space-y-2 text-sm text-gray-300">
            <p>🎯 Sua melhor disciplina é <span className="text-indigo-400 font-semibold">Informática</span> com média 9.7!</p>
            <p>📈 Maior evolução em <span className="text-emerald-400 font-semibold">Biologia</span> (+0.8 pontos)</p>
            <p>⭐ Continue assim e você estará no quadro de honra!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
