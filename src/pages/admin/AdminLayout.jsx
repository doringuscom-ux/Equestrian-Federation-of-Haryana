import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  Film, 
  CalendarDays, 
  Users, 
  Newspaper, 
  Ticket, 
  LineChart, 
  Mail,
  LogOut,
  Bell,
  Settings
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [pendingUsersCount, setPendingUsersCount] = useState(0);
  const [recentRegistrations, setRecentRegistrations] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchNotificationsData = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        
        // Fetch pending users
        const usersRes = await fetch('http://localhost:5000/api/auth/admin/users', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const users = await usersRes.json();
        if (Array.isArray(users)) {
          const pending = users.filter(u => u.verificationStatus === 'pending').length;
          setPendingUsersCount(pending);
        }

        // Fetch recent registrations
        const regRes = await fetch('http://localhost:5000/api/events/admin/recent-registrations', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (regRes.ok) {
          const regs = await regRes.json();
          setRecentRegistrations(regs);
        }
      } catch (err) {
        console.error('Failed to fetch notifications data', err);
      }
    };
    
    // Fetch immediately on mount or path change
    fetchNotificationsData();
    
    // Auto-update notifications every 10 seconds (Polling)
    const intervalId = setInterval(() => {
      fetchNotificationsData();
    }, 10000);
    
    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, [location.pathname]); // Refresh on page change

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={18} /> },
    { name: 'Manage Gallery', path: '/admin/gallery', icon: <ImageIcon size={18} /> },
    { name: 'Media Library', path: '/admin/media', icon: <Film size={18} /> },
    { name: 'Manage Events', path: '/admin/events', icon: <CalendarDays size={18} /> },
    { name: 'Manage Users', path: '/admin/users', icon: <Users size={18} /> },
    { name: 'Registration Mgmt', path: '/admin/registration-management', icon: <Settings size={18} /> },
    { name: 'Manage Results & News', path: '/admin/news', icon: <Newspaper size={18} /> },
    { name: 'Manage Coupons', path: '/admin/coupons', icon: <Ticket size={18} /> },
    { name: 'Inquiries', path: '/admin/inquiries', icon: <Mail size={18} /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-['Inter'] text-gray-800">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col fixed h-full z-10">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </div>
          <span className="text-lg font-bold text-gray-800">Admin CMS</span>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1.5">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="p-4 mt-auto border-t border-gray-100">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-2.5 w-full rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-end px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            {/* Notification Dropdown Container */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`relative p-2 rounded-full transition-colors group ${showNotifications ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                <Bell size={20} className={showNotifications ? 'text-blue-600' : 'group-hover:text-blue-600 transition-colors'} />
                {/* Notification dot */}
                {(pendingUsersCount > 0 || recentRegistrations.length > 0) && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                )}
              </button>

              {/* Dropdown Menu */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden z-50 animate-in slide-in-from-top-2">
                  <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center">
                    <h3 className="text-sm font-bold text-gray-900">Notifications</h3>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                      {pendingUsersCount + recentRegistrations.length} New
                    </span>
                  </div>
                  <div className="max-h-[350px] overflow-y-auto">
                    {pendingUsersCount === 0 && recentRegistrations.length === 0 ? (
                      <div className="p-6 text-center text-gray-400">
                        <Bell size={24} className="mx-auto mb-2 opacity-20" />
                        <p className="text-sm font-medium">All caught up!</p>
                        <p className="text-xs mt-1">No new notifications.</p>
                      </div>
                    ) : (
                      <>
                        {pendingUsersCount > 0 && (
                          <Link 
                            to="/admin/users" 
                            onClick={() => setShowNotifications(false)}
                            className="flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors border-b border-gray-50"
                          >
                            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                              <Users size={14} />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-gray-900">Pending Approvals</p>
                              <p className="text-xs text-gray-500 mt-0.5">You have {pendingUsersCount} user(s) waiting for profile verification.</p>
                              <p className="text-[10px] font-bold text-blue-500 mt-1">Review Now</p>
                            </div>
                          </Link>
                        )}
                        
                        {recentRegistrations.map((reg) => (
                          <Link 
                            key={reg._id}
                            to="/admin/events" 
                            onClick={() => setShowNotifications(false)}
                            className="flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors border-b border-gray-50"
                          >
                            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                              <CalendarDays size={14} />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-gray-900">New Registration!</p>
                              <p className="text-xs text-gray-500 mt-0.5">
                                <strong>{reg.user?.username || 'User'}</strong> registered for <strong>{reg.event?.title || 'an event'}</strong>.
                              </p>
                              <p className="text-[10px] font-bold text-blue-500 mt-1">
                                {new Date(reg.createdAt).toLocaleDateString()} • {new Date(reg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 md:p-12">
          <Outlet />
        </main>
      </div>

    </div>
  );
};

export default AdminLayout;
