import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import PresidentMessage from '../components/PresidentMessage'
import Affiliations from '../components/Affiliations'
import Disciplines from '../components/Disciplines'
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa'

function Home() {
  return (
    <div className="w-full font-['Inter'] bg-white">
      
      {/* Hero Section */}
      <div className="relative h-screen w-full overflow-hidden text-white">
        {/* Background Video */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="/Video/The most cinematic horse video you ll see today_1080p.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Subtle Overlay for text readability */}
        <div className="absolute inset-0 bg-black/10 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/20 z-10"></div>

        {/* Navbar */}
        <Navbar />

        {/* Left Social Icons */}
        <div className="absolute left-10 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-8 text-lg">
          <a href="#" className="hover:text-gray-300 transition-colors"><FaFacebookF /></a>
          <a href="#" className="hover:text-gray-300 transition-colors"><FaInstagram /></a>
          <a href="#" className="hover:text-gray-300 transition-colors"><FaTwitter /></a>
          <a href="#" className="hover:text-gray-300 transition-colors"><FaLinkedinIn /></a>
        </div>

        {/* Right Scroll Text */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 z-20 hidden md:block">
          <div className="rotate-90 origin-center text-sm font-semibold tracking-[0.2em] uppercase whitespace-nowrap flex items-center gap-4">
            <span className="w-6 h-[2px] bg-white"></span>
            Scroll
          </div>
        </div>

        {/* Main Hero Content */}
        <main className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4 mt-8">
          <div className="mb-6">
            {/* Small horse icon above text */}
            <svg className="w-24 h-24 fill-white mx-auto" viewBox="0 0 24 24">
              <path d="M14.4,5.4C14.4,5.4,14.4,5.4,14.4,5.4c-0.2-0.5-0.7-0.7-1.2-0.5c-0.1,0.1-0.2,0.1-0.2,0.2l-2.4,1.4
                C9.4,7,7.7,7.8,6,8.7L5,9.2C4.1,9.7,3.5,10.6,3.4,11.7l-0.2,3.3C3.1,16.2,4,17,5,16.9l2.2-0.1L9,15.7l1.7,3.5
                c0.2,0.4,0.6,0.5,1,0.3c0.4-0.2,0.5-0.6,0.3-1l-1.3-2.6c0.5,0.1,1.1,0.3,1.6,0.3L15.6,15c1.4-0.4,2.5-1.5,2.9-2.9l1.4-4.2
                c0.2-0.6-0.2-1.3-0.8-1.5C18.6,6.3,18.1,6,17.5,6c-0.2,0-0.4,0-0.6,0.1L14.4,5.4z"/>
            </svg>
          </div>
          <h1 className="font-['Playfair_Display'] text-4xl md:text-6xl lg:text-[70px] text-white mb-6 drop-shadow-md">
            Equestrian Federation
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed mb-10 font-light drop-shadow-sm">
            Established in 2002, the Equestrian Federation of Haryana is committed to the promotion, development, and welfare of equestrian sports across Haryana. Preserving Heritage. Building Champions. Inspiring Haryana.
          </p>
          
          <button className="bg-white text-black px-8 py-3 rounded-sm text-sm font-semibold tracking-wide hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
            Discover More <span>→</span>
          </button>

          {/* Carousel indicators */}
          <div className="absolute bottom-12 flex gap-4">
            <div className="w-2.5 h-2.5 rounded-full bg-white ring-[3px] ring-white/30 ring-offset-2 ring-offset-transparent"></div>
            <div className="w-2 h-2 rounded-full bg-white/60 hover:bg-white transition-colors cursor-pointer mt-0.5"></div>
            <div className="w-2 h-2 rounded-full bg-white/60 hover:bg-white transition-colors cursor-pointer mt-0.5"></div>
          </div>
        </main>
      </div>

      {/* President Message Section */}
      <PresidentMessage />

      {/* Affiliations Section */}
      <Affiliations />

      {/* Disciplines Section */}
      <Disciplines />

    </div>
  )
}

export default Home
