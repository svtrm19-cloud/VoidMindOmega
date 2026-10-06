import { Calendar, MapPin, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
  return (
    <section className="relative h-[500px] overflow-hidden">
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1549923015-badf41b04831?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjBzdGFkaXVtJTIwY3Jvd2R8ZW58MXx8fHwxNzczNTk1MTM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Estádio de futebol"
          className="size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      </div>

      <div className="container relative mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600 mb-4">
            <div className="size-2 rounded-full bg-white animate-pulse" />
            <span className="text-xs font-semibold uppercase">Ao Vivo</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Final do Campeonato
          </h1>
          
          <div className="flex items-center gap-8 mb-6 text-3xl md:text-4xl font-bold">
            <div className="text-center">
              <div className="mb-2">Barcelona</div>
              <div className="text-5xl md:text-6xl text-green-400">2</div>
            </div>
            <div className="text-2xl opacity-50">×</div>
            <div className="text-center">
              <div className="mb-2">Real Madrid</div>
              <div className="text-5xl md:text-6xl text-green-400">2</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="size-4" />
              <span>16 de Março, 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="size-4" />
              <span>Camp Nou, Barcelona</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="size-4" />
              <span>87' - 2º Tempo</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
