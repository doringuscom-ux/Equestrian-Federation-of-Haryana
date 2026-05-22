import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';

const TentPeggingPage = () => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full font-['Inter'] bg-[#050505] text-gray-200 min-h-screen">
      
      {/* Hero Banner */}
      <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        {/* Background Video */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-80"
        >
          <source src="/Video/Tent Pegging.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-[#050505]"></div>
        
        {/* Navbar */}
        <Navbar />

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-end pb-16 md:pb-24 px-4 md:px-8 max-w-[1400px] mx-auto z-20">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-[2px] bg-[#cba358]"></div>
            <p className="text-[#cba358] text-sm tracking-[0.3em] font-bold uppercase">Equestrian Discipline</p>
          </div>
          <h1 className="font-['Playfair_Display'] text-5xl md:text-7xl lg:text-[90px] text-white font-bold tracking-wide drop-shadow-lg">
            Tent Pegging
          </h1>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-[1400px] mx-auto px-4 md:px-8 py-16 md:py-24">
        
        {/* History Section */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-stretch mb-24 md:mb-32">
          <div className="w-full lg:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-5xl font-['Playfair_Display'] text-white font-bold mb-8">History of Tent Pegging</h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light">
              This fast and dramatic sport, in which riders carrying a lance or sword must spear and pick up a peg from the ground while at full gallop, can truly be said to belong to Asia. Cavalrymen have practised the game since at the least the 4th Century BC, and Asian empires were responsible for introducing the sport to other parts of the world.
            </p>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light">
              One theory is that the sport evolved from a battlefield ploy used in the Middle Ages by horsed cavalry against troops mounted on elephants. The soldiers discovered that the best way to render the elephants ineffective was to attack them with sharp spears aimed behind the toenails of the elephants’ forelegs. The tactics were to send in three or four lancers, riding in single file, to charge at the elephant with lances down.
            </p>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light">
              In India the sport was taken up with enthusiasm by the British army during the colonial period, and during the first half of the 20th Century it was one of the most popular sporting activities of cavalrymen in India. The catalyst for the sport’s resurgence in the early 80s was its inclusion in the Asian Games in Delhi in 1982 – the result of intense and determined negotiation by the Equestrian Federation of India (EFI).
            </p>
          </div>
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute inset-0 bg-[#cba358] blur-[100px] opacity-10 rounded-full"></div>
            <img 
              src="/IMG/Horse/7.jpg" 
              alt="Historical Tent Pegging" 
              className="relative z-10 w-full h-full object-cover rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] border border-white/10 grayscale contrast-125 brightness-75"
            />
          </div>
        </div>

        {/* Present Form Section */}
        <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-20 items-stretch mb-24 md:mb-32">
          <div className="w-full lg:w-1/2 relative">
            <img 
              src="/IMG/Horse/8.jpg" 
              alt="Modern Tent Pegging" 
              className="relative z-10 w-full h-full object-cover rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] border border-[#cba358]/30"
            />
            {/* Decorative Gold Frame */}
            <div className="absolute -inset-4 border border-[#cba358]/20 rounded-xl z-0 hidden lg:block"></div>
          </div>
          <div className="w-full lg:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-5xl font-['Playfair_Display'] text-white font-bold mb-8">Present Form</h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light">
              Tent pegging involves horse and rider racing along a 100 meter course and collecting, cutting, shooting, or accurately “stabbing” a series of pegs, lemons, rings, or mannequins along the way. The targets used for tent pegging has several variations, like, a ring – a rider’s weapon should successfully pass through the ring without making contact, a lemon – where a rider is required to stab or slice a suspended lemon.
            </p>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light">
              Once a rider commences an event, the emphasis is on the object and not on his horses. Tent Pegging calls for a well-schooled horse that will respond to commands instantaneously and have no fear of noise or sudden movements. A high standard of riding skill is required to gallop a horse at full speed and maintain posture as judges award points for the style and accuracy with which objects are struck or retrieved.
            </p>
          </div>
        </div>

        {/* Scoring & Points Section */}
        <div className="mb-24 md:mb-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-['Playfair_Display'] text-[#cba358] font-bold mb-6">Award of Points</h2>
            <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed">
              Points are awarded based on the accuracy and execution of striking or removing the pegs. The competitor with the highest score minus any penalties wins the event.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-3xl shadow-xl hover:border-[#cba358]/50 transition-colors">
              <h3 className="text-4xl font-['Playfair_Display'] text-[#cba358] font-bold mb-4">6 Points</h3>
              <p className="text-gray-300 text-sm font-light leading-relaxed">
                For wooden pegs carried all the way or falls forward/sideways beyond 15 meters. For cardboard pegs beyond 10m. Or peg struck with point of lance/sword but breaks and part of it still in the ground.
              </p>
            </div>
            <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-3xl shadow-xl hover:border-[#cba358]/50 transition-colors">
              <h3 className="text-4xl font-['Playfair_Display'] text-[#cba358] font-bold mb-4">4 Points</h3>
              <p className="text-gray-300 text-sm font-light leading-relaxed">
                Peg removed from the ground, but not carried the full distance as stipulated for the 6 points category.
              </p>
            </div>
            <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-3xl shadow-xl hover:border-[#cba358]/50 transition-colors">
              <h3 className="text-4xl font-['Playfair_Display'] text-[#cba358] font-bold mb-4">2 Points</h3>
              <p className="text-gray-300 text-sm font-light leading-relaxed">
                Peg struck on face, but not removed from its position in the ground.
              </p>
            </div>
          </div>

          <div className="bg-[#111] border-l-4 border-[#cba358] p-6 rounded-r-xl mb-16">
            <p className="text-gray-400 text-sm italic">
              <span className="text-white font-bold not-italic">Note:</span> Peg must be struck on the face of the peg by the point of the weapon and must leave a mark on the peg (marks on the side of the pegs are not countable). Doubtful pegs must be handed over to the jury.
            </p>
          </div>

          {/* Points Tables */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            <div className="bg-[#050505] border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(203,163,88,0.05)]">
              <div className="bg-[#111] px-6 py-4 border-b border-white/10">
                <h4 className="text-[#cba358] font-bold tracking-widest uppercase text-sm">Rings & Lance</h4>
              </div>
              <div className="p-6 space-y-4">
                {[
                  { action: 'Rings carried on lance', pts: '6 each' },
                  { action: 'Carry Peg', pts: '6' },
                  { action: 'Draw of peg', pts: '4' },
                  { action: 'Strike of peg', pts: '2' },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0">
                    <span className="text-gray-300 font-light">{item.action}</span>
                    <span className="text-white font-bold">{item.pts}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#050505] border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(203,163,88,0.05)]">
              <div className="bg-[#111] px-6 py-4 border-b border-white/10">
                <h4 className="text-[#cba358] font-bold tracking-widest uppercase text-sm">Sword & Lemon</h4>
              </div>
              <div className="p-6 space-y-4">
                {[
                  { action: 'Sword (Horizontal Slice/Cut)', pts: '6 each' },
                  { action: 'Carry Peg', pts: '6' },
                  { action: 'Draw of peg', pts: '4' },
                  { action: 'Strike of peg', pts: '2' },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0">
                    <span className="text-gray-300 font-light">{item.action}</span>
                    <span className="text-white font-bold">{item.pts}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </main>
      
      {/* Footer Placeholder */}
      <div className="w-full h-24 border-t border-white/5 flex items-center justify-center mt-12">
        <p className="text-gray-600 text-xs tracking-widest uppercase">© 2026 Equestrian Federation of Haryana</p>
      </div>

    </div>
  );
};

export default TentPeggingPage;
