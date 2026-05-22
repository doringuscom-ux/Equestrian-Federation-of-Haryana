import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const disciplinesData = [
  {
    id: 1,
    name: 'Dressage',
    path: '/dressage',
    description: 'The highest expression of horse training, where horse and rider perform a series of predetermined movements from memory with absolute grace and harmony.',
    video: '/Video/Horse Dressage.mp4',
    image: '/IMG/Horse/1.jpg',
  },
  {
    id: 2,
    name: 'Show Jumping',
    path: '/show-jumping',
    description: 'A spectacular mix of courage, control, and technical ability as horse and rider navigate a complex course of obstacles against the clock.',
    video: '/Video/Show Jumping.mp4',
    image: '/IMG/Horse/3.jpg',
  },
  {
    id: 3,
    name: 'Eventing',
    path: '/eventing',
    description: 'The ultimate equestrian challenge, combining the elegance of dressage, the precision of show jumping, and the unparalleled bravery of cross-country.',
    video: '/Video/Eventing.mp4',
    image: '/IMG/Horse/5.jpg',
  },
  {
    id: 4,
    name: 'Tent Pegging',
    path: '/tent-pegging',
    description: 'An ancient cavalry sport demanding incredible speed and accuracy, as riders gallop at full speed using swords or lances to strike ground targets.',
    video: '/Video/Tent Pegging.mp4',
    image: '/IMG/Horse/7.jpg',
  },
  {
    id: 5,
    name: 'Endurance',
    path: '/endurance',
    description: 'A true test of stamina, fitness, and partnership, challenging horse and rider over long-distance natural courses in a race against time.',
    video: '/Video/Endurance.mp4',
    image: '/IMG/Horse/9.jpg',
  }
];

const Disciplines = () => {
  const [activeId, setActiveId] = useState(1);
  const navigate = useNavigate();

  const activeDiscipline = disciplinesData.find(d => d.id === activeId);

  const handleExplore = () => {
    if (activeDiscipline && activeDiscipline.path) {
      navigate(activeDiscipline.path);
      window.scrollTo(0, 0);
    }
  };

  return (
    <section className="py-16 md:py-20 bg-[#050505] relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#cba358] opacity-[0.03] blur-[100px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center md:items-start mb-10 md:mb-14">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-[1px] bg-[#cba358]"></div>
            <p className="text-[#cba358] text-sm tracking-[0.3em] font-bold uppercase">Equestrian Sports</p>
          </div>
          <h2 className="text-3xl md:text-5xl font-['Playfair_Display'] font-bold text-white tracking-wide">
            OUR DISCIPLINES
          </h2>
        </div>

        {/* Interactive Layout */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          
          {/* Left Side: List */}
          <div className="w-full lg:w-1/3 flex flex-col justify-center gap-2">
            {disciplinesData.map((item, index) => (
              <div 
                key={item.id}
                onMouseEnter={() => setActiveId(item.id)}
                onClick={() => setActiveId(item.id)}
                className={`group cursor-pointer py-4 px-6 rounded-xl border transition-all duration-300 flex items-center justify-between
                  ${activeId === item.id ? 'bg-[#cba358]/10 border-[#cba358]/30 shadow-[0_0_20px_rgba(203,163,88,0.1)]' : 'border-transparent hover:bg-white/5'}`}
              >
                <div className="flex items-center gap-6">
                  <span className={`font-mono text-sm tracking-widest transition-colors duration-500
                    ${activeId === item.id ? 'text-[#cba358]' : 'text-gray-600 group-hover:text-gray-400'}`}>
                    0{index + 1}
                  </span>
                  <h3 className={`text-xl md:text-2xl font-light tracking-wider transition-all duration-500
                    ${activeId === item.id ? 'text-white translate-x-2' : 'text-gray-400 group-hover:text-white'}`}
                  >
                    {item.name}
                  </h3>
                </div>
                
                {/* Active Indicator Arrow */}
                <svg 
                  className={`w-6 h-6 text-[#cba358] transition-all duration-500 
                    ${activeId === item.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`} 
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </div>
            ))}
          </div>

          {/* Right Side: Image Display */}
          <div className="w-full lg:w-2/3 h-[400px] md:h-[450px] relative rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/5 group">
            
            {/* Dynamic Background Image */}
            {disciplinesData.map((item) => (
              <div 
                key={item.id}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out
                  ${activeId === item.id ? 'opacity-100' : 'opacity-0'}`}
              >
                {item.video ? (
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="w-full h-full object-cover object-center transform transition-transform duration-[10s] ease-out group-hover:scale-105"
                  >
                    <source src={item.video} type="video/mp4" />
                  </video>
                ) : (
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover object-center transform transition-transform duration-[10s] ease-out group-hover:scale-105"
                  />
                )}
                {/* Gradient Overlay for Text */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent"></div>
              </div>
            ))}

            {/* Dynamic Content Overlay */}
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-10">
              <div className="max-w-2xl transform transition-all duration-700 translate-y-0">
                <h3 className="text-2xl md:text-4xl font-['Playfair_Display'] text-white font-bold mb-3 drop-shadow-lg">
                  {activeDiscipline?.name}
                </h3>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed font-light mb-6 drop-shadow-md">
                  {activeDiscipline?.description}
                </p>
                
                <button 
                  onClick={handleExplore}
                  className="flex items-center gap-3 bg-[#cba358] text-black text-xs md:text-sm font-bold tracking-[0.2em] uppercase px-8 py-4 rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(203,163,88,0.3)]"
                >
                  <span>Explore {activeDiscipline?.name}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Disciplines;
