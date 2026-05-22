import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';

const DressagePage = () => {
  
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
          <source src="/Video/Horse Dressage.mp4" type="video/mp4" />
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
            Dressage
          </h1>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-[1400px] mx-auto px-4 md:px-8 py-16 md:py-24">
        
        {/* History Section */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-stretch mb-24 md:mb-32">
          <div className="w-full lg:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-5xl font-['Playfair_Display'] text-white font-bold mb-8">History of Dressage</h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light">
              Dressage as a sport has evolved from the need to train horses, to make them more obedient and responsive to their riders. This training, even in its most rudimentary form, is essential for making riding a reasonably safe occupation. It was particularly important for cavalry riders, for whom a well-trained horse could make the difference between life and death in battle.
            </p>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light">
              The dramatic "airs above the ground" performed by the famous Lipizzaner stallions of the Spanish Riding School in Vienna, were developed partly as a means of defence. The capriole, for example, in which the horse performs a controlled leap into the air and then strikes out with its hind legs, was a highly effective way of warding off unwelcome infantry. In India, the traditional "dancing" horses of Gujarat may once have had their use in war, though nowadays they can be seen performing, usually to the beat of a drum, at fairs.
            </p>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light">
              The word dressage comes from the French verb <span className="italic text-white">dresser</span>, meaning to train (or "dress") the riding horse. The high level of training that is seen in top dressage competitions today was originally regarded as more of an art than a sport, and was particularly popular in Renaissance Europe in the 15th and 16th Centuries. Known as Classical riding, its roots go back to the 4th Century BC and the writings of the Greek Xenophon whose best-known work, The Art of Horsemanship, espouses the need to understand a horse’s psychology.
            </p>
          </div>
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute inset-0 bg-[#cba358] blur-[100px] opacity-10 rounded-full"></div>
            <img 
              src="/IMG/Horse/1.jpg" 
              alt="Historical Dressage" 
              className="relative z-10 w-full h-full object-cover rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] border border-white/10"
            />
          </div>
        </div>

        {/* Present Form Section */}
        <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-20 items-stretch mb-24 md:mb-32">
          <div className="w-full lg:w-1/2 relative">
            <img 
              src="/IMG/Horse/2.jpg" 
              alt="Modern Dressage" 
              className="relative z-10 w-full h-full object-cover rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] border border-[#cba358]/30"
            />
            {/* Decorative Gold Frame */}
            <div className="absolute -inset-4 border border-[#cba358]/20 rounded-xl z-0 hidden lg:block"></div>
          </div>
          <div className="w-full lg:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-5xl font-['Playfair_Display'] text-white font-bold mb-8">Present Form</h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light">
              Today, the term Dressage is used to describe a type of training method and a competitive equestrian sport which strives for high levels of precision and harmony between horse and rider. The object of Dressage is to progressively develop a horse’s physical and mental ability to where the horse can remain calm, consistent, supple, attentive and keen to the aids of the rider. At the highest levels, communication between horse and rider becomes virtually invisible, creating the illusion that the horse and rider are performing 'as one'.
            </p>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light">
              In Dressage competitions, horse and rider perform a series of predetermined movements, known as ‘figures’ or “movements” in an arena of 20×60 metres within a given period of time. The arena is bordered by a low rail which the horse must stay within. The arena has 12 lettered markers placed symmetrically indicating where movements are to start, where changes of pace or lead are to occur and where the movements are to end.
            </p>
            <div className="mt-8 p-6 border-l-2 border-[#cba358] bg-white/5 rounded-r-lg">
              <p className="text-white italic text-sm md:text-base font-light">
                "The horse and rider show the paces – walk, trot and canter – as well as changes of lead, and have to be smooth in transitioning between each one."
              </p>
            </div>
          </div>
        </div>

        {/* Competitions and Scoring Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Classes of Competition */}
          <div className="bg-[#0a0a0a] border border-white/5 p-8 md:p-12 rounded-3xl shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#cba358]/10 blur-3xl rounded-full"></div>
            <h3 className="text-2xl md:text-3xl font-['Playfair_Display'] text-[#cba358] font-bold mb-8">Classes of Competition</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {['Preliminary', 'Elementary', 'Medium', 'Advanced Medium', 'Advanced', 'Prix St George', 'Intermediate – I'].map((cls, idx) => (
                <li key={idx} className="flex items-center gap-3 text-gray-300 font-light text-sm md:text-base border-b border-white/5 pb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#cba358]"></div>
                  {cls}
                </li>
              ))}
            </ul>
          </div>

          {/* Scoring System */}
          <div className="bg-[#0a0a0a] border border-[#cba358]/20 p-8 md:p-12 rounded-3xl shadow-[0_0_30px_rgba(203,163,88,0.05)] relative overflow-hidden">
            <h3 className="text-2xl md:text-3xl font-['Playfair_Display'] text-white font-bold mb-6">Scoring System</h3>
            <p className="text-gray-400 text-sm font-light leading-relaxed mb-8">
              The judges mark the fluidity, the regularity of the movements and the paces. The overall dressage score is comprised of individual movements scores, as well as collective marks. Scores are calculated using a 0-10 scale:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { score: 0, desc: 'Not Executed' },
                { score: 1, desc: 'Very Bad' },
                { score: 2, desc: 'Bad' },
                { score: 3, desc: 'Fairly Bad' },
                { score: 4, desc: 'Insufficient' },
                { score: 5, desc: 'Sufficient' },
                { score: 6, desc: 'Satisfactory' },
                { score: 7, desc: 'Fairly good' },
                { score: 8, desc: 'Good' },
                { score: 9, desc: 'Very Good' },
                { score: 10, desc: 'Excellent' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-white/5 p-3 rounded-lg hover:bg-[#cba358]/10 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-[#cba358] flex items-center justify-center text-[#050505] font-bold text-sm">
                    {item.score}
                  </div>
                  <span className="text-gray-300 text-sm font-light">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </main>
      
      {/* Footer Placeholder (or just space at bottom) */}
      <div className="w-full h-24 border-t border-white/5 flex items-center justify-center mt-12">
        <p className="text-gray-600 text-xs tracking-widest uppercase">© 2026 Equestrian Federation of Haryana</p>
      </div>

    </div>
  );
};

export default DressagePage;
