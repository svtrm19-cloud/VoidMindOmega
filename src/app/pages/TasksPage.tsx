import { Plus, Filter, Search, SlidersHorizontal, CheckCircle2 } from "lucide-react";
import { BottomNav } from "../components/BottomNav";
import { TaskCard } from "../components/TaskCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Header } from "../components/Header";
import { useState } from "react";

export function TasksPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-24">
      {/* App Header */}
      <Header />
      
      {/* Header */}
      <header className="bg-gradient-to-b from-[#0f0f0f] via-[#0d0d0d] to-[#0a0a0a] border-b border-gray-800/30 sticky top-0 z-40 backdrop-blur-xl">
        <div className="max-w-lg mx-auto px-5 py-6">
          <div className="flex items-center justify-between mb-5">
            <h1 className="text-white text-2xl font-bold tracking-tight">Gestão de Tarefas</h1>
            <button className="w-12 h-12 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl flex items-center justify-center text-gray-400 hover:text-emerald-400 transition-all duration-300 border border-gray-700/50 hover:border-emerald-500/30 shadow-lg group">
              <SlidersHorizontal className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar tarefas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-gray-800/50 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all"
            />
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-5 py-6">
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-[#1a1a1a] border border-gray-800/50 p-1.5 rounded-2xl">
            <TabsTrigger 
              value="all"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl font-bold text-sm transition-all"
            >
              Todas
            </TabsTrigger>
            <TabsTrigger 
              value="pending"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl font-bold text-sm transition-all"
            >
              Pendentes
            </TabsTrigger>
            <TabsTrigger 
              value="completed"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl font-bold text-sm transition-all"
            >
              Feitas
            </TabsTrigger>
            <TabsTrigger 
              value="overdue"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl font-bold text-sm transition-all"
            >
              Atrasadas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-7">
            {/* Hoje */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                <h2 className="text-gray-400 text-sm font-bold uppercase tracking-wider">Hoje</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-gray-800 to-transparent" />
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
              </div>
            </section>

            {/* Amanhã */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <h2 className="text-gray-400 text-sm font-bold uppercase tracking-wider">Amanhã</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-gray-800 to-transparent" />
              </div>
              <div className="space-y-3">
                <TaskCard
                  title="Relatório de Experimento - Densidade"
                  subject="Física"
                  dueDate="Amanhã às 08:00"
                  priority="high"
                />
                <TaskCard
                  title="Resumo - Ciclo da Água"
                  subject="Biologia"
                  dueDate="Amanhã às 23:59"
                  priority="low"
                />
              </div>
            </section>

            {/* Esta Semana */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                <h2 className="text-gray-400 text-sm font-bold uppercase tracking-wider">Esta Semana</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-gray-800 to-transparent" />
              </div>
              <div className="space-y-3">
                <TaskCard
                  title="Trabalho em Grupo - Guerra Fria"
                  subject="História"
                  dueDate="Sexta às 23:59"
                  priority="medium"
                />
                <TaskCard
                  title="Exercícios de Gramática"
                  subject="Português"
                  dueDate="Quinta às 23:59"
                  priority="low"
                />
                <TaskCard
                  title="Lista de Exercícios - Física Moderna"
                  subject="Física"
                  dueDate="Sábado às 23:59"
                  priority="medium"
                />
              </div>
            </section>
          </TabsContent>

          <TabsContent value="pending" className="space-y-3">
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
              priority="high"
            />
          </TabsContent>

          <TabsContent value="completed" className="space-y-3">
            <TaskCard
              title="Resumo - Ciclo da Água"
              subject="Biologia"
              dueDate="Concluída"
              priority="low"
              completed
            />
            <TaskCard
              title="Lista de Exercícios - Física Moderna"
              subject="Física"
              dueDate="Concluída"
              priority="medium"
              completed
            />
          </TabsContent>

          <TabsContent value="overdue" className="space-y-3">
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>
              <p className="text-gray-400 font-semibold text-lg">Nenhuma tarefa atrasada</p>
              <p className="text-gray-600 text-sm mt-2">Todas as atividades estão em dia</p>
            </div>
          </TabsContent>
        </Tabs>

        {/* FAB Button */}
        <button className="fixed bottom-24 right-5 w-16 h-16 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/40 transition-all duration-300 hover:scale-110 hover:rotate-90 z-50">
          <Plus className="w-7 h-7" />
        </button>
      </div>

      <BottomNav />
    </div>
  );
}