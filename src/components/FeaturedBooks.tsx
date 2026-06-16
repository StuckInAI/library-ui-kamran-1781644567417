import { BOOKS } from '@/lib/data';
import BookCard from '@/components/books/BookCard';
import type { Book } from '@/types';

export default function FeaturedBooks() {
  const featured: Book[] = BOOKS.slice(0, 4);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
      {featured.map((book: Book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
