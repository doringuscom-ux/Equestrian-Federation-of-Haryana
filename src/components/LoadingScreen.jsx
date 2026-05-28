import React from 'react';

const LoadingScreen = ({ isLoading }) => {
  return (
    <div
      className={`fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center transition-all duration-1000 ${isLoading ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
    >
      <div className="flex flex-col items-center transform -translate-y-10">
        {/* The downloaded GIF */}
        <img
          src="/IMG/loading.gif"
          alt="Loading..."
          className="w-48 md:w-64 mb-8 mix-blend-multiply"
        />

        {/* Premium Loading Text */}
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-xl md:text-2xl font-['Playfair_Display'] font-bold text-black tracking-widest uppercase">
            Equestrian Federation
          </h2>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#cba358] animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 rounded-full bg-[#cba358] animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 rounded-full bg-[#cba358] animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
