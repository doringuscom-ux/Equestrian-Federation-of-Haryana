import React, { useState, useEffect, useRef } from 'react';

const ExperienceAction = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const images = [
    { src: '/IMG/Horse/1.jpg', alt: 'Show Jumping', category: 'Competition' },
    { src: '/IMG/Horse/2.jpg', alt: 'Dressage', category: 'Competition' },
    { src: '/IMG/Horse/3.jpg', alt: 'Eventing', category: 'Competition' },
    { src: '/IMG/Horse/4.jpg', alt: 'Tent Pegging', category: 'Traditional' },
    { src: '/IMG/Horse/5.jpg', alt: 'Endurance', category: 'Competition' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-8 md:py-12 bg-[#050505] relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#cba358]/5 via-transparent to-transparent"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#cba358] opacity-[0.02] blur-[150px] rounded-full"></div>

      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header */}
        <div className={`text-center mb-6 md:mb-8 transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-10 h-[1px] bg-[#cba358]"></div>
            <span className="text-[#cba358] text-xs tracking-[0.3em] font-medium uppercase">The Gallery</span>
            <div className="w-10 h-[1px] bg-[#cba358]"></div>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-light text-white tracking-wide mb-4 font-['Playfair_Display']">
            Experience <span className="font-bold text-[#cba358]">The Action</span>
          </h2>
          
          <div className="w-20 h-[1px] bg-[#cba358]/50 mx-auto mb-6"></div>
          
          <p className="text-gray-400 text-sm max-w-xl mx-auto font-light leading-relaxed">
            Where power meets grace — moments frozen in time
          </p>
        </div>

        {/* New Layout: Grid with Featured Image */}
        <div className={`grid grid-cols-1 md:grid-cols-12 gap-3 transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-100'
        }`}>
          
          {/* Featured Large Image - Left Side */}
          <div className="md:col-span-7 relative group overflow-hidden rounded-3xl h-[400px] md:h-[500px]">
            <img 
              src={images[0].src} 
              alt={images[0].alt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-8">
              <div>
                <div className="w-12 h-[2px] bg-[#cba358] mb-3"></div>
                <h3 className="text-white text-2xl font-bold">{images[0].alt}</h3>
                <p className="text-gray-300 text-sm mt-1">Featured Collection</p>
              </div>
            </div>
          </div>

          {/* Right Side - Small Grid */}
          <div className="md:col-span-5 grid grid-cols-2 gap-3">
            {images.slice(1, 5).map((img, idx) => (
              <div key={idx} className="relative group overflow-hidden rounded-2xl h-[195px] md:h-[244px]">
                <img 
                  src={img.src} 
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                  <span className="text-white text-sm font-medium tracking-wide text-center px-2">
                    {img.alt}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Button */}
        <div className={`mt-8 flex justify-center transition-all duration-1000 delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <button className="group relative text-white text-xs md:text-sm font-bold tracking-[0.2em] uppercase pb-3 transition-colors duration-300 hover:text-[#cba358]">
            EXPLORE FULL GALLERY
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[2px] bg-[#cba358] transition-all duration-300 group-hover:w-full group-hover:bg-white"></span>
          </button>
        </div>

      </div>
    </section>
  );
};

export default ExperienceAction;