import { BookOpen, Users, Star, TrendingUp } from 'lucide-react';

const STATS = [
  { icon: <BookOpen size={22} />, label: 'Books', value: '12,000+' },
  { icon: <Users size={22} />, label: 'Members', value: '4,800+' },
  { icon: <Star size={22} />, label: 'Reviews', value: '32,000+' },
  { icon: <TrendingUp size={22} />, label: 'Checkouts/Month', value: '1,200+' },
];

export default function StatsBar() {
  return (
    <div className="bg-[#c8860a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((stat, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="text-white/80">{stat.icon}</div>
              <div>
                <div className="text-white font-bold text-lg leading-none">{stat.value}</div>
                <div className="text-white/70 text-xs mt-0.5">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
