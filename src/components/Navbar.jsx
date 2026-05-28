import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const isDisciplineActive = ['/dressage', '/show-jumping', '/eventing', '/tent-pegging', '/endurance'].some(path => location.pathname.startsWith(path));
  const isSolidNavbar = ['/profile', '/login', '/register'].some(path => location.pathname.startsWith(path));

  return (
    <>
      <nav className={`absolute top-0 w-full z-30 text-white pt-8 pb-4 transition-colors duration-300 ${isSolidNavbar ? 'bg-[#0a0a0a] shadow-xl' : 'bg-transparent'}`}>
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
            
            <div className="hidden xl:flex space-x-6 xl:space-x-10 items-center text-xs font-semibold tracking-widest uppercase">
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
              {user ? (
                <>
                  <Link to={user.role === 'admin' ? '/admin/dashboard' : '/profile'} className={`hover:text-[#cba358] transition-colors duration-300 pb-1 border-b ${isActive('/profile') || isActive('/admin/dashboard') ? 'border-[#cba358] text-[#cba358]' : 'border-transparent text-[#cba358]'}`}>
                    {user.role === 'admin' ? 'DASHBOARD' : 'PROFILE'}
                  </Link>
                  <button onClick={() => { logout(); navigate('/'); }} className="hover:text-red-400 transition-colors duration-300 pb-1 border-b border-transparent uppercase">
                    LOGOUT
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className={`hover:text-gray-300 transition-colors duration-300 pb-1 border-b ${isActive('/login') ? 'border-white text-white' : 'border-transparent'}`}>LOGIN</Link>
                  <Link to="/register" className={`bg-[#cba358] text-white px-5 py-2 rounded-full hover:bg-yellow-600 transition-colors`}>REGISTER</Link>
                </>
              )}
            </div>

            <div className="flex items-center gap-4 md:gap-6">
              <button 
                className="xl:hidden hover:text-gray-300 transition-colors ml-2"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu size={24} strokeWidth={1.2} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Drawer Backdrop */}
      {isMobileMenuOpen && (
        <div 
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
        />
      )}

      {/* Mobile Drawer Menu */}
      <div className={`fixed right-0 top-0 h-full w-80 sm:w-96 bg-[#0a0a0a] border-l border-white/10 z-50 transition-transform duration-300 text-white flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center p-6 border-b border-white/5">
          <span className="font-[inter] font-light text-xl tracking-[0.2em] uppercase">MENU</span>
          <button 
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-white"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-8 py-8 space-y-5 text-xs font-semibold tracking-widest uppercase">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center py-1 transition-colors ${isActive('/') ? 'text-[#cba358]' : 'hover:text-[#cba358]'}`}>HOME</Link>
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center py-1 transition-colors ${isActive('/about') ? 'text-[#cba358]' : 'hover:text-[#cba358]'}`}>ABOUT</Link>
          
          <div className="space-y-2.5">
            <span className={`text-[10px] font-bold text-gray-500 tracking-[0.3em] block mb-1 ${isDisciplineActive ? 'text-[#cba358]' : ''}`}>DISCIPLINES</span>
            <div className="pl-4 border-l border-white/10 space-y-2.5">
              <Link to="/dressage" onClick={() => setIsMobileMenuOpen(false)} className={`block py-0.5 text-[11px] transition-colors ${isActive('/dressage') ? 'text-[#cba358]' : 'text-gray-400 hover:text-white'}`}>Dressage</Link>
              <Link to="/show-jumping" onClick={() => setIsMobileMenuOpen(false)} className={`block py-0.5 text-[11px] transition-colors ${isActive('/show-jumping') ? 'text-[#cba358]' : 'text-gray-400 hover:text-white'}`}>Show Jumping</Link>
              <Link to="/eventing" onClick={() => setIsMobileMenuOpen(false)} className={`block py-0.5 text-[11px] transition-colors ${isActive('/eventing') ? 'text-[#cba358]' : 'text-gray-400 hover:text-white'}`}>Eventing</Link>
              <Link to="/tent-pegging" onClick={() => setIsMobileMenuOpen(false)} className={`block py-0.5 text-[11px] transition-colors ${isActive('/tent-pegging') ? 'text-[#cba358]' : 'text-gray-400 hover:text-white'}`}>Tent Pegging</Link>
              <Link to="/endurance" onClick={() => setIsMobileMenuOpen(false)} className={`block py-0.5 text-[11px] transition-colors ${isActive('/endurance') ? 'text-[#cba358]' : 'text-gray-400 hover:text-white'}`}>Endurance</Link>
            </div>
          </div>

          <Link to="/events" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center py-1 transition-colors ${isActive('/events') || isActive('/event/') ? 'text-[#cba358]' : 'hover:text-[#cba358]'}`}>EVENTS</Link>
          <Link to="/news-and-results" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center py-1 transition-colors ${isActive('/news-and-results') ? 'text-[#cba358]' : 'hover:text-[#cba358]'}`}>NEWS & RESULTS</Link>
          <Link to="/gallery" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center py-1 transition-colors ${isActive('/gallery') ? 'text-[#cba358]' : 'hover:text-[#cba358]'}`}>GALLERY</Link>
          <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center py-1 transition-colors ${isActive('/contact') ? 'text-[#cba358]' : 'hover:text-[#cba358]'}`}>GET IN TOUCH</Link>
          
          <div className="pt-6 border-t border-white/5 space-y-4">
            {user ? (
              <>
                <Link to={user.role === 'admin' ? '/admin/dashboard' : '/profile'} onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center py-1 transition-colors ${isActive('/profile') || isActive('/admin/dashboard') ? 'text-[#cba358]' : 'hover:text-[#cba358]'}`}>
                  {user.role === 'admin' ? 'DASHBOARD' : 'PROFILE'}
                </Link>
                <button onClick={() => { logout(); navigate('/'); setIsMobileMenuOpen(false); }} className="flex items-center py-1 text-red-500 hover:text-red-400 transition-colors uppercase w-full text-left font-semibold tracking-widest bg-transparent border-0 cursor-pointer">
                  LOGOUT
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center py-1 transition-colors ${isActive('/login') ? 'text-[#cba358]' : 'hover:text-[#cba358]'}`}>LOGIN</Link>
                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="inline-block text-center bg-[#cba358] text-white px-6 py-2.5 rounded-full hover:bg-yellow-600 transition-colors w-full font-bold tracking-widest text-[11px]">REGISTER</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
