import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config/api';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    file: null
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      let imageUrl = null;

      // 1. Upload image if exists
      if (formData.file) {
        const uploadData = new FormData();
        uploadData.append('file', formData.file);
        
        const uploadRes = await fetch(`${API_BASE_URL}/upload`, {
          method: 'POST',
          body: uploadData,
        });
        
        if (uploadRes.ok) {
          const uploadResult = await uploadRes.json();
          imageUrl = uploadResult.url;
        } else {
          setErrorMsg('Failed to upload image. Please try again.');
          setIsSubmitting(false);
          return;
        }
      }

      // 2. Submit Contact Form
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          image: imageUrl,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '', file: null });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        setErrorMsg(data.message || 'Failed to send message.');
      }
    } catch (error) {
      setErrorMsg('Network error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full font-['Inter'] bg-[#050505] min-h-screen text-white">
      {/* Navbar Overlay */}
      
      {/* Hero Section */}
      <div className="relative pt-24 md:pt-32 pb-8 md:pb-12 w-full overflow-hidden flex flex-col justify-center items-center px-4 bg-[#0a0a0a] border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-[#050505] opacity-90 z-10"></div>
        </div>
        <div className="relative z-20 text-center max-w-[1000px] mx-auto">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-[#cba358]"></div>
            <span className="text-[#cba358] text-sm tracking-[0.4em] font-bold uppercase">Reach Out To Us</span>
            <div className="w-12 h-[1px] bg-[#cba358]"></div>
          </div>
          <h1 className="font-['Playfair_Display'] text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-xl tracking-wider">
            Get in Touch
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Whether you have questions about our events, membership, or training programs, our team is here to assist you with all your equestrian needs.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-[1400px] mx-auto px-4 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          
          {/* Left Column - Contact Info */}
          <div className="flex flex-col justify-center animate-[fadeIn_0.5s_ease-out]">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-white mb-8">
              Contact Information
            </h2>
            
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-5 group">
                <div className="w-12 h-12 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-[#cba358] group-hover:bg-[#cba358] group-hover:text-black transition-all duration-300 shrink-0 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-widest">Office Address</h3>
                  <p className="text-gray-400 leading-relaxed font-light">
                    G-1, Shopping Arcade, South City-1,<br />
                    Gurgaon, Haryana – 122001
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-5 group">
                <div className="w-12 h-12 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-[#cba358] group-hover:bg-[#cba358] group-hover:text-black transition-all duration-300 shrink-0 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-widest">Phone Number</h3>
                  <p className="text-gray-400 leading-relaxed font-light">
                    +91 94680 00044
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-5 group">
                <div className="w-12 h-12 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-[#cba358] group-hover:bg-[#cba358] group-hover:text-black transition-all duration-300 shrink-0 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-widest">Email Address</h3>
                  <p className="text-gray-400 leading-relaxed font-light">
                    effharyana@gmail.com
                  </p>
                </div>
              </div>
            </div>


          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-[#111] border border-white/5 p-6 md:p-8 rounded-[2rem] shadow-2xl relative overflow-hidden animate-[fadeIn_0.6s_ease-out]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#cba358]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <h2 className="text-2xl md:text-3xl font-['Playfair_Display'] font-bold text-white mb-6">
              Send us a Message
            </h2>

            {isSubmitted ? (
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 text-center animate-[fadeIn_0.3s_ease-out]">
                <div className="w-12 h-12 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">Message Sent!</h3>
                <p className="text-gray-400 text-sm">Thank you for reaching out. We will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                {errorMsg && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-sm font-medium">
                    {errorMsg}
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Your Name</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#1a1d24] border border-white/5 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#cba358]/50 focus:ring-1 focus:ring-[#cba358]/50 transition-all duration-300"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#1a1d24] border border-white/5 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#cba358]/50 focus:ring-1 focus:ring-[#cba358]/50 transition-all duration-300"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Subject</label>
                  <input 
                    type="text" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#1a1d24] border border-white/5 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#cba358]/50 focus:ring-1 focus:ring-[#cba358]/50 transition-all duration-300"
                    placeholder="How can we help?"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Message</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full bg-[#1a1d24] border border-white/5 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#cba358]/50 focus:ring-1 focus:ring-[#cba358]/50 transition-all duration-300 resize-none"
                    placeholder="Write your message here..."
                  ></textarea>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Attach Document (JPG/PNG, Max 2MB) [Optional]</label>
                  <input 
                    type="file" 
                    name="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="w-full bg-[#1a1d24] border border-white/5 rounded-xl px-4 py-2 text-gray-400 text-sm focus:outline-none focus:border-[#cba358]/50 focus:ring-1 focus:ring-[#cba358]/50 transition-all duration-300 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#cba358]/10 file:text-[#cba358] hover:file:bg-[#cba358]/20 cursor-pointer"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[#cba358] hover:bg-[#b08d4b] disabled:opacity-50 text-black font-bold uppercase tracking-widest text-xs py-3.5 mt-2 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(203,163,88,0.2)] hover:shadow-[0_0_30px_rgba(203,163,88,0.4)] flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  {!isSubmitting && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
