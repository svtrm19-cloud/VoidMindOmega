import { BarChart3, TrendingUp, Activity, Brain, Zap, Eye } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function VoidStats() {
  const weeklyData = [
    { day: "Seg", focus: 75, energy: 68, stability: 82 },
    { day: "Ter", focus: 82, energy: 72, stability: 78 },
    { day: "Qua", focus: 78, energy: 75, stability: 85 },
    { day: "Qui", focus: 88, energy: 80, stability: 80 },
    { day: "Sex", focus: 85, energy: 76, stability: 88 },
    { day: "Sáb", focus: 72, energy: 70, stability: 90 },
    { day: "Dom", focus: 68, energy: 65, stability: 92 },
  ];

  const anxietyData = [
    { time: "00:00", level: 35 },
    { time: "04:00", level: 25 },
    { time: "08:00", level: 45 },
    { time: "12:00", level: 55 },
    { time: "16:00", level: 50 },
    { time: "20:00", level: 40 },
    { time: "23:59", level: 38 },
  ];

  const cognitiveData = [
    { metric: "Lógica", value: 88 },
    { metric: "Criatividade", value: 92 },
    { metric: "Memória", value: 78 },
    { metric: "Processamento", value: 85 },
    { metric: "Análise", value: 90 },
    { metric: "Intuição", value: 82 },
  ];

  const productivityData = [
    { hour: "06h", value: 40 },
    { hour: "09h", value: 75 },
    { hour: "12h", value: 85 },
    { hour: "15h", value: 70 },
    { hour: "18h", value: 80 },
    { hour: "21h", value: 90 },
    { hour: "00h", value: 65 },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="backdrop-blur-xl bg-black/40 border-b border-purple-500/20 px-6 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-6 h-6 text-pink-400" />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Estatísticas Mentais
              </h1>
              <p className="text-xs text-gray-400 tracking-wider">RASTREAMENTO DE EVOLUÇÃO PSICOLÓGICA</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-blue-500/30 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-blue-400" />
              </div>
              <span className="text-xs text-gray-400">COGNITIVO</span>
            </div>
            <div className="text-3xl font-bold text-blue-400 mb-1">87%</div>
            <div className="flex items-center gap-1 text-xs text-green-400">
              <TrendingUp className="w-3 h-3" />
              <span>+5% na semana</span>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-purple-500/30 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-purple-400" />
              </div>
              <span className="text-xs text-gray-400">ENERGIA</span>
            </div>
            <div className="text-3xl font-bold text-purple-400 mb-1">72%</div>
            <div className="flex items-center gap-1 text-xs text-yellow-400">
              <Activity className="w-3 h-3" />
              <span>Estável</span>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-pink-500/30 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-pink-400" />
              </div>
              <span className="text-xs text-gray-400">FOCO</span>
            </div>
            <div className="text-3xl font-bold text-pink-400 mb-1">85%</div>
            <div className="flex items-center gap-1 text-xs text-green-400">
              <TrendingUp className="w-3 h-3" />
              <span>+8% de melhora</span>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-cyan-500/30 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="text-xs text-gray-400">ESTABILIDADE</span>
            </div>
            <div className="text-3xl font-bold text-cyan-400 mb-1">84%</div>
            <div className="flex items-center gap-1 text-xs text-green-400">
              <TrendingUp className="w-3 h-3" />
              <span>+3% de aumento</span>
            </div>
          </div>
        </div>

        {/* Weekly Evolution */}
        <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-purple-500/20 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Evolução Psicológica Semanal</h3>
              <p className="text-sm text-gray-400">Rastreamento mental multidimensional</p>
            </div>
            <Activity className="w-6 h-6 text-purple-400 animate-pulse" />
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="day" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #8b5cf6',
                  borderRadius: '12px',
                  color: '#fff'
                }}
              />
              <Line
                type="monotone"
                dataKey="focus"
                stroke="#ec4899"
                strokeWidth={2}
                dot={{ fill: '#ec4899', r: 4 }}
                filter="drop-shadow(0 0 8px rgba(236, 72, 153, 0.5))"
              />
              <Line
                type="monotone"
                dataKey="energy"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={{ fill: '#8b5cf6', r: 4 }}
                filter="drop-shadow(0 0 8px rgba(139, 92, 246, 0.5))"
              />
              <Line
                type="monotone"
                dataKey="stability"
                stroke="#06b6d4"
                strokeWidth={2}
                dot={{ fill: '#06b6d4', r: 4 }}
                filter="drop-shadow(0 0 8px rgba(6, 182, 212, 0.5))"
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
              <span className="text-sm text-gray-400">Foco</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-400">Energia</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
              <span className="text-sm text-gray-400">Estabilidade</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Anxiety Tracking */}
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-yellow-500/20 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Detecção de Ansiedade</h3>
                <p className="text-xs text-gray-400">Monitoramento 24 horas</p>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={anxietyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9ca3af" style={{ fontSize: '10px' }} />
                <YAxis stroke="#9ca3af" style={{ fontSize: '10px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #eab308',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="level"
                  stroke="#eab308"
                  fill="#eab308"
                  fillOpacity={0.3}
                  filter="drop-shadow(0 0 8px rgba(234, 179, 8, 0.4))"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Cognitive Profile */}
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-blue-500/20 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Perfil Cognitivo</h3>
                <p className="text-xs text-gray-400">Capacidades neurais</p>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={cognitiveData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} stroke="#9ca3af" style={{ fontSize: '10px' }} />
                <YAxis type="category" dataKey="metric" stroke="#9ca3af" style={{ fontSize: '10px' }} width={80} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #3b82f6', borderRadius: '12px', color: '#fff' }}
                />
                <Bar dataKey="value" fill="#3b82f6" radius={[0, 6, 6, 0]} filter="drop-shadow(0 0 6px rgba(59, 130, 246, 0.5))" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Daily Productivity */}
        <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-indigo-500/20 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Padrão de Produtividade Diária</h3>
              <p className="text-sm text-gray-400">Horários de pico de desempenho</p>
            </div>
            <Zap className="w-6 h-6 text-indigo-400 animate-pulse" />
          </div>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={productivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="hour" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #6366f1',
                  borderRadius: '12px',
                  color: '#fff'
                }}
              />
              <Bar
                dataKey="value"
                fill="#6366f1"
                radius={[8, 8, 0, 0]}
                filter="drop-shadow(0 0 8px rgba(99, 102, 241, 0.5))"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Analysis Summary */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl border border-purple-500/30 p-6">
          <h3 className="text-lg font-bold text-purple-400 mb-4">Resumo da Análise Neural</h3>
          <div className="space-y-3 text-sm text-gray-300">
            <p className="flex items-start gap-3">
              <span className="text-blue-400">▸</span>
              <span>O desempenho cognitivo apresenta trajetória ascendente consistente com 87% de eficiência geral.</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-purple-400">▸</span>
              <span>Pico de clareza mental detectado no período noturno (21h - 00h).</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-pink-400">▸</span>
              <span>Estabilidade emocional mantendo faixa ótima com flutuações mínimas.</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-cyan-400">▸</span>
              <span>Níveis de foco demonstram consistência excepcional nos padrões semanais.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
