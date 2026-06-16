import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, BookOpen, Calendar, FileText, Globe, Building, CheckCircle, Clock, Plus, Trash2 } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StarRating from '@/components/books/StarRating';
import BookCard from '@/components/books/BookCard';
import { BOOKS } from '@/lib/data';
import { useShelf } from '@/hooks/useShelf';
import clsx from 'clsx';
import { useState } from 'react';
import type { ShelfItem } from '@/types';

export default function BookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const book = BOOKS.find(b => b.id === id);
  const { add, remove, getItem } = useShelf();
  const [toast, setToast] = useState<string | null>(null);

  if (!book) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f5f0e8]">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl mb-4">📚</div>
            <h2 className="font-serif text-2xl font-bold text-[#1a1410] mb-2">Book not found</h2>
            <Link to="/catalog" className="text-[#c8860a] hover:underline">Back to catalog</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const shelfItem = getItem(book.id);
  const related = BOOKS.filter(b => b.genre === book.genre && b.id !== book.id).slice(0, 4);

  const handleShelfAction = (status: ShelfItem['status']) => {
    if (shelfItem?.status === status) {
      remove(book.id);
      showToast('Removed from shelf');
    } else {
      add(book.id, status);
      const labels: Record<string, string> = {
        'reading': 'Added to Currently Reading',
        'read': 'Marked as Read',
        'want-to-read': 'Added to Want to Read',
      };
      showToast(labels[status] || 'Added to shelf');
    }
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const shelfButtons: Array<{ status: ShelfItem['status']; label: string; icon: React.ReactNode }> = [
    { status: 'want-to-read', label: 'Want to Read', icon: <Plus size={15} /> },
    { status: 'reading', label: 'Currently Reading', icon: <BookOpen size={15} /> },
    { status: 'read', label: 'Finished', icon: <CheckCircle size={15} /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f0e8]">
      <Navbar />

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1a1410] text-white text-sm px-5 py-3 rounded-xl shadow-2xl animate-pulse">
          {toast}
        </div>
      )}

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link
          to="/catalog"
          className="inline-flex items-center gap-1.5 text-sm text-[#6b5a4e] hover:text-[#c8860a] transition-colors"
        >
          <ArrowLeft size={15} />
          Back to Catalog
        </Link>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Cover sidebar */}
            <div className="md:w-72 lg:w-80 bg-[#1a1410] flex-shrink-0">
              <div className="sticky top-20 p-8 flex flex-col items-center">
                <div className="w-44 shadow-2xl rounded-xl overflow-hidden">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full aspect-[2/3] object-cover"
                  />
                </div>

                {/* Rating */}
                <div className="mt-6 text-center">
                  <div className="text-4xl font-bold text-[#c8860a]">{book.rating}</div>
                  <StarRating rating={book.rating} size={18} />
                  <div className="text-[#a08060] text-xs mt-1">Community Rating</div>
                </div>

                {/* Availability */}
                <div
                  className={clsx(
                    'mt-5 w-full text-center text-sm font-semibold py-2.5 rounded-xl',
                    book.available
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-red-500/20 text-red-400'
                  )}
                >
                  {book.available ? '✓ Available to Borrow' : '✗ Currently Checked Out'}
                </div>
              </div>
            </div>

            {/* Book info */}
            <div className="flex-1 p-8 lg:p-10">
              <span className="inline-block bg-[#fdf3d8] text-[#c8860a] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                {book.genre}
              </span>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1a1410] mt-3 mb-1">
                {book.title}
              </h1>
              <p className="text-xl text-[#6b5a4e] mb-6">by {book.author}</p>

              <p className="text-[#3d3530] leading-relaxed text-base mb-8">{book.description}</p>

              {/* Shelf actions */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-[#6b5a4e] uppercase tracking-wide mb-3">Add to Shelf</h3>
                <div className="flex flex-wrap gap-2">
                  {shelfButtons.map(btn => (
                    <button
                      key={btn.status}
                      onClick={() => handleShelfAction(btn.status)}
                      className={clsx(
                        'flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all',
                        shelfItem?.status === btn.status
                          ? 'bg-[#c8860a] text-white border-[#c8860a]'
                          : 'bg-white border-gray-200 text-[#3d3530] hover:border-[#c8860a] hover:text-[#c8860a]'
                      )}
                    >
                      {btn.icon}
                      {btn.label}
                    </button>
                  ))}
                  {shelfItem && (
                    <button
                      onClick={() => { remove(book.id); showToast('Removed from shelf'); }}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium border-2 border-red-200 text-red-500 hover:bg-red-50 transition-all"
                    >
                      <Trash2 size={15} />
                      Remove
                    </button>
                  )}
                </div>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { icon: <Calendar size={16} />, label: 'Published', value: book.year },
                  { icon: <FileText size={16} />, label: 'Pages', value: book.pages },
                  { icon: <Globe size={16} />, label: 'Language', value: book.language },
                  { icon: <Building size={16} />, label: 'Publisher', value: book.publisher },
                  { icon: <BookOpen size={16} />, label: 'ISBN', value: book.isbn },
                  { icon: <Star size={16} />, label: 'Rating', value: `${book.rating} / 5` },
                ].map((detail, i) => (
                  <div key={i} className="bg-[#f5f0e8] rounded-xl p-4">
                    <div className="flex items-center gap-2 text-[#c8860a] mb-1">
                      {detail.icon}
                      <span className="text-xs font-semibold uppercase tracking-wide text-[#6b5a4e]">{detail.label}</span>
                    </div>
                    <div className="text-[#1a1410] font-medium text-sm">{detail.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related books */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="font-serif text-2xl font-bold text-[#1a1410] mb-6">More in {book.genre}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
              {related.map(b => <BookCard key={b.id} book={b} />)}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
