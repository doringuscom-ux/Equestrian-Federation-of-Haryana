import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

export const upcomingEvents = [
  {
    id: 1,
    title: 'Haryana State Dressage Championship 2026',
    date: 'Oct 15 - Oct 18, 2026',
    time: '08:00 AM - 05:00 PM',
    location: 'Equestrian Center, Gurugram',
    image: '/IMG/Horse/2.jpg',
    status: 'Registrations Open',
  },
  {
    id: 2,
    title: 'National Endurance Qualifier',
    date: 'Nov 05, 2026',
    time: '06:00 AM - 02:00 PM',
    location: 'Aravalli Trails, Faridabad',
    image: '/IMG/Horse/5.jpg',
    status: 'Upcoming',
  },
  {
    id: 3,
    title: 'Annual Show Jumping Gala',
    date: 'Dec 12 - Dec 14, 2026',
    time: '09:00 AM - 06:00 PM',
    location: 'EFH Main Arena, Rohtak',
    image: '/IMG/Horse/1.jpg',
    status: 'Upcoming',
  }
];

export const completedEvents = [
  {
    id: 4,
    title: 'Spring Eventing Classic 2026',
    date: 'Mar 10 - Mar 12, 2026',
    time: '09:00 AM - 05:00 PM',
    location: 'Gurugram',
    image: '/IMG/Horse/3.jpg',
    status: 'Completed'
  },
  {
    id: 5,
    title: 'EFH Tent Pegging Tournament',
    date: 'Jan 22 - Jan 24, 2026',
    time: '10:00 AM - 04:00 PM',
    location: 'Karnal',
    image: '/IMG/Horse/4.jpg',
    status: 'Completed'
  },
  {
    id: 6,
    title: 'Winter Dressage Showcase',
    date: 'Dec 05 - Dec 07, 2025',
    time: '08:30 AM - 03:00 PM',
    location: 'Panipat',
    image: '/IMG/Horse/6.jpg',
    status: 'Completed'
  }
];

const EventsPage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const displayedEvents = activeTab === 'upcoming' ? upcomingEvents : completedEvents;

  return (
    <div className="w-full font-['Inter'] bg-[#050505]">
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden text-white flex flex-col justify-center items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/IMG/Horse/7.jpg" 
            alt="Events Hero" 
            className="w-full h-full object-cover object-center filter brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/50 to-transparent"></div>
        </div>

        {/* Navbar */}
        <Navbar />

        {/* Hero Content */}
        <div className="relative z-20 text-center px-4 mt-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-[#cba358]"></div>
            <span className="text-[#cba358] text-sm tracking-[0.4em] font-bold uppercase">Competition & Community</span>
            <div className="w-12 h-[1px] bg-[#cba358]"></div>
          </div>
          <h1 className="font-['Playfair_Display'] text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 drop-shadow-xl tracking-wider">
            EVENTS
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Join the excitement, showcase your talent, and witness equestrian excellence at our competitions and showcases.
          </p>
        </div>
      </div>

      {/* Events Section with Tabs */}
      <section className="py-16 md:py-20 bg-[#050505] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#cba358]/5 via-transparent to-transparent"></div>
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
          
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold text-white tracking-wide mb-4">
                Our <span className="text-[#cba358] italic font-light">Events</span>
              </h2>
              <p className="text-gray-400 font-light max-w-xl">
                Explore our upcoming competitions and past event highlights.
              </p>
            </div>
            
            {/* Filter Tabs */}
            <div className="flex items-center gap-2 md:gap-4 bg-white/5 p-1.5 rounded-sm border border-white/10">
              <button 
                onClick={() => setActiveTab('upcoming')}
                className={`px-6 py-3 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 rounded-sm ${
                  activeTab === 'upcoming' 
                    ? 'bg-[#cba358] text-black shadow-lg' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                Upcoming
              </button>
              <button 
                onClick={() => setActiveTab('completed')}
                className={`px-6 py-3 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 rounded-sm ${
                  activeTab === 'completed' 
                    ? 'bg-[#cba358] text-black shadow-lg' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                Completed
              </button>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedEvents.map((event) => (
              <div key={event.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden group hover:border-[#cba358]/50 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full shadow-lg">
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute top-4 right-4 text-xs font-bold px-3 py-1.5 uppercase tracking-wider rounded-sm shadow-lg ${
                    activeTab === 'completed' ? 'bg-white/90 text-black' : 'bg-[#cba358] text-black'
                  }`}>
                    {event.status}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold font-['Playfair_Display'] text-white mb-6 group-hover:text-[#cba358] transition-colors duration-300">
                    {event.title}
                  </h3>
                  <div className="space-y-4 mb-8 flex-grow">
                    <div className="flex items-start gap-3 text-gray-400">
                      <FaCalendarAlt className="mt-1 text-[#cba358] shrink-0" size={14} />
                      <span className="text-sm font-light">{event.date}</span>
                    </div>
                    <div className="flex items-start gap-3 text-gray-400">
                      <FaClock className="mt-1 text-[#cba358] shrink-0" size={14} />
                      <span className="text-sm font-light">{event.time}</span>
                    </div>
                    <div className="flex items-start gap-3 text-gray-400">
                      <FaMapMarkerAlt className="mt-1 text-[#cba358] shrink-0" size={14} />
                      <span className="text-sm font-light">{event.location}</span>
                    </div>
                  </div>
                  <Link to={`/event/${event.id}`} className="w-full py-4 border-t border-white/10 text-white text-xs font-bold tracking-widest uppercase hover:text-[#cba358] transition-colors duration-300 text-left flex justify-between items-center group-hover:border-[#cba358]/30">
                    View Details
                    <span className="text-lg leading-none transform transition-transform duration-300 group-hover:translate-x-2">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
};

export default EventsPage;
