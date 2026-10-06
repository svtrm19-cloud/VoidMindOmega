import { Calendar, Filter } from "lucide-react";
import { BottomNav } from "../components/BottomNav";
import { MatchListItem } from "../components/MatchListItem";
import { LiveMatchCard } from "../components/LiveMatchCard";

export function MatchesPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] pb-20">
      {/* Header */}
      <header className="bg-[#121212] border-b border-gray-800 sticky top-0 z-40">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-white text-xl font-bold">Partidas</h1>
            <button className="w-10 h-10 bg-[#1A1A1A] rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors">
              <Filter className="w-5 h-5" />
            </button>
          </div>
          
          {/* Date Selector */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {["Ontem", "Hoje", "Amanhã", "Sáb 19", "Dom 20"].map((day, idx) => (
              <button
                key={day}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  idx === 1
                    ? "bg-green-600 text-white"
                    : "bg-[#1A1A1A] text-gray-400 hover:bg-[#242424]"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Live Matches */}
        <section>
          <h2 className="text-white text-sm font-bold mb-3 uppercase tracking-wider text-gray-400">
            Ao Vivo
          </h2>
          <div className="space-y-3">
            <LiveMatchCard
              homeTeam="Flamengo"
              awayTeam="Palmeiras"
              homeScore={2}
              awayScore={1}
              minute="78"
              competition="Brasileirão"
            />
            <LiveMatchCard
              homeTeam="Real Madrid"
              awayTeam="Barcelona"
              homeScore={1}
              awayScore={1}
              minute="HT"
              competition="La Liga"
            />
          </div>
        </section>

        {/* Brasileirão */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-green-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
              BR
            </div>
            <h2 className="text-white text-sm font-bold uppercase tracking-wider">
              Brasileirão Série A
            </h2>
          </div>
          <div className="space-y-2">
            <MatchListItem
              homeTeam="São Paulo"
              awayTeam="Corinthians"
              homeScore={0}
              awayScore={0}
              time="45'"
              competition="Brasileirão"
              status="live"
            />
            <MatchListItem
              homeTeam="Santos"
              awayTeam="Grêmio"
              time="20:00"
              competition="Brasileirão"
              status="scheduled"
            />
            <MatchListItem
              homeTeam="Atlético-MG"
              awayTeam="Internacional"
              time="21:30"
              competition="Brasileirão"
              status="scheduled"
            />
          </div>
        </section>

        {/* Premier League */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
              PL
            </div>
            <h2 className="text-white text-sm font-bold uppercase tracking-wider">
              Premier League
            </h2>
          </div>
          <div className="space-y-2">
            <MatchListItem
              homeTeam="Liverpool"
              awayTeam="Man City"
              time="18:30"
              competition="Premier League"
              status="scheduled"
            />
            <MatchListItem
              homeTeam="Arsenal"
              awayTeam="Chelsea"
              time="19:00"
              competition="Premier League"
              status="scheduled"
            />
          </div>
        </section>

        {/* La Liga */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-orange-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
              LL
            </div>
            <h2 className="text-white text-sm font-bold uppercase tracking-wider">
              La Liga
            </h2>
          </div>
          <div className="space-y-2">
            <MatchListItem
              homeTeam="Atlético Madrid"
              awayTeam="Sevilla"
              time="22:00"
              competition="La Liga"
              status="scheduled"
            />
          </div>
        </section>
      </div>

      <BottomNav />
    </div>
  );
}
