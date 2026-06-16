import { BookOpen, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1a1410] text-[#c8a96e] mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-[#c8860a] rounded-lg flex items-center justify-center">
                <BookOpen size={16} className="text-white" />
              </div>
              <span className="font-serif text-lg font-bold text-[#f5f0e8]">Bibliotheca</span>
            </div>
            <p className="text-sm text-[#a08060] leading-relaxed">
              Your curated digital library. Discover, read, and track your literary journey.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-[#f5f0e8] mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-[#f5f0e8] transition-colors">Home</a></li>
              <li><a href="/catalog" className="hover:text-[#f5f0e8] transition-colors">Browse Catalog</a></li>
              <li><a href="/shelf" className="hover:text-[#f5f0e8] transition-colors">My Shelf</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-[#f5f0e8] mb-3">Collections</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="hover:text-[#f5f0e8] cursor-pointer transition-colors">New Arrivals</span></li>
              <li><span className="hover:text-[#f5f0e8] cursor-pointer transition-colors">Staff Picks</span></li>
              <li><span className="hover:text-[#f5f0e8] cursor-pointer transition-colors">Classic Literature</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-6 flex items-center justify-center gap-1.5 text-xs text-[#806040]">
          <span>Made with</span>
          <Heart size={12} className="text-[#c8860a]" fill="#c8860a" />
          <span>for book lovers everywhere</span>
        </div>
      </div>
    </footer>
  );
}
