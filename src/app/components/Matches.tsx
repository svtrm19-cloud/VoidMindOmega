import { Trophy, Clock, Calendar } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  time: string;
  status: "live" | "finished" | "scheduled";
  date: string;
  competition: string;
}

export function Matches() {
  const matches: Match[] = [
    {
      id: "1",
      homeTeam: "Flamengo",
      awayTeam: "Palmeiras",
      homeScore: 2,
      awayScore: 1,
      time: "85'",
      status: "live",
      date: "Hoje",
      competition: "Brasileirão",
    },
    {
      id: "2",
      homeTeam: "São Paulo",
      awayTeam: "Corinthians",
      homeScore: 1,
      awayScore: 1,
      time: "HT",
      status: "live",
      date: "Hoje",
      competition: "Brasileirão",
    },
    {
      id: "3",
      homeTeam: "Real Madrid",
      awayTeam: "Barcelona",
      homeScore: 3,
      awayScore: 2,
      time: "FT",
      status: "finished",
      date: "Ontem",
      competition: "La Liga",
    },
    {
      id: "4",
      homeTeam: "Liverpool",
      awayTeam: "Man City",
      time: "18:30",
      status: "scheduled",
      date: "Amanhã",
      competition: "Premier League",
    },
    {
      id: "5",
      homeTeam: "Santos",
      awayTeam: "Grêmio",
      time: "20:00",
      status: "scheduled",
      date: "Amanhã",
      competition: "Brasileirão",
    },
    {
      id: "6",
      homeTeam: "PSG",
      awayTeam: "Monaco",
      homeScore: 2,
      awayScore: 0,
      time: "FT",
      status: "finished",
      date: "Ontem",
      competition: "Ligue 1",
    },
  ];

  const liveMatches = matches.filter((m) => m.status === "live");
  const finishedMatches = matches.filter((m) => m.status === "finished");
  const scheduledMatches = matches.filter((m) => m.status === "scheduled");

  return (
    <div className="space-y-6">
      {/* Live Matches */}
      {liveMatches.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <h2 className="text-xl font-semibold">Ao Vivo</h2>
          </div>
          <div className="space-y-3">
            {liveMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </div>
      )}

      {/* Scheduled Matches */}
      {scheduledMatches.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl font-semibold">Próximos Jogos</h2>
          </div>
          <div className="space-y-3">
            {scheduledMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </div>
      )}

      {/* Finished Matches */}
      {finishedMatches.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-green-600" />
            <h2 className="text-xl font-semibold">Resultados</h2>
          </div>
          <div className="space-y-3">
            {finishedMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MatchCard({ match }: { match: Match }) {
  return (
    <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted-foreground">{match.competition}</span>
        <div className="flex items-center gap-2">
          {match.status === "live" && (
            <Badge variant="destructive" className="animate-pulse">
              AO VIVO
            </Badge>
          )}
          <span className="text-sm text-muted-foreground">{match.date}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        {/* Home Team */}
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              {match.homeTeam.substring(0, 2).toUpperCase()}
            </div>
            <span className="font-semibold">{match.homeTeam}</span>
          </div>
        </div>

        {/* Score or Time */}
        <div className="flex items-center gap-4 mx-6">
          {match.status === "scheduled" ? (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span className="font-semibold">{match.time}</span>
            </div>
          ) : (
            <>
              <span className="text-2xl font-bold w-8 text-center">
                {match.homeScore}
              </span>
              <span className="text-muted-foreground">-</span>
              <span className="text-2xl font-bold w-8 text-center">
                {match.awayScore}
              </span>
              {match.status === "live" && (
                <Badge variant="outline" className="ml-2">
                  {match.time}
                </Badge>
              )}
            </>
          )}
        </div>

        {/* Away Team */}
        <div className="flex-1">
          <div className="flex items-center gap-3 justify-end">
            <span className="font-semibold">{match.awayTeam}</span>
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-semibold">
              {match.awayTeam.substring(0, 2).toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
