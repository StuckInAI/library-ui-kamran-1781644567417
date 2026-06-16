import { Star } from 'lucide-react';

type StarRatingProps = {
  rating: number;
  max?: number;
  size?: number;
};

export default function StarRating({ rating, max = 5, size = 16 }: StarRatingProps) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < Math.floor(rating);
        const partial = !filled && i < rating;
        return (
          <span key={i} className="relative inline-block">
            <Star size={size} className="text-gray-200" fill="#e5e7eb" />
            {(filled || partial) && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: filled ? '100%' : `${(rating % 1) * 100}%` }}
              >
                <Star size={size} className="text-amber-400" fill="#f59e0b" />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}
