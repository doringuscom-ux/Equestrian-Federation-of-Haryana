import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

const images = [
  { id: 1, src: '/IMG/Horse/1.jpg', title: 'HARYANA EQUESTRIAN - SHOW JUMPING', category: 'GENERAL' },
  { id: 2, src: '/IMG/Horse/2.jpg', title: 'HARYANA EQUESTRIAN - DRESSAGE', category: 'GENERAL' },
  { id: 3, src: '/IMG/Horse/3.jpg', title: 'HARYANA EQUESTRIAN - CHAMPIONSHIP', category: 'GENERAL' },
  { id: 4, src: '/IMG/Horse/4.jpg', title: 'HARYANA EQUESTRIAN - EVENTING', category: 'GENERAL' },
  { id: 5, src: '/IMG/Horse/5.jpg', title: 'HARYANA EQUESTRIAN - TRAINING', category: 'GENERAL' },
  { id: 6, src: '/IMG/Horse/6.jpg', title: 'HARYANA EQUESTRIAN - ENDURANCE', category: 'GENERAL' },
  { id: 7, src: '/IMG/Horse/7.jpg', title: 'HARYANA EQUESTRIAN - TENT PEGGING', category: 'GENERAL' },
  { id: 8, src: '/IMG/Horse/8.jpg', title: 'HARYANA EQUESTRIAN - MEDAL CEREMONY', category: 'GENERAL' },
  { id: 9, src: '/IMG/Horse/9.jpg', title: 'HARYANA EQUESTRIAN - RIDERS', category: 'GENERAL' },
  { id: 10, src: '/IMG/Horse/10.jpg', title: 'HARYANA EQUESTRIAN - ACTION', category: 'GENERAL' }
];

const videos = [
  { id: 1, src: 'https://www.youtube.com/embed/M7lc1UVf-VE', title: 'HARYANA EQUESTRIAN - VIDEO 1' },
  { id: 2, src: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'HARYANA EQUESTRIAN - VIDEO 2' },
  { id: 3, src: 'https://www.youtube.com/embed/tgbNymZ7vqY', title: 'HARYANA EQUESTRIAN - VIDEO 3' },
  { id: 4, src: 'https://www.youtube.com/embed/jNQXAC9IVRw', title: 'HARYANA EQUESTRIAN - VIDEO 4' },
  { id: 5, src: 'https://www.youtube.com/embed/9bZkp7q19f0', title: 'HARYANA EQUESTRIAN - VIDEO 5' },
  { id: 6, src: 'https://www.youtube.com/embed/ScMzIvxBSi4', title: 'HARYANA EQUESTRIAN - VIDEO 6' }
];

const GalleryPage = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [activeTab, setActiveTab] = useState('images');
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      
      if (e.key === 'ArrowRight') {
        setZoomLevel(1);
        setSelectedIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowLeft') {
        setZoomLevel(1);
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
      } else if (e.key === 'Escape') {
        setSelectedIndex(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  const handlePrev = (e) => {
    e.stopPropagation();
    setZoomLevel(1);
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setZoomLevel(1);
    setSelectedIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="w-full font-['Inter'] bg-[#050505] min-h-screen text-white">
      {/* Navbar Overlay */}
      <Navbar />

      {/* Hero Section */}
      <div className="relative pt-32 md:pt-40 pb-10 md:pb-20 w-full overflow-hidden flex flex-col justify-center items-center px-4 bg-[#0a0a0a] border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-[#050505] opacity-90 z-10"></div>
        </div>
        <div className="relative z-20 text-center max-w-[1000px] mx-auto">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-[#cba358]"></div>
            <span className="text-[#cba358] text-sm tracking-[0.4em] font-bold uppercase">Moments Captured</span>
            <div className="w-12 h-[1px] bg-[#cba358]"></div>
          </div>
          <h1 className="font-['Playfair_Display'] text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-xl tracking-wider">
            Image Gallery
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            A visual journey through our equestrian events, showcasing the bond between rider and horse, the thrill of competition, and the elegance of the sport.
          </p>
        </div>
      </div>

      {/* Gallery Grid & Toggle */}
      <div className="w-full max-w-[1400px] mx-auto px-4 py-16 relative z-10 bg-[#0f1115] min-h-[600px] rounded-t-3xl md:rounded-t-none -mt-6 md:mt-0 pt-10 md:pt-16">
        
        {/* Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-[#1a1d24] p-1.5 rounded-full inline-flex">
            <button 
              className={`px-8 py-2.5 rounded-full text-[11px] font-bold tracking-widest uppercase transition-all duration-300 ${activeTab === 'images' ? 'bg-[#2563eb] text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('images')}
            >
              Images
            </button>
            <button 
              className={`px-8 py-2.5 rounded-full text-[11px] font-bold tracking-widest uppercase transition-all duration-300 ${activeTab === 'videos' ? 'bg-[#2563eb] text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('videos')}
            >
              Videos
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'images' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {images.map((img, index) => (
              <div 
                key={img.id} 
                className="relative group overflow-hidden rounded-2xl cursor-pointer shadow-lg bg-[#111] aspect-[4/3]"
                onClick={() => { setSelectedIndex(index); setZoomLevel(1); }}
              >
                <img 
                  src={img.src} 
                  alt={`Gallery visual ${img.id}`} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-[fadeIn_0.3s_ease-out]">
            {videos.map((vid) => (
              <div 
                key={vid.id} 
                className="relative group overflow-hidden rounded-2xl shadow-lg bg-[#111] aspect-video border border-white/5 hover:border-white/20 transition-colors duration-300"
              >
                <iframe
                  className="w-full h-full"
                  src={vid.src}
                  title={vid.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black p-4 md:p-10 transition-all"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Top Controls */}
          <div className="absolute top-4 right-4 md:top-8 md:right-8 flex items-center z-[120]">
            {/* Close Button */}
            <button 
              className="text-white/70 hover:text-white transition-all duration-300"
              onClick={() => setSelectedIndex(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          {/* Prev Arrow - Absolute Left */}
          <button 
            className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300 z-50 shadow-lg"
            onClick={handlePrev}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          {/* Next Arrow - Absolute Right */}
          <button 
            className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300 z-50 shadow-lg"
            onClick={handleNext}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
          
          <div className="relative w-full max-w-4xl flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            
            {/* Image Container */}
            <div className="flex flex-col items-center justify-center mx-4 flex-1">
              {/* Overflow Hidden Wrapper to clip zoom */}
              <div className="relative overflow-hidden rounded-lg shadow-2xl flex items-center justify-center max-h-[70vh] md:max-h-[80vh]">
                <img 
                  src={images[selectedIndex].src} 
                  alt={images[selectedIndex].title} 
                  className="w-auto h-full max-h-[70vh] md:max-h-[80vh] object-contain transition-transform duration-300 ease-out animate-[fadeIn_0.3s_ease-out]"
                  style={{ transform: `scale(${zoomLevel})` }}
                />
              </div>
              
              {/* Caption */}
              <div className="mt-6 text-center animate-[fadeIn_0.4s_ease-out]">
                <h3 className="text-xl md:text-2xl font-bold tracking-wide text-white mb-2">
                  {images[selectedIndex].title}
                </h3>
                <div className="flex items-center justify-center gap-3 text-xs md:text-sm font-bold tracking-widest text-gray-400">
                  <span className="text-[#2563eb]">{images[selectedIndex].category}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                  <span>{selectedIndex + 1} / {images.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
