import React from 'react';

const messages = [
  {
    id: 1,
    title: "The President",
    name: "Narender Umed Singh",
    role: "PRESIDENT",
    tagline: "Leading With Vision",
    image: "/IMG/NarenderSingh.png",
    imageClass: "object-top scale-[1.4] translate-y-4",
    hoverClass: "group-hover:scale-105",
    paragraphs: [
      "Welcome to the Equestrian Federation of Haryana.",
      "Haryana has a proud legacy of courage, discipline, and sporting excellence—values that naturally align with equestrian sport. Since 2002, the Federation has been committed to building a strong platform for riders, promoting excellence in equestrian disciplines, and creating opportunities for talent across the state.",
      "Our vision is clear: to make Haryana a leading force in Indian equestrian sports through structured development, competitive excellence, and wider participation.",
      "We invite every rider, academy, institution, and equestrian enthusiast to be part of this journey.",
      "Together, we ride towards excellence."
    ]
  },
  {
    id: 2,
    title: "Senior Vice President",
    name: "Randeep Hooda",
    role: "SENIOR VICE PRESIDENT",
    tagline: "Inspiring Youth",
    image: "/IMG/randeep_hooda.jpg",
    imageClass: "object-top scale-[1.6] translate-y-8",
    hoverClass: "group-hover:scale-[1.65] group-hover:translate-y-6",
    paragraphs: [
      "Horses represent strength, freedom, grace, and trust—qualities that make equestrian sport truly exceptional.",
      "As someone deeply connected to Haryana’s roots, I am proud to support a movement that encourages young talent to embrace this remarkable sport.",
      "My role is to help inspire awareness, enthusiasm, and wider participation so equestrian sport reaches more homes, more youth, and greater heights.",
      "Let us build a stronger equestrian culture in Haryana—together."
    ]
  },
  {
    id: 3,
    title: "General Secretary",
    name: "Col. S. S. Ahlawat",
    role: "GENERAL SECRETARY",
    tagline: "Building Systems",
    image: "/IMG/Col.S.S.Ahlawat.png",
    imageClass: "object-top",
    hoverClass: "group-hover:scale-105",
    paragraphs: [
      "Equestrian sport demands precision, discipline, and unwavering commitment.",
      "At the Equestrian Federation of Haryana, our focus is on building systems that support talent—through training programs, competitions, technical development, and institutional collaboration.",
      "Our mission is to create a professional and transparent ecosystem where aspiring riders can grow, compete, and achieve excellence at the highest levels.",
      "The future of equestrian sport in Haryana is promising, and we are committed to shaping it with purpose and professionalism."
    ]
  }
];

