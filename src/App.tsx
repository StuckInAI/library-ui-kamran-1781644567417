import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import CatalogPage from '@/pages/CatalogPage';
import BookDetailPage from '@/pages/BookDetailPage';
import MyShelfPage from '@/pages/MyShelfPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/book/:id" element={<BookDetailPage />} />
        <Route path="/shelf" element={<MyShelfPage />} />
      </Routes>
    </BrowserRouter>
  );
}
