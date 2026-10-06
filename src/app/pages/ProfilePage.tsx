import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Settings,
  Bell,
  Moon,
  Lock,
  HelpCircle,
  LogOut,
  QrCode,
  Download,
  Share2,
  Edit
} from "lucide-react";

export function ProfilePage() {
  return (
    <div className="min-h-screen bg-black pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 via-black to-cyan-950 border-b border-cyan-500/20">
        <div className="max-w-lg mx-auto px-5 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">Perfil</h1>
              <p className="text-sm text-gray-400">Informações pessoais</p>
            </div>
            <button className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-2xl flex items-center justify-center border border-cyan-500/30 hover:scale-105 transition-transform">
              <Settings className="w-6 h-6 text-cyan-400" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-5 py-6 space-y-6">
        {/* Student Card */}
        <div className="bg-gradient-to-br from-cyan-600 via-cyan-500 to-blue-600 rounded-2xl p-6 shadow-2xl shadow-cyan-500/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>

          <div className="relative">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl font-bold text-white border-4 border-white/30 shadow-xl">
                  SV
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Samuel Victor da Silva Ribeiro</h2>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs font-bold border border-white/30">
                      TURMA 3C
                    </span>
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs font-bold border border-white/30">
                      MAT: 2024030145
                    </span>
                  </div>
                  <p className="text-white/90 text-sm">Ensino Médio - 3º Ano</p>
                </div>
              </div>
            </div>

            {/* School Info */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <p className="text-white/80 text-xs mb-1 font-semibold">Instituição de Ensino</p>
              <p className="text-white font-bold">CETI Desembargador Heli Sobral</p>
            </div>
          </div>
        </div>

        {/* QR Code Card */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl border border-cyan-500/30 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white font-bold text-lg mb-1">Carteirinha Digital</h3>
              <p className="text-xs text-gray-400">Escaneie para identificação</p>
            </div>
            <QrCode className="w-6 h-6 text-cyan-400" />
          </div>

          {/* QR Code */}
          <div className="bg-white rounded-xl p-4 mb-4">
            <div className="aspect-square bg-gradient-to-br from-gray-900 to-black rounded-lg flex items-center justify-center relative overflow-hidden">
              {/* Simulated QR Code Pattern */}
              <div className="grid grid-cols-8 grid-rows-8 gap-1 p-4 w-full h-full">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div
                    key={i}
                    className={`${
                      Math.random() > 0.5 ? "bg-black" : "bg-transparent"
                    } rounded-sm`}
                  ></div>
                ))}
              </div>

              {/* Center Logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <User className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-2">
            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-cyan-500/20 text-cyan-400 rounded-xl text-sm font-bold border border-cyan-500/30 hover:bg-cyan-500/30 transition-all">
              <Download className="w-4 h-4" />
              Baixar
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-500/20 text-blue-400 rounded-xl text-sm font-bold border border-blue-500/30 hover:bg-blue-500/30 transition-all">
              <Share2 className="w-4 h-4" />
              Compartilhar
            </button>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl border border-cyan-500/30 p-5 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold text-lg">Informações Pessoais</h3>
            <button className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center text-cyan-400 hover:bg-cyan-500/30 transition-all">
              <Edit className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-black/40 rounded-xl border border-gray-800">
              <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                <User className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-400 mb-0.5">Nome Completo</p>
                <p className="text-white font-semibold text-sm">Samuel Victor da Silva Ribeiro</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-black/40 rounded-xl border border-gray-800">
              <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-400 mb-0.5">Data de Nascimento</p>
                <p className="text-white font-semibold text-sm">15 de Março de 2008</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-black/40 rounded-xl border border-gray-800">
              <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <Mail className="w-5 h-5 text-purple-400" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-400 mb-0.5">E-mail</p>
                <p className="text-white font-semibold text-sm">samuel.ribeiro@aluno.ceti.edu.br</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-black/40 rounded-xl border border-gray-800">
              <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                <Phone className="w-5 h-5 text-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-400 mb-0.5">Telefone</p>
                <p className="text-white font-semibold text-sm">(86) 99999-8888</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-black/40 rounded-xl border border-gray-800">
              <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-amber-400" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-400 mb-0.5">Endereço</p>
                <p className="text-white font-semibold text-sm">Teresina, Piauí</p>
              </div>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl border border-cyan-500/30 overflow-hidden shadow-lg">
          <div className="p-5 border-b border-gray-800">
            <h3 className="text-white font-bold text-lg">Configurações</h3>
          </div>

          <div className="divide-y divide-gray-800">
            <button className="w-full p-4 flex items-center justify-between hover:bg-gray-900/50 transition-all group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center group-hover:bg-cyan-500/30 transition-all">
                  <Bell className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="text-left">
                  <p className="text-white font-semibold text-sm">Notificações</p>
                  <p className="text-xs text-gray-400">Ativadas</p>
                </div>
              </div>
              <div className="w-12 h-6 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-lg"></div>
              </div>
            </button>

            <button className="w-full p-4 flex items-center justify-between hover:bg-gray-900/50 transition-all group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:bg-blue-500/30 transition-all">
                  <Moon className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-left">
                  <p className="text-white font-semibold text-sm">Modo Escuro</p>
                  <p className="text-xs text-gray-400">Sempre ativado</p>
                </div>
              </div>
              <div className="w-12 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-lg"></div>
              </div>
            </button>

            <button className="w-full p-4 flex items-center gap-3 hover:bg-gray-900/50 transition-all group">
              <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center group-hover:bg-purple-500/30 transition-all">
                <Lock className="w-5 h-5 text-purple-400" />
              </div>
              <div className="text-left flex-1">
                <p className="text-white font-semibold text-sm">Privacidade e Segurança</p>
                <p className="text-xs text-gray-400">Proteja seus dados</p>
              </div>
            </button>

            <button className="w-full p-4 flex items-center gap-3 hover:bg-gray-900/50 transition-all group">
              <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center group-hover:bg-green-500/30 transition-all">
                <Shield className="w-5 h-5 text-green-400" />
              </div>
              <div className="text-left flex-1">
                <p className="text-white font-semibold text-sm">Autenticação Biométrica</p>
                <p className="text-xs text-gray-400">Face ID habilitado</p>
              </div>
            </button>

            <button className="w-full p-4 flex items-center gap-3 hover:bg-gray-900/50 transition-all group">
              <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center group-hover:bg-amber-500/30 transition-all">
                <HelpCircle className="w-5 h-5 text-amber-400" />
              </div>
              <div className="text-left flex-1">
                <p className="text-white font-semibold text-sm">Ajuda e Suporte</p>
                <p className="text-xs text-gray-400">Central de atendimento</p>
              </div>
            </button>

            <button className="w-full p-4 flex items-center gap-3 hover:bg-red-500/10 transition-all group">
              <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center group-hover:bg-red-500/30 transition-all">
                <LogOut className="w-5 h-5 text-red-400" />
              </div>
              <div className="text-left flex-1">
                <p className="text-red-400 font-semibold text-sm">Sair</p>
                <p className="text-xs text-red-400/60">Desconectar da conta</p>
              </div>
            </button>
          </div>
        </div>

        {/* App Info */}
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-cyan-500/30">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <p className="text-white font-bold mb-1">CETI CONNECT</p>
          <p className="text-xs text-gray-400">Sistema Inteligente de Gestão Escolar</p>
          <p className="text-xs text-gray-500 mt-2">Versão 1.0.0 • Build 2024.05</p>
          <p className="text-xs text-gray-600 mt-1">Desenvolvido com IA • Cloud Sync • Face ID</p>
        </div>
      </div>
    </div>
  );
}
