import { useState, useCallback } from 'react';
import { getShelf, addToShelf, removeFromShelf } from '@/lib/shelf';
import type { ShelfItem } from '@/types';

export function useShelf() {
  const [shelf, setShelf] = useState<ShelfItem[]>(() => getShelf());

  const add = useCallback((bookId: string, status: ShelfItem['status']) => {
    const updated = addToShelf(bookId, status);
    setShelf(updated);
  }, []);

  const remove = useCallback((bookId: string) => {
    const updated = removeFromShelf(bookId);
    setShelf(updated);
  }, []);

  const getItem = useCallback((bookId: string): ShelfItem | undefined => {
    return shelf.find(i => i.bookId === bookId);
  }, [shelf]);

  const count = shelf.length;

  return { shelf, add, remove, getItem, count };
}
