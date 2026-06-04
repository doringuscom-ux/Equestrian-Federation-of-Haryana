import React from 'react'
import { Link } from 'react-router-dom'
import AboutSection from '../components/AboutSection'
import PresidentMessage from '../components/PresidentMessage'
import Affiliations from '../components/Affiliations'
import NewsUpdates from '../components/NewsUpdates'
import HomeNewsSection from '../components/HomeNewsSection'
import Disciplines from '../components/Disciplines'
import ExperienceAction from '../components/ExperienceAction'
import WhyChooseUs from '../components/WhyChooseUs'
import GetInvolved from '../components/GetInvolved'
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
        <main className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4 mt-40">
          <div className="mb-6">
            {/* Logo removed */}
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

        </main>
      </div>


      {/* President Message Section */}
      <PresidentMessage />

      {/* Affiliations Section */}
      <Affiliations />

      {/* News & Updates Section (Events) */}
      <NewsUpdates />

      {/* Official News & Results Section */}
      <HomeNewsSection />

      {/* Disciplines Section */}
      <Disciplines />

      {/* About Section */}
      <AboutSection />
      {/* Experience Action Section */}
      <ExperienceAction />

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Get Involved Section */}
      <GetInvolved />

    </div>
  )
}

export default Home
