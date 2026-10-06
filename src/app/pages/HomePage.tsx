import { Bell, Plus, Calendar as CalendarIcon, CheckCircle2, TrendingUp, Sparkles } from "lucide-react";
import { BottomNav } from "../components/BottomNav";
import { TaskCard } from "../components/TaskCard";
import { ExamCard } from "../components/ExamCard";
import { ProgressCard } from "../components/ProgressCard";
import { Header } from "../components/Header";

export function HomePage() {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Bom dia" : currentHour < 18 ? "Boa tarde" : "Boa noite";

  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-24">
      {/* App Header */}
      <Header />
      
      {/* Header with Gradient */}
      <header className="bg-gradient-to-b from-[#0f0f0f] via-[#0d0d0d] to-[#0a0a0a] border-b border-gray-800/30 sticky top-0 z-40 backdrop-blur-xl">
        <div className="max-w-lg mx-auto px-5 py-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-white text-2xl font-bold tracking-tight">{greeting}, Samuel</h1>
              </div>
              <p className="text-gray-400 text-sm font-medium">Terça-feira, 18 de Março de 2026</p>
            </div>
            <button className="w-12 h-12 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 border border-gray-700/50 hover:border-emerald-500/30 shadow-lg relative group">
              <Bell className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-[#0f0f0f]" />
            </button>
          </div>
          
          {/* Quick Stats - Enhanced */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gradient-to-br from-emerald-500/10 via-emerald-600/5 to-transparent rounded-2xl p-4 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
              <p className="text-white text-2xl font-bold mb-1">5</p>
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide">Pendentes</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500/10 via-blue-600/5 to-transparent rounded-2xl p-4 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <CalendarIcon className="w-4 h-4 text-blue-400" />
                </div>
              </div>
              <p className="text-white text-2xl font-bold mb-1">2</p>
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide">Avaliações</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500/10 via-purple-600/5 to-transparent rounded-2xl p-4 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-purple-400" />
                </div>
              </div>
              <p className="text-white text-2xl font-bold mb-1">8.5</p>
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide">Média Geral</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-5 py-6 space-y-8">
        {/* Tarefas de Hoje */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-8 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full" />
              <h2 className="text-white text-xl font-bold">Tarefas de Hoje</h2>
            </div>
            <button className="text-emerald-400 text-sm font-bold hover:text-emerald-300 transition-colors hover:underline">
              Ver todas
            </button>
          </div>
          
          <div className="space-y-3">
            <TaskCard
              title="Exercícios de Álgebra - Capítulo 5"
              subject="Matemática"
              dueDate="Hoje às 23:59"
              priority="high"
            />
            <TaskCard
              title="Leitura: Capítulo 3 - Revolução Industrial"
              subject="História"
              dueDate="Hoje às 18:00"
              priority="medium"
            />
            <TaskCard
              title="Relatório de Experimento - Densidade"
              subject="Física"
              dueDate="Amanhã às 08:00"
              priority="low"
              completed
            />
          </div>
          
          <button className="w-full mt-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 hover:scale-[1.02]">
            <Plus className="w-5 h-5" />
            Nova Tarefa
          </button>
        </section>

        {/* Próximas Avaliações */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-8 bg-gradient-to-b from-red-500 to-rose-500 rounded-full" />
              <h2 className="text-white text-xl font-bold">Próximas Avaliações</h2>
            </div>
          </div>
          
          <div className="space-y-3">
            <ExamCard
              subject="Matemática"
              title="Avaliação - Funções e Equações"
              date="20 de Março"
              time="08:00"
              daysUntil={2}
            />
            <ExamCard
              subject="Química"
              title="Prova Bimestral"
              date="22 de Março"
              time="10:00"
              daysUntil={4}
            />
          </div>
        </section>

        {/* Progresso por Matéria */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full" />
              <h2 className="text-white text-xl font-bold">Progresso por Matéria</h2>
            </div>
          </div>
          
          <div className="space-y-3">
            <ProgressCard
              subject="Matemática"
              completed={8}
              total={10}
              percentage={80}
            />
            <ProgressCard
              subject="História"
              completed={12}
              total={15}
              percentage={80}
            />
            <ProgressCard
              subject="Física"
              completed={5}
              total={8}
              percentage={63}
            />
          </div>
        </section>
      </div>

      <BottomNav />
    </div>
  );
}