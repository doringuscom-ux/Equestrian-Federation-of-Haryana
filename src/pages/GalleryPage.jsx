import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config/api';
import LoadingScreen from '../components/LoadingScreen';

const GalleryPage = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [activeTab, setActiveTab] = useState('images');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/gallery`);
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch gallery items', error);
    } finally {
      setIsLoading(false);
    }
  };

  const galleryImages = items.filter(item => item.mediaType === 'image' || !item.mediaType);
  const galleryVideos = items.filter(item => item.mediaType === 'video');
  const activeList = activeTab === 'images' ? galleryImages : galleryVideos;

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
        setSelectedIndex((prev) => (prev < activeList.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowLeft') {
        setZoomLevel(1);
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : activeList.length - 1));
      } else if (e.key === 'Escape') {
        setSelectedIndex(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, activeList.length]);

  const handlePrev = (e) => {
    e.stopPropagation();
    setZoomLevel(1);
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : activeList.length - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setZoomLevel(1);
    setSelectedIndex((prev) => (prev < activeList.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="w-full font-['Inter'] bg-[#050505] min-h-screen text-white">
      <LoadingScreen isLoading={isLoading} />
      {/* Navbar Overlay */}
      
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
            Our Gallery
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
              onClick={() => { setActiveTab('images'); setSelectedIndex(null); }}
            >
              Images
            </button>
            <button 
              className={`px-8 py-2.5 rounded-full text-[11px] font-bold tracking-widest uppercase transition-all duration-300 ${activeTab === 'videos' ? 'bg-[#2563eb] text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
              onClick={() => { setActiveTab('videos'); setSelectedIndex(null); }}
            >
              Videos
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'images' ? (
          galleryImages.length === 0 ? (
            <div className="flex justify-center items-center h-[400px] text-gray-500 font-bold tracking-widest uppercase">
              No images available
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {galleryImages.map((img, index) => (
                <div 
                  key={img._id} 
                  className="relative group overflow-hidden rounded-2xl cursor-pointer shadow-lg bg-[#111] aspect-[4/3]"
                  onClick={() => { setSelectedIndex(index); setZoomLevel(1); }}
                >
                  <img 
                    src={img.image} 
                    alt={img.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-end p-4">
                    <span className="text-[10px] font-bold text-[#2563eb] tracking-widest uppercase">{img.category}</span>
                    <h3 className="text-white text-sm font-bold truncate">{img.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          galleryVideos.length === 0 ? (
            <div className="flex justify-center items-center h-[400px] text-gray-500 font-bold tracking-widest uppercase">
              No videos available
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-[fadeIn_0.3s_ease-out]">
              {galleryVideos.map((vid, index) => {
                let thumbSrc = vid.image;
                if (!thumbSrc) {
                  const match = vid.videoUrl?.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&]{11})/);
                  if (match && match[1]) {
                    thumbSrc = `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg`;
                  }
                }
                
                return (
                  <div 
                    key={vid._id} 
                    className="relative group overflow-hidden rounded-2xl shadow-lg bg-[#111] aspect-video border border-white/5 hover:border-white/20 transition-colors duration-300 cursor-pointer"
                    onClick={() => { setSelectedIndex(index); setZoomLevel(1); }}
                  >
                    {thumbSrc ? (
                      <img src={thumbSrc} alt={vid.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out" loading="lazy" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-900 group-hover:scale-105 transition-transform duration-500">
                        <span className="text-gray-500">Video</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                      </div>
                    </div>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-end p-4 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                      <span className="text-[10px] font-bold text-[#2563eb] tracking-widest uppercase">{vid.category}</span>
                      <h3 className="text-white text-sm font-bold truncate">{vid.title}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 p-4 md:p-10 transition-all backdrop-blur-md"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Top Controls */}
          <div className="absolute top-4 right-4 md:top-8 md:right-8 flex items-center z-[120]">
            {/* Close Button */}
            <button 
              className="text-white/70 hover:text-white transition-all duration-300 bg-white/10 hover:bg-white/20 p-2 rounded-full"
              onClick={() => setSelectedIndex(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          {/* Prev Arrow - Absolute Left */}
          <button 
            className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300 z-50 shadow-lg"
            onClick={handlePrev}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          {/* Next Arrow - Absolute Right */}
          <button 
            className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300 z-50 shadow-lg"
            onClick={handleNext}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
          
          <div className="relative w-full max-w-5xl flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
            
            {/* Media Container */}
            <div className="flex flex-col items-center justify-center mx-4 w-full">
              {activeList[selectedIndex].mediaType === 'video' ? (
                <div className="w-full aspect-video rounded-xl overflow-hidden shadow-2xl flex items-center justify-center animate-[fadeIn_0.3s_ease-out] bg-black">
                  <iframe
                    className="w-full h-full"
                    src={(() => {
                      let embedUrl = activeList[selectedIndex].videoUrl;
                      const match = embedUrl?.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&]{11})/);
                      if (match && match[1]) {
                        embedUrl = `https://www.youtube.com/embed/${match[1]}?autoplay=1`;
                      }
                      return embedUrl;
                    })()}
                    title={activeList[selectedIndex].title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="relative overflow-hidden rounded-lg shadow-2xl flex items-center justify-center max-h-[70vh] md:max-h-[80vh]">
                  <img 
                    src={activeList[selectedIndex].image} 
                    alt={activeList[selectedIndex].title} 
                    className="w-auto h-full max-h-[70vh] md:max-h-[80vh] object-contain transition-transform duration-300 ease-out animate-[fadeIn_0.3s_ease-out]"
                    style={{ transform: `scale(${zoomLevel})` }}
                  />
                </div>
              )}
              
              {/* Caption */}
              <div className="mt-6 text-center animate-[fadeIn_0.4s_ease-out]">
                <h3 className="text-xl md:text-2xl font-bold tracking-wide text-white mb-2 uppercase">
                  {activeList[selectedIndex].title}
                </h3>
                <div className="flex items-center justify-center gap-3 text-xs md:text-sm font-bold tracking-widest text-gray-400">
                  <span className="text-[#2563eb] uppercase">{activeList[selectedIndex].category}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                  <span>{selectedIndex + 1} / {activeList.length}</span>
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
