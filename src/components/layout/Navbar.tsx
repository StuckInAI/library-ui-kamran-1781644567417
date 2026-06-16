import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Search, BookMarked, Menu, X, Library } from 'lucide-react';
import clsx from 'clsx';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: '/', label: 'Home', icon: <Library size={16} /> },
    { to: '/catalog', label: 'Catalog', icon: <Search size={16} /> },
    { to: '/shelf', label: 'My Shelf', icon: <BookMarked size={16} /> },
  ];

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  return (
    <nav className="sticky top-0 z-50 bg-[#1a1410] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-[#c8860a] rounded-lg flex items-center justify-center">
              <BookOpen size={20} className="text-white" />
            </div>
            <span className="font-serif text-xl font-bold text-[#f5f0e8] tracking-wide">
              Bibliotheca
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={clsx(
                  'flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  isActive(link.to)
                    ? 'bg-[#c8860a] text-white'
                    : 'text-[#c8a96e] hover:text-white hover:bg-white/10'
                )}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-[#c8a96e] hover:text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#1a1410] border-t border-white/10 px-4 pb-4">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={clsx(
                'flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium mt-1 transition-all',
                isActive(link.to)
                  ? 'bg-[#c8860a] text-white'
                  : 'text-[#c8a96e] hover:text-white hover:bg-white/10'
              )}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
