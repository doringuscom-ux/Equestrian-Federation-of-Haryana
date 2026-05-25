import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
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
import PdfViewerPage from './pages/PdfViewerPage'
import AdminLogin from './pages/AdminLogin'
import AdminLayout from './pages/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import Inquiries from './pages/admin/Inquiries'
import Coupons from './pages/admin/Coupons'
import News from './pages/admin/News'
import NotFoundPage from './pages/NotFoundPage'
import LoadingScreen from './components/LoadingScreen'
import Footer from './components/Footer'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import AdminGallery from './pages/admin/AdminGallery'

const ConditionalFooter = () => {
  const location = useLocation();
  if (location.pathname.startsWith('/admin')) {
    return null;
  }
  return <Footer />;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Hide loading screen after 2.5 seconds
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
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
          <Route path="/news-and-results" element={<NewsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          
          {/* Dynamic Category/Slug Route for PDF Viewer (Place at bottom of public routes) */}
          <Route path="/:category/:slug" element={<PdfViewerPage />} />
          
          {/* Admin Dashboard Routes (Protected) */}
          <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            {/* Placeholder routes for sidebar links */}
            <Route path="/admin/gallery" element={<AdminGallery />} />
            <Route path="/admin/media" element={<div className="p-8">Media Library (Coming Soon)</div>} />
            <Route path="/admin/events" element={<div className="p-8">Events Management (Coming Soon)</div>} />
            <Route path="/admin/users" element={<div className="p-8">Users Management (Coming Soon)</div>} />
            <Route path="/admin/news" element={<News />} />
            <Route path="/admin/coupons" element={<Coupons />} />
            <Route path="/admin/inquiries" element={<Inquiries />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <ConditionalFooter />
      </Router>
    </AuthProvider>
  )
}

export default App
