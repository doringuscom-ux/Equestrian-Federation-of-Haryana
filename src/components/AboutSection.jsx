import React from 'react';

const AboutSection = () => {
  return (
    <section className="py-8 md:py-12 bg-white overflow-hidden relative">
      {/* Background Subtle Accent */}
      <div className="absolute top-0 left-0 w-full h-[100px] bg-gradient-to-b from-gray-50 to-transparent"></div>
      
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          
          {/* Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col items-start">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-[#cba358]"></div>
              <p className="text-[#cba358] text-sm tracking-[0.3em] font-bold uppercase">About EFH</p>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-['Playfair_Display'] font-bold text-black mb-4 leading-tight">
              Equestrian Federation <br />
              <span className="text-[#cba358] italic font-light">of Haryana</span>
            </h2>
            
            <div className="space-y-4 text-gray-600 leading-relaxed font-light text-sm md:text-base mb-6">
              <p>
                <strong className="font-semibold text-black">Established in 2002</strong>, the Equestrian Federation of Haryana (EFH) stands as a pioneering institution dedicated to the promotion, development, and welfare of equestrian sports in the State of Haryana.
              </p>
              <p>
                With a vision to nurture talent, uphold the rich equestrian heritage of India, and create world-class opportunities for riders, officials, trainers, and horse enthusiasts, EFH has been working tirelessly to build a vibrant equestrian ecosystem across the state.
              </p>
              <p>
                As a platform committed to sporting excellence, discipline, horsemanship, and youth development, the Federation actively encourages participation in key equestrian disciplines including Show Jumping, Dressage, Eventing, Tent Pegging, and Endurance Riding.
              </p>
            </div>
            
            <div className="bg-[#050505] p-4 md:p-6 border-l-4 border-[#cba358] rounded-r-xl w-full transform hover:translate-x-2 transition-transform duration-300 shadow-xl shadow-black/5">
              <p className="font-['Playfair_Display'] text-white text-lg md:text-xl italic mb-1">
                "Ride with Pride. Ride for Haryana."
              </p>
              <p className="text-gray-400 text-xs tracking-[0.2em] uppercase font-bold">Our Motto</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-6 mt-8">

              <a 
                href="/dummy.pdf" 
                download 
                className="group flex items-center gap-4 bg-[#0a0a0a] border border-[#cba358]/30 px-8 py-3.5 rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_30px_rgba(203,163,88,0.2)] hover:border-[#cba358] transition-all duration-500 transform hover:-translate-y-1"
              >
                <div className="w-8 h-8 rounded-full bg-[#cba358]/10 flex items-center justify-center group-hover:bg-[#cba358] transition-colors duration-500">
                  <svg className="w-4 h-4 text-[#cba358] group-hover:text-black transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                  </svg>
                </div>
                <span className="font-bold uppercase tracking-[0.2em] text-[11px] text-white group-hover:text-[#cba358] transition-colors duration-500">
                  Download PDF
                </span>
              </a>
            </div>
          </div>

          {/* Image Composition */}
          <div className="w-full lg:w-1/2 relative h-[300px] md:h-[400px] mt-8 lg:mt-0">
            {/* Background decorative element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#cba358]/5 rounded-full blur-3xl -z-10"></div>
            
            {/* Image 1 (Back/Top Right) */}
            <div className="absolute top-0 right-0 w-[65%] h-[65%] rounded-2xl overflow-hidden shadow-2xl border-[6px] border-white z-10 transform translate-x-4 -translate-y-4 hover:-translate-y-6 hover:shadow-[0_25px_50px_rgba(0,0,0,0.15)] transition-all duration-500 group">
              <img src="/IMG/Horse/1.jpg" alt="Equestrian riding" className="w-full h-full object-cover transform transition-transform duration-[10s] group-hover:scale-110" />
              <div className="absolute inset-0 bg-[#cba358]/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            
            {/* Image 2 (Front/Bottom Left) */}
            <div className="absolute bottom-0 left-0 w-[60%] h-[60%] rounded-2xl overflow-hidden shadow-2xl border-[8px] border-white z-20 transform -translate-x-4 translate-y-4 hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(0,0,0,0.2)] transition-all duration-500 group">
              <img src="/IMG/Horse/5.jpg" alt="Horse competition" className="w-full h-full object-cover transform transition-transform duration-[10s] group-hover:scale-110" />
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-md shadow-lg border border-gray-100">
                <p className="text-black font-bold text-xs tracking-widest uppercase">Since 2002</p>
              </div>
            </div>
            
            {/* Decorative Dots */}
            <div className="absolute top-1/4 left-10 w-20 h-20 bg-[radial-gradient(#cba358_2px,transparent_2px)] [background-size:10px_10px] opacity-20 z-0"></div>
            <div className="absolute bottom-1/4 right-0 w-24 h-24 bg-[radial-gradient(#cba358_2px,transparent_2px)] [background-size:12px_12px] opacity-20 z-0"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
