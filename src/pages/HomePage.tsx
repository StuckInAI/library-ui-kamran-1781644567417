import { Link } from 'react-router-dom';
import { Search, ArrowRight, BookOpen, Users, Star, TrendingUp } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BookCard from '@/components/books/BookCard';
import SectionHeader from '@/components/ui/SectionHeader';
import { FEATURED_BOOKS, GENRES } from '@/lib/data';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/catalog?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const stats = [
    { icon: <BookOpen size={22} />, label: 'Books', value: '12,000+' },
    { icon: <Users size={22} />, label: 'Members', value: '4,800+' },
    { icon: <Star size={22} />, label: 'Reviews', value: '32,000+' },
    { icon: <TrendingUp size={22} />, label: 'Checkouts/Month', value: '1,200+' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f0e8]">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-[#1a1410] overflow-hidden">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #c8860a 0, #c8860a 1px, transparent 0, transparent 50%)`,
            backgroundSize: '20px 20px'
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#c8860a]/20 text-[#e8a020] text-sm font-medium px-3 py-1.5 rounded-full mb-6 border border-[#c8860a]/30">
              <BookOpen size={14} />
              <span>Your city library, now digital</span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-[#f5f0e8] leading-tight mb-6">
              Discover Your Next
              <span className="text-[#c8860a]"> Great Read</span>
            </h1>
            <p className="text-[#a08060] text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
              Browse thousands of books across every genre. Reserve, track, and manage your reading life — all in one beautifully crafted space.
            </p>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="flex gap-3 max-w-xl">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a08060]" />
                <input
                  type="text"
                  value={query}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                  placeholder="Search by title, author, or genre…"
                  className="w-full bg-white/10 border border-white/20 text-[#f5f0e8] placeholder-[#a08060] pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c8860a] focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                className="bg-[#c8860a] hover:bg-[#e8a020] text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        </div>

        {/* Decorative books */}
        <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-1/3 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1410] to-transparent z-10" />
          <img
            src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=800&fit=crop"
            alt="Library shelves"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
      </section>

      {/* Stats bar */}
      <div className="bg-[#c8860a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="text-white/80">{s.icon}</div>
                <div>
                  <div className="text-white font-bold text-lg leading-none">{s.value}</div>
                  <div className="text-white/70 text-xs mt-0.5">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured books */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionHeader
          title="Featured Books"
          subtitle="Handpicked by our librarians this month"
          action={
            <Link to="/catalog" className="flex items-center gap-1 text-[#c8860a] hover:text-[#e8a020] text-sm font-medium transition-colors">
              View all <ArrowRight size={16} />
            </Link>
          }
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {FEATURED_BOOKS.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* Genres */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <SectionHeader
            title="Browse by Genre"
            subtitle="Explore our curated collections"
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {GENRES.map(genre => (
              <Link
                key={genre.id}
                to={`/catalog?genre=${encodeURIComponent(genre.name)}`}
                className="group flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-gray-100 hover:border-[#c8860a] bg-white hover:bg-[#fdf3d8] transition-all duration-200"
              >
                <span className="text-3xl">{genre.icon}</span>
                <div className="text-center">
                  <div className="font-semibold text-[#1a1410] text-sm group-hover:text-[#c8860a] transition-colors">{genre.name}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{genre.count} books</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative bg-[#2d5a3d] rounded-3xl overflow-hidden px-8 py-14 text-center">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)`,
              backgroundSize: '28px 28px'
            }}
          />
          <div className="relative">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
              Start Building Your Reading List Today
            </h2>
            <p className="text-green-100 text-lg mb-8 max-w-xl mx-auto">
              Track what you're reading, what you've finished, and what you want to read next.
            </p>
            <Link
              to="/shelf"
              className="inline-flex items-center gap-2 bg-white text-[#2d5a3d] font-semibold px-8 py-3.5 rounded-xl hover:bg-green-50 transition-colors"
            >
              <BookOpen size={18} />
              My Shelf
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
