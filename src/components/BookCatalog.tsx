import { useState, useMemo } from 'react';
import { BOOKS, GENRES } from '@/lib/data';
import BookCard from '@/components/books/BookCard';
import type { Book, Genre } from '@/types';

export default function BookCatalog() {
  const [query, setQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('title');

  const filtered = useMemo(() => {
    let books: Book[] = [...BOOKS];

    if (query.trim()) {
      const q = query.toLowerCase();
      books = books.filter((b: Book) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.genre.toLowerCase().includes(q)
      );
    }

    if (selectedGenre !== 'All') {
      books = books.filter((b: Book) => b.genre === selectedGenre);
    }

    books.sort((a: Book, b: Book) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'year') return b.year - a.year;
      return 0;
    });

    return books;
  }, [query, selectedGenre, sortBy]);

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="border rounded px-3 py-2 flex-1"
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border rounded px-3 py-2">
          <option value="title">Title</option>
          <option value="rating">Rating</option>
          <option value="year">Year</option>
        </select>
      </div>
      <div className="flex gap-2 mb-4 flex-wrap">
        <button
          onClick={() => setSelectedGenre('All')}
          className={selectedGenre === 'All' ? 'font-bold' : ''}
        >
          All
        </button>
        {GENRES.map((g: Genre) => (
          <button
            key={g.id}
            onClick={() => setSelectedGenre(g.name)}
            className={selectedGenre === g.name ? 'font-bold' : ''}
          >
            {g.name}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {filtered.map((book: Book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No books found.</p>
        </div>
      )}
    </div>
  );
}
