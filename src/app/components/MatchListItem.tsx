import { Clock } from "lucide-react";

interface MatchListItemProps {
  homeTeam: string;
  awayTeam: string;
  time: string;
  homeScore?: number;
  awayScore?: number;
  competition: string;
  status: "scheduled" | "live" | "finished";
}

export function MatchListItem({
  homeTeam,
  awayTeam,
  time,
  homeScore,
  awayScore,
  competition,
  status,
}: MatchListItemProps) {
  return (
    <div className="bg-[#1A1A1A] rounded-lg border border-gray-800 p-4 hover:border-gray-700 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <span className="text-gray-500 text-xs">{competition}</span>
        {status === "live" && (
          <span className="text-red-500 text-xs font-semibold flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
            LIVE
          </span>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-blue-700 rounded text-white text-[10px] font-bold flex items-center justify-center">
              {homeTeam.substring(0, 2).toUpperCase()}
            </div>
            <span className="text-white text-sm font-medium">{homeTeam}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-red-600 to-red-700 rounded text-white text-[10px] font-bold flex items-center justify-center">
              {awayTeam.substring(0, 2).toUpperCase()}
            </div>
            <span className="text-white text-sm font-medium">{awayTeam}</span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center min-w-[60px]">
          {status === "scheduled" ? (
            <div className="flex items-center gap-1.5 text-gray-400">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-semibold">{time}</span>
            </div>
          ) : (
            <>
              <span className="text-xl font-bold text-white">{homeScore}</span>
              <span className="text-xl font-bold text-white">{awayScore}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
