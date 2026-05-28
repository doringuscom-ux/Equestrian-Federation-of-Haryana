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
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import ForgotPassword from './pages/ForgotPassword'
import ProfilePage from './pages/ProfilePage'
import PdfViewerPage from './pages/PdfViewerPage'
import AdminLogin from './pages/AdminLogin'
import AdminLayout from './pages/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import Inquiries from './pages/admin/Inquiries'
import Coupons from './pages/admin/Coupons'
import News from './pages/admin/News'
import RegistrationManagement from './pages/admin/RegistrationManagement'
import NotFoundPage from './pages/NotFoundPage'

import Footer from './components/Footer'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import AdminGallery from './pages/admin/AdminGallery'
import AdminEvents from './pages/admin/AdminEvents'
import AdminUsers from './pages/admin/AdminUsers'

import Navbar from './components/Navbar'
import ScrollToTopButton from './components/ScrollToTopButton'

const ConditionalNavbar = () => {
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(Boolean);
  const isPdfViewer = pathParts.length === 2 && pathParts[0] !== 'admin' && pathParts[0] !== 'event';
  
  if (location.pathname.startsWith('/admin') || isPdfViewer) {
    return null;
  }
  return <Navbar />;
};

const ConditionalFooter = () => {
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(Boolean);
  const isPdfViewer = pathParts.length === 2 && pathParts[0] !== 'admin' && pathParts[0] !== 'event';

  if (location.pathname.startsWith('/admin') || isPdfViewer) {
    return null;
  }
  return <Footer />;
};

const ConditionalScrollToTop = () => {
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(Boolean);
  const isPdfViewer = pathParts.length === 2 && pathParts[0] !== 'admin' && pathParts[0] !== 'event';

  if (location.pathname.startsWith('/admin') || isPdfViewer) {
    return null;
  }
  return <ScrollToTopButton />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <ConditionalScrollToTop />
        <ConditionalNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
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
          
          {/* User Profile Route (Protected) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          {/* Admin Dashboard Routes (Protected) */}
          <Route element={<ProtectedRoute adminOnly={true}><AdminLayout /></ProtectedRoute>}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            {/* Placeholder routes for sidebar links */}
            <Route path="/admin/gallery" element={<AdminGallery />} />
            <Route path="/admin/events" element={<AdminEvents />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/registration-management" element={<RegistrationManagement />} />
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
