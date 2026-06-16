import type { UserBook, ReadingStatus } from '@/types';

const STORAGE_KEY = 'bibliotheca_user_books';

export function getStoredBooks(): UserBook[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveBooks(items: UserBook[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function addBook(bookId: string, status: ReadingStatus): UserBook[] {
  const books = getStoredBooks();
  const existing = books.findIndex(i => i.bookId === bookId);
  if (existing >= 0) {
    books[existing].status = status;
  } else {
    books.push({ bookId, status, addedAt: new Date().toISOString() });
  }
  saveBooks(books);
  return books;
}

export function removeBook(bookId: string): UserBook[] {
  const books = getStoredBooks().filter(i => i.bookId !== bookId);
  saveBooks(books);
  return books;
}

export function findBook(bookId: string): UserBook | undefined {
  return getStoredBooks().find(i => i.bookId === bookId);
}
