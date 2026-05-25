import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaExclamationTriangle, FaMap } from 'react-icons/fa';
import { upcomingEvents, completedEvents } from './EventsPage';

const SingleEventPage = () => {
  const { id } = useParams();
  
  // Find the event
  const allEvents = [...upcomingEvents, ...completedEvents];
  const event = allEvents.find(e => e.id === parseInt(id));
  const bgImage = event ? event.image : '/IMG/Horse/7.jpg';
  
  // Static state for countdown timer
  const [timeLeft, setTimeLeft] = useState({
    days: 13,
    hours: 14,
    mins: 1,
    secs: 24
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    // Functional countdown logic
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, mins, secs } = prev;
        if (secs > 0) {
          secs--;
        } else {
          secs = 59;
          if (mins > 0) {
            mins--;
          } else {
            mins = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              } else {
                clearInterval(timer);
                return { days: 0, hours: 0, mins: 0, secs: 0 };
              }
            }
          }
        }
        return { days, hours, mins, secs };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full font-['Inter'] bg-[#050505] min-h-screen text-white relative">
      
      {/* Navbar Overlay */}
      <Navbar />

      {/* Hero Section Split Layout */}
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 pt-32 pb-16 md:pt-40 md:pb-24 flex flex-col lg:flex-row items-stretch gap-12 lg:gap-20">
        
        {/* Left Column (Content) */}
        <div className="lg:w-1/2 flex flex-col justify-center">
          <div className="inline-block px-4 py-1.5 bg-[#cba358]/20 border border-[#cba358]/50 rounded-md mb-6 text-[#cba358] text-xs font-bold tracking-widest uppercase w-max">
            Upcoming Event
          </div>
          
          <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 leading-tight">
            10th Haryana State Equestrian Championship
          </h1>
          <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
            2026
          </h2>
          
          <div className="flex flex-wrap items-center gap-6 mb-12">
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-500 px-4 py-2 rounded-full font-bold tracking-widest text-xs uppercase">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              Registration Closing Soon
            </div>
            <div className="text-gray-400 text-xs font-bold tracking-widest uppercase">
              Limited Slots Available
            </div>
          </div>
          
          {/* Countdown Widget */}
          <div className="flex items-center gap-4 md:gap-6 mb-12">
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold text-[#cba358]">{String(timeLeft.days).padStart(2, '0')}</span>
              <span className="text-[10px] uppercase tracking-widest text-gray-400 mt-2">Days</span>
            </div>
            <span className="text-3xl md:text-4xl text-white/20 font-light mb-4">:</span>
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold text-[#cba358]">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="text-[10px] uppercase tracking-widest text-gray-400 mt-2">Hours</span>
            </div>
            <span className="text-3xl md:text-4xl text-white/20 font-light mb-4">:</span>
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold text-[#cba358]">{String(timeLeft.mins).padStart(2, '0')}</span>
              <span className="text-[10px] uppercase tracking-widest text-gray-400 mt-2">Mins</span>
            </div>
            <span className="text-3xl md:text-4xl text-white/20 font-light mb-4">:</span>
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold text-[#cba358]">{String(timeLeft.secs).padStart(2, '0')}</span>
              <span className="text-[10px] uppercase tracking-widest text-gray-400 mt-2">Secs</span>
            </div>
          </div>
          
          {/* Quick Info Boxes */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-4 flex items-center gap-4 flex-1">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#cba358]">
                <FaCalendarAlt size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-1">Date</span>
                <span className="text-sm font-bold text-white">Sat, Jun 6, 2026</span>
              </div>
            </div>
            
            <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-4 flex items-center gap-4 flex-1">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#cba358]">
                <FaMapMarkerAlt size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-1">Location</span>
                <span className="text-sm font-bold text-white">Ahulana</span>
              </div>
            </div>

            <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-4 flex items-center gap-4 flex-1">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#cba358]">
                <FaClock size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-1">Deadline</span>
                <span className="text-sm font-bold text-white">Jun 5, 2026</span>
              </div>
            </div>
          </div>
          
        </div>

        {/* Right Column (Image Card) */}
        <div className="lg:w-1/2 w-full">
          <div className="relative w-full h-full min-h-[400px] rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(203,163,88,0.15)] border border-white/10 group">
            <img 
              src={bgImage} 
              alt="Event Poster" 
              className="absolute inset-0 w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
          </div>
        </div>
        
      </div>

      <div className="w-full h-[1px] bg-white/5"></div>

      {/* Main Content Layout */}
      <div className="w-full max-w-[1200px] mx-auto px-4 py-20 flex flex-col lg:flex-row gap-12 relative z-10">
        
        {/* Left Column (Content) */}
        <div className="lg:w-2/3 flex flex-col gap-16">
          
          {/* Overview */}
          <section>
            <h2 className="text-3xl font-['Playfair_Display'] font-bold text-white mb-8 border-l-4 border-[#cba358] pl-4">
              Event Overview
            </h2>
            <div className="text-gray-300 font-light leading-relaxed space-y-6 text-sm md:text-base">
              <p>
                The 10th Haryana State Equestrian Championship, 2026 is a premier state-level sports event where skilled riders and their magnificent horses compete in various disciplines such as Show Jumping, Dressage, and Endurance. It brings together top equestrians from different districts of Haryana to showcase their talent, partnership, and precision.
              </p>
              <p>
                Organized by the Equestrian Federation of Haryana, the championship aims to promote equestrian sports and identify talented athletes for national-level competitions. It encourages the growth of horse riding as a professional sport, requiring immense dedication, rhythm, and a deep bond between horse and rider.
              </p>
            </div>
          </section>

          {/* Tournament Details Grid */}
          <section>
            <h2 className="text-2xl font-['Playfair_Display'] font-bold text-white mb-8">
              Tournament Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/5 p-6 rounded-lg">
                <div className="flex items-center gap-3 text-[#cba358] mb-2">
                  <FaClock />
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Duration</span>
                </div>
                <div className="text-lg font-bold">2 Days</div>
              </div>
              
              <div className="bg-white/5 border border-white/5 p-6 rounded-lg">
                <div className="flex items-center gap-3 text-[#cba358] mb-2">
                  <FaMapMarkerAlt />
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Venue</span>
                </div>
                <div className="text-lg font-bold">Ahulana, Sonipat</div>
              </div>

              <div className="bg-white/5 border border-white/5 p-6 rounded-lg sm:col-span-2">
                <div className="flex items-center gap-3 text-[#cba358] mb-2">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Status</span>
                </div>
                <div className="text-lg font-bold text-red-500">Registration Closed</div>
              </div>
            </div>
          </section>

          {/* Event Timeline */}
          <section>
            <h2 className="text-2xl font-['Playfair_Display'] font-bold text-white mb-4">
              Event Timeline
            </h2>
            <p className="text-gray-400 text-sm font-light mb-8">Key event details at a glance</p>
            
            <div className="relative border-l border-white/10 ml-4 space-y-10 pb-8">
              
              {/* Timeline Item 1 */}
              <div className="relative pl-8 group">
                <div className="absolute w-4 h-4 rounded-full bg-[#050505] border-2 border-[#cba358] -left-[9px] top-1 group-hover:bg-[#cba358] transition-colors"></div>
                <div className="flex flex-col">
                  <span className="text-[#cba358] text-[10px] font-bold uppercase tracking-widest mb-1">Deadline</span>
                  <span className="text-xl font-bold mb-1">Jun 5, 2026</span>
                  <span className="text-sm text-gray-400 font-light">Registration closes</span>
                </div>
              </div>

              {/* Timeline Item 2 */}
              <div className="relative pl-8 group">
                <div className="absolute w-4 h-4 rounded-full bg-[#050505] border-2 border-[#cba358] -left-[9px] top-1 group-hover:bg-[#cba358] transition-colors"></div>
                <div className="flex flex-col">
                  <span className="text-[#cba358] text-[10px] font-bold uppercase tracking-widest mb-1">Event Date</span>
                  <span className="text-xl font-bold mb-1">Jun 6, 2026</span>
                  <span className="text-sm text-gray-400 font-light">Championship begins (2 Days)</span>
                </div>
              </div>

            </div>
          </section>

        </div>

        {/* Right Column (Sidebar) */}
        <div className="lg:w-1/3 flex flex-col gap-8">
          
          {/* Registration Status Card */}
          <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8 sticky top-32">
            <h3 className="text-xl font-bold font-['Playfair_Display'] mb-6 border-b border-white/10 pb-4">
              Registration
            </h3>
            
            <div className="w-full bg-red-500/10 border border-red-500/20 text-red-500 text-center py-4 rounded-md font-bold text-sm tracking-widest uppercase mb-6 flex items-center justify-center gap-2">
              <FaExclamationTriangle />
              Closed
            </div>
            
            <p className="text-xs text-gray-400 font-light text-center">
              The registration period for this event has ended. Please check our upcoming events for future opportunities.
            </p>
          </div>

          {/* Map Card */}
          <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-1 overflow-hidden sticky top-[340px]">
            <div className="h-48 bg-white/5 w-full flex flex-col items-center justify-center text-gray-500 rounded-lg">
              <FaMap size={32} className="mb-3 opacity-50" />
              <span className="text-xs font-bold tracking-widest uppercase">Venue Location</span>
              <span className="text-[10px] mt-1 font-light">Map not available</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default SingleEventPage;
