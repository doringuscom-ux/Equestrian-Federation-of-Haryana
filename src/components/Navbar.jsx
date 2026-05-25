import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Settings2, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const isDisciplineActive = ['/dressage', '/show-jumping', '/eventing', '/tent-pegging', '/endurance'].some(path => location.pathname.startsWith(path));

  return (
    <>
      <nav className="absolute top-0 w-full z-30 bg-transparent text-white pt-8 pb-4">
        <div className="max-w-[1500px] mx-auto px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-3">
              {/* Logo vector */}
              <svg className="w-10 h-10 fill-current" viewBox="0 0 24 24">
                <path d="M14.4,5.4C14.4,5.4,14.4,5.4,14.4,5.4c-0.2-0.5-0.7-0.7-1.2-0.5c-0.1,0.1-0.2,0.1-0.2,0.2l-2.4,1.4
                  C9.4,7,7.7,7.8,6,8.7L5,9.2C4.1,9.7,3.5,10.6,3.4,11.7l-0.2,3.3C3.1,16.2,4,17,5,16.9l2.2-0.1L9,15.7l1.7,3.5
                  c0.2,0.4,0.6,0.5,1,0.3c0.4-0.2,0.5-0.6,0.3-1l-1.3-2.6c0.5,0.1,1.1,0.3,1.6,0.3L15.6,15c1.4-0.4,2.5-1.5,2.9-2.9l1.4-4.2
                  c0.2-0.6-0.2-1.3-0.8-1.5C18.6,6.3,18.1,6,17.5,6c-0.2,0-0.4,0-0.6,0.1L14.4,5.4z"/>
              </svg>
              <span className="font-[inter] font-light text-2xl tracking-[0.2em] uppercase">
                EFH
              </span>
            </Link>
            
            <div className="hidden md:flex space-x-12 items-center text-xs font-semibold tracking-widest uppercase">
              <Link to="/" className={`hover:text-gray-300 transition-colors duration-300 pb-1 border-b ${isActive('/') ? 'border-white text-white' : 'border-transparent'}`}>HOME</Link>
              <Link to="/about" className={`hover:text-gray-300 transition-colors duration-300 pb-1 border-b ${isActive('/about') ? 'border-white text-white' : 'border-transparent'}`}>ABOUT</Link>
              <div className="relative group pb-4 -mb-4">
                <span className={`hover:text-gray-300 transition-colors duration-300 pb-1 border-b cursor-pointer ${isDisciplineActive ? 'border-white text-white' : 'border-transparent'}`}>DISCIPLINES</span>
                <div className="absolute left-0 top-full mt-2 w-48 bg-[#0a0a0a]/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col py-2 z-50">
                  <Link to="/dressage" className={`px-4 py-2 hover:bg-[#cba358]/20 transition-colors ${isActive('/dressage') ? 'text-[#cba358]' : ''}`}>Dressage</Link>
                  <Link to="/show-jumping" className={`px-4 py-2 hover:bg-[#cba358]/20 transition-colors ${isActive('/show-jumping') ? 'text-[#cba358]' : ''}`}>Show Jumping</Link>
                  <Link to="/eventing" className={`px-4 py-2 hover:bg-[#cba358]/20 transition-colors ${isActive('/eventing') ? 'text-[#cba358]' : ''}`}>Eventing</Link>
                  <Link to="/tent-pegging" className={`px-4 py-2 hover:bg-[#cba358]/20 transition-colors ${isActive('/tent-pegging') ? 'text-[#cba358]' : ''}`}>Tent Pegging</Link>
                  <Link to="/endurance" className={`px-4 py-2 hover:bg-[#cba358]/20 transition-colors ${isActive('/endurance') ? 'text-[#cba358]' : ''}`}>Endurance</Link>
                </div>
              </div>
              <Link to="/events" className={`hover:text-gray-300 transition-colors duration-300 pb-1 border-b ${isActive('/events') || isActive('/event/') ? 'border-white text-white' : 'border-transparent'}`}>EVENTS</Link>
              <Link to="/news-and-results" className={`hover:text-gray-300 transition-colors duration-300 pb-1 border-b ${isActive('/news-and-results') ? 'border-white text-white' : 'border-transparent'}`}>NEWS & RESULTS</Link>
              <Link to="/gallery" className={`hover:text-gray-300 transition-colors duration-300 pb-1 border-b ${isActive('/gallery') ? 'border-white text-white' : 'border-transparent'}`}>GALLERY</Link>
              <Link to="/contact" className={`hover:text-gray-300 transition-colors duration-300 pb-1 border-b ${isActive('/contact') ? 'border-white text-white' : 'border-transparent'}`}>GET IN TOUCH</Link>
            </div>

            <div className="flex items-center gap-4 md:gap-6">
              <button className="hover:text-gray-300 transition-colors">
                <Search size={22} strokeWidth={1.2} />
              </button>
              <button className="hover:text-gray-300 transition-colors">
                <Settings2 size={24} strokeWidth={1.2} />
              </button>
              <button 
                className="md:hidden hover:text-gray-300 transition-colors ml-2"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu size={24} strokeWidth={1.2} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#0a0a0a] z-50 transition-transform duration-300 text-white flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-end p-8">
          <button 
            className="hover:text-gray-300 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={32} strokeWidth={1.2} />
          </button>
        </div>
        <div className="flex flex-col space-y-6 mt-4 text-sm font-semibold tracking-widest uppercase items-center overflow-y-auto pb-8">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={`transition-colors ${isActive('/') ? 'text-[#cba358]' : 'hover:text-[#cba358]'}`}>HOME</Link>
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className={`transition-colors ${isActive('/about') ? 'text-[#cba358]' : 'hover:text-[#cba358]'}`}>ABOUT</Link>
          <div className="flex flex-col items-center space-y-4 py-4 w-full bg-white/5">
            <span className={isDisciplineActive ? 'text-[#cba358]' : ''}>DISCIPLINES</span>
            <Link to="/dressage" onClick={() => setIsMobileMenuOpen(false)} className={`text-xs transition-colors ${isActive('/dressage') ? 'text-[#cba358]' : 'hover:text-[#cba358]'}`}>Dressage</Link>
            <Link to="/show-jumping" onClick={() => setIsMobileMenuOpen(false)} className={`text-xs transition-colors ${isActive('/show-jumping') ? 'text-[#cba358]' : 'hover:text-[#cba358]'}`}>Show Jumping</Link>
            <Link to="/eventing" onClick={() => setIsMobileMenuOpen(false)} className={`text-xs transition-colors ${isActive('/eventing') ? 'text-[#cba358]' : 'hover:text-[#cba358]'}`}>Eventing</Link>
            <Link to="/tent-pegging" onClick={() => setIsMobileMenuOpen(false)} className={`text-xs transition-colors ${isActive('/tent-pegging') ? 'text-[#cba358]' : 'hover:text-[#cba358]'}`}>Tent Pegging</Link>
            <Link to="/endurance" onClick={() => setIsMobileMenuOpen(false)} className={`text-xs transition-colors ${isActive('/endurance') ? 'text-[#cba358]' : 'hover:text-[#cba358]'}`}>Endurance</Link>
          </div>
          <Link to="/events" onClick={() => setIsMobileMenuOpen(false)} className={`transition-colors ${isActive('/events') || isActive('/event/') ? 'text-[#cba358]' : 'hover:text-[#cba358]'}`}>EVENTS</Link>
          <Link to="/news-and-results" onClick={() => setIsMobileMenuOpen(false)} className={`transition-colors ${isActive('/news-and-results') ? 'text-[#cba358]' : 'hover:text-[#cba358]'}`}>NEWS & RESULTS</Link>
          <Link to="/gallery" onClick={() => setIsMobileMenuOpen(false)} className={`transition-colors ${isActive('/gallery') ? 'text-[#cba358]' : 'hover:text-[#cba358]'}`}>GALLERY</Link>
          <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className={`transition-colors ${isActive('/contact') ? 'text-[#cba358]' : 'hover:text-[#cba358]'}`}>GET IN TOUCH</Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
