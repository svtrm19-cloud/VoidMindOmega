import { Outlet, NavLink } from "react-router";
import { Home, GraduationCap, Calendar, FileText, Bell, User } from "lucide-react";

export function RootLayout() {
  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <Outlet />

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black via-gray-950 to-gray-900/95 border-t border-cyan-500/20 backdrop-blur-xl z-50">
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="grid grid-cols-6 gap-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-br from-cyan-500/20 to-blue-600/20 text-cyan-400 shadow-lg shadow-cyan-500/20"
                    : "text-gray-500 hover:text-cyan-400"
                }`
              }
            >
              <Home className="w-5 h-5" />
              <span className="text-[10px] font-semibold">Home</span>
            </NavLink>

            <NavLink
              to="/notes"
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-br from-cyan-500/20 to-blue-600/20 text-cyan-400 shadow-lg shadow-cyan-500/20"
                    : "text-gray-500 hover:text-cyan-400"
                }`
              }
            >
              <GraduationCap className="w-5 h-5" />
              <span className="text-[10px] font-semibold">Notas</span>
            </NavLink>

            <NavLink
              to="/schedule"
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-br from-cyan-500/20 to-blue-600/20 text-cyan-400 shadow-lg shadow-cyan-500/20"
                    : "text-gray-500 hover:text-cyan-400"
                }`
              }
            >
              <Calendar className="w-5 h-5" />
              <span className="text-[10px] font-semibold">Horários</span>
            </NavLink>

            <NavLink
              to="/activities"
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-br from-cyan-500/20 to-blue-600/20 text-cyan-400 shadow-lg shadow-cyan-500/20"
                    : "text-gray-500 hover:text-cyan-400"
                }`
              }
            >
              <FileText className="w-5 h-5" />
              <span className="text-[10px] font-semibold">Tarefas</span>
            </NavLink>

            <NavLink
              to="/announcements"
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-br from-cyan-500/20 to-blue-600/20 text-cyan-400 shadow-lg shadow-cyan-500/20"
                    : "text-gray-500 hover:text-cyan-400"
                }`
              }
            >
              <Bell className="w-5 h-5" />
              <span className="text-[10px] font-semibold">Avisos</span>
            </NavLink>

            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-br from-cyan-500/20 to-blue-600/20 text-cyan-400 shadow-lg shadow-cyan-500/20"
                    : "text-gray-500 hover:text-cyan-400"
                }`
              }
            >
              <User className="w-5 h-5" />
              <span className="text-[10px] font-semibold">Perfil</span>
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
}
