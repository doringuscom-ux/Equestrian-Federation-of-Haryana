import React, { useState, useEffect } from 'react';
import { PlusCircle, Ticket, Percent, Search, MoreVertical, Trash2, Loader2 } from 'lucide-react';
import { API_BASE_URL } from '../../config/api';

const Coupons = () => {
  const [formData, setFormData] = useState({
    code: '',
    discountType: 'fixed',
    discountValue: '',
    expiryDate: '',
    restrictedEmail: ''
  });

  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const fetchCoupons = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/coupons`);
      if (!response.ok) throw new Error('Failed to fetch coupons');
      const data = await response.json();
      setCoupons(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    try {
      const response = await fetch(`${API_BASE_URL}/coupons`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create coupon');
      }

      setSuccessMsg('Coupon created successfully!');
      setFormData({
        code: '',
        discountType: 'fixed',
        discountValue: '',
        expiryDate: '',
        restrictedEmail: ''
      });
      fetchCoupons();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this coupon?')) return;
    try {
      const response = await fetch(`${API_BASE_URL}/coupons/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchCoupons();
      }
    } catch (err) {
      console.error('Error deleting coupon:', err);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto animate-[fadeIn_0.4s_ease-out]">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[28px] font-black text-[#0f172a] tracking-tight leading-tight mb-2 font-['Inter']">Manage Coupons</h1>
        <p className="text-[#64748b] text-[15px] font-medium">Create and manage discount codes for event registrations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100">
            
            <div className="flex items-center gap-2 mb-6">
              <PlusCircle size={20} className="text-[#3b82f6]" strokeWidth={2.5} />
              <h2 className="text-lg font-bold text-[#0f172a]">New Coupon</h2>
            </div>

            {error && <div className="mb-4 text-sm text-red-500 bg-red-50 p-3 rounded-lg border border-red-100">{error}</div>}
            {successMsg && <div className="mb-4 text-sm text-green-500 bg-green-50 p-3 rounded-lg border border-green-100">{successMsg}</div>}

            <form onSubmit={handleCreate} className="space-y-5">
              
              {/* Coupon Code */}
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Coupon Code</label>
                <input 
                  type="text" 
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  placeholder="EX: EFH50"
                  className="w-full bg-[#f8fafc] border border-gray-100 rounded-xl px-4 py-3 text-sm text-[#0f172a] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/20 transition-all font-medium"
                />
              </div>

              {/* Discount Type */}
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Discount Type</label>
                <div className="flex bg-[#f8fafc] p-1 rounded-xl border border-gray-100">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, discountType: 'fixed' })}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${
                      formData.discountType === 'fixed' 
                        ? 'bg-white text-[#3b82f6] shadow-sm' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full border-2 border-current flex items-center justify-center text-[10px]">₹</span>
                    Fixed
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, discountType: 'percentage' })}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${
                      formData.discountType === 'percentage' 
                        ? 'bg-white text-[#3b82f6] shadow-sm' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Percent size={14} strokeWidth={3} />
                    Percentage
                  </button>
                </div>
              </div>

              {/* Discount Value */}
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">
                  Discount Value ({formData.discountType === 'fixed' ? '₹' : '%'})
                </label>
                <input 
                  type="number" 
                  name="discountValue"
                  value={formData.discountValue}
                  onChange={handleChange}
                  placeholder="Ex: 100"
                  className="w-full bg-[#f8fafc] border border-gray-100 rounded-xl px-4 py-3 text-sm text-[#0f172a] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/20 transition-all font-medium"
                />
              </div>

              {/* Expiry Date */}
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Expiry Date</label>
                <input 
                  type="date" 
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  className="w-full bg-[#f8fafc] border border-gray-100 rounded-xl px-4 py-3 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/20 transition-all font-medium"
                />
              </div>

              {/* Restricted Email */}
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Restricted Email (Optional)</label>
                <input 
                  type="email" 
                  name="restrictedEmail"
                  value={formData.restrictedEmail}
                  onChange={handleChange}
                  placeholder="Ex: user@example.com"
                  className="w-full bg-[#f8fafc] border border-gray-100 rounded-xl px-4 py-3 text-sm text-[#0f172a] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/20 transition-all font-medium"
                />
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-sm py-3.5 rounded-xl transition-all shadow-sm mt-2"
              >
                Create Coupon
              </button>

            </form>
          </div>
        </div>

        {/* Right Column - Active Coupons */}
        <div className="lg:col-span-2">
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-[#3b82f6] rounded-full"></div>
              <h2 className="text-[20px] font-bold text-[#0f172a]">Active Coupons</h2>
            </div>
            <span className="border border-gray-200 text-gray-400 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase">
              {coupons.length} Total
            </span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
            </div>
          ) : coupons.length === 0 ? (
            /* Empty State */
            <div className="bg-[#f8fafc] border-2 border-dashed border-gray-200 rounded-[24px] flex flex-col items-center justify-center p-16 h-[450px]">
              <Ticket size={48} className="text-gray-300 mb-4" strokeWidth={1.5} />
              <h3 className="text-lg font-bold text-[#0f172a] mb-1">No coupons yet</h3>
              <p className="text-[#64748b] text-sm">Created codes will appear here.</p>
            </div>
          ) : (
            /* Coupons List */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {coupons.map((coupon) => {
                const isExpired = new Date(coupon.expiryDate) < new Date(new Date().setHours(0, 0, 0, 0));
                
                return (
                <div key={coupon._id} className={`${isExpired ? 'bg-[#fef2f2] border-red-100' : 'bg-white border-gray-100'} rounded-[20px] p-6 shadow-sm border flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow`}>
                  <div className={`absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 ${isExpired ? 'bg-white border-red-100' : 'bg-[#f8fafc] border-gray-100'} rounded-full border z-10`}></div>
                  <div className={`absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 ${isExpired ? 'bg-white border-red-100' : 'bg-[#f8fafc] border-gray-100'} rounded-full border z-10`}></div>
                  
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className={`text-[10px] font-black uppercase tracking-widest ${isExpired ? 'text-red-400' : 'text-[#64748b]'}`}>Coupon Code</p>
                        {isExpired && <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest">Expired</span>}
                      </div>
                      <h3 className={`text-xl font-black uppercase tracking-wider ${isExpired ? 'text-red-900 line-through opacity-70' : 'text-[#0f172a]'}`}>{coupon.code}</h3>
                    </div>
                    <div className={`${isExpired ? 'bg-white text-red-400 border-red-100 opacity-70' : 'bg-[#eff6ff] text-[#3b82f6] border-[#dbeafe]'} px-3 py-1.5 rounded-xl font-bold text-sm border`}>
                      {coupon.discountType === 'fixed' ? '₹' : ''}{coupon.discountValue}{coupon.discountType === 'percentage' ? '%' : ''} OFF
                    </div>
                  </div>
                  
                  <div className={`border-t border-dashed pt-4 mt-auto ${isExpired ? 'border-red-200' : 'border-gray-200'}`}>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className={`text-[10px] font-black uppercase tracking-widest mb-0.5 ${isExpired ? 'text-red-400' : 'text-gray-400'}`}>Valid Until</p>
                        <p className={`text-sm font-bold ${isExpired ? 'text-red-500' : 'text-[#64748b]'}`}>{new Date(coupon.expiryDate).toLocaleDateString()}</p>
                      </div>
                      <button 
                        onClick={() => handleDelete(coupon._id)}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors border ${isExpired ? 'bg-white hover:bg-red-50 text-red-500 border-red-100' : 'bg-red-50 hover:bg-red-100 text-red-500 border-red-100'}`}
                      >
                        <Trash2 size={16} strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>
                </div>
              )})}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default Coupons;
