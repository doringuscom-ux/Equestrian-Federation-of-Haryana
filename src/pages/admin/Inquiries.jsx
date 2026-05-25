import React, { useState, useEffect } from 'react';
import { Search, CheckCircle2, RotateCcw, Trash2, X, Clock, User, Mail, Paperclip, Eye, ExternalLink, Loader2 } from 'lucide-react';
import { API_BASE_URL } from '../../config/api';

const Inquiries = () => {
  const [activeTab, setActiveTab] = useState('ALL');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [showAttachment, setShowAttachment] = useState(false);

  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInquiries = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/contact`);
      if (!response.ok) throw new Error('Failed to fetch inquiries');
      const data = await response.json();
      setInquiries(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/contact/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        fetchInquiries();
        if (selectedInquiry && selectedInquiry._id === id) {
          setSelectedInquiry({ ...selectedInquiry, status: newStatus });
        }
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const deleteInquiry = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      const response = await fetch(`${API_BASE_URL}/contact/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchInquiries();
        if (selectedInquiry && selectedInquiry._id === id) setSelectedInquiry(null);
      }
    } catch (err) {
      console.error('Error deleting inquiry:', err);
    }
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-GB', options).replace(',', '');
  };

  const filteredInquiries = inquiries.filter(inquiry => {
    if (activeTab === 'ALL') return true;
    return inquiry.status.toLowerCase() === activeTab.toLowerCase();
  });

  const totalCount = inquiries.length;
  const newCount = inquiries.filter(i => i.status === 'new').length;
  const resolvedCount = inquiries.filter(i => i.status === 'resolved').length;

  return (
    <div className="max-w-[1400px] mx-auto animate-[fadeIn_0.4s_ease-out]">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
        <div>
          <h1 className="text-[32px] font-black text-[#1a2332] tracking-tight leading-tight uppercase font-['Inter']">Inquiry Manager</h1>
          <p className="text-[#64748b] text-[15px] mt-1 font-medium">Filter, search and manage contact submissions</p>
        </div>
        
        {/* Stats */}
        <div className="flex gap-4">
          <div className="bg-[#f0f7ff] border border-[#e0f0ff] rounded-xl px-5 py-3 min-w-[100px]">
            <p className="text-[#3b82f6] text-[10px] font-black uppercase tracking-widest mb-1">Total</p>
            <p className="text-[#2563eb] text-2xl font-black">{totalCount}</p>
          </div>
          <div className="bg-[#fff7ed] border border-[#ffedd5] rounded-xl px-5 py-3 min-w-[100px]">
            <p className="text-[#f97316] text-[10px] font-black uppercase tracking-widest mb-1">New</p>
            <p className="text-[#ea580c] text-2xl font-black">{newCount}</p>
          </div>
          <div className="bg-[#f0fdf4] border border-[#dcfce7] rounded-xl px-5 py-3 min-w-[100px]">
            <p className="text-[#22c55e] text-[10px] font-black uppercase tracking-widest mb-1">Resolved</p>
            <p className="text-[#16a34a] text-2xl font-black">{resolvedCount}</p>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 p-2 flex flex-col md:flex-row items-center gap-4 mb-10">
        <div className="relative flex-1 w-full">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={18} strokeWidth={2.5} />
          </div>
          <input 
            type="text" 
            placeholder="Search by name, email or subject..."
            className="w-full bg-[#f8fafc] border-none rounded-xl py-3.5 pl-12 pr-4 text-sm font-medium text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <div className="flex gap-1 bg-white pr-2">
          {['ALL', 'NEW', 'READ'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-lg text-xs font-black tracking-widest transition-all ${
                activeTab === tab 
                  ? 'text-[#3b82f6] border border-[#e0f0ff] shadow-sm' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-500 p-6 rounded-2xl border border-red-100 text-center font-bold">
          {error}
        </div>
      ) : filteredInquiries.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
          <p className="text-gray-400 font-bold tracking-widest uppercase">No inquiries found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInquiries.map((inquiry) => {
            const isNew = inquiry.status === 'new';
            return (
            <div key={inquiry._id} className={`${isNew ? 'bg-white border-gray-100 shadow-md' : 'bg-[#f4fbf7] border-[#e8f7ee] shadow-sm hover:shadow-md'} rounded-[24px] p-6 border flex flex-col h-full transition-shadow relative overflow-hidden group`}>
              
              {/* Status Icon & Date */}
              <div className="flex justify-between items-start mb-6">
                {isNew ? (
                  <div className="w-12 h-12 rounded-2xl bg-[#f8fafc] text-[#64748b] flex items-center justify-center border border-gray-50">
                    <User size={22} strokeWidth={2} />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#e3f5eb] text-[#22c55e] flex items-center justify-center">
                    <CheckCircle2 size={20} strokeWidth={2.5} />
                  </div>
                )}
                
                {isNew ? (
                  <div className="flex flex-col items-end gap-1.5">
                    <span className="text-[#64748b] text-[11px] font-bold tracking-widest uppercase">{formatDate(inquiry.createdAt)}</span>
                    <span className="bg-[#fff7ed] text-[#ea580c] px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">New</span>
                  </div>
                ) : (
                  <span className="text-[#94a3b8] text-[11px] font-bold tracking-widest uppercase">{formatDate(inquiry.createdAt)}</span>
                )}
              </div>

              {/* Info */}
              <div className="mb-4">
                <h3 className={`font-black text-lg uppercase tracking-tight mb-1 leading-tight ${isNew ? 'text-[#0f172a]' : 'text-[#0f766e]'}`}>{inquiry.subject}</h3>
                <p className="text-[#2563eb] text-sm font-black uppercase tracking-wider mb-0.5">{inquiry.name}</p>
                <p className="text-[#94a3b8] text-xs font-medium">{inquiry.email}</p>
              </div>

              {/* Message Box */}
              <div className={`rounded-2xl p-5 mb-6 flex-grow border ${isNew ? 'bg-[#f8fafc] border-gray-100' : 'bg-white border-[#f0fdf4]'}`}>
                <p className={`${isNew ? 'text-[#475569]' : 'text-[#34d399]'} text-[15px] font-medium leading-relaxed line-clamp-3`}>{inquiry.message}</p>
              </div>

              {/* Actions */}
              <div className={`flex items-center gap-3 mt-auto ${isNew ? 'pt-5 border-t border-gray-50' : ''}`}>
                <button 
                  onClick={() => {
                    setSelectedInquiry(inquiry);
                    setShowAttachment(false);
                    if (inquiry.status === 'new') updateStatus(inquiry._id, 'read');
                  }}
                  className={`flex-1 bg-white text-xs font-black uppercase tracking-widest py-3.5 rounded-xl border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] transition-colors ${isNew ? 'text-[#0f172a] hover:bg-gray-50' : 'text-[#1e293b] hover:bg-gray-50'}`}
                >
                  View
                </button>
                {isNew ? (
                  <button 
                    onClick={() => updateStatus(inquiry._id, 'resolved')}
                    className="w-12 h-12 bg-white text-[#64748b] hover:text-[#3b82f6] hover:bg-blue-50 rounded-2xl flex items-center justify-center border border-gray-100 transition-colors shrink-0 shadow-[0_2px_10px_rgb(0,0,0,0.02)]"
                    title="Mark as Resolved"
                  >
                    <CheckCircle2 size={18} strokeWidth={2} />
                  </button>
                ) : (
                  <button 
                    onClick={() => updateStatus(inquiry._id, 'new')}
                    className="w-12 h-12 bg-[#16a34a] hover:bg-[#15803d] text-white rounded-xl flex items-center justify-center shadow-[0_4px_15px_rgba(22,163,74,0.3)] transition-colors shrink-0"
                    title="Mark as New"
                  >
                    <RotateCcw size={18} strokeWidth={2.5} />
                  </button>
                )}
                <button 
                  onClick={() => deleteInquiry(inquiry._id)}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors shrink-0 border ${isNew ? 'text-[#ef4444] bg-white border-transparent hover:border-[#fecaca] hover:bg-red-50' : 'text-[#ef4444] hover:bg-[#fef2f2] border-transparent hover:border-[#fecaca]'}`}
                >
                  <Trash2 size={18} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          )})}
        </div>
      )}

      {/* Inquiry View Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-3xl rounded-[32px] p-8 md:p-10 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            {/* Top Bar Tags & Close */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex gap-3">
                <span className="bg-[#e3f5eb] text-[#16a34a] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                  {selectedInquiry.status}
                </span>
                <span className="bg-[#f1f5f9] text-[#64748b] px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest flex items-center gap-1.5 uppercase">
                  <Clock size={12} strokeWidth={2.5} />
                  {formatDate(selectedInquiry.createdAt)}
                </span>
              </div>
              <button 
                onClick={() => {
                  setSelectedInquiry(null);
                  setShowAttachment(false);
                }} 
                className="w-10 h-10 bg-gray-50 hover:bg-gray-100 rounded-full flex items-center justify-center text-gray-400 transition-colors shrink-0"
              >
                <X size={18} strokeWidth={2.5} />
              </button>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-[34px] font-black text-[#0f172a] uppercase tracking-tight mb-6 leading-none font-['Inter']">
              {selectedInquiry.subject}
            </h2>

            <hr className="border-gray-100 mb-6" />

            {/* Sender / Email Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-[#fafafa] border border-gray-100 rounded-3xl p-5 flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-[#3b82f6] shrink-0 border border-gray-50">
                  <User size={20} strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Sender</p>
                  <p className="text-[15px] font-bold text-[#0f172a] capitalize">{selectedInquiry.name.toLowerCase()}</p>
                </div>
              </div>
              <div className="bg-[#fafafa] border border-gray-100 rounded-3xl p-5 flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-[#3b82f6] shrink-0 border border-gray-50">
                  <Mail size={20} strokeWidth={2.5} />
                </div>
                <div className="truncate">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Email Address</p>
                  <p className="text-[15px] font-bold text-[#3b82f6] truncate">{selectedInquiry.email}</p>
                </div>
              </div>
            </div>

            {/* Message Block */}
            <div className="bg-[#111827] rounded-[28px] p-8 mb-6 shadow-lg shadow-slate-900/10">
              <div className="flex items-center gap-2 text-gray-400 mb-5">
                <Mail size={14} strokeWidth={2.5} />
                <span className="text-[10px] font-black uppercase tracking-widest">Message Content</span>
              </div>
              <p className="text-white text-lg font-medium leading-relaxed font-['Inter']">
                {selectedInquiry.message}
              </p>
            </div>

            {/* Attached Document */}
            {selectedInquiry.image && (
              <div className="bg-[#f8fafc] border border-gray-100 rounded-[28px] p-6 mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[#e0f2fe] text-[#3b82f6] rounded-2xl flex items-center justify-center shrink-0">
                    <Paperclip size={22} strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-[#3b82f6] uppercase tracking-widest mb-1">Attached Document</p>
                    <p className="text-sm font-bold text-[#0f172a]">User securely attached an image</p>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <button 
                    onClick={() => setShowAttachment(!showAttachment)}
                    className="w-full flex items-center justify-center gap-2 bg-[#0f172a] hover:bg-[#1e293b] text-white font-black text-[11px] uppercase tracking-widest py-4 rounded-2xl transition-all shadow-lg shadow-slate-900/20"
                  >
                    <Eye size={16} strokeWidth={2.5} />
                    {showAttachment ? 'Hide Image Attachment' : 'View Image Attachment'}
                  </button>
                  
                  {showAttachment && (
                    <div className="w-full rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-inner flex items-center justify-center p-2">
                      <img 
                        src={selectedInquiry.image} 
                        alt="Attachment" 
                        className="max-w-full max-h-[400px] object-contain rounded-xl"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {!selectedInquiry.image && <hr className="border-gray-100 mb-6" />}

            {/* Mark as Unread Button */}
            <button 
              onClick={() => updateStatus(selectedInquiry._id, selectedInquiry.status === 'new' ? 'read' : 'new')}
              className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-[0_4px_20px_rgba(22,163,74,0.3)]"
            >
              <RotateCcw size={16} strokeWidth={3} />
              {selectedInquiry.status === 'new' ? 'Mark As Read' : 'Mark As Unread'}
            </button>

          </div>
        </div>
      )}

    </div>
  );
};

export default Inquiries;
