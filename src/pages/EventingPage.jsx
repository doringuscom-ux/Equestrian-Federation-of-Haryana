import React, { useEffect } from 'react';

const EventingPage = () => {
  
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
          <source src="/Video/Eventing.mp4" type="video/mp4" />
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
            Eventing
          </h1>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-[1400px] mx-auto px-4 md:px-8 py-16 md:py-24">
        
        {/* History Section */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-stretch mb-24 md:mb-32">
          <div className="w-full lg:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-5xl font-['Playfair_Display'] text-white font-bold mb-8">History of Eventing</h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light">
              The origins of the sport of Eventing are deeply rooted in the endurance tests that cavalrymen and their horses undertook as part of their training; often travelling great distances at considerable speed. The tests rarely involved jumping obstacles, though participants may well have had to negotiate ditches and rivers on their long rides.
            </p>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light">
              It is the French, however, who can truly claim to have introduced the modern-day form of Eventing, with its division into three separate types of activity – the dressage test, the endurance test and the jumping test – although the format of the sport has altered considerably over time. The first “Championnat du Cheval d’Armes” took place in 1902 near Paris. It became an annual event in France, and other European countries such as Sweden and Belgium soon began holding similar events.
            </p>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light">
              When the first Eventing competition took place at the Olympics, in 1912, the emphasis was still very much on endurance, and there was a 50km ride included on the cross country day. But over the years this endurance element of the contest was gradually reduced. Ultimately, the three-day event consisted of a Dressage test on the first day, a Speed and Endurance test on the second day, and on the final day there was the show jumping test.
            </p>
          </div>
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute inset-0 bg-[#cba358] blur-[100px] opacity-10 rounded-full"></div>
            <img 
              src="/IMG/Horse/5.jpg" 
              alt="Historical Eventing" 
              className="relative z-10 w-full h-full object-cover rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] border border-white/10 grayscale contrast-125 brightness-75"
            />
          </div>
        </div>

        {/* Present Form Section */}
        <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-20 items-stretch mb-24 md:mb-32">
          <div className="w-full lg:w-1/2 relative">
            <img 
              src="/IMG/Horse/6.jpg" 
              alt="Modern Eventing" 
              className="relative z-10 w-full h-full object-cover rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] border border-[#cba358]/30"
            />
            {/* Decorative Gold Frame */}
            <div className="absolute -inset-4 border border-[#cba358]/20 rounded-xl z-0 hidden lg:block"></div>
          </div>
          <div className="w-full lg:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-5xl font-['Playfair_Display'] text-white font-bold mb-8">Present Form</h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light">
              Eventing is the ultimate test of a horse and rider – comprising three disciplines – Dressage, Cross Country and Show Jumping, the scores from each combine to produce an overall total. Eventing takes place over one, two and three days depending on the level of competition. The sport is rather like a pentathlon in that it combines different disciplines in one competition and is run on a cumulative penalty basis.
            </p>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light">
              The first test is the dressage, which comprises a set sequence of compulsory movements. The test is scored by judges who are looking for balance, rhythm, suppleness, and the obedience of the horse. The show jumping phase is one round of jumping over coloured poles with a maximum time allowed. The fences are substantial enough for horses who do not specialize in show jumping.
            </p>
            <div className="mt-8 p-6 border-l-2 border-[#cba358] bg-white/5 rounded-r-lg">
              <p className="text-white italic text-sm md:text-base font-light">
                "The third phase is the cross country where a course of natural obstacles, normally over several miles, has to be jumped within a time allowed. A good cross country horse must be bold and straight as well as fast."
              </p>
            </div>
          </div>
        </div>

        {/* Scoring Section */}
        <div className="mb-24 md:mb-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-['Playfair_Display'] text-[#cba358] font-bold mb-6">Scoring & Penalties</h2>
            <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed">
              Eventing combines three distinct tests into one cumulative score. Each discipline has its own unique scoring and penalty system.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Dressage Scoring */}
            <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-3xl shadow-xl hover:border-[#cba358]/30 transition-colors group">
              <h3 className="text-2xl font-['Playfair_Display'] text-white font-bold mb-6 border-b border-white/10 pb-4">Dressage</h3>
              <p className="text-gray-400 text-sm font-light leading-relaxed mb-6">
                Each movement is marked out of 10 by three independent judges and the total score is averaged and then given as a percentage. This score is then converted to penalties.
              </p>
              <div className="bg-[#111] p-4 rounded-xl border border-white/5 group-hover:bg-white/5 transition-colors">
                <p className="text-xs text-gray-500 font-light italic">Each level of competition has its own dressage test and these tests increase in length and degree of difficulty as the competitions become more advanced.</p>
              </div>
            </div>

            {/* Cross Country Scoring */}
            <div className="bg-[#0a0a0a] border border-[#cba358]/20 p-8 rounded-3xl shadow-[0_0_30px_rgba(203,163,88,0.05)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#cba358]/10 blur-3xl rounded-full"></div>
              <h3 className="text-2xl font-['Playfair_Display'] text-[#cba358] font-bold mb-6 border-b border-white/10 pb-4">Cross Country</h3>
              
              <div className="space-y-3 mt-6">
                {[
                  { fault: 'First Refusal, run-out or circle', pen: '20 penalties' },
                  { fault: 'Second Refusal same obstacle', pen: '40 penalties' },
                  { fault: 'Third Refusal on entire course', pen: 'Elimination' },
                  { fault: 'Fall of Rider/Horse', pen: 'Elimination' },
                  { fault: 'Jumping in wrong order', pen: 'Elimination' },
                  { fault: 'Exceeding Time allowed', pen: '0.4 pen/sec' }
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm border-b border-white/5 pb-2 last:border-0">
                    <span className="text-gray-300 font-light pr-4">{item.fault}</span>
                    <span className={`font-bold whitespace-nowrap ${item.pen === 'Elimination' ? 'text-red-400' : 'text-[#cba358]'}`}>{item.pen}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Show Jumping Scoring */}
            <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-3xl shadow-xl hover:border-blue-400/30 transition-colors">
              <h3 className="text-2xl font-['Playfair_Display'] text-white font-bold mb-6 border-b border-white/10 pb-4">Show Jumping</h3>
              
              <div className="space-y-3 mt-6">
                {[
                  { fault: 'Knocking down an obstacle', pen: '4 penalties' }, // Replaced 20 with 4 based on standard SJ, but the text says "Knocking down an obstacle 20 penalties" - Wait, the user text says "Knocking down an obstacle 20 penalties, First Refusal 4 penalties". I must use user text.
                  { fault: 'Knocking down an obstacle', pen: '20 penalties' },
                  { fault: 'First Refusal', pen: '4 penalties' },
                  { fault: 'Second Refusal on whole test', pen: 'Elimination' },
                  { fault: 'Jumping in wrong order', pen: 'Elimination' },
                  { fault: 'Fall of Horse/Rider', pen: 'Elimination' },
                  { fault: 'Exceeding Time Allowed', pen: '1 pen/sec' }
                ].map((item, idx) => {
                  if(idx === 0) return null; // skip the duplicate fix
                  return (
                    <div key={idx} className="flex justify-between items-center text-sm border-b border-white/5 pb-2 last:border-0">
                      <span className="text-gray-300 font-light pr-4">{item.fault}</span>
                      <span className={`font-bold whitespace-nowrap ${item.pen === 'Elimination' ? 'text-red-400' : 'text-blue-400'}`}>{item.pen}</span>
                    </div>
                  )
                })}
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

export default EventingPage;
