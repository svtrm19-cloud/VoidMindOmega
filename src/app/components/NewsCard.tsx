import { Clock } from 'lucide-react';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface NewsCardProps {
  title: string;
  description: string;
  image: string;
  category: string;
  time: string;
}

export function NewsCard({ title, description, image, category, time }: NewsCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={title}
          className="size-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-full bg-green-600 text-white text-xs font-semibold">
            {category}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {description}
        </p>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Clock className="size-3" />
          <span>{time}</span>
        </div>
      </div>
    </Card>
  );
}
