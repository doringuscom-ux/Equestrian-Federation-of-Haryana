import React, { useState } from 'react';

const affiliationsData = [
  {
    id: 1,
    title: 'EQUESTRIAN FEDERATION\nOF INDIA',
    abbr: 'EFI',
    logo: '/IMG/EQUESTRIANFEDERATION.png',
    containerColor: 'bg-white',
    description: 'The national governing body for equestrian sports in India, promoting excellence and integrity.'
  },
  {
    id: 2,
    title: 'HARYANA OLYMPIC\nASSOCIATION',
    abbr: 'HOA',
    logo: '/IMG/HARYANAOLYMPIC.jpg',
    containerColor: 'bg-white',
    description: 'Supporting athletes and fostering Olympic values across the state of Haryana.'
  }
];

const Affiliations = () => {
  const [flippedId, setFlippedId] = useState(null);

  const handleCardClick = (id) => {
    setFlippedId(flippedId === id ? null : id);
  };

  return (
    <section className="relative py-10 md:py-12 overflow-hidden flex flex-col items-center">
      
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?q=80&w=1920&auto=format&fit=crop" 
          alt="Equestrian Background" 
          className="w-full h-full object-cover object-center opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#111827]/75 via-[#111827]/50 to-[#111827]/75"></div>
      </div>

      <div className="relative z-10 w-full max-w-[1400px] px-4 md:px-8 flex flex-col items-center">
        
        {/* Top Icon */}
        <div className="mb-6">
          <svg className="w-8 h-8 fill-white opacity-90" viewBox="0 0 24 24">
            <path d="M14.4,5.4C14.4,5.4,14.4,5.4,14.4,5.4c-0.2-0.5-0.7-0.7-1.2-0.5c-0.1,0.1-0.2,0.1-0.2,0.2l-2.4,1.4
              C9.4,7,7.7,7.8,6,8.7L5,9.2C4.1,9.7,3.5,10.6,3.4,11.7l-0.2,3.3C3.1,16.2,4,17,5,16.9l2.2-0.1L9,15.7l1.7,3.5
              c0.2,0.4,0.6,0.5,1,0.3c0.4-0.2,0.5-0.6,0.3-1l-1.3-2.6c0.5,0.1,1.1,0.3,1.6,0.3L15.6,15c1.4-0.4,2.5-1.5,2.9-2.9l1.4-4.2
              c0.2-0.6-0.2-1.3-0.8-1.5C18.6,6.3,18.1,6,17.5,6c-0.2,0-0.4,0-0.6,0.1L14.4,5.4z"/>
          </svg>
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-[55px] font-['Playfair_Display'] font-bold text-white tracking-widest mb-6 text-center drop-shadow-lg">
          AFFILIATED WITH
        </h2>
        
        {/* Golden Diamond Divider */}
        <div className="flex items-center w-full max-w-[250px] mb-8">
          <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent to-[#cba358]"></div>
          <div className="w-1.5 h-1.5 rotate-45 bg-[#cba358] mx-4 shadow-[0_0_8px_rgba(203,163,88,1)]"></div>
          <div className="h-[1px] flex-grow bg-gradient-to-l from-transparent to-[#cba358]"></div>
        </div>

        {/* Description Text */}
        <p className="text-gray-300 text-sm md:text-base text-center max-w-2xl mb-8 leading-relaxed font-light">
          Working together with esteemed organizations to promote, develop<br className="hidden md:block"/> and elevate equestrian sports.
        </p>

        {/* Cards Grid (3D Flip Container) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto">
          {affiliationsData.map((item) => (
            <div 
              key={item.id}
              className="relative w-full h-[320px] md:h-[360px] group cursor-pointer"
              style={{ perspective: "1500px" }}
              onClick={() => handleCardClick(item.id)}
            >
              {/* Flip Card Inner Wrapper */}
              <div className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] lg:group-hover:[transform:rotateY(180deg)] ${flippedId === item.id ? '[transform:rotateY(180deg)]' : ''} shadow-[0_10px_40px_-10px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_50px_-10px_rgba(203,163,88,0.2)] rounded-2xl`}>
                
                {/* ================= FRONT FACE ================= */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-white/10 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center text-center border border-white/10 overflow-hidden">
                  
                  {/* Glowing Background effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#cba358]/5 to-transparent z-0"></div>

                  {/* Glowing Top-Left Corner Effect */}
                  <div className="absolute top-0 left-0 w-[80%] h-[1px] bg-gradient-to-r from-[#e3b868] via-[#e3b868]/50 to-transparent opacity-80 shadow-[0_0_15px_rgba(227,184,104,0.8)] z-10"></div>
                  <div className="absolute top-0 left-0 w-[1px] h-[60%] bg-gradient-to-b from-[#e3b868] via-[#e3b868]/50 to-transparent opacity-80 shadow-[0_0_15px_rgba(227,184,104,0.8)] z-10"></div>
                  
                  {/* Content */}
                  <div className="relative z-20 flex flex-col items-center justify-center w-full h-full">
                    
                    {/* Logo with Rotating Animation */}
                    <div className="relative w-36 h-36 flex items-center justify-center mb-6">
                      {/* Outer Rotating Arc */}
                      <svg className="absolute inset-0 w-full h-full animate-[spin_3s_linear_infinite] drop-shadow-[0_0_8px_rgba(203,163,88,0.6)]" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="48" fill="none" stroke="#cba358" strokeWidth="1.5" strokeDasharray="80 230" strokeLinecap="round" />
                      </svg>
                      {/* Inner Dashed Ring */}
                      <svg className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] animate-[spin_10s_linear_infinite_reverse]" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="6 6" />
                      </svg>
                      {/* Logo Center */}
                      <div className={`relative z-10 h-28 w-28 rounded-full overflow-hidden flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.05)] ${item.containerColor || 'bg-black/20'}`}>
                        {item.logo ? (
                          <img src={item.logo} alt={item.abbr} className="w-full h-full object-contain" />
                        ) : (
                          <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-gray-400 to-gray-600 tracking-widest">
                            {item.abbr}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-white font-bold text-xs md:text-sm tracking-widest mb-6 leading-relaxed whitespace-pre-line uppercase">
                      {item.title}
                    </h3>
                    
                    {/* Hover / Click Instruction */}
                    <div className="mt-auto flex flex-col items-center">
                      <div className="w-6 h-[2px] bg-[#cba358] shadow-[0_0_8px_rgba(203,163,88,0.6)] mb-3"></div>
                      <p className="text-[#cba358]/80 text-[9px] md:text-[10px] uppercase tracking-widest font-semibold text-center">
                        <span className="hidden lg:inline">Hover for more information</span>
                        <span className="inline lg:hidden">Click for more information</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* ================= BACK FACE ================= */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br from-[#121a2f] to-[#0a0a0a] rounded-2xl p-6 flex flex-col items-center justify-center text-center border border-[#cba358]/30 overflow-hidden shadow-[inset_0_0_30px_rgba(203,163,88,0.1)]">
                  
                  {/* Subtle Background Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-5">
                    <span className="text-[100px] font-extrabold text-white">{item.abbr}</span>
                  </div>

                  <div className="relative z-10 flex flex-col items-center h-full w-full justify-center">
                    <h4 className="text-[#cba358] font-bold text-lg md:text-xl tracking-widest mb-2 font-['Playfair_Display']">
                      {item.abbr}
                    </h4>
                    
                    <h3 className="text-white font-bold text-[10px] md:text-xs tracking-widest mb-3 uppercase opacity-80 border-b border-white/10 pb-3 w-full">
                      {item.title.replace('\n', ' ')}
                    </h3>

                    <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-auto font-light px-1 italic">
                      "{item.description}"
                    </p>

                    <div className="mt-auto flex items-center text-[#cba358] text-[10px] md:text-xs font-bold tracking-widest hover:text-white transition-colors duration-300 pt-2">
                      <span>LEARN MORE</span>
                      <svg className="w-3 h-3 md:w-4 md:h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
};

export default Affiliations;