const PresidentMessage = () => {
  return (
    <section className="py-10 md:py-12 bg-[#faf9f6] relative overflow-hidden">
      
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/60 to-transparent z-0"></div>
      <div className="absolute -top-40 -left-20 w-[600px] h-[600px] bg-[#bfa15f]/5 rounded-full blur-[100px] z-0 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-[120px] z-0 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 space-y-24">
        
        {messages.map((msg, index) => (
          <div key={msg.id} className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center`}>
            
            {/* Image Section */}
            <div className={`lg:col-span-5 flex flex-col ${index % 2 === 0 ? '' : 'lg:order-last'}`}>
              
              {/* Mobile Name and Title */}
              <div className="flex lg:hidden items-center gap-5 mb-8">
                <div className="w-14 h-14 rounded-full border border-[#bfa15f]/40 bg-white shadow-sm flex items-center justify-center p-2 shrink-0">
                  <svg className="w-full h-full fill-none stroke-[#bfa15f] stroke-[1.5]" viewBox="0 0 24 24">
                    <path d="M14.4,5.4C14.4,5.4,14.4,5.4,14.4,5.4c-0.2-0.5-0.7-0.7-1.2-0.5c-0.1,0.1-0.2,0.1-0.2,0.2l-2.4,1.4
                      C9.4,7,7.7,7.8,6,8.7L5,9.2C4.1,9.7,3.5,10.6,3.4,11.7l-0.2,3.3C3.1,16.2,4,17,5,16.9l2.2-0.1L9,15.7l1.7,3.5
                      c0.2,0.4,0.6,0.5,1,0.3c0.4-0.2,0.5-0.6,0.3-1l-1.3-2.6c0.5,0.1,1.1,0.3,1.6,0.3L15.6,15c1.4-0.4,2.5-1.5,2.9-2.9l1.4-4.2
                      c0.2-0.6-0.2-1.3-0.8-1.5C18.6,6.3,18.1,6,17.5,6c-0.2,0-0.4,0-0.6,0.1L14.4,5.4z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="text-2xl font-['Playfair_Display'] font-bold text-[#0f1f3a] leading-none mb-1.5">{msg.name}</h4>
                  <div className="flex items-center flex-wrap gap-1.5">
                    <span className="text-[#bfa15f] text-[10px] md:text-[11px] font-extrabold uppercase tracking-widest leading-none">
                      {msg.role}
                    </span>
                    <span className="text-[#64748b] text-[10px] md:text-[11px] font-bold uppercase tracking-wider leading-none">
                      , EQUESTRIAN FEDERATION OF HARYANA
                    </span>
                  </div>
                </div>
              </div>

              {/* Left/Right Image Container */}
              <div className={`relative flex justify-center ${index % 2 === 0 ? 'lg:justify-end' : 'lg:justify-start'} group`}>
                <div className="relative w-full max-w-[360px]">
                  
                  {/* Decorative Background Elements */}
                  <div className="absolute -inset-4 bg-gradient-to-tr from-[#bfa15f]/30 to-[#bfa15f]/5 rounded-[2rem] transform rotate-3 transition-transform duration-700 group-hover:rotate-6"></div>
                  <div className="absolute -inset-4 bg-white/60 backdrop-blur-sm shadow-xl rounded-[2rem] transform -rotate-2 transition-transform duration-700 group-hover:-rotate-4 border border-white"></div>
                  
                  {/* Main Image Box */}
                  <div className="relative bg-white rounded-3xl p-3 shadow-2xl transition-transform duration-700 group-hover:-translate-y-2">
                    <div className="bg-[#f5f3ef] rounded-2xl overflow-hidden aspect-[4/5] relative group-hover:shadow-inner transition-all duration-500">
                      <img 
                        src={msg.image} 
                        alt={msg.name} 
                        className={`w-full h-full object-cover transition-transform duration-1000 ${msg.imageClass || ''} ${msg.hoverClass || ''}`}
                      />
                      {/* Subtle overlay gradient on image bottom */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f3a]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    
                    {/* Floating EFH Logo Badge - Glassmorphism */}
                    <div className={`absolute -bottom-6 ${index % 2 === 0 ? '-left-6' : '-right-6'} bg-[#0f1f3a]/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/10 transition-transform duration-500 ${index % 2 === 0 ? 'group-hover:translate-x-2' : 'group-hover:-translate-x-2'} group-hover:-translate-y-2`}>
                      <div className="w-12 h-12 rounded-full border border-[#bfa15f]/50 bg-[#bfa15f]/10 flex items-center justify-center shadow-inner">
                        <span className="text-xl text-[#bfa15f]">♛</span>
                      </div>
                      <div className="pr-3">
                        <p className="text-white/80 text-[10px] uppercase tracking-[0.25em] font-semibold mb-0.5">Focus</p>
                        <p className="text-[#bfa15f] text-sm font-['Playfair_Display'] italic font-medium">{msg.tagline}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right/Left Text Content */}
            <div className={`lg:col-span-7 relative ${index % 2 !== 0 ? 'lg:order-first' : ''}`}>
              
              {/* Giant Decorative Quote */}
              <div className={`absolute -top-12 ${index % 2 === 0 ? '-left-8' : '-right-8'} text-[150px] text-[#bfa15f] opacity-5 font-serif leading-none select-none pointer-events-none`}>
                "
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-[2px] w-12 bg-gradient-to-r from-[#bfa15f] to-[#bfa15f]/30"></div>
                  <span className="text-[#bfa15f] font-bold tracking-[0.25em] text-xs uppercase bg-[#bfa15f]/10 px-4 py-1.5 rounded-full border border-[#bfa15f]/20">
                    Leadership Voice
                  </span>
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-[52px] font-['Playfair_Display'] font-extrabold text-[#0f1f3a] leading-[1.1] mb-8 tracking-tight flex flex-wrap gap-x-3 items-end">
                  <span>Message From</span>
                  <span className="text-[#bfa15f] italic font-medium relative inline-block">
                    {msg.title}
                    <svg className="absolute w-full h-2.5 -bottom-1 left-0 text-[#bfa15f]/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </span>
                </h2>
                
                <div className="space-y-4 text-slate-600 text-base md:text-lg leading-relaxed font-light lg:pl-6 border-l border-[#bfa15f]/20 mb-10 relative">
                  {msg.paragraphs.map((p, pIndex) => (
                    <p key={pIndex} className={pIndex === 0 || pIndex === msg.paragraphs.length - 1 ? 'font-medium text-[#0f1f3a]' : ''}>
                      {p}
                    </p>
                  ))}
                </div>

                {/* Name and Title below Content (Desktop Only) */}
                <div className="hidden lg:flex items-center gap-5 lg:pl-6">
                  <div className="w-14 h-14 rounded-full border border-[#bfa15f]/40 bg-white shadow-sm flex items-center justify-center p-2 shrink-0">
                    <svg className="w-full h-full fill-none stroke-[#bfa15f] stroke-[1.5]" viewBox="0 0 24 24">
                      <path d="M14.4,5.4C14.4,5.4,14.4,5.4,14.4,5.4c-0.2-0.5-0.7-0.7-1.2-0.5c-0.1,0.1-0.2,0.1-0.2,0.2l-2.4,1.4
                        C9.4,7,7.7,7.8,6,8.7L5,9.2C4.1,9.7,3.5,10.6,3.4,11.7l-0.2,3.3C3.1,16.2,4,17,5,16.9l2.2-0.1L9,15.7l1.7,3.5
                        c0.2,0.4,0.6,0.5,1,0.3c0.4-0.2,0.5-0.6,0.3-1l-1.3-2.6c0.5,0.1,1.1,0.3,1.6,0.3L15.6,15c1.4-0.4,2.5-1.5,2.9-2.9l1.4-4.2
                        c0.2-0.6-0.2-1.3-0.8-1.5C18.6,6.3,18.1,6,17.5,6c-0.2,0-0.4,0-0.6,0.1L14.4,5.4z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-2xl font-['Playfair_Display'] font-bold text-[#0f1f3a] leading-none mb-1.5">{msg.name}</h4>
                    <div className="flex items-center flex-wrap gap-1.5">
                      <span className="text-[#bfa15f] text-[10px] md:text-[11px] font-extrabold uppercase tracking-widest leading-none">
                        {msg.role}
                      </span>
                      <span className="text-[#64748b] text-[10px] md:text-[11px] font-bold uppercase tracking-wider leading-none">
                        , EQUESTRIAN FEDERATION OF HARYANA
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Bottom Three Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          
          <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#faf9f6] flex items-center justify-center text-[#bfa15f] mb-4 group-hover:bg-[#bfa15f] group-hover:text-white transition-colors duration-300 shadow-sm border border-slate-50">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M19.36 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.36 8.04A5.994 5.994 0 0 0 6 20h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.64-4.96z"/></svg>
            </div>
            <h4 className="text-[#0f1f3a] font-bold text-base mb-2">Promoting Sports</h4>
            <p className="text-slate-500 text-xs leading-relaxed">Advancing equestrian disciplines across all levels in Haryana with comprehensive development programs.</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#faf9f6] flex items-center justify-center text-[#bfa15f] mb-4 group-hover:bg-[#bfa15f] group-hover:text-white transition-colors duration-300 shadow-sm border border-slate-50">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M21 5h-2.5V3.5C18.5 2.67 17.83 2 17 2H7C6.17 2 5.5 2.67 5.5 3.5V5H3c-.55 0-1 .45-1 1v2c0 2.21 1.79 4 4 4h1.5v2h9v-2H18c2.21 0 4-1.79 4-4V6c0-.55-.45-1-1-1zm-15 5c-1.1 0-2-.9-2-2V7h2v3zm10 9H8v-2h8v2zm4-9c-1.1 0-2-.9-2-2V7h2v3z"/></svg>
            </div>
            <h4 className="text-[#0f1f3a] font-bold text-base mb-2">Building Champions</h4>
            <p className="text-slate-500 text-xs leading-relaxed">Nurturing raw talent and providing world-class training opportunities to create future medalists.</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#faf9f6] flex items-center justify-center text-[#bfa15f] mb-4 group-hover:bg-[#bfa15f] group-hover:text-white transition-colors duration-300 shadow-sm border border-slate-50">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 2l-5.5 9h11L12 2zm0 3.84L13.93 9h-3.87L12 5.84zM17.5 13c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM3 21.5h8v-8H3v8zm2-6h4v4H5v-4z"/></svg>
            </div>
            <h4 className="text-[#0f1f3a] font-bold text-base mb-2">Honoring Heritage</h4>
            <p className="text-slate-500 text-xs leading-relaxed">Preserving the rich and royal equestrian traditions of Haryana while inspiring the future generations.</p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default PresidentMessage;

