import React from 'react';

const features = [
  {
    id: 1,
    title: 'Expert Trainers',
    description: 'Learn from certified professionals with international experience.',
    icon: (
      <svg className="w-6 h-6 text-[#cba358]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  },
  {
    id: 2,
    title: 'Premium Facilities',
    description: 'State-of-the-art arenas equipped with world-class footing.',
    icon: (
      <svg className="w-6 h-6 text-[#cba358]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  },
  {
    id: 3,
    title: 'Rich Heritage',
    description: 'Preserving royal equestrian traditions in Haryana since 2002.',
    icon: (
      <svg className="w-6 h-6 text-[#cba358]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
      </svg>
    )
  },
  {
    id: 4,
    title: 'National Recognition',
    description: 'Offering clear pathways to compete at national championships.',
    icon: (
      <svg className="w-6 h-6 text-[#cba358]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    )
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 md:py-28 bg-gray-50 relative overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left Side - Image Composition */}
          <div className="w-full lg:w-1/2 relative min-h-[500px] md:min-h-[600px] order-2 lg:order-1 mt-10 lg:mt-0">
            {/* Background Decorative Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#cba358]/10 rounded-full blur-3xl z-0"></div>
            
            {/* Main Tall Image */}
            <div className="absolute top-0 left-0 w-[75%] h-[85%] rounded-3xl overflow-hidden shadow-2xl z-10 group">
              <img 
                src="/IMG/Horse/7.jpg" 
                alt="Equestrian Training" 
                className="w-full h-full object-cover transform transition-transform duration-[10s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>
            
            {/* Overlapping Small Image */}
            <div className="absolute bottom-0 right-0 w-[55%] h-[45%] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-[8px] border-gray-50 z-20 group transform translate-y-4 -translate-x-4">
              <img 
                src="/IMG/Horse/2.jpg" 
                alt="Dressage Horse" 
                className="w-full h-full object-cover transform transition-transform duration-[10s] group-hover:scale-110"
              />
            </div>
            
            {/* Experience Badge */}
            <div className="absolute top-10 -left-6 bg-white py-4 px-6 rounded-2xl shadow-xl z-30 flex items-center gap-4 animate-bounce-slow">
              <div className="text-4xl font-bold font-['Playfair_Display'] text-[#cba358]">20+</div>
              <div className="text-xs font-bold tracking-wider text-black uppercase leading-tight">
                Years of <br/> Excellence
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <div className="flex flex-col items-start mb-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-[1px] bg-[#cba358]"></div>
                <p className="text-[#cba358] text-sm tracking-[0.3em] font-bold uppercase">Our Strengths</p>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-['Playfair_Display'] font-bold text-black tracking-wide mb-6 leading-tight">
                WHY CHOOSE <span className="italic text-[#cba358] font-light">EFH?</span>
              </h2>
              <p className="text-gray-500 text-sm md:text-base font-light leading-relaxed mb-10">
                Experience the pinnacle of equestrian excellence. We provide everything you need to embark on a journey of discipline, passion, and triumph. From beginners to advanced competitors, our facilities and expertise are unmatched.
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 w-full">
                {features.map((feature) => (
                  <div key={feature.id} className="group">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center mb-5 group-hover:-translate-y-2 group-hover:shadow-md group-hover:border-[#cba358]/30 transition-all duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-bold font-['Playfair_Display'] text-black mb-2 group-hover:text-[#cba358] transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-500 text-sm font-light leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
              
            </div>
          </div>

        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}} />
    </section>
  );
};

export default WhyChooseUs;
