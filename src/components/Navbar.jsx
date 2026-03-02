import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedUser');
    navigate('/login');
    window.location.reload();
  };

  // Helper to highlight the active link
  const isActive = (path) => location.pathname === path ? "text-white font-bold" : "text-zinc-400 hover:text-zinc-200";

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 px-4 md:px-12 py-4 flex items-center justify-between ${isScrolled ? 'bg-black shadow-2xl' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
      
      <div className="flex items-center space-x-10">
        <Link to="/" className="text-red-600 text-2xl md:text-3xl font-black tracking-tighter hover:scale-105 transition-transform">
          YOUFLIX
        </Link>
        
        <div className="hidden md:flex space-x-6 text-sm transition-colors">
          <Link to="/" className={isActive('/')}>Catalogue</Link>
          <Link to="/watchlist" className={isActive('/watchlist')}>Ma Liste</Link>
          <Link to="/series" className={isActive('/series')}>Séries</Link>
          <Link to="/films" className={isActive('/films')}>Films</Link>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        {/* Search Placeholder */}
        <div className="text-white cursor-pointer hover:text-zinc-400 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Profile Section */}
        <div className="group relative">
          <div className="flex items-center space-x-2 cursor-pointer">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" 
              alt="Avatar" 
              className="w-8 h-8 rounded-sm"
            />
            <span className="text-white text-[10px] group-hover:rotate-180 transition-transform">▼</span>
          </div>

          {/* Dropdown */}
          <div className="absolute right-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
            <div className="bg-black/95 border border-zinc-800 w-40 py-2 rounded-sm shadow-2xl">
              <Link to="/profile" className="block px-4 py-2 text-xs text-white hover:bg-zinc-800">Mon Profil</Link>
              <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-xs text-red-500 hover:bg-zinc-800 border-t border-zinc-800">
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;