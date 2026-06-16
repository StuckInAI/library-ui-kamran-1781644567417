export type Book = {
  id: string;
  title: string;
  author: string;
  genre: string;
  year: number;
  pages: number;
  rating: number;
  available: boolean;
  cover: string;
  description: string;
  isbn: string;
  language: string;
  publisher: string;
  reviews?: number;
  featured?: boolean;
};

export type Genre = {
  id: string;
  name: string;
  icon: string;
  count: number;
  color: string;
};

export type ReadingStatus = 'reading' | 'want-to-read' | 'read';

export type ShelfItem = {
  bookId: string;
  status: ReadingStatus;
  addedAt: string;
};

export type UserBook = {
  bookId: string;
  status: ReadingStatus;
  addedAt: string;
};
