import { Trophy, Target, Users, TrendingUp } from "lucide-react";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface TopScorer {
  name: string;
  team: string;
  goals: number;
  matches: number;
  assists: number;
}

export function Stats() {
  const topScorers: TopScorer[] = [
    { name: "Pedro", team: "Flamengo", goals: 18, matches: 15, assists: 5 },
    { name: "Calleri", team: "São Paulo", goals: 16, matches: 15, assists: 3 },
    { name: "Hulk", team: "Atlético-MG", goals: 15, matches: 14, assists: 7 },
    { name: "Rony", team: "Palmeiras", goals: 14, matches: 15, assists: 4 },
    { name: "Vegetti", team: "Vasco", goals: 13, matches: 15, assists: 2 },
  ];

  const teamStats = [
    { team: "Palmeiras", gols: 32 },
    { team: "Flamengo", gols: 30 },
    { team: "Atlético-MG", gols: 27 },
    { team: "Internacional", gols: 25 },
    { team: "São Paulo", gols: 24 },
  ];

  const possessionData = [
    { name: "Posse de Bola", value: 58, id: "possession" },
    { name: "Adversário", value: 42, id: "opponent" },
  ];

  const COLORS = ["#10b981", "#ef4444"];

  return (
    <div className="space-y-6">
      {/* Top Scorers */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-6 h-6 text-green-600" />
          <h2 className="text-2xl font-semibold">Artilharia</h2>
        </div>

        <div className="grid gap-3">
          {topScorers.map((scorer, index) => (
            <Card key={`${scorer.name}-${scorer.team}`} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-semibold text-lg">{scorer.name}</span>
                      <span className="text-sm text-muted-foreground">{scorer.team}</span>
                    </div>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span>⚽ {scorer.goals} gols</span>
                      <span>🎯 {scorer.assists} assistências</span>
                      <span>📊 {scorer.matches} jogos</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-600">{scorer.goals}</div>
                  <div className="text-xs text-muted-foreground">gols</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Team Stats */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-semibold">Times com Mais Gols</h2>
        </div>

        <Card className="p-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={teamStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="team" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="gols" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Match Statistics */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Posse de Bola Média</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={possessionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {possessionData.map((entry) => (
                  <Cell key={entry.id} fill={COLORS[possessionData.indexOf(entry)]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-6">Estatísticas Gerais</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Finalizações por Jogo</span>
                <span className="text-sm font-semibold">14.2</span>
              </div>
              <Progress value={71} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Passes Certos (%)</span>
                <span className="text-sm font-semibold">82%</span>
              </div>
              <Progress value={82} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Desarmes por Jogo</span>
                <span className="text-sm font-semibold">18.5</span>
              </div>
              <Progress value={62} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Faltas por Jogo</span>
                <span className="text-sm font-semibold">12.3</span>
              </div>
              <Progress value={41} className="h-2" />
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">2.1</div>
              <div className="text-xs text-muted-foreground">Gols/Jogo</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">45%</div>
              <div className="text-xs text-muted-foreground">Precisão</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">267</div>
              <div className="text-xs text-muted-foreground">Total Gols</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">156</div>
              <div className="text-xs text-muted-foreground">Partidas</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}