import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#050505] text-white pt-20 pb-10 border-t border-white/5 relative overflow-hidden font-['Inter']">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#cba358]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none z-0"></div>

      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Info */}
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-bold text-white tracking-[0.2em] uppercase">
              Equestrian <span className="text-[#cba358]">Federation</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Dedicated to the promotion, development, and welfare of equestrian sports across Haryana. Preserving heritage, building champions.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#cba358] hover:-translate-y-1 hover:text-white transition-all duration-300 text-gray-400">
                <FaFacebookF size={14} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#cba358] hover:-translate-y-1 hover:text-white transition-all duration-300 text-gray-400">
                <FaInstagram size={14} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#cba358] hover:-translate-y-1 hover:text-white transition-all duration-300 text-gray-400">
                <FaTwitter size={14} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#cba358] hover:-translate-y-1 hover:text-white transition-all duration-300 text-gray-400">
                <FaLinkedinIn size={14} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase text-white mb-6 tracking-[0.2em]">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { name: 'Home', path: '/' }, 
                { name: 'About EFH', path: '/about' }, 
                { name: 'Events', path: '/events' },
                { name: 'News & Results', path: '/news-and-results' },
                { name: 'Gallery', path: '/gallery' }, 
                { name: 'Contact Us', path: '/contact' }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path} onClick={() => window.scrollTo(0, 0)} className="text-gray-400 hover:text-[#cba358] text-sm transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-0 h-[1px] bg-[#cba358] transition-all duration-300 group-hover:w-3"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xs font-bold uppercase text-white mb-6 tracking-[0.2em]">
              Contact Us
            </h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3 group">
                <FaMapMarkerAlt className="text-[#cba358] mt-1 shrink-0 group-hover:animate-bounce" size={14} />
                <span className="text-gray-400 text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
                  123 Equestrian Avenue,<br />
                  Gurugram, Haryana 122001
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <FaPhoneAlt className="text-[#cba358] shrink-0" size={14} />
                <span className="text-gray-400 text-sm group-hover:text-white transition-colors duration-300">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3 group">
                <FaEnvelope className="text-[#cba358] shrink-0" size={14} />
                <span className="text-gray-400 text-sm group-hover:text-white transition-colors duration-300">effharyana@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs font-bold uppercase text-white mb-6 tracking-[0.2em]">
              Newsletter
            </h4>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Subscribe to our newsletter to receive the latest updates, event news, and equestrian tips.
            </p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#cba358] transition-colors rounded-sm"
              />
              <button 
                type="submit"
                className="w-full bg-[#cba358] hover:bg-[#b08d4a] text-white font-bold tracking-[0.2em] text-xs uppercase py-3 transition-colors rounded-sm shadow-md"
              >
                Subscribe
              </button>
            </form>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} Equestrian Federation of Haryana. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-gray-500 text-xs">
            <a href="#" className="hover:text-[#cba358] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#cba358] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
