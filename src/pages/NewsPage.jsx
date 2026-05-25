import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { FaFilePdf, FaCalendarAlt } from 'react-icons/fa';

const circulars = [
  {
    id: 1,
    date: 'Oct 15, 2026',
    title: 'Guidelines for Haryana State Equestrian Championship 2026',
    reference: 'EFH/2026/CIR-045',
    category: 'Circular',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  {
    id: 2,
    date: 'Sep 28, 2026',
    title: 'Selection Criteria for National Endurance Qualifier',
    reference: 'EFH/2026/NOT-089',
    category: 'Notice',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  {
    id: 3,
    date: 'Sep 10, 2026',
    title: 'Updated Veterinary Rules & Regulations 2026-27',
    reference: 'EFH/2026/RUL-012',
    category: 'Rules',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  {
    id: 4,
    date: 'Aug 25, 2026',
    title: 'Affiliation Renewal Notice for Equestrian Clubs',
    reference: 'EFH/2026/CIR-044',
    category: 'Circular',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  {
    id: 5,
    date: 'Aug 10, 2026',
    title: 'Results: Regional Show Jumping Qualifiers',
    reference: 'EFH/2026/RES-005',
    category: 'Results',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  }
];

const NewsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full font-['Inter'] bg-[#050505] min-h-screen text-white">
      {/* Navbar Overlay */}
      <Navbar />

      {/* Hero Section */}
      <div className="relative pt-32 md:pt-40 pb-10 md:pb-20 w-full overflow-hidden flex flex-col justify-center items-center px-4 bg-[#0a0a0a] border-b border-white/5">
        <div className="relative z-20 text-center max-w-[1000px] mx-auto">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-[#cba358]"></div>
            <span className="text-[#cba358] text-sm tracking-[0.4em] font-bold uppercase">Updates & Information</span>
            <div className="w-12 h-[1px] bg-[#cba358]"></div>
          </div>
          <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-xl tracking-wider">
            News & Results
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Stay updated with the latest official notices, event guidelines, rule changes, and results from the Equestrian Federation of Haryana.
          </p>
        </div>
      </div>

      {/* Circulars List Section */}
      <div className="w-full max-w-[1200px] mx-auto px-4 py-8 md:py-20 relative z-10">
        
        {/* Table Header (Hidden on small screens) */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 border-b border-[#cba358]/30 text-[#cba358] text-xs font-bold uppercase tracking-widest mb-4">
          <div className="col-span-2">Date</div>
          <div className="col-span-2">Ref No.</div>
          <div className="col-span-6">Subject</div>
          <div className="col-span-2 text-center">Action</div>
        </div>

        {/* Circulars List */}
        <div className="flex flex-col gap-4 md:gap-0">
          {circulars.map((item) => (
            <div 
              key={item.id} 
              className="group bg-[#0a0a0a] md:bg-transparent border border-white/10 md:border-b md:border-transparent md:border-b-white/10 rounded-2xl md:rounded-none p-5 md:px-6 md:py-6 flex flex-col md:grid md:grid-cols-12 gap-3 md:gap-4 items-start md:items-center hover:bg-[#cba358]/5 transition-colors duration-300 shadow-lg md:shadow-none"
            >
              
              {/* Date & Category (Mobile) */}
              <div className="md:hidden flex justify-between items-center w-full mb-1">
                <span className="text-[10px] text-[#cba358] font-bold tracking-widest uppercase bg-[#cba358]/10 px-3 py-1.5 rounded-full border border-[#cba358]/20">
                  {item.category}
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1.5 font-light">
                  <FaCalendarAlt className="text-[#cba358]/70" /> {item.date}
                </span>
              </div>

              {/* Date (Desktop) */}
              <div className="hidden md:flex col-span-2 text-sm text-gray-400 font-light items-center gap-2">
                <FaCalendarAlt className="text-[#cba358]" />
                {item.date}
              </div>

              {/* Title / Subject */}
              <div className="md:col-span-6 flex flex-col w-full">
                <h3 className="text-base md:text-lg font-bold text-white group-hover:text-[#cba358] transition-colors duration-300 leading-snug">
                  {item.title}
                </h3>
                <span className="hidden md:inline-block mt-2 text-[10px] text-[#cba358] font-bold tracking-widest uppercase bg-[#cba358]/10 px-3 py-1 rounded-full w-max border border-[#cba358]/20">
                  {item.category}
                </span>
              </div>

              {/* Reference */}
              <div className="md:col-span-2 text-[11px] md:text-xs text-gray-500 font-mono bg-white/5 md:bg-transparent px-2 py-1 rounded md:p-0 md:rounded-none w-max md:w-auto mt-1 md:mt-0 border border-white/5 md:border-none">
                Ref: {item.reference}
              </div>

              {/* Action Button */}
              <div className="md:col-span-2 flex w-full md:justify-center mt-3 md:mt-0 pt-3 md:pt-0 border-t border-white/5 md:border-none">
                <a 
                  href={item.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#cba358]/10 md:bg-transparent border border-[#cba358]/30 md:border-[#cba358] text-[#cba358] hover:bg-[#cba358] hover:text-black w-full md:w-auto px-6 py-3 md:py-2.5 rounded-xl md:rounded-sm text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300"
                >
                  <FaFilePdf size={14} />
                  <span>View PDF</span>
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default NewsPage;
