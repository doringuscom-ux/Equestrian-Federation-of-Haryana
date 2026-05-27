import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { RiArrowUpLine } from 'react-icons/ri';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  // Hide button on admin pages
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-[90] p-4 bg-[#cba358] hover:bg-gray-900 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group"
          aria-label="Scroll to top"
        >
          <RiArrowUpLine size={24} className="group-hover:-translate-y-1 transition-transform duration-300" />
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
