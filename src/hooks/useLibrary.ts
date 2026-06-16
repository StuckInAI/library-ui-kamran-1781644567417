import { useState, useCallback } from 'react';
import type { UserBook, ReadingStatus } from '@/types';

const LIBRARY_KEY = 'bibliotheca_library';

function getLibrary(): UserBook[] {
  try {
    const raw = localStorage.getItem(LIBRARY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLibrary(items: UserBook[]): void {
  localStorage.setItem(LIBRARY_KEY, JSON.stringify(items));
}

export function useLibrary() {
  const [library, setLibrary] = useState<UserBook[]>(() => getLibrary());

  const add = useCallback((bookId: string, status: ReadingStatus) => {
    const updated = getLibrary();
    const existing = updated.findIndex(i => i.bookId === bookId);
    if (existing >= 0) {
      updated[existing].status = status;
    } else {
      updated.push({ bookId, status, addedAt: new Date().toISOString() });
    }
    saveLibrary(updated);
    setLibrary([...updated]);
  }, []);

  const remove = useCallback((bookId: string) => {
    const updated = getLibrary().filter(i => i.bookId !== bookId);
    saveLibrary(updated);
    setLibrary(updated);
  }, []);

  const getItem = useCallback((bookId: string): UserBook | undefined => {
    return library.find(i => i.bookId === bookId);
  }, [library]);

  return { library, add, remove, getItem, count: library.length };
}
