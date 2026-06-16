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
};

export type Genre = {
  id: string;
  name: string;
  icon: string;
  count: number;
  color: string;
};

export type ShelfItem = {
  bookId: string;
  status: 'reading' | 'read' | 'want-to-read';
  addedAt: string;
  rating?: number;
};
