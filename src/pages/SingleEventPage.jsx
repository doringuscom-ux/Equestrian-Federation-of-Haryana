import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaExclamationTriangle, FaMap } from 'react-icons/fa';
import { API_BASE_URL } from '../config/api';
import api from '../api/apiConfig';
import EventRegistrationModal from '../components/events/EventRegistrationModal';
import { useAuth } from '../context/AuthContext';

const SingleEventPage = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [activeRegistration, setActiveRegistration] = useState(null);
  
  const bgImage = event?.image || '/IMG/Horse/7.jpg';
  
  const calculateTimeLeft = (dateStr) => {
    if (!dateStr) return { days: 0, hours: 0, mins: 0, secs: 0 };
    
    // Parse date (e.g. "Oct 15 - Oct 18, 2026" or "Nov 05, 2026")
    let targetDateStr = dateStr;
    if (dateStr.includes('-')) {
      const parts = dateStr.split('-');
      const startPart = parts[0].trim();
      const yearMatch = parts[1].match(/\d{4}/);
      targetDateStr = yearMatch ? `${startPart}, ${yearMatch[0]}` : startPart;
    }
    
    // Default time to 08:00 AM if not specified
    if (!targetDateStr.includes(':')) targetDateStr += ' 08:00:00';
    
    const targetDate = new Date(targetDateStr).getTime();
    if (isNaN(targetDate)) return { days: 0, hours: 0, mins: 0, secs: 0 };
    
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) return { days: 0, hours: 0, mins: 0, secs: 0 };

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      mins: Math.floor((difference / 1000 / 60) % 60),
      secs: Math.floor((difference / 1000) % 60)
    };
  };

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchEventAndRegistrations = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/events/${id}`);
        if (res.ok) {
          const data = await res.json();
          setEvent(data);
        }
        
        // If user is logged in, check for existing active registrations
        if (user) {
          try {
            const regRes = await api.get('/user-events/my-registrations');
            const registrations = regRes.data;
            const activeReg = registrations.find(
              reg => (reg.event?._id === id || reg.event === id) && reg.status !== 'cancelled'
            );
            setActiveRegistration(activeReg || null);
          } catch (regErr) {
            console.error('Error fetching user registrations:', regErr);
          }
        }
      } catch (error) {
        console.error('Error fetching event:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEventAndRegistrations();
  }, [id, user]);  useEffect(() => {
    let timer;
    if (event?.date) {
      setTimeLeft(calculateTimeLeft(event.date));
      timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft(event.date));
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [event?.date]);

  const formatDeadline = (dateStr) => {
    if (!dateStr) return null;
    if (dateStr.includes('T')) {
      const d = new Date(dateStr);
      if (!isNaN(d.getTime())) {
        const datePart = d.toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
        const timePart = d.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' });
        return (
          <>
            <span>{datePart}</span>
            <span className="block text-gray-400 text-[0.85em] font-medium mt-0.5">{timePart}</span>
          </>
        );
      }
    }
    return dateStr;
  };

  return (
    <div className="w-full font-['Inter'] bg-[#050505] min-h-screen text-white relative">
      
      {/* Navbar Overlay */}
      
      {/* Hero Section Split Layout */}
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 pt-32 pb-16 md:pt-40 md:pb-24 flex flex-col lg:flex-row items-stretch gap-12 lg:gap-20">
        
        {/* Left Column (Content) */}
        <div className="lg:w-7/12 flex flex-col justify-center pr-0 lg:pr-8">
          <div className="inline-block px-4 py-1.5 bg-[#cba358]/20 border border-[#cba358]/50 rounded-md mb-6 text-[#cba358] text-xs font-bold tracking-widest uppercase w-max">
            Upcoming Event
          </div>
          
          <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl lg:text-[2.75rem] xl:text-5xl font-bold text-white mb-1 leading-tight">
            {event?.title || 'Loading Event...'}
          </h1>
          <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold text-white mb-8">
            {event?.date?.split(',').pop()?.trim() || '2026'}
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
                <span className="text-sm font-bold text-white">{event?.date || 'N/A'}</span>
              </div>
            </div>
            
            <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-4 flex items-center gap-4 flex-1">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#cba358]">
                <FaMapMarkerAlt size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-1">Location</span>
                <span className="text-sm font-bold text-white">{event?.location || 'N/A'}</span>
              </div>
            </div>

            <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-4 flex items-center gap-4 flex-1">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#cba358]">
                <FaClock size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-1">Deadline</span>
                <span className="text-sm font-bold text-white">{formatDeadline(event?.deadline) || event?.date || 'N/A'}</span>
              </div>
            </div>
          </div>
          
        </div>

        {/* Right Column (Image Card) */}
        <div className="lg:w-5/12 w-full">
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
                {event?.description || 'Join us for a spectacular display of equestrian talent and competition.'}
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
                <div className="text-lg font-bold">{event?.duration || '1 Day'}</div>
              </div>
              
              <div className="bg-white/5 border border-white/5 p-6 rounded-lg">
                <div className="flex items-center gap-3 text-[#cba358] mb-2">
                  <FaMapMarkerAlt />
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Venue</span>
                </div>
                <div className="text-lg font-bold">{event?.location || 'N/A'}</div>
              </div>

              <div className="bg-white/5 border border-white/5 p-6 rounded-lg sm:col-span-2">
                <div className="flex items-center gap-3 text-[#cba358] mb-2">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Status</span>
                </div>
                <div className={`text-lg font-bold ${event?.status === 'Registrations Open' ? 'text-emerald-500' : 'text-red-500'}`}>
                  {event?.status === 'Registrations Open' ? 'Registration Open' : 'Registration Closed'}
                </div>
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
                  <span className="text-xl font-bold mb-1">{formatDeadline(event?.deadline) || event?.date}</span>
                  <span className="text-sm text-gray-400 font-light">Registration closes</span>
                </div>
              </div>

              {/* Timeline Item 2 */}
              <div className="relative pl-8 group">
                <div className="absolute w-4 h-4 rounded-full bg-[#050505] border-2 border-[#cba358] -left-[9px] top-1 group-hover:bg-[#cba358] transition-colors"></div>
                <div className="flex flex-col">
                  <span className="text-[#cba358] text-[10px] font-bold uppercase tracking-widest mb-1">Event Date</span>
                  <span className="text-xl font-bold mb-1">{event?.date}</span>
                  <span className="text-sm text-gray-400 font-light">Event begins ({event?.duration || '1 Day'})</span>
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
            
            {activeRegistration ? (
              <>
                <button 
                  disabled={true}
                  className="w-full bg-gray-400 cursor-not-allowed opacity-80 text-black text-center block py-4 rounded-md font-bold text-sm tracking-widest uppercase mb-4 transition-colors"
                >
                  Already Joined
                </button>
                <button 
                  onClick={async () => {
                    const reason = window.prompt('Please enter a reason for cancellation (Optional):');
                    if (reason !== null) {
                      try {
                        const res = await api.post(`/user-events/cancel/${activeRegistration._id}`, { reason });
                        alert(res.data.message || 'Registration cancelled successfully');
                        window.location.reload();
                      } catch (err) {
                        alert(err.response?.data?.message || 'Failed to cancel');
                      }
                    }
                  }}
                  className="w-full border border-red-500/30 text-red-400 text-center block py-4 rounded-md font-bold text-sm tracking-widest uppercase mb-4 hover:bg-red-500/10 hover:border-red-500/50 transition-colors"
                >
                  Cancel Registration
                </button>
                <p className="text-xs text-gray-400 font-light text-center">
                  You have an active booking for this event.
                </p>
              </>
            ) : event?.status === 'Registrations Open' ? (
              <>
                <button 
                  onClick={() => setShowModal(true)} 
                  className="w-full bg-[#cba358] hover:bg-white text-black text-center block py-4 rounded-md font-bold text-sm tracking-widest uppercase mb-4 transition-colors"
                >
                  Register Now
                </button>
                <p className="text-xs text-gray-400 font-light text-center">
                  Secure your spot before the deadline. Limited slots available.
                </p>
              </>
            ) : (
              <>
                <button 
                  disabled={true}
                  className="w-full bg-red-500/10 text-red-400 border border-red-500/20 cursor-not-allowed text-center block py-4 rounded-md font-bold text-sm tracking-widest uppercase mb-4 transition-colors"
                >
                  {event?.status || 'Registrations Closed'}
                </button>
                <p className="text-xs text-gray-400 font-light text-center">
                  We are no longer accepting new registrations for this event.
                </p>
              </>
            )}
          </div>

          {/* Map Card */}
          <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-1 overflow-hidden sticky top-[340px]">
            {event?.mapUrl ? (
              event.mapUrl.includes('embed') || event.mapUrl.includes('<iframe') ? (
                <iframe 
                  src={event.mapUrl.includes('<iframe') ? (event.mapUrl.match(/src=["'](.*?)["']/) || [])[1] || event.mapUrl : event.mapUrl}
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, minHeight: '12rem' }} 
                  allowFullScreen="" 
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg bg-white/5"
                ></iframe>
              ) : (
                <div className="h-48 bg-white/5 w-full flex flex-col items-center justify-center text-gray-400 rounded-lg relative overflow-hidden group">
                  <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
                  <FaMapMarkerAlt size={36} className="mb-4 text-[#cba358]" />
                  <span className="text-xs font-bold tracking-widest uppercase text-white mb-4">{event?.location || 'Venue Location'}</span>
                  <a href={event.mapUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-[#cba358] text-black text-[10px] font-black uppercase tracking-widest rounded-md hover:bg-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                    Open in Google Maps
                  </a>
                </div>
              )
            ) : (
              <div className="h-48 bg-white/5 w-full flex flex-col items-center justify-center text-gray-500 rounded-lg">
                <FaMap size={32} className="mb-3 opacity-50" />
                <span className="text-xs font-bold tracking-widest uppercase">Venue Location</span>
                <span className="text-[10px] mt-1 font-light">Map not available</span>
              </div>
            )}
          </div>

        </div>

      </div>

      {showModal && (
        <EventRegistrationModal 
          event={event} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </div>
  );
};

export default SingleEventPage;
