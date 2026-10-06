import { TrendingUp } from "lucide-react";

interface FeaturedTeamCardProps {
  name: string;
  position: number;
  points: number;
  form: ("W" | "D" | "L")[];
}

export function FeaturedTeamCard({ name, position, points, form }: FeaturedTeamCardProps) {
  return (
    <div className="bg-[#1A1A1A] rounded-lg border border-gray-800 p-4 min-w-[200px] hover:border-gray-700 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center text-white font-bold text-lg">
          {name.substring(0, 2).toUpperCase()}
        </div>
        <div className="text-right">
          <div className="text-gray-400 text-xs">#{position}</div>
          <div className="text-white font-bold text-lg">{points}</div>
          <div className="text-gray-500 text-xs">pts</div>
        </div>
      </div>
      
      <h3 className="text-white font-semibold mb-2">{name}</h3>
      
      <div className="flex gap-1">
        {form.map((result, idx) => (
          <div
            key={idx}
            className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${
              result === "W"
                ? "bg-green-600 text-white"
                : result === "D"
                ? "bg-gray-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {result}
          </div>
        ))}
      </div>
    </div>
  );
}
