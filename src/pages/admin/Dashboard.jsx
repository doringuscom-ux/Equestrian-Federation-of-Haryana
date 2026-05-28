import React, { useState, useEffect } from 'react';
import { 
  Image as ImageIcon, CalendarDays, User, Users, ArrowUpRight, 
  MessageSquare, Activity, Loader2, ArrowRight, Settings, FileText, Tag, ClipboardList
} from 'lucide-react';
import { API_BASE_URL } from '../../config/api';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/dashboard/stats`, {
          // If auth token is needed, add headers here
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken') || ''}`
          }
        });
        
        if (!response.ok) throw new Error('Failed to fetch dashboard stats');
        
        const data = await response.json();
        if (data.success) {
          setStatsData(data.data);
        } else {
          throw new Error(data.message || 'Error loading stats');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
        <p className="text-gray-500 font-medium">Loading Dashboard Data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-500 p-6 rounded-2xl border border-red-100 text-center font-bold max-w-2xl mx-auto mt-10">
        Error: {error}
      </div>
    );
  }

  const { stats } = statsData;

  return (
    <div className="max-w-7xl mx-auto animate-[fadeIn_0.5s_ease-out]">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-black text-[#1a2332] mb-2 font-['Inter'] tracking-tight">Overview</h1>
        <p className="text-[#64748b] text-[15px] font-medium">Welcome back to your central control panel. Select a module to manage.</p>
      </div>

      {/* Stats Grid - 4 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        
        {/* Stat Card 1: Users */}
        <div className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
          <div className="flex justify-between items-start mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
              <User size={24} strokeWidth={2.5} />
            </div>
          </div>
          <div>
            <p className="text-[#64748b] text-[11px] font-black uppercase tracking-widest mb-1">Total Users</p>
            <h3 className="text-4xl font-black text-[#1a2332]">{stats.totalUsers}</h3>
          </div>
        </div>

        {/* Stat Card 2: Events */}
        <div className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300">
          <div className="flex justify-between items-start mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-400 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <CalendarDays size={24} strokeWidth={2.5} />
            </div>
          </div>
          <div>
            <p className="text-[#64748b] text-[11px] font-black uppercase tracking-widest mb-1">Total Events</p>
            <h3 className="text-4xl font-black text-[#1a2332]">{stats.totalEvents}</h3>
          </div>
        </div>

        {/* Stat Card 3: Gallery */}
        <div className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
          <div className="flex justify-between items-start mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-purple-500/30">
              <ImageIcon size={24} strokeWidth={2.5} />
            </div>
          </div>
          <div>
            <p className="text-[#64748b] text-[11px] font-black uppercase tracking-widest mb-1">Gallery Items</p>
            <h3 className="text-4xl font-black text-[#1a2332]">{stats.totalGalleryItems}</h3>
          </div>
        </div>

        {/* Stat Card 4: Inquiries */}
        <div className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300">
          <div className="flex justify-between items-start mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <MessageSquare size={24} strokeWidth={2.5} />
            </div>
          </div>
          <div>
            <p className="text-[#64748b] text-[11px] font-black uppercase tracking-widest mb-1">Total Inquiries</p>
            <h3 className="text-4xl font-black text-[#1a2332]">{stats.totalInquiries}</h3>
          </div>
        </div>
      </div>

      {/* System Modules Area */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1.5 h-8 bg-blue-600 rounded-full"></div>
          <h2 className="text-2xl font-black text-[#1a2332] tracking-tight">System Modules</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Module: Users */}
          <Link to="/admin/users" className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:-translate-y-2 hover:shadow-2xl hover:border-blue-100 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
              <Users size={26} strokeWidth={2.5} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">Users</h3>
            <p className="text-xs text-gray-500 font-medium">Manage all members</p>
          </Link>

          {/* Module: Events */}
          <Link to="/admin/events" className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:-translate-y-2 hover:shadow-2xl hover:border-indigo-100 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm">
              <CalendarDays size={26} strokeWidth={2.5} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">Events</h3>
            <p className="text-xs text-gray-500 font-medium">Create tournaments</p>
          </Link>

          {/* Module: Registrations */}
          <Link to="/admin/registration-management" className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:-translate-y-2 hover:shadow-2xl hover:border-purple-100 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 shadow-sm">
              <ClipboardList size={26} strokeWidth={2.5} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">Registrations</h3>
            <p className="text-xs text-gray-500 font-medium">Coupons Codes</p>
          </Link>

          {/* Module: Inquiries */}
          <Link to="/admin/inquiries" className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:-translate-y-2 hover:shadow-2xl hover:border-emerald-100 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-sm">
              <MessageSquare size={26} strokeWidth={2.5} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">Inquiries</h3>
            <p className="text-xs text-gray-500 font-medium">Respond to messages</p>
          </Link>

          {/* Module: Gallery */}
          <Link to="/admin/gallery" className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:-translate-y-2 hover:shadow-2xl hover:border-pink-100 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-pink-600 group-hover:text-white transition-all duration-300 shadow-sm">
              <ImageIcon size={26} strokeWidth={2.5} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">Gallery</h3>
            <p className="text-xs text-gray-500 font-medium">Upload photos & video</p>
          </Link>

          {/* Module: News */}
          <Link to="/admin/news" className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:-translate-y-2 hover:shadow-2xl hover:border-orange-100 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300 shadow-sm">
              <FileText size={26} strokeWidth={2.5} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">News & Results</h3>
            <p className="text-xs text-gray-500 font-medium">Publish updates</p>
          </Link>

          {/* Module: Coupons */}
          <Link to="/admin/coupons" className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:-translate-y-2 hover:shadow-2xl hover:border-amber-100 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-amber-600 group-hover:text-white transition-all duration-300 shadow-sm">
              <Tag size={26} strokeWidth={2.5} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">Coupons</h3>
            <p className="text-xs text-gray-500 font-medium">Discount codes</p>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
