import { Calendar, MapPin } from 'lucide-react';
import { Card } from './ui/card';

interface MatchCardProps {
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  date: string;
  time: string;
  stadium: string;
  status: 'live' | 'upcoming' | 'finished';
  league: string;
}

export function MatchCard({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  date,
  time,
  stadium,
  status,
  league,
}: MatchCardProps) {
  return (
    <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-gray-600">{league}</span>
        {status === 'live' && (
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-600 text-white">
            <div className="size-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-xs font-semibold">AO VIVO</span>
          </div>
        )}
        {status === 'finished' && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200 text-gray-700">
            Encerrado
          </span>
        )}
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="size-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-400" />
            <span className="font-semibold">{homeTeam}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-gradient-to-br from-red-600 to-red-400" />
            <span className="font-semibold">{awayTeam}</span>
          </div>
        </div>

        <div className="text-center">
          {status !== 'upcoming' ? (
            <>
              <div className="text-2xl font-bold mb-1">{homeScore}</div>
              <div className="text-2xl font-bold">{awayScore}</div>
            </>
          ) : (
            <div className="text-sm text-gray-500">{time}</div>
          )}
        </div>
      </div>

      <div className="pt-3 border-t space-y-1 text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <Calendar className="size-3" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="size-3" />
          <span>{stadium}</span>
        </div>
      </div>
    </Card>
  );
}
