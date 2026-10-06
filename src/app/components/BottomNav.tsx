import { Home, CheckSquare, Calendar, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router";

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: "/", icon: Home, label: "Início" },
    { path: "/tasks", icon: CheckSquare, label: "Tarefas" },
    { path: "/schedule", icon: Calendar, label: "Cronograma" },
    { path: "/profile", icon: User, label: "Perfil" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#121212] border-t border-gray-800/50 z-50 backdrop-blur-xl">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-around h-16 px-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center gap-1 flex-1 py-2 px-2 rounded-xl transition-all duration-300 relative ${
                  isActive 
                    ? "text-emerald-400" 
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {isActive && (
                  <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
                )}
                <Icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                <span className={`text-[10px] ${isActive ? 'font-bold' : 'font-medium'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}