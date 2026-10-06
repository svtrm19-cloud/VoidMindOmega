import { GraduationCap } from "lucide-react";

export function Header() {
  return (
    <div className="bg-gradient-to-r from-emerald-600 to-teal-600 py-3 px-5 border-b border-emerald-700/50">
      <div className="max-w-lg mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg tracking-tight">StudyHub</h1>
            <p className="text-emerald-100 text-xs font-medium">Sistema de Gestão Acadêmica</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-white text-xs font-semibold">Colégio Exemplo</p>
          <p className="text-emerald-100 text-xs">2026</p>
        </div>
      </div>
    </div>
  );
}
