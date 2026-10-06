import { Bell, Plus, Filter } from "lucide-react";
import { BottomNav } from "../components/BottomNav";
import { ReminderCard } from "../components/ReminderCard";
import { Header } from "../components/Header";

export function RemindersPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-24">
      {/* App Header */}
      <Header />
      
      {/* Header */}
      <header className="bg-gradient-to-b from-[#0f0f0f] via-[#0d0d0d] to-[#0a0a0a] border-b border-gray-800/30 sticky top-0 z-40 backdrop-blur-xl">
        <div className="max-w-lg mx-auto px-5 py-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-white text-2xl font-bold tracking-tight">Lembretes</h1>
                <p className="text-gray-400 text-sm font-medium">5 avisos importantes</p>
              </div>
            </div>
            <button className="w-12 h-12 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl flex items-center justify-center text-gray-400 hover:text-emerald-400 transition-all duration-300 border border-gray-700/50 hover:border-emerald-500/30 shadow-lg group">
              <Filter className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-5 py-6 space-y-7">
        {/* Urgentes */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1.5 h-8 bg-gradient-to-b from-red-500 to-rose-500 rounded-full" />
            <h2 className="text-white text-lg font-bold">Urgentes</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-gray-800 to-transparent" />
          </div>
          
          <div className="space-y-3">
            <ReminderCard
              type="urgent"
              title="Entrega de Trabalho - Física"
              description="Trabalho sobre Física Quântica deve ser entregue até hoje às 23:59. Não esqueça de enviar pelo portal!"
              date="Hoje às 23:59"
            />
          </div>
        </section>

        {/* Importantes */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1.5 h-8 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full" />
            <h2 className="text-white text-lg font-bold">Importantes</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-gray-800 to-transparent" />
          </div>
          
          <div className="space-y-3">
            <ReminderCard
              type="important"
              title="Reunião de Pais"
              description="Reunião de pais e mestres será realizada na próxima sexta-feira às 19:00. Presença obrigatória."
              date="Sexta, 21 de Março às 19:00"
            />
            <ReminderCard
              type="important"
              title="Material de Laboratório"
              description="Trazer jaleco e óculos de proteção para a aula de Química na próxima terça-feira."
              date="Terça, 25 de Março"
            />
          </div>
        </section>

        {/* Eventos */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1.5 h-8 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full" />
            <h2 className="text-white text-lg font-bold">Eventos</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-gray-800 to-transparent" />
          </div>
          
          <div className="space-y-3">
            <ReminderCard
              type="event"
              title="Feira de Ciências"
              description="A Feira de Ciências acontecerá no dia 28 de Março. Prepare seu projeto e apresentação."
              date="28 de Março - Dia todo"
            />
            <ReminderCard
              type="event"
              title="Excursão - Museu de Ciências"
              description="Visita programada ao Museu de Ciências. Trazer autorização dos pais e lanche."
              date="30 de Março às 08:00"
            />
          </div>
        </section>

        {/* Informativos */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1.5 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full" />
            <h2 className="text-white text-lg font-bold">Informativos</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-gray-800 to-transparent" />
          </div>
          
          <div className="space-y-3">
            <ReminderCard
              type="info"
              title="Horário de Atendimento"
              description="O professor de Matemática estará disponível para atendimento extra na sala 201, quartas às 16:00."
              date="Toda Quarta-feira"
            />
          </div>
        </section>

        {/* Empty State quando não houver lembretes futuros */}
        <div className="bg-gradient-to-br from-[#1a1a1a] via-[#171717] to-[#151515] rounded-2xl border border-gray-800/50 p-8 text-center">
          <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bell className="w-8 h-8 text-emerald-400" />
          </div>
          <p className="text-gray-400 font-semibold mb-2">Sistema atualizado</p>
          <p className="text-gray-600 text-sm">Não há novos lembretes no momento</p>
        </div>
      </div>

      {/* FAB Button */}
      <button className="fixed bottom-24 right-5 w-16 h-16 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/40 transition-all duration-300 hover:scale-110 hover:rotate-90 z-50">
        <Plus className="w-7 h-7" />
      </button>

      <BottomNav />
    </div>
  );
}