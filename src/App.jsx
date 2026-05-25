import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import DressagePage from './pages/DressagePage'
import ShowJumpingPage from './pages/ShowJumpingPage'
import EventingPage from './pages/EventingPage'
import TentPeggingPage from './pages/TentPeggingPage'
import EndurancePage from './pages/EndurancePage'
import EventsPage from './pages/EventsPage'
import SingleEventPage from './pages/SingleEventPage'
import NewsPage from './pages/NewsPage'
import GalleryPage from './pages/GalleryPage'
import ContactPage from './pages/ContactPage'
import AboutPage from './pages/AboutPage'
import LoadingScreen from './components/LoadingScreen'
import Footer from './components/Footer'

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Hide loading screen after 2.5 seconds
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/dressage" element={<DressagePage />} />
          <Route path="/show-jumping" element={<ShowJumpingPage />} />
          <Route path="/eventing" element={<EventingPage />} />
          <Route path="/tent-pegging" element={<TentPeggingPage />} />
          <Route path="/endurance" element={<EndurancePage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/event/:id" element={<SingleEventPage />} />
          <Route path="/news-results" element={<NewsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
