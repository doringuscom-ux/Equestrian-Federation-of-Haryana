import React from 'react';
import { Image as ImageIcon, CalendarDays, User, ArrowUpRight } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="max-w-6xl mx-auto animate-[fadeIn_0.4s_ease-out]">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 font-['Inter'] tracking-tight">Overview</h1>
        <p className="text-gray-500 text-sm">Welcome back to the administrative control panel.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Stat Card 1 */}
        <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
          <div className="flex justify-between items-start mb-10">
            <div className="w-12 h-12 rounded-xl bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
              <ImageIcon size={22} />
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
              <ArrowUpRight size={16} />
            </div>
          </div>
          <div>
            <p className="text-gray-500 text-xs font-medium mb-1">Gallery Items</p>
            <h3 className="text-3xl font-bold text-gray-900">12</h3>
          </div>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
          <div className="flex justify-between items-start mb-10">
            <div className="w-12 h-12 rounded-xl bg-indigo-500 text-white flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <CalendarDays size={22} />
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
              <ArrowUpRight size={16} />
            </div>
          </div>
          <div>
            <p className="text-gray-500 text-xs font-medium mb-1">Total Events</p>
            <h3 className="text-3xl font-bold text-gray-900">3</h3>
          </div>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
          <div className="flex justify-between items-start mb-10">
            <div className="w-12 h-12 rounded-xl bg-purple-500 text-white flex items-center justify-center shadow-lg shadow-purple-500/30">
              <User size={22} />
            </div>
          </div>
          <div>
            <p className="text-gray-500 text-xs font-medium mb-1">Account Role</p>
            <h3 className="text-2xl font-bold text-gray-900">Administrator</h3>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-5 bg-blue-600 rounded-full"></div>
          <h2 className="text-lg font-bold text-gray-900 tracking-tight">Quick Actions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Action 1 */}
          <div className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:border-blue-100 hover:bg-blue-50/50 cursor-pointer transition-all group">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
              <ImageIcon size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-0.5">Upload to Gallery</h4>
              <p className="text-[10px] text-gray-500">Add new photos to the project gallery</p>
            </div>
          </div>

          {/* Action 2 */}
          <div className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/50 cursor-pointer transition-all group">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
              <CalendarDays size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-0.5">Manage Events</h4>
              <p className="text-[10px] text-gray-500">Post upcoming tournaments or trials</p>
            </div>
          </div>

          {/* Action 3 */}
          <div className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:border-emerald-100 hover:bg-emerald-50/50 cursor-pointer transition-all group">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path><path d="M13 5v2"></path><path d="M13 17v2"></path><path d="M13 11v2"></path></svg>
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-0.5">Manage Coupons</h4>
              <p className="text-[10px] text-gray-500">Create discount codes for events</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
