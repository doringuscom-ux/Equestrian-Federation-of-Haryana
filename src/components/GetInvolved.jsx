import React from 'react';
import { Link } from 'react-router-dom';

const GetInvolved = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden flex items-center justify-center">
      {/* Background Image with Parallax effect feeling */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/IMG/Horse/5.jpg" 
          alt="Get Involved Background" 
          className="w-full h-full object-cover object-center filter brightness-[0.3]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-transparent opacity-50"></div>
      </div>

      <div className="relative z-10 w-full max-w-[1000px] mx-auto px-4 md:px-8 text-center flex flex-col items-center">
        
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-[1px] bg-[#cba358]"></div>
          <span className="text-[#cba358] text-sm tracking-[0.4em] font-bold uppercase">Take The Reins</span>
          <div className="w-12 h-[1px] bg-[#cba358]"></div>
        </div>
        
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-['Playfair_Display'] font-bold text-white tracking-wider mb-8 leading-tight drop-shadow-lg">
          GET INVOLVED <br />
          <span className="italic font-light text-[#cba358]">TODAY</span>
        </h2>
        
        <p className="text-gray-300 text-base md:text-lg lg:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-12 drop-shadow-md">
          Whether you are an aspiring rider, a seasoned professional, or simply an enthusiast of the equestrian arts, there is a place for you in the Federation. Join us to elevate the sport in Haryana.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto justify-center items-center">
          <a href="tel:+919468000044" className="w-full sm:w-auto px-10 py-4 bg-[#cba358] hover:bg-[#b08d4a] text-white text-sm font-bold tracking-[0.2em] uppercase transition-colors duration-300 rounded-sm shadow-[0_0_20px_rgba(203,163,88,0.3)] hover:shadow-[0_0_30px_rgba(203,163,88,0.5)] text-center">
            Call Now
          </a>
          
          <Link to="/contact" onClick={() => window.scrollTo(0, 0)} className="w-full sm:w-auto px-10 py-4 bg-transparent border-2 border-white hover:border-[#cba358] text-white hover:text-[#cba358] text-sm font-bold tracking-[0.2em] uppercase transition-colors duration-300 rounded-sm text-center">
            Contact Us
          </Link>
        </div>
        
      </div>
    </section>
  );
};

export default GetInvolved;
