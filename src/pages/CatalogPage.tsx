import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, Grid3X3, List, X } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BookCard from '@/components/books/BookCard';
import { BOOKS, GENRES } from '@/lib/data';
import { useShelf } from '@/hooks/useShelf';
import clsx from 'clsx';

const ALL_GENRES = ['All', ...Array.from(new Set(BOOKS.map(b => b.genre)))];
const SORT_OPTIONS = [
  { value: 'title', label: 'Title A–Z' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'year', label: 'Newest First' },
  { value: 'pages', label: 'Shortest First' },
];

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQ = searchParams.get('q') || '';
  const initialGenre = searchParams.get('genre') || 'All';

  const [query, setQuery] = useState(initialQ);
  const [selectedGenre, setSelectedGenre] = useState(initialGenre);
  const [sortBy, setSortBy] = useState('title');
  const [availableOnly, setAvailableOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const { getItem } = useShelf();

  const filtered = useMemo(() => {
    let books = [...BOOKS];

    if (query.trim()) {
      const q = query.toLowerCase();
      books = books.filter(
        b =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.genre.toLowerCase().includes(q)
      );
    }

    if (selectedGenre !== 'All') {
      books = books.filter(b => b.genre === selectedGenre);
    }

    if (availableOnly) {
      books = books.filter(b => b.available);
    }

    books.sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'year') return b.year - a.year;
      if (sortBy === 'pages') return a.pages - b.pages;
      return 0;
    });

    return books;
  }, [query, selectedGenre, sortBy, availableOnly]);

  const clearFilters = () => {
    setQuery('');
    setSelectedGenre('All');
    setAvailableOnly(false);
    setSortBy('title');
    setSearchParams({});
  };

  const hasFilters = query || selectedGenre !== 'All' || availableOnly;

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f0e8]">
      <Navbar />

      {/* Page header */}
      <div className="bg-[#1a1410] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#f5f0e8] mb-2">Book Catalog</h1>
          <p className="text-[#a08060]">Browse our complete collection of {BOOKS.length} books</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Search & controls */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                placeholder="Search title, author, genre…"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c8860a] focus:border-transparent"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c8860a] bg-white"
            >
              {SORT_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>

            {/* Filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={clsx(
                'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors',
                showFilters
                  ? 'bg-[#c8860a] text-white border-[#c8860a]'
                  : 'border-gray-200 text-gray-600 hover:bg-gray-50'
              )}
            >
              <Filter size={16} />
              Filters
            </button>

            {/* View mode */}
            <div className="flex rounded-xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={clsx('px-3 py-2.5', viewMode === 'grid' ? 'bg-[#c8860a] text-white' : 'bg-white text-gray-600 hover:bg-gray-50')}
              >
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={clsx('px-3 py-2.5', viewMode === 'list' ? 'bg-[#c8860a] text-white' : 'bg-white text-gray-600 hover:bg-gray-50')}
              >
                <List size={16} />
              </button>
            </div>
          </div>

          {/* Expanded filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex flex-wrap gap-2">
                {ALL_GENRES.map(g => (
                  <button
                    key={g}
                    onClick={() => setSelectedGenre(g)}
                    className={clsx(
                      'text-xs font-medium px-3 py-1.5 rounded-full border transition-all',
                      selectedGenre === g
                        ? 'bg-[#c8860a] text-white border-[#c8860a]'
                        : 'border-gray-200 text-gray-600 hover:border-[#c8860a] hover:text-[#c8860a]'
                    )}
                  >
                    {g}
                  </button>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-2">
                <input
                  id="available"
                  type="checkbox"
                  checked={availableOnly}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAvailableOnly(e.target.checked)}
                  className="w-4 h-4 accent-[#c8860a]"
                />
                <label htmlFor="available" className="text-sm text-gray-700 cursor-pointer">Available only</label>
              </div>
            </div>
          )}
        </div>

        {/* Results header */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-[#6b5a4e]">
            Showing <strong>{filtered.length}</strong> book{filtered.length !== 1 ? 's' : ''}
          </p>
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 text-xs text-[#c8860a] hover:text-[#1a1410] transition-colors font-medium"
            >
              <X size={13} /> Clear filters
            </button>
          )}
        </div>

        {/* Book grid / list */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">📚</div>
            <h3 className="font-serif text-xl font-semibold text-[#1a1410] mb-2">No books found</h3>
            <p className="text-[#6b5a4e] text-sm">Try adjusting your search or filters.</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {filtered.map(book => (
              <BookCard key={book.id} book={book} shelfStatus={getItem(book.id)?.status} />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(book => (
              <ListBookRow key={book.id} book={book} shelfStatus={getItem(book.id)?.status} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

type ListBookRowProps = { book: any; shelfStatus?: string };

function ListBookRow({ book, shelfStatus }: ListBookRowProps) {
  return (
    <a href={`/book/${book.id}`} className="flex gap-4 bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all group">
      <img
        src={book.cover}
        alt={book.title}
        className="w-14 h-20 object-cover rounded-lg flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-xs text-[#c8860a] font-medium uppercase tracking-wide">{book.genre}</span>
            <h3 className="font-serif font-semibold text-[#1a1410] group-hover:text-[#c8860a] transition-colors">{book.title}</h3>
            <p className="text-sm text-[#6b5a4e]">{book.author} · {book.year}</p>
          </div>
          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            <span className={clsx('text-xs font-semibold px-2 py-0.5 rounded-full', book.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700')}>
              {book.available ? 'Available' : 'Checked Out'}
            </span>
            {shelfStatus && (
              <span className="text-xs bg-amber-100 text-amber-800 font-medium px-2 py-0.5 rounded-full capitalize">
                {shelfStatus.replace('-', ' ')}
              </span>
            )}
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-2 line-clamp-2">{book.description}</p>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-xs text-amber-500">★ {book.rating}</span>
          <span className="text-xs text-gray-400">{book.pages} pages</span>
        </div>
      </div>
    </a>
  );
}
