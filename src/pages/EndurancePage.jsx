import React, { useEffect } from 'react';

const EndurancePage = () => {
  
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
          <source src="/Video/Endurance.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-[#050505]"></div>
        
        {/* Navbar */}
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-end pb-16 md:pb-24 px-4 md:px-8 max-w-[1400px] mx-auto z-20">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-[2px] bg-[#cba358]"></div>
            <p className="text-[#cba358] text-sm tracking-[0.3em] font-bold uppercase">Equestrian Discipline</p>
          </div>
          <h1 className="font-['Playfair_Display'] text-5xl md:text-7xl lg:text-[90px] text-white font-bold tracking-wide drop-shadow-lg">
            Endurance
          </h1>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-[1400px] mx-auto px-4 md:px-8 py-16 md:py-24">
        
        {/* History Section */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-stretch mb-24 md:mb-32">
          <div className="w-full lg:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-5xl font-['Playfair_Display'] text-white font-bold mb-8">History of Endurance</h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light">
              As with most of the modern equestrian disciplines, Endurance riding has its origins in military training and practices. Long rides were often carried out by cavalry soldiers either through necessity to fight wars or provide communications, or in times of peace to improve the fitness of horse and rider. As part of the training for army officers at the Remount and Veterinary Corp in Meerut, North India, officers were sent on rides to Delhi 70 kilometers away.
            </p>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light">
              The Mongols, who in their 200-year reign of terror extended their empire as far south as Delhi, probably spent longer hours in the saddle than any other warriors in history. They travelled light, usually with three or four spare horses; covering up to 80 miles a day and living off dehydrated mares’ curds. To maintain control of their vast empire, they operated a very efficient courier system with relays of messengers galloping along caravan tracks.
            </p>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light">
              Whereas the Mongols had the advantage of traveling with spare horses, the sport of Endurance is carried out with just one horse, which must arrive at the finish of a competition in good enough condition to pass a final veterinary check. Military rides in Europe from the 17th Century onwards were conducted in a similar fashion, with just one horse.
            </p>
          </div>
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute inset-0 bg-[#cba358] blur-[100px] opacity-10 rounded-full"></div>
            <img 
              src="/IMG/Horse/9.jpg" 
              alt="Historical Endurance" 
              className="relative z-10 w-full h-full object-cover rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] border border-white/10 grayscale contrast-125 brightness-75"
            />
          </div>
        </div>

        {/* Present Form Section */}
        <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-20 items-stretch mb-24 md:mb-32">
          <div className="w-full lg:w-1/2 relative">
            <img 
              src="/IMG/Horse/10.jpg" 
              alt="Modern Endurance" 
              className="relative z-10 w-full h-full object-cover rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] border border-[#cba358]/30"
            />
            {/* Decorative Gold Frame */}
            <div className="absolute -inset-4 border border-[#cba358]/20 rounded-xl z-0 hidden lg:block"></div>
          </div>
          <div className="w-full lg:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-5xl font-['Playfair_Display'] text-white font-bold mb-8">Present Form</h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light">
              Endurance is a long-distance competition against the clock testing the speed and endurance of a horse and challenging the rider over their effective use of pace, thorough knowledge of their horse’s capabilities and ability to cross all kinds of terrain. It is one of the international competitions recognized by the FEI.
            </p>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light">
              Each rider must safely manage the stamina and fitness of their horse and each course is divided into phases – in principle at least every 40km – with a compulsory halt for a veterinary inspection, or ‘vet gate’, after each. Each horse must be presented for inspection within a set time of reaching each ‘vet gate’, which determines whether it is fit to continue.
            </p>
            <div className="mt-8 p-6 border-l-2 border-[#cba358] bg-white/5 rounded-r-lg">
              <p className="text-white italic text-sm md:text-base font-light">
                "There are two main types of long-distance riding: competitive trail riding and endurance rides. A good endurance horse must be incredibly fit, well-paced, and form an unbreakable bond of trust with its rider."
              </p>
            </div>
          </div>
        </div>

        {/* Competition & Scoring Section */}
        <div className="mb-24 md:mb-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-['Playfair_Display'] text-[#cba358] font-bold mb-6">Competition & Scoring</h2>
            <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed">
              Unlike other disciplines that rely heavily on points or deductions, endurance is fundamentally a race against time where the welfare and condition of the horse remain paramount.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* The Winner */}
            <div className="bg-[#0a0a0a] border border-[#cba358]/20 p-8 rounded-3xl shadow-[0_0_30px_rgba(203,163,88,0.05)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#cba358]/10 blur-3xl rounded-full transition-all group-hover:scale-150 group-hover:bg-[#cba358]/20"></div>
              <h3 className="text-2xl font-['Playfair_Display'] text-[#cba358] font-bold mb-6 border-b border-white/10 pb-4 relative z-10">Determining the Winner</h3>
              <p className="text-gray-300 text-sm font-light leading-relaxed mb-6 relative z-10">
                The winner is the rider who finishes in the fastest time, with a horse in good condition. Excessive fatigue, signs of lameness, and other indications of problems are strict grounds for elimination.
              </p>
              <div className="bg-[#111] p-5 rounded-xl border border-white/5 relative z-10">
                <p className="text-white font-bold text-sm mb-2">Pace & Strategy</p>
                <p className="text-gray-500 text-sm font-light">Riders are free to choose their own pace between the start and the finish of the competition. They may lead or follow their horses, but must be mounted crossing the starting line and the finish line.</p>
              </div>
            </div>

            {/* Course Navigation */}
            <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-3xl shadow-xl hover:border-white/30 transition-colors">
              <h3 className="text-2xl font-['Playfair_Display'] text-white font-bold mb-6 border-b border-white/10 pb-4">Course Navigation</h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                    <span className="text-[#cba358] font-bold">01</span>
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Route Maps</h4>
                    <p className="text-gray-400 text-sm font-light leading-relaxed">Each competitor is given a map in advance showing the route of the course and the location of any compulsory halts.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                    <span className="text-[#cba358] font-bold">02</span>
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Hazards</h4>
                    <p className="text-gray-400 text-sm font-light leading-relaxed">Naturally occurring obstacles such as a ditch, steep climb, descent or water crossing. These are left in their natural state as much as possible.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                    <span className="text-[#cba358] font-bold">03</span>
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Flags & Markers</h4>
                    <p className="text-gray-400 text-sm font-light leading-relaxed">Hazards and specific boundaries are clearly marked by red and white boundary flags along the route.</p>
                  </div>
                </div>
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

export default EndurancePage;
