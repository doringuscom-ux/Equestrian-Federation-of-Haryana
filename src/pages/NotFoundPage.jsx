import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const NotFoundPage = () => {
  return (
    <div className="w-full font-['Inter'] bg-[#050505] min-h-screen text-white flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex flex-col items-center justify-center px-4 relative z-10 pt-20">
        {/* Decorative background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 bg-[#cba358]/5 rounded-full blur-[100px] z-0"></div>
        
        <div className="relative z-10 text-center animate-[fadeIn_0.5s_ease-out]">
          <h1 className="font-['Playfair_Display'] text-8xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-2 leading-none">
            404
          </h1>
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 md:w-12 h-[1px] bg-[#cba358]"></div>
            <h2 className="text-[#cba358] text-xl md:text-2xl font-['Playfair_Display'] font-bold tracking-widest uppercase">
              Page Not Found
            </h2>
            <div className="w-8 md:w-12 h-[1px] bg-[#cba358]"></div>
          </div>
          
          <p className="text-gray-400 font-light max-w-md mx-auto mb-10 text-sm md:text-base leading-relaxed">
            We couldn't find the page you're looking for. It might have been moved, deleted, or perhaps you just took a wrong turn on the trail.
          </p>
          
          <Link 
            to="/" 
            className="inline-flex items-center justify-center gap-3 bg-[#cba358] hover:bg-[#b08d4b] text-black font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(203,163,88,0.2)] hover:shadow-[0_0_30px_rgba(203,163,88,0.4)]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
