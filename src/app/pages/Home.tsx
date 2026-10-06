import { Bell, ChevronRight } from "lucide-react";
import { BottomNav } from "../components/BottomNav";
import { LiveMatchCard } from "../components/LiveMatchCard";
import { MatchListItem } from "../components/MatchListItem";
import { FeaturedTeamCard } from "../components/FeaturedTeamCard";
import { NewsArticle } from "../components/NewsArticle";

export function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] pb-20">
      {/* Header */}
      <header className="bg-[#121212] border-b border-gray-800 sticky top-0 z-40">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white text-xl font-bold">FutScore</h1>
              <p className="text-gray-500 text-xs">Hoje, 17 Mar 2026</p>
            </div>
            <button className="w-10 h-10 bg-[#1A1A1A] rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors relative">
              <Bell className="w-5 h-5" />
              <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Live Matches Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white text-lg font-bold">Ao Vivo</h2>
            <button className="text-green-500 text-sm font-medium flex items-center gap-1 hover:text-green-400 transition-colors">
              Ver todos
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
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

        {/* Today's Matches */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white text-lg font-bold">Partidas de Hoje</h2>
            <button className="text-gray-500 text-sm font-medium flex items-center gap-1 hover:text-gray-400 transition-colors">
              Ver todas
              <ChevronRight className="w-4 h-4" />
            </button>
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
              homeTeam="São Paulo"
              awayTeam="Corinthians"
              homeScore={0}
              awayScore={0}
              time="45'"
              competition="Brasileirão"
              status="live"
            />
            <MatchListItem
              homeTeam="PSG"
              awayTeam="Monaco"
              homeScore={3}
              awayScore={2}
              time="FT"
              competition="Ligue 1"
              status="finished"
            />
            <MatchListItem
              homeTeam="Inter Milan"
              awayTeam="AC Milan"
              time="20:45"
              competition="Serie A"
              status="scheduled"
            />
          </div>
        </section>

        {/* Featured Teams */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white text-lg font-bold">Times em Destaque</h2>
            <button className="text-gray-500 text-sm font-medium flex items-center gap-1 hover:text-gray-400 transition-colors">
              Ver mais
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <FeaturedTeamCard
              name="Palmeiras"
              position={1}
              points={36}
              form={["W", "W", "D", "W", "W"]}
            />
            <FeaturedTeamCard
              name="Flamengo"
              position={2}
              points={34}
              form={["W", "W", "W", "D", "W"]}
            />
            <FeaturedTeamCard
              name="Atlético-MG"
              position={3}
              points={32}
              form={["D", "W", "W", "D", "W"]}
            />
          </div>
        </section>

        {/* News Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white text-lg font-bold">Notícias</h2>
            <button className="text-gray-500 text-sm font-medium flex items-center gap-1 hover:text-gray-400 transition-colors">
              Ver todas
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid gap-3">
            <NewsArticle
              title="Flamengo vence Palmeiras em jogo emocionante no Maracanã"
              category="Brasileirão"
              time="Há 2 horas"
              image="https://images.unsplash.com/photo-1549923015-badf41b04831?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjBzdGFkaXVtJTIwY3Jvd2R8ZW58MXx8fHwxNzczNzEwOTEyfDA&ixlib=rb-4.1.0&q=80&w=1080"
            />
            <NewsArticle
              title="Artilheiro da temporada revela segredo para sequência de gols"
              category="Entrevista"
              time="Há 5 horas"
              image="https://images.unsplash.com/photo-1657957746418-6a38df9e1ea7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMHBsYXllciUyMGFjdGlvbnxlbnwxfHx8fDE3NzM2NjkzOTl8MA&ixlib=rb-4.1.0&q=80&w=1080"
            />
            <NewsArticle
              title="Técnico analisa vitória e projeta próximo desafio na Libertadores"
              category="Análise"
              time="Há 8 horas"
              image="https://images.unsplash.com/photo-1599204607024-c25aceee0337?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjBiYWxsJTIwZ29hbCUyMG5ldHxlbnwxfHx8fDE3NzM2NTU3ODd8MA&ixlib=rb-4.1.0&q=80&w=1080"
            />
          </div>
        </section>
      </div>

      <BottomNav />
    </div>
  );
}
