import { Clock } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface NewsArticleProps {
  title: string;
  category: string;
  time: string;
  image: string;
}

export function NewsArticle({ title, category, time, image }: NewsArticleProps) {
  return (
    <div className="bg-[#1A1A1A] rounded-lg border border-gray-800 overflow-hidden hover:border-gray-700 transition-colors">
      <div className="relative h-40">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
            {category}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-white font-semibold mb-2 line-clamp-2">{title}</h3>
        <div className="flex items-center gap-1.5 text-gray-500 text-xs">
          <Clock className="w-3.5 h-3.5" />
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
}
