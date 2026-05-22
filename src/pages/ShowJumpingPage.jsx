import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';

const ShowJumpingPage = () => {
  
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
          <source src="/Video/Show Jumping.mp4" type="video/mp4" />
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
            Show Jumping
          </h1>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-[1400px] mx-auto px-4 md:px-8 py-16 md:py-24">
        
        {/* History Section */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-stretch mb-24 md:mb-32">
          <div className="w-full lg:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-5xl font-['Playfair_Display'] text-white font-bold mb-8">History of Show Jumping</h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light">
              The first recorded show jumping competitions in the world were held in 1864 in Dublin, Ireland, as part of a trial horse show. High Jump and Wide Leap classes were included in the show, primarily to test the ability of hunters, and these classes became very popular. Soon, other horse shows were founded in Europe and the USA: for example, the famous show at Madison Square Gardens, New York, started in 1883.
            </p>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light">
              The High Jump was a particular favourite among spectators and some impressive heights were achieved. In 1902 an unofficial high jump record was set by the American Dick Donnelly riding Heatherbloom, who cleared a staggering 2.515 metres (8ft 3ins) at a public demonstration in Richmond, Virginia. By the early 20th Century the sport of show jumping was gaining momentum worldwide, including in India. It became an Olympic sport for the first time in 1912, in Stockholm. Show jumping in India took place at horse shows in Calcutta, Delhi and other cities.
            </p>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light">
              Initially it was the British cavalry officers who took part in the jumping competitions, but Indian cavalrymen also began to take it up, and rivalry between regiments was intense. As Indian riders became more successful in show jumping they were keen to test their skills on the international scene, but the FEI would not accept Indian riders at foreign shows unless they were sent by their own national federation. As India had never had a federation, moves were soon made to rectify the matter and the Equestrian Federation of India was founded in 1967.
            </p>
          </div>
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute inset-0 bg-[#cba358] blur-[100px] opacity-10 rounded-full"></div>
            <img 
              src="/IMG/Horse/3.jpg" 
              alt="Historical Show Jumping" 
              className="relative z-10 w-full h-full object-cover rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] border border-white/10 grayscale contrast-125 brightness-75"
            />
          </div>
        </div>

        {/* Present Form Section */}
        <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-20 items-stretch mb-24 md:mb-32">
          <div className="w-full lg:w-1/2 relative">
            <img 
              src="/IMG/Horse/4.jpg" 
              alt="Modern Show Jumping" 
              className="relative z-10 w-full h-full object-cover rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] border border-[#cba358]/30"
            />
            {/* Decorative Gold Frame */}
            <div className="absolute -inset-4 border border-[#cba358]/20 rounded-xl z-0 hidden lg:block"></div>
          </div>
          <div className="w-full lg:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-5xl font-['Playfair_Display'] text-white font-bold mb-8">Present Form</h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light">
              Show jumping is a sport for horses and riders which tests the horse’s ability to jump over a course of fences at a pre-determined pace. Show Jumping is one of the three Olympic equestrian disciplines, with Eventing and Dressage. In a show jumping event, the stamina, speed, and flexibility of the horse are tested, along with the relationship that the horse has with its rider. Competition rankings are determined by the number of faults accumulated and the overall speed with which the course is completed.
            </p>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light">
              The highest level, called Grand Prix, features complex and intimidating obstacles which include a wide spread, meaning that the horse has to jump high and long, and obstacles like hedges and ditches. In addition, the arrangement of the jumps determines the difficulty of the course. Grand Prix show jumping typically involves jumps set at strange angles, requiring horses to be quick on their feet, or jumps at awkward distances which require the horse to be skilled and adaptable. Traditionally, the rider walks the course before riding it, so that he or she is aware of the layout.
            </p>
          </div>
        </div>

        {/* Types of Fences and Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-24 md:mb-32">
          
          {/* Fences */}
          <div className="bg-[#0a0a0a] border border-white/5 p-8 md:p-12 rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <h3 className="text-2xl md:text-3xl font-['Playfair_Display'] text-[#cba358] font-bold mb-8">Types of Fences</h3>
            <div className="space-y-6">
              {[
                { name: 'Verticals', desc: 'An upright jump, verticals can be hard for the horse to judge.' },
                { name: 'Oxers', desc: 'Also called “spreads,” oxers consist of two verticals placed apart to add height and width.' },
                { name: 'Triple Bars', desc: 'Comprised of three verticals placed together, gradually increasing in height.' },
                { name: 'Liverpools', desc: 'Look like a pool of water on the ground. Placed under a fence or on their own.' },
                { name: 'Combinations', desc: 'A group of fences placed in close sequence, usually one to two strides apart.' },
                { name: 'Walls', desc: 'Upright and solid, but made so a piece will fall if a horse hits them.' }
              ].map((fence, idx) => (
                <div key={idx} className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <h4 className="text-white font-bold tracking-wider uppercase text-sm mb-2 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#cba358] rotate-45"></div>
                    {fence.name}
                  </h4>
                  <p className="text-gray-400 text-sm font-light leading-relaxed pl-3.5">
                    {fence.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="bg-[#0a0a0a] border border-[#cba358]/20 p-8 md:p-12 rounded-3xl shadow-[0_0_30px_rgba(203,163,88,0.05)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#cba358]/10 blur-3xl rounded-full"></div>
            <h3 className="text-2xl md:text-3xl font-['Playfair_Display'] text-white font-bold mb-8">Categories in India</h3>
            <ul className="space-y-4">
              {['Preliminary', 'Novice', 'Grade III / Medium Grade', 'Grade II / Intermediate Grade', 'Grade I / Advance Grade', 'Grand Prix'].map((cat, idx) => (
                <li key={idx} className="flex items-center gap-4 text-gray-300 font-light text-sm md:text-lg bg-white/5 p-4 rounded-xl border border-white/5 hover:border-[#cba358]/30 transition-colors">
                  <span className="text-[#cba358] font-bold opacity-50">0{idx + 1}</span>
                  {cat}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Specifications Table */}
        <div className="mb-24 md:mb-32">
          <h3 className="text-3xl md:text-4xl font-['Playfair_Display'] text-white font-bold mb-8 text-center">Specification of the Show Jumping Course</h3>
          <div className="overflow-x-auto rounded-2xl border border-white/10 shadow-2xl">
            <table className="w-full text-left text-sm text-gray-300">
              <thead className="text-xs text-[#cba358] uppercase bg-[#111] border-b border-white/10 tracking-wider">
                <tr>
                  <th className="px-6 py-5">Grade</th>
                  <th className="px-6 py-5">Height (Min)</th>
                  <th className="px-6 py-5">Height (Max)</th>
                  <th className="px-6 py-5">Spread Max</th>
                  <th className="px-6 py-5">Speed Per Min</th>
                  <th className="px-6 py-5">Rounds</th>
                  <th className="px-6 py-5 min-w-[300px]">No of Jumps</th>
                </tr>
              </thead>
              <tbody className="bg-[#050505] divide-y divide-white/5">
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-semibold text-white">PRELIMINARY</td>
                  <td className="px-6 py-4">0.90m</td>
                  <td className="px-6 py-4">1.05m</td>
                  <td className="px-6 py-4">1.20m</td>
                  <td className="px-6 py-4">325 M</td>
                  <td className="px-6 py-4">Two</td>
                  <td className="px-6 py-4 font-light text-gray-400">Max 14 obstacles. One double combination of height not exceeding 95Cm and spread not exceeding 110Cm.</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors bg-[#0a0a0a]">
                  <td className="px-6 py-4 font-semibold text-white">NOVICE</td>
                  <td className="px-6 py-4">1.00m</td>
                  <td className="px-6 py-4">1.10m</td>
                  <td className="px-6 py-4">1.25m</td>
                  <td className="px-6 py-4">350 M</td>
                  <td className="px-6 py-4">Two</td>
                  <td className="px-6 py-4 font-light text-gray-400">Max 14 obstacles. Two double combination in each round. Liverpool compulsory.</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-semibold text-white">GRADE III / Medium</td>
                  <td className="px-6 py-4">1.10m</td>
                  <td className="px-6 py-4">1.20m</td>
                  <td className="px-6 py-4">1.40m</td>
                  <td className="px-6 py-4">350 M</td>
                  <td className="px-6 py-4">Two</td>
                  <td className="px-6 py-4 font-light text-gray-400">Max 14 obstacles with one triple and one double combination or three double combinations in each round. Liverpool compulsory.</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors bg-[#0a0a0a]">
                  <td className="px-6 py-4 font-semibold text-white">GRADE II / Intermediate</td>
                  <td className="px-6 py-4">1.20m</td>
                  <td className="px-6 py-4">1.30m</td>
                  <td className="px-6 py-4">1.50m</td>
                  <td className="px-6 py-4">350 M</td>
                  <td className="px-6 py-4">Two</td>
                  <td className="px-6 py-4 font-light text-gray-400">Max 14 obstacles with one triple and one double combination or three double combinations in each round. Liverpool compulsory.</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-semibold text-white">GRADE I / Advance</td>
                  <td className="px-6 py-4">1.30m</td>
                  <td className="px-6 py-4">1.40m</td>
                  <td className="px-6 py-4">1.60m</td>
                  <td className="px-6 py-4">375 M</td>
                  <td className="px-6 py-4">Two</td>
                  <td className="px-6 py-4 font-light text-gray-400">Max 14 obstacles with one triple and one double combination or three double combinations in each round. Liverpool compulsory.</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors bg-[#0a0a0a]">
                  <td className="px-6 py-4 font-semibold text-white">GRAND PRIX</td>
                  <td className="px-6 py-4">1.30m</td>
                  <td className="px-6 py-4">1.50m</td>
                  <td className="px-6 py-4">1.70m</td>
                  <td className="px-6 py-4">375 M</td>
                  <td className="px-6 py-4">Two</td>
                  <td className="px-6 py-4 font-light text-gray-400">-do-</td>
                </tr>
              </tbody>
            </table>
            <div className="bg-[#111] p-4 border-t border-[#cba358]/30">
              <p className="text-xs text-[#cba358] italic text-center">
                * Top Score Competitions: Max height of JOKER will not be more than 15 cm higher than the maximum height of that grade. The JOKER will compulsorily be a VERTICAL fence.
              </p>
            </div>
          </div>
        </div>

        {/* Scoring Section */}
        <div className="bg-gradient-to-br from-[#121a2f] to-[#0a0a0a] rounded-3xl p-8 md:p-16 border border-[#cba358]/20 shadow-[inset_0_0_50px_rgba(203,163,88,0.05)] text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-['Playfair_Display'] text-[#cba358] font-bold mb-8">Scoring & Penalties</h2>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed font-light mb-8">
            The scoring for Jumping is based on a penalty system, and none of the competitors are judged subjectively. The best possible score in the competition is zero penalty points (faults), which is known as a <span className="text-white font-bold">clear round</span>. A clear round means the rider has completed the course within the time allowed and without incurring any penalty points.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="bg-red-950/20 border border-red-500/20 p-6 rounded-2xl">
              <h4 className="text-red-400 font-bold mb-2">4 Faults</h4>
              <p className="text-gray-400 text-sm font-light">Incurred if a horse knocks down a fence, or if they refuse at a fence.</p>
            </div>
            <div className="bg-red-950/20 border border-red-500/20 p-6 rounded-2xl">
              <h4 className="text-red-400 font-bold mb-2">Elimination</h4>
              <p className="text-gray-400 text-sm font-light">If a horse refuses to jump a particular fence two times, or if the horse or competitor falls.</p>
            </div>
            <div className="bg-yellow-950/20 border border-yellow-500/20 p-6 rounded-2xl md:col-span-2">
              <h4 className="text-yellow-400 font-bold mb-2">Time Penalties & Jump-Offs</h4>
              <p className="text-gray-400 text-sm font-light">
                Riders are normally required to jump around the course within a set time. Failing to do so incurs time faults at a rate of 0.25 points per second over the limit. Horses and riders who jump their first round clear will be able to continue to the "jump off," a shortened course where the fastest time with the least penalties wins.
              </p>
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

export default ShowJumpingPage;
