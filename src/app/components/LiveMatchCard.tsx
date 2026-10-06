import { ChevronRight } from "lucide-react";

interface LiveMatchCardProps {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  minute: string;
  competition: string;
}

export function LiveMatchCard({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  minute,
  competition,
}: LiveMatchCardProps) {
  return (
    <div className="bg-[#1A1A1A] rounded-xl border border-gray-800 overflow-hidden hover:border-gray-700 transition-colors">
      <div className="px-4 py-3 bg-gradient-to-r from-red-600/20 to-red-600/10 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-red-500 text-sm font-semibold">AO VIVO</span>
          <span className="text-gray-400 text-sm">• {minute}'</span>
        </div>
        <span className="text-gray-500 text-xs">{competition}</span>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white text-xs font-bold">
              {homeTeam.substring(0, 3).toUpperCase()}
            </div>
            <span className="text-white font-medium">{homeTeam}</span>
          </div>
          <span className="text-2xl font-bold text-white mx-4">{homeScore}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center text-white text-xs font-bold">
              {awayTeam.substring(0, 3).toUpperCase()}
            </div>
            <span className="text-white font-medium">{awayTeam}</span>
          </div>
          <span className="text-2xl font-bold text-white mx-4">{awayScore}</span>
        </div>
      </div>

      <div className="px-4 pb-3">
        <button className="w-full py-2 bg-[#242424] hover:bg-[#2A2A2A] rounded-lg flex items-center justify-center gap-2 text-gray-300 text-sm font-medium transition-colors">
          Ver detalhes
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
