import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { upcomingEvents, completedEvents } from '../pages/EventsPage';

const newsData = [...upcomingEvents, ...completedEvents].map(event => ({
  id: event.id,
  date: event.date.split(' - ')[0], // Use start date for shorter display
  title: event.title,
  description: `Experience the thrill of equestrian sports at the ${event.title}, taking place at ${event.location}.`,
  category: event.status === 'Completed' ? 'Results' : (event.status === 'Registrations Open' ? 'Upcoming Events' : 'Events'),
  image: event.image
}));

const NewsUpdates = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [visibleCount, setVisibleCount] = useState(6);
  const filters = ['All', 'Upcoming Events', 'Events', 'Results'];

  const filteredNews = activeFilter === 'All' 
    ? newsData 
    : newsData.filter(news => news.category === activeFilter);

  const displayedNews = filteredNews.slice(0, visibleCount);

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    setVisibleCount(6);
  };

  return (
    <section className="py-10 md:py-14 bg-gray-50 relative overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-[1px] bg-[#cba358]"></div>
            <p className="text-[#cba358] text-sm tracking-[0.3em] font-bold uppercase">Latest</p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-6">
            <h2 className="text-3xl md:text-5xl font-['Playfair_Display'] font-bold text-black tracking-wide">
              EVENTS
            </h2>
            
            {/* Filters */}
            <div className="flex flex-wrap justify-start gap-3">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => handleFilterClick(filter)}
                  className={`px-5 py-2 rounded-full text-[10px] sm:text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                    activeFilter === filter
                      ? 'bg-[#cba358] text-white shadow-lg border-transparent'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-[#cba358] hover:text-[#cba358]'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedNews.map((news) => (
            <div key={news.id} className="group bg-white border border-gray-100 rounded-2xl hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 flex flex-col h-full overflow-hidden">
              
              {/* Cover Image */}
              <div className="w-full h-44 md:h-52 overflow-hidden relative">
                <img 
                  src={news.image} 
                  alt={news.title} 
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>

              <div className="p-3 md:p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold tracking-widest text-[#cba358] uppercase bg-[#cba358]/10 px-4 py-1.5 rounded-full">
                    {news.category}
                  </span>
                  <span className="text-sm text-gray-400 font-mono font-medium">
                    {news.date}
                  </span>
                </div>
                
                <h3 className="text-lg md:text-xl font-bold font-['Playfair_Display'] text-black mb-2 group-hover:text-[#cba358] transition-colors duration-300 leading-snug">
                  {news.title}
                </h3>
                
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-3 flex-grow font-light line-clamp-2">
                  {news.description}
                </p>
                
                <div className="pt-3 border-t border-gray-100 mt-auto">
                  <Link to={`/event/${news.id}`} className="flex items-center gap-3 text-black text-xs font-bold uppercase tracking-[0.2em] group-hover:text-[#cba358] transition-colors w-max">
                    Read More
                    <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredNews.length > visibleCount && (
          <div className="mt-10 text-center md:text-left flex justify-center md:justify-start">
            <button 
              onClick={() => setVisibleCount(filteredNews.length)}
              className="group relative overflow-hidden border border-black text-black px-10 py-4 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300"
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">View All Updates</span>
              <div className="absolute inset-0 h-full w-full bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default NewsUpdates;
