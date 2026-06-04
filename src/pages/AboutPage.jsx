import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const disciplines = [
  { name: 'Show Jumping', image: '/IMG/Horse/1.jpg', desc: 'Precision, speed, and agility over challenging obstacles.', link: '/show-jumping' },
  { name: 'Dressage', image: '/IMG/Horse/2.jpg', desc: 'The highest expression of horse training, harmony, and elegance.', link: '/dressage' },
  { name: 'Eventing', image: '/IMG/Horse/4.jpg', desc: 'The ultimate test of horsemanship across three rigorous disciplines.', link: '/eventing' },
  { name: 'Tent Pegging', image: '/IMG/Horse/7.jpg', desc: 'A thrilling, fast-paced display of traditional cavalry skills.', link: '/tent-pegging' },
  { name: 'Endurance', image: '/IMG/Horse/6.jpg', desc: 'Testing the immense stamina and fitness of both horse and rider.', link: '/endurance' }
];

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full font-['Inter'] bg-[#050505] min-h-screen text-white">
      {/* Navbar Overlay */}
      
      {/* Hero Section */}
      <div className="relative pt-24 md:pt-32 pb-8 md:pb-12 w-full overflow-hidden flex flex-col justify-center items-center px-4 bg-[#0a0a0a] border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-[#050505] opacity-90 z-10"></div>
        </div>
        <div className="relative z-20 text-center max-w-[1000px] mx-auto">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-[#cba358]"></div>
            <span className="text-[#cba358] text-sm tracking-[0.4em] font-bold uppercase">Our Legacy</span>
            <div className="w-12 h-[1px] bg-[#cba358]"></div>
          </div>
          <h1 className="font-['Playfair_Display'] text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-xl tracking-wider">
            About Us
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Discover the passion, dedication, and excellence that drives the Haryana Equestrian Federation.
          </p>
        </div>
      </div>

      {/* Introducing Section */}
      <div className="w-full max-w-6xl mx-auto px-4 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Left - Image */}
          <div className="relative group rounded-2xl overflow-hidden shadow-2xl animate-[fadeIn_0.5s_ease-out]">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
            <img 
              src="/IMG/Horse/3.jpg" 
              alt="Introducing HKCA" 
              className="w-full h-full object-cover aspect-square transform group-hover:scale-105 transition-transform duration-700 ease-in-out" 
            />
            <div className="absolute bottom-6 left-6 right-6 z-20">
              <div className="w-12 h-[2px] bg-[#cba358] mb-3"></div>
              <h3 className="text-xl font-['Playfair_Display'] font-bold text-white uppercase tracking-wider">
                Excellence in Motion
              </h3>
            </div>
          </div>

          {/* Right - Content */}
          <div className="flex flex-col justify-center animate-[fadeIn_0.7s_ease-out]">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              Equestrian Federation <br />
              <span className="text-[#cba358]">of Haryana</span>
            </h2>
            
            <div className="space-y-4 text-gray-400 font-light leading-relaxed text-sm md:text-base">
              <p>
                Established in 2002, the Equestrian Federation of Haryana (EFH) stands as a pioneering institution dedicated to the promotion, development, and welfare of equestrian sports in the State of Haryana.
              </p>
              <p>
                With a vision to nurture talent, uphold the rich equestrian heritage of India, and create world-class opportunities for riders, officials, trainers, and horse enthusiasts, EFH has been working tirelessly to build a vibrant equestrian ecosystem across the state.
              </p>
              <p>
                As a platform committed to sporting excellence, discipline, horsemanship, and youth development, the Federation actively encourages participation in key equestrian disciplines including Show Jumping, Dressage, Eventing, Tent Pegging, and Endurance Riding.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
              <div>
                <div className="text-2xl font-bold text-white mb-1">20+</div>
                <div className="text-xs font-bold text-[#cba358] uppercase tracking-widest">Events Annually</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-1">500+</div>
                <div className="text-xs font-bold text-[#cba358] uppercase tracking-widest">Active Riders</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-1">15</div>
                <div className="text-xs font-bold text-[#cba358] uppercase tracking-widest">Training Centers</div>
              </div>
            </div>

            <div className="mt-10">
              <a 
                href="/dummy.pdf" 
                download 
                className="group inline-flex items-center gap-4 bg-transparent border border-[#cba358]/50 px-8 py-3.5 rounded-full shadow-[0_0_15px_rgba(203,163,88,0.1)] hover:shadow-[0_0_25px_rgba(203,163,88,0.3)] hover:bg-[#cba358]/10 transition-all duration-500 transform hover:-translate-y-1"
              >
                <div className="w-8 h-8 rounded-full bg-[#cba358] flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                  </svg>
                </div>
                <span className="font-bold uppercase tracking-[0.2em] text-[11px] text-[#cba358] group-hover:text-white transition-colors duration-500">
                  Download PDF
                </span>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Discover The Sport Section */}
      <div className="w-full bg-[#050505] py-16 md:py-24 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left Column */}
            <div className="flex flex-col justify-center">
              <div className="mb-8 md:mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#cba358]/30 bg-[#cba358]/5 text-[#cba358] text-xs font-bold tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(203,163,88,0.1)]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                  Discover The Sport
                </div>
                <h2 className="font-['Playfair_Display'] text-5xl md:text-7xl lg:text-[5rem] font-bold text-white leading-[1.1] uppercase tracking-wide">
                  Equestrian <br />
                  <span className="text-gray-400">Disciplines</span>
                </h2>
              </div>

              <div className="space-y-4">
                {/* Info Card 1 */}
                <div className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-6 md:p-8 flex gap-5 md:gap-6 hover:bg-[#111] transition-colors duration-300 shadow-xl">
                  <div className="w-12 h-12 rounded-full bg-[#cba358]/10 text-[#cba358] flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wider">What is Dressage?</h3>
                    <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed">
                      Often described as "horse ballet," it is the highest expression of horse training where horse and rider perform from memory a series of predetermined, elegant movements.
                    </p>
                  </div>
                </div>

                {/* Info Card 2 */}
                <div className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-6 md:p-8 flex gap-5 md:gap-6 hover:bg-[#111] transition-colors duration-300 shadow-xl">
                  <div className="w-12 h-12 rounded-full bg-[#cba358]/10 text-[#cba358] flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wider">What is Show Jumping?</h3>
                    <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed">
                      A high-adrenaline, thrilling discipline where horse and rider must navigate a course of colorful obstacles, demanding precision, speed, and supreme agility.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-4 md:gap-6 mt-8 lg:mt-0">
              {/* Image Card */}
              <div className="w-full h-[300px] md:h-[450px] rounded-[2rem] overflow-hidden shadow-2xl relative border border-white/5 group">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                <img 
                  src="/IMG/Horse/6.jpg" 
                  alt="Equestrian Action" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
              </div>

              {/* Olympic Card */}
              <div className="bg-[#0f1115] border border-white/5 rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-[#1a1d24] border border-[#cba358]/30 text-[#cba358] flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(203,163,88,0.15)]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="7"></circle>
                      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1 uppercase tracking-widest">Olympic Recognition</h3>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Included Since 1900</p>
                  </div>
                </div>

                <div className="bg-[#1a1d24] rounded-2xl p-4 border border-white/5 flex flex-col gap-3 min-w-[220px]">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#cba358]/20 text-[#cba358] flex items-center justify-center shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span className="text-sm font-semibold text-gray-300">Dressage & Jumping</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#cba358]/20 text-[#cba358] flex items-center justify-center shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span className="text-sm font-semibold text-gray-300">Men & Women Compete Together</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* Why Join Dressage Section */}
      <div className="w-full bg-[#0a0a0a] py-16 md:py-24 relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-white mb-6">
              Why Join <span className="text-[#cba358]">Dressage?</span>
            </h2>
            <p className="text-gray-400 font-light max-w-2xl mx-auto text-sm md:text-base">
              Discover the profound benefits of practicing the highest expression of horse training, from developing unparalleled harmony with your horse to achieving supreme physical and mental discipline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Reason 1 */}
            <div className="bg-[#111] border border-white/5 rounded-[2rem] p-8 md:p-10 hover:-translate-y-2 transition-transform duration-500 shadow-xl group">
              <div className="w-16 h-16 rounded-2xl bg-[#cba358]/10 text-[#cba358] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">Harmony & Connection</h3>
              <p className="text-gray-400 font-light leading-relaxed">
                Develop an invisible, almost telepathic bond with your horse. Dressage teaches you to communicate through the subtlest of cues, creating a breathtaking partnership built on absolute mutual respect.
              </p>
            </div>

            {/* Reason 2 */}
            <div className="bg-[#111] border border-white/5 rounded-[2rem] p-8 md:p-10 hover:-translate-y-2 transition-transform duration-500 shadow-xl group">
              <div className="w-16 h-16 rounded-2xl bg-[#cba358]/10 text-[#cba358] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">Mental & Physical Focus</h3>
              <p className="text-gray-400 font-light leading-relaxed">
                Mastering intricate movements requires intense mental focus, supreme core strength, and impeccable balance. It is a demanding sport that beautifully sharpens your mind while conditioning your body.
              </p>
            </div>

            {/* Reason 3 */}
            <div className="bg-[#111] border border-white/5 rounded-[2rem] p-8 md:p-10 hover:-translate-y-2 transition-transform duration-500 shadow-xl group">
              <div className="w-16 h-16 rounded-2xl bg-[#cba358]/10 text-[#cba358] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 15l-3-3m0 0l3-3m-3 3h8M2 12a10 10 0 1020 0 10 10 0 00-20 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">Foundation For All</h3>
              <p className="text-gray-400 font-light leading-relaxed">
                Dressage is widely considered the fundamental basis for all other equestrian disciplines. The balance, control, and obedience learned here will dramatically elevate your performance in any riding style.
              </p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default AboutPage;
