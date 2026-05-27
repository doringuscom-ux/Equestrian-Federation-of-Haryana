import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaFilePdf } from 'react-icons/fa';
import { API_BASE_URL } from '../config/api';

const HomeNewsSection = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/news`);
        const data = await response.json();
        // Just take the latest 5 items
        setNews(data.slice(0, 5));
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-[1px] bg-[#cba358]"></div>
            <p className="text-[#cba358] text-sm tracking-[0.3em] font-bold uppercase">Latest Updates</p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-6">
            <h2 className="text-3xl md:text-5xl font-['Playfair_Display'] font-bold text-black tracking-wide">
              NEWS & RESULTS
            </h2>
            <Link 
              to="/news-and-results"
              className="group relative overflow-hidden border border-black text-black px-8 py-3 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300"
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">View All News</span>
              <div className="absolute inset-0 h-full w-full bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </Link>
          </div>
        </div>

        {/* News List */}
        <div className="flex flex-col gap-4">
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <div className="w-8 h-8 border-4 border-gray-200 border-t-[#cba358] rounded-full animate-spin"></div>
            </div>
          ) : news.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No news or results published yet.
            </div>
          ) : (
            news.map((item) => (
              <div 
                key={item._id} 
                className="group bg-gray-50 border border-gray-100 rounded-2xl p-5 md:px-8 md:py-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between hover:bg-white hover:shadow-xl hover:border-[#cba358]/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex flex-col gap-2 w-full md:w-3/4">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[10px] text-[#cba358] font-bold tracking-widest uppercase bg-[#cba358]/10 px-3 py-1 rounded-full border border-[#cba358]/20">
                      {item.category}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1.5 font-semibold">
                      <FaCalendarAlt className="text-[#cba358]/70" /> 
                      {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-black group-hover:text-[#cba358] transition-colors duration-300">
                    {item.headline}
                  </h3>
                </div>

                <div className="w-full md:w-auto flex justify-end mt-2 md:mt-0 pt-3 md:pt-0 border-t border-gray-200 md:border-none">
                  {(item.image || (item.pdfLink && item.pdfLink !== '#')) ? (
                    <Link 
                      to={`/${item.category.toLowerCase().replace(/\s+/g, '-')}/${item.slug}`}
                      className="flex items-center justify-center gap-2 bg-[#cba358]/10 text-[#cba358] hover:bg-[#cba358] hover:text-white w-full md:w-auto px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300"
                    >
                      {item.pdfLink ? <FaFilePdf size={14} /> : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                      )}
                      <span>View</span>
                    </Link>
                  ) : (
                    <span className="text-gray-400 text-xs italic tracking-widest px-4">INFO ONLY</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </section>
  );
};

export default HomeNewsSection;
