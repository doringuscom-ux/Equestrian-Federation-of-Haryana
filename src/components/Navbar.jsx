import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Settings2 } from 'lucide-react';

const Navbar = () => {
  return (
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
            <Link to="/" className="hover:text-gray-300 transition-colors duration-300 pb-1 border-b border-white">HOME</Link>
            <a href="#" className="hover:text-gray-300 transition-colors duration-300 pb-1 border-b border-transparent">ABOUT</a>
            <div className="relative group pb-4 -mb-4">
              <span className="hover:text-gray-300 transition-colors duration-300 pb-1 border-b border-transparent cursor-pointer">DISCIPLINES</span>
              <div className="absolute left-0 top-full mt-2 w-48 bg-[#0a0a0a]/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col py-2 z-50">
                <Link to="/dressage" className="px-4 py-2 hover:bg-[#cba358]/20 hover:text-[#cba358] transition-colors">Dressage</Link>
                <Link to="/show-jumping" className="px-4 py-2 hover:bg-[#cba358]/20 hover:text-[#cba358] transition-colors">Show Jumping</Link>
                <Link to="/eventing" className="px-4 py-2 hover:bg-[#cba358]/20 hover:text-[#cba358] transition-colors">Eventing</Link>
                <Link to="/tent-pegging" className="px-4 py-2 hover:bg-[#cba358]/20 hover:text-[#cba358] transition-colors">Tent Pegging</Link>
                <Link to="/endurance" className="px-4 py-2 hover:bg-[#cba358]/20 hover:text-[#cba358] transition-colors">Endurance</Link>
              </div>
            </div>
            <a href="#" className="hover:text-gray-300 transition-colors duration-300 pb-1 border-b border-transparent">SHOP</a>
            <a href="#" className="hover:text-gray-300 transition-colors duration-300 pb-1 border-b border-transparent">BLOG</a>
            <a href="#" className="hover:text-gray-300 transition-colors duration-300 pb-1 border-b border-transparent">GET IN TOUCH</a>
          </div>

          <div className="flex items-center gap-6">
            <button className="hover:text-gray-300 transition-colors">
              <Search size={22} strokeWidth={1.2} />
            </button>
            <button className="hover:text-gray-300 transition-colors">
              <Settings2 size={24} strokeWidth={1.2} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
