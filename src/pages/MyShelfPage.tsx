import { useState } from 'react';
import { BookOpen, CheckCircle, Clock, Trash2, Star, BookMarked } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StarRating from '@/components/books/StarRating';
import { BOOKS } from '@/lib/data';
import { useShelf } from '@/hooks/useShelf';
import clsx from 'clsx';
import type { ShelfItem } from '@/types';

type TabType = 'all' | ShelfItem['status'];

const TABS: Array<{ id: TabType; label: string; icon: React.ReactNode }> = [
  { id: 'all', label: 'All', icon: <BookMarked size={15} /> },
  { id: 'reading', label: 'Reading', icon: <BookOpen size={15} /> },
  { id: 'want-to-read', label: 'Want to Read', icon: <Clock size={15} /> },
  { id: 'read', label: 'Finished', icon: <CheckCircle size={15} /> },
];

export default function MyShelfPage() {
  const { shelf, remove } = useShelf();
  const [activeTab, setActiveTab] = useState<TabType>('all');

  const displayItems = activeTab === 'all' ? shelf : shelf.filter(i => i.status === activeTab);

  const booksOnShelf = displayItems
    .map(item => ({
      item,
      book: BOOKS.find(b => b.id === item.bookId),
    }))
    .filter(x => x.book !== undefined) as Array<{ item: ShelfItem; book: (typeof BOOKS)[0] }>;

  const counts: Record<string, number> = {
    all: shelf.length,
    reading: shelf.filter(i => i.status === 'reading').length,
    'want-to-read': shelf.filter(i => i.status === 'want-to-read').length,
    read: shelf.filter(i => i.status === 'read').length,
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f0e8]">
      <Navbar />

      {/* Header */}
      <div className="bg-[#1a1410]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#f5f0e8] mb-1">My Shelf</h1>
          <p className="text-[#a08060]">Your personal reading tracker — {shelf.length} book{shelf.length !== 1 ? 's' : ''} tracked</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Books', value: counts.all, color: 'bg-[#c8860a]', icon: <BookMarked size={20} className="text-white" /> },
            { label: 'Reading', value: counts.reading, color: 'bg-blue-500', icon: <BookOpen size={20} className="text-white" /> },
            { label: 'Want to Read', value: counts['want-to-read'], color: 'bg-purple-500', icon: <Clock size={20} className="text-white" /> },
            { label: 'Finished', value: counts.read, color: 'bg-green-600', icon: <CheckCircle size={20} className="text-white" /> },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm flex items-center gap-4">
              <div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center', stat.color)}>
                {stat.icon}
              </div>
              <div>
                <div className="text-2xl font-bold text-[#1a1410]">{stat.value}</div>
                <div className="text-xs text-gray-400">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                'flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all border',
                activeTab === tab.id
                  ? 'bg-[#c8860a] text-white border-[#c8860a]'
                  : 'bg-white text-[#6b5a4e] border-gray-200 hover:border-[#c8860a] hover:text-[#c8860a]'
              )}
            >
              {tab.icon}
              {tab.label}
              <span className={clsx(
                'text-xs px-1.5 py-0.5 rounded-full',
                activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
              )}>
                {counts[tab.id] ?? 0}
              </span>
            </button>
          ))}
        </div>

        {/* Book list */}
        {booksOnShelf.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl">
            <div className="text-5xl mb-4">📚</div>
            <h3 className="font-serif text-2xl font-bold text-[#1a1410] mb-2">Your shelf is empty</h3>
            <p className="text-[#6b5a4e] text-sm mb-6">Start adding books to track your reading journey.</p>
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 bg-[#c8860a] hover:bg-[#e8a020] text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              <BookOpen size={16} />
              Browse Catalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {booksOnShelf.map(({ item, book }) => (
              <ShelfBookCard key={item.bookId} item={item} book={book} onRemove={() => remove(item.bookId)} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

type ShelfBookCardProps = {
  item: ShelfItem;
  book: (typeof BOOKS)[0];
  onRemove: () => void;
};

function ShelfBookCard({ item, book, onRemove }: ShelfBookCardProps) {
  const statusConfig: Record<ShelfItem['status'], { label: string; color: string; icon: React.ReactNode }> = {
    reading: { label: 'Currently Reading', color: 'bg-blue-100 text-blue-700', icon: <BookOpen size={13} /> },
    'want-to-read': { label: 'Want to Read', color: 'bg-purple-100 text-purple-700', icon: <Clock size={13} /> },
    read: { label: 'Finished', color: 'bg-green-100 text-green-700', icon: <CheckCircle size={13} /> },
  };

  const config = statusConfig[item.status];
  const addedDate = new Date(item.addedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex gap-4">
      <Link to={`/book/${book.id}`} className="flex-shrink-0">
        <img
          src={book.cover}
          alt={book.title}
          className="w-16 h-24 object-cover rounded-xl"
        />
      </Link>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link to={`/book/${book.id}`}>
              <h3 className="font-serif font-semibold text-[#1a1410] hover:text-[#c8860a] transition-colors truncate">
                {book.title}
              </h3>
            </Link>
            <p className="text-sm text-[#6b5a4e]">{book.author}</p>
          </div>
          <button
            onClick={onRemove}
            className="text-gray-300 hover:text-red-500 transition-colors flex-shrink-0 p-1"
          >
            <Trash2 size={15} />
          </button>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <span className={clsx('inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full', config.color)}>
            {config.icon}
            {config.label}
          </span>
        </div>

        <div className="flex items-center justify-between mt-3">
          <StarRating rating={book.rating} size={13} />
          <span className="text-xs text-gray-400">Added {addedDate}</span>
        </div>
      </div>
    </div>
  );
}
