import React from 'react';
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
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={18} /> },
    { name: 'Manage Gallery', path: '/admin/gallery', icon: <ImageIcon size={18} /> },
    { name: 'Media Library', path: '/admin/media', icon: <Film size={18} /> },
    { name: 'Manage Events', path: '/admin/events', icon: <CalendarDays size={18} /> },
    { name: 'Manage Users', path: '/admin/users', icon: <Users size={18} /> },
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
      <main className="flex-1 ml-64 p-8 md:p-12">
        <Outlet />
      </main>

    </div>
  );
};

export default AdminLayout;
