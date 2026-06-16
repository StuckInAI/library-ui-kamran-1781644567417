import React from 'react';
import { Link } from 'react-router-dom';

export default function LibraryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f0e8]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="font-serif text-3xl font-bold text-[#1a1410]">Library</h1>
        <Link to="/catalog" className="text-[#c8860a] hover:underline mt-4 inline-block">Browse Catalog</Link>
      </div>
    </div>
  );
}
