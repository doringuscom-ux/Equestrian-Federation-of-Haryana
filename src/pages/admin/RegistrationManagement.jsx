import React, { useState, useEffect } from 'react';
import { 
  RiMoneyDollarCircleLine, 
  RiSaveLine, 
  RiQrCodeLine, 
  RiAddLine,
  RiDeleteBinLine,
  RiInformationLine,
  RiCheckLine,
  RiFileList3Line
} from 'react-icons/ri';
import { API_BASE_URL } from '../../config/api';

const RegistrationManagement = () => {
  const [fees, setFees] = useState({ player: '', coach: '' });
  const [offlineCodes, setOfflineCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingFees, setSavingFees] = useState(false);
  const [generatingCode, setGeneratingCode] = useState(false);
  
  const [newCodeData, setNewCodeData] = useState({ email: '', role: 'player' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/settings/registration`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.fees) {
        setFees({
          player: data.fees.player || '',
          coach: data.fees.coach || ''
        });
      }
      if (data.offlineCodes) {
        setOfflineCodes(data.offlineCodes);
      }
    } catch (error) {
      console.error('Error fetching registration settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFeeChange = (e) => {
    setFees({ ...fees, [e.target.name]: e.target.value });
  };

  const handleSaveFees = async () => {
    setSavingFees(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_BASE_URL}/settings/fees`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          player: Number(fees.player),
          coach: Number(fees.coach)
        })
      });
      if (res.ok) alert('Fees updated successfully!');
      else alert('Failed to update fees.');
    } catch (error) {
      console.error('Error updating fees:', error);
      alert('Failed to update fees.');
    } finally {
      setSavingFees(false);
    }
  };

  const handleGenerateCode = async (e) => {
    e.preventDefault();
    if (!newCodeData.email) return alert('Please enter an email address');
    
    setGeneratingCode(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_BASE_URL}/settings/offline-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newCodeData)
      });
      const data = await res.json();
      if (res.ok) {
        setOfflineCodes([data.offlineCode, ...offlineCodes]);
        setNewCodeData({ email: '', role: 'player' });
      } else {
        alert(data.message || 'Failed to generate code.');
      }
    } finally {
      setGeneratingCode(false);
    }
  };

  const handleDeleteCode = async (id) => {
    if (!window.confirm('Are you sure you want to delete this code?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_BASE_URL}/settings/offline-code/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setOfflineCodes(offlineCodes.filter(c => c._id !== id));
      }
    } catch (error) {
      console.error('Error deleting code:', error);
      alert('Failed to delete code.');
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500 font-bold tracking-widest uppercase text-sm">Loading...</div>;
  }

  return (
    <div className="p-6 md:p-10 bg-slate-50/50 min-h-full font-['Inter']">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-8 mb-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex items-center gap-6">
        <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
          <RiMoneyDollarCircleLine size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Registration Management</h1>
          <p className="text-slate-500 font-medium">Configure registration fees and manage offline payment codes.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: Set Fees */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <RiFileList3Line size={18} />
              </div>
              <h2 className="text-[13px] font-black uppercase tracking-[0.2em] text-slate-900">Set Fees</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Player Fee (₹)</label>
                <input 
                  type="number" 
                  name="player"
                  value={fees.player}
                  onChange={handleFeeChange}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                />
              </div>
              
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Coach Fee (₹)</label>
                <input 
                  type="number" 
                  name="coach"
                  value={fees.coach}
                  onChange={handleFeeChange}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                />
              </div>

              <button 
                onClick={handleSaveFees}
                disabled={savingFees}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl py-4 font-black text-[11px] uppercase tracking-widest shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
              >
                {savingFees ? 'Saving...' : 'Save All Fees'}
              </button>
            </div>
          </div>

          {/* Note on Fees */}
          <div className="bg-emerald-50/80 rounded-3xl p-6 border border-emerald-100 flex gap-4">
            <RiInformationLine className="text-emerald-600 shrink-0 mt-0.5" size={20} />
            <div>
              <h3 className="text-[11px] font-black text-emerald-800 uppercase tracking-widest mb-2">Note on Fees</h3>
              <p className="text-emerald-700 text-[13px] font-medium leading-relaxed">
                If a fee is set to ₹0, users for that role will be registered immediately without payment verification.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          
          {/* Generate Code Card */}
          <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <RiQrCodeLine size={18} />
              </div>
              <h2 className="text-[13px] font-black uppercase tracking-[0.2em] text-slate-900">Generate Offline Code</h2>
            </div>

            <form onSubmit={handleGenerateCode} className="flex flex-col sm:flex-row items-end gap-4">
              <div className="flex-1 w-full">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">User Email</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">@</span>
                  <input 
                    type="email" 
                    value={newCodeData.email}
                    onChange={(e) => setNewCodeData({...newCodeData, email: e.target.value})}
                    placeholder="user@example.com"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-10 pr-5 py-4 text-sm font-medium text-slate-900 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all"
                  />
                </div>
              </div>
              
              <div className="w-full sm:w-48">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">User Role</label>
                <select 
                  value={newCodeData.role}
                  onChange={(e) => setNewCodeData({...newCodeData, role: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-slate-900 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all appearance-none cursor-pointer"
                >
                  <option value="player">Player</option>
                  <option value="coach">Coach</option>
                </select>
              </div>

              <button 
                type="submit"
                disabled={generatingCode}
                className="w-full sm:w-auto bg-[#9333ea] hover:bg-[#7e22ce] text-white rounded-2xl px-8 py-4 font-black text-[11px] uppercase tracking-widest shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2"
              >
                {generatingCode ? '...' : <><RiAddLine size={16} /> Generate Code</>}
              </button>
            </form>
          </div>

          {/* Active Codes Table */}
          <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex-1">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-purple-600 rounded-full"></div>
                  <h2 className="text-[16px] font-black text-slate-900 tracking-tight">Registration Codes</h2>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-purple-50 border border-purple-100 rounded-full text-[10px] font-black text-purple-600 tracking-widest uppercase">
                    {offlineCodes.filter(c => c.status === 'Active').length} Active
                  </span>
                  <span className="px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full text-[10px] font-black text-emerald-600 tracking-widest uppercase">
                    {offlineCodes.filter(c => c.status === 'Used').length} Used
                  </span>
                </div>
              </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100">
                      <th className="text-left py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Code</th>
                      <th className="text-left py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Assigned To</th>
                      <th className="text-left py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Role</th>
                      <th className="text-left py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                      <th className="text-left py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Used By / Date</th>
                      <th className="text-right py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
                    </tr>
                </thead>
                <tbody>
                  {offlineCodes.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="py-12 text-center text-slate-400 font-medium text-sm">
                        No offline codes generated yet.
                      </td>
                    </tr>
                  ) : (
                    offlineCodes.map(code => (
                      <tr key={code._id} className={`border-b border-slate-50 transition-colors ${code.status === 'Used' ? 'bg-emerald-50/30' : 'hover:bg-slate-50/50'}`}>
                          <td className="py-4">
                            <span className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-widest uppercase font-mono ${code.status === 'Used' ? 'bg-emerald-100 text-emerald-700 line-through opacity-60' : 'bg-purple-50 text-purple-700'}`}>
                              {code.code}
                            </span>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                              <span className="text-slate-400">@</span>
                              {code.assignedEmail}
                            </div>
                          </td>
                          <td className="py-4">
                            <span className="text-xs font-black text-slate-500 uppercase tracking-widest">
                              {code.role}
                            </span>
                          </td>
                          <td className="py-4">
                            {code.status === 'Used' ? (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black tracking-widest uppercase border border-emerald-100">
                                <RiCheckLine size={12} /> Used
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-600 rounded-full text-[10px] font-black tracking-widest uppercase border border-purple-100">
                                Active
                              </span>
                            )}
                          </td>
                          <td className="py-4">
                            {code.status === 'Used' ? (
                              <div>
                                <p className="text-xs font-bold text-emerald-700">{code.usedBy || code.assignedEmail}</p>
                                <p className="text-[10px] text-slate-400 mt-0.5">{code.usedAt ? new Date(code.usedAt).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—'}</p>
                              </div>
                            ) : (
                              <span className="text-[10px] text-slate-300 font-bold">Not used yet</span>
                            )}
                          </td>
                          <td className="py-4 text-right">
                            <button 
                              onClick={() => handleDeleteCode(code._id)}
                              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                              title="Delete Code"
                            >
                              <RiDeleteBinLine size={18} />
                            </button>
                          </td>
                        </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RegistrationManagement;
