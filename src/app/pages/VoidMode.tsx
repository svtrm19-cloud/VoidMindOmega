import { useEffect, useState } from "react";
import { Circle, Volume2, VolumeX } from "lucide-react";

const PHILOSOPHICAL_QUOTES = [
  "No vazio, nos encontramos.",
  "O silêncio fala mais alto que o ruído.",
  "A mente em repouso enxerga tudo.",
  "A solidão é a forja da sabedoria.",
  "Na escuridão, a clareza emerge.",
  "O observador torna-se o observado.",
  "A consciência flui como a água.",
  "O tempo é uma ilusão da mente inquieta.",
  "No vazio, existem possibilidades infinitas.",
  "Os pensamentos mais profundos florescem no silêncio.",
  "Somos o universo se experienciando.",
  "O isolamento revela a verdade.",
  "O vazio contém tudo.",
  "A quietude é a maior professora.",
  "Na ausência do ruído, a sabedoria fala.",
];

export function VoidMode() {
  const [time, setTime] = useState(new Date());
  const [quote, setQuote] = useState(PHILOSOPHICAL_QUOTES[0]);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([]);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Change quote every 15 seconds
  useEffect(() => {
    const quoteTimer = setInterval(() => {
      const nextIndex = (quoteIndex + 1) % PHILOSOPHICAL_QUOTES.length;
      setQuoteIndex(nextIndex);
      setQuote(PHILOSOPHICAL_QUOTES[nextIndex]);
    }, 15000);
    return () => clearInterval(quoteTimer);
  }, [quoteIndex]);

  // Generate particles
  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');
  const date = time.toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black"></div>

      {/* Floating Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-purple-500/30 rounded-full blur-sm animate-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${15 + Math.random() * 10}s`,
          }}
        ></div>
      ))}

      {/* Center Void Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10">
        <div className="relative w-96 h-96">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute inset-20 border border-purple-500/10 rounded-full animate-spin" style={{ animationDuration: '30s' }}></div>
          <div className="absolute inset-32 border border-blue-500/10 rounded-full animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }}></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-12 px-6">
        {/* Logo */}
        <div className="flex items-center gap-3 opacity-50">
          <Circle className="w-6 h-6 text-purple-400" />
          <span className="text-sm text-gray-500 tracking-[0.3em] font-light">MODO VOID</span>
        </div>

        {/* Clock */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <div className="text-[8rem] md:text-[12rem] font-thin text-white tracking-tight leading-none opacity-90">
              {hours}
            </div>
            <div className="text-[8rem] md:text-[12rem] font-thin text-purple-500/50 animate-pulse">
              :
            </div>
            <div className="text-[8rem] md:text-[12rem] font-thin text-white tracking-tight leading-none opacity-90">
              {minutes}
            </div>
            <div className="text-[8rem] md:text-[12rem] font-thin text-purple-500/50 animate-pulse">
              :
            </div>
            <div className="text-[8rem] md:text-[12rem] font-thin text-white/50 tracking-tight leading-none">
              {seconds}
            </div>
          </div>
          <div className="text-sm text-gray-600 tracking-widest uppercase">
            {date}
          </div>
        </div>

        {/* Philosophical Quote */}
        <div className="max-w-2xl text-center">
          <p className="text-2xl md:text-3xl text-gray-400 font-light leading-relaxed animate-fade-in">
            "{quote}"
          </p>
        </div>

        {/* Ambient Controls */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="w-12 h-12 rounded-full backdrop-blur-xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-purple-500/50 transition-all group"
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-gray-500 group-hover:text-purple-400 transition-colors" />
            ) : (
              <Volume2 className="w-5 h-5 text-purple-400" />
            )}
          </button>

          <div className="flex gap-2">
            <div className="w-2 h-2 bg-purple-500/30 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-blue-500/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="w-2 h-2 bg-indigo-500/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

        {/* Breathing Guide */}
        <div className="text-center space-y-3 opacity-50">
          <div className="text-xs text-gray-600 tracking-widest uppercase">Respire</div>
          <div className="flex items-center justify-center gap-3">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
            <Circle className="w-4 h-4 text-purple-500/30 animate-pulse" />
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Bottom Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-px h-12 bg-gradient-to-b from-purple-500/30 to-transparent"></div>
        <div className="text-xs text-gray-700 tracking-[0.3em]">NO VAZIO</div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.3;
          }
          50% {
            transform: translate(0, -30px);
            opacity: 0.6;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
}
