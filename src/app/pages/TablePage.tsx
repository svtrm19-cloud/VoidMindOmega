import { ChevronDown } from "lucide-react";
import { BottomNav } from "../components/BottomNav";

interface Team {
  position: number;
  name: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalDifference: number;
  points: number;
  trend: "up" | "down" | "same";
}

export function TablePage() {
  const teams: Team[] = [
    { position: 1, name: "Palmeiras", played: 15, won: 11, drawn: 3, lost: 1, goalDifference: 20, points: 36, trend: "same" },
    { position: 2, name: "Flamengo", played: 15, won: 10, drawn: 4, lost: 1, goalDifference: 16, points: 34, trend: "up" },
    { position: 3, name: "Atlético-MG", played: 15, won: 9, drawn: 5, lost: 1, goalDifference: 14, points: 32, trend: "same" },
    { position: 4, name: "Internacional", played: 15, won: 9, drawn: 3, lost: 3, goalDifference: 10, points: 30, trend: "down" },
    { position: 5, name: "São Paulo", played: 15, won: 8, drawn: 5, lost: 2, goalDifference: 8, points: 29, trend: "up" },
    { position: 6, name: "Corinthians", played: 15, won: 7, drawn: 6, lost: 2, goalDifference: 7, points: 27, trend: "same" },
    { position: 7, name: "Grêmio", played: 15, won: 7, drawn: 4, lost: 4, goalDifference: 3, points: 25, trend: "down" },
    { position: 8, name: "Fluminense", played: 15, won: 6, drawn: 6, lost: 3, goalDifference: 3, points: 24, trend: "same" },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] pb-20">
      {/* Header */}
      <header className="bg-[#121212] border-b border-gray-800 sticky top-0 z-40">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className="text-white text-xl font-bold mb-4">Classificação</h1>
          
          {/* Competition Selector */}
          <button className="w-full bg-[#1A1A1A] rounded-lg px-4 py-3 flex items-center justify-between text-white hover:bg-[#242424] transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-green-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                BR
              </div>
              <span className="font-medium">Brasileirão Série A</span>
            </div>
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Legend */}
        <div className="flex gap-3 mb-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-green-600 rounded" />
            <span className="text-gray-400">Libertadores</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-blue-600 rounded" />
            <span className="text-gray-400">Pré-Lib.</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-orange-600 rounded" />
            <span className="text-gray-400">Sul-Americana</span>
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#121212] rounded-xl border border-gray-800 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-[40px_1fr_40px_40px_40px_40px_50px_50px] gap-2 px-3 py-3 border-b border-gray-800 text-gray-500 text-xs font-medium">
            <div>#</div>
            <div>Time</div>
            <div className="text-center">J</div>
            <div className="text-center">V</div>
            <div className="text-center">E</div>
            <div className="text-center">D</div>
            <div className="text-center">SG</div>
            <div className="text-center">PTS</div>
          </div>

          {/* Table Rows */}
          {teams.map((team) => (
            <div
              key={team.position}
              className="grid grid-cols-[40px_1fr_40px_40px_40px_40px_50px_50px] gap-2 px-3 py-3 border-b border-gray-800 hover:bg-[#1A1A1A] transition-colors last:border-b-0"
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-1 h-8 rounded-full ${
                    team.position <= 4
                      ? "bg-green-600"
                      : team.position <= 6
                      ? "bg-blue-600"
                      : team.position <= 12
                      ? "bg-orange-600"
                      : "bg-transparent"
                  }`}
                />
                <span className="text-white font-semibold text-sm">{team.position}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-blue-700 rounded flex items-center justify-center text-white text-[10px] font-bold">
                  {team.name.substring(0, 2).toUpperCase()}
                </div>
                <span className="text-white font-medium text-sm truncate">{team.name}</span>
              </div>
              
              <div className="text-center text-gray-400 text-sm flex items-center justify-center">
                {team.played}
              </div>
              <div className="text-center text-gray-400 text-sm flex items-center justify-center">
                {team.won}
              </div>
              <div className="text-center text-gray-400 text-sm flex items-center justify-center">
                {team.drawn}
              </div>
              <div className="text-center text-gray-400 text-sm flex items-center justify-center">
                {team.lost}
              </div>
              <div className="text-center text-gray-400 text-sm flex items-center justify-center font-medium">
                {team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference}
              </div>
              <div className="text-center text-white text-sm flex items-center justify-center font-bold">
                {team.points}
              </div>
            </div>
          ))}
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          <div className="bg-[#1A1A1A] rounded-lg border border-gray-800 p-4 text-center">
            <div className="text-2xl font-bold text-white mb-1">156</div>
            <div className="text-xs text-gray-500">Partidas</div>
          </div>
          <div className="bg-[#1A1A1A] rounded-lg border border-gray-800 p-4 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">387</div>
            <div className="text-xs text-gray-500">Gols</div>
          </div>
          <div className="bg-[#1A1A1A] rounded-lg border border-gray-800 p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">2.48</div>
            <div className="text-xs text-gray-500">Média/Jogo</div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
