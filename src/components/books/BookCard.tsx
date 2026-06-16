import { Link } from 'react-router-dom';
import { Star, BookOpen, CheckCircle, Clock } from 'lucide-react';
import clsx from 'clsx';
import type { Book } from '@/types';

type BookCardProps = {
  book: Book;
  shelfStatus?: string;
};

export default function BookCard({ book, shelfStatus }: BookCardProps) {
  return (
    <Link to={`/book/${book.id}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        {/* Cover */}
        <div className="relative overflow-hidden h-52">
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          {/* Availability badge */}
          <div
            className={clsx(
              'absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full',
              book.available
                ? 'bg-green-500/90 text-white'
                : 'bg-red-500/90 text-white'
            )}
          >
            {book.available ? 'Available' : 'Checked Out'}
          </div>
          {/* Shelf status */}
          {shelfStatus && (
            <div className="absolute top-3 left-3 bg-[#c8860a]/90 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
              {shelfStatus === 'reading' && <BookOpen size={10} />}
              {shelfStatus === 'read' && <CheckCircle size={10} />}
              {shelfStatus === 'want-to-read' && <Clock size={10} />}
              {shelfStatus === 'reading' ? 'Reading' : shelfStatus === 'read' ? 'Read' : 'Want to Read'}
            </div>
          )}
          {/* Rating */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
            <Star size={11} fill="#f59e0b" className="text-amber-400" />
            <span>{book.rating}</span>
          </div>
        </div>
        {/* Info */}
        <div className="p-4">
          <span className="text-xs font-medium text-[#c8860a] uppercase tracking-wide">{book.genre}</span>
          <h3 className="font-serif font-semibold text-[#1a1410] mt-1 mb-1 leading-tight line-clamp-1">
            {book.title}
          </h3>
          <p className="text-sm text-[#6b5a4e]">{book.author}</p>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
            <span className="text-xs text-gray-400">{book.year}</span>
            <span className="text-xs text-gray-400">{book.pages} pages</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
