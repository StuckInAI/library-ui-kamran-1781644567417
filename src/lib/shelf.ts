import type { ShelfItem } from '@/types';

const SHELF_KEY = 'bibliotheca_shelf';

export function getShelf(): ShelfItem[] {
  try {
    const raw = localStorage.getItem(SHELF_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveShelf(items: ShelfItem[]): void {
  localStorage.setItem(SHELF_KEY, JSON.stringify(items));
}

export function addToShelf(bookId: string, status: ShelfItem['status']): ShelfItem[] {
  const shelf = getShelf();
  const existing = shelf.findIndex(i => i.bookId === bookId);
  if (existing >= 0) {
    shelf[existing].status = status;
  } else {
    shelf.push({ bookId, status, addedAt: new Date().toISOString() });
  }
  saveShelf(shelf);
  return shelf;
}

export function removeFromShelf(bookId: string): ShelfItem[] {
  const shelf = getShelf().filter(i => i.bookId !== bookId);
  saveShelf(shelf);
  return shelf;
}

export function isOnShelf(bookId: string): ShelfItem | undefined {
  return getShelf().find(i => i.bookId === bookId);
}
