import React, { useState, useEffect } from 'react';
import { 
  RiCalendarEventLine, RiMapPinLine, RiTimeLine, RiTeamLine, 
  RiEditLine, RiDeleteBinLine, RiAddLine, RiCloseLine, RiLoader4Line,
  RiCheckDoubleLine, RiShareBoxLine, RiExternalLinkLine,
  RiAddCircleLine, RiCalendarLine, RiGroupLine, RiCloseCircleLine,
  RiSearchLine, RiDownload2Line, RiImageAddLine, RiLinkM, RiInformationLine
} from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config/api';
import EventUserProfileModal from '../../components/admin/EventUserProfileModal';

const AdminEvents = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    deadline: '',
    location: '',
    duration: '',
    mapUrl: '',
    image: '',
    visibilityStatus: 'Published',
    status: 'Registrations Open',
    pricing: {
      athlete: 0,
      coach: 0
    }
  });
  
  const [editingId, setEditingId] = useState(null);
  
  const [showParticipantsModal, setShowParticipantsModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [participantsLoading, setParticipantsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [statusFilter, setStatusFilter] = useState('All Status');
  
  // Profile View state
  const [selectedProfileId, setSelectedProfileId] = useState(null);
  
  // Cancellation Reason View state
  const [selectedReason, setSelectedReason] = useState(null);
  
  // Admin Cancelling state
  const [cancellingRegId, setCancellingRegId] = useState(null);
  const [adminCancelReason, setAdminCancelReason] = useState('');
  
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/events`);
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('pricing.')) {
      const key = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        pricing: { ...prev.pricing, [key]: Number(value) }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    
    try {
      const url = editingId ? `${API_BASE_URL}/events/${editingId}` : `${API_BASE_URL}/events`;
      const method = editingId ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setShowForm(false);
        setEditingId(null);
        fetchEvents();
        // Reset form
        setFormData({
          title: '', description: '', date: '', deadline: '', location: '', duration: '', mapUrl: '', image: '',
          visibilityStatus: 'Published', status: 'Registrations Open', pricing: { athlete: 0, coach: 0 }
        });
      } else {
        alert('Error saving event');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving event');
    }
  };

  const handleEdit = (event) => {
    setFormData({
      title: event.title || '',
      description: event.description || '',
      date: event.date || '',
      deadline: event.deadline || '',
      location: event.location || '',
      duration: event.duration || '',
      mapUrl: event.mapUrl || '',
      image: event.image || '',
      visibilityStatus: event.visibilityStatus || 'Published',
      status: event.status || 'Registrations Open',
      pricing: {
        athlete: event.pricing?.athlete || 0,
        coach: event.pricing?.coach || 0
      }
    });
    setEditingId(event._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await fetch(`${API_BASE_URL}/events/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchEvents();
    } catch (err) {
      console.error(err);
    }
  };
  
  const handleToggleStatus = async (event) => {
    try {
      const token = localStorage.getItem('adminToken');
      const newStatus = event.status === 'Registrations Open' ? 'Closed' : 'Registrations Open';
      await fetch(`${API_BASE_URL}/events/${event._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      fetchEvents();
    } catch (err) {
      console.error(err);
    }
  };

  const openParticipants = async (event) => {
    setSelectedEvent(event);
    setShowParticipantsModal(true);
    setParticipantsLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_BASE_URL}/events/${event._id}/participants`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setParticipants(data);
    } catch (err) {
      console.error(err);
    } finally {
      setParticipantsLoading(false);
    }
  };

  const handleCancelRegistration = async () => {
    if (!adminCancelReason.trim()) {
      alert('Please provide a reason for cancellation');
      return;
    }
    
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_BASE_URL}/events/registration/${cancellingRegId}/cancel`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reason: adminCancelReason })
      });
      if (res.ok) {
        // Refresh the participants list
        setCancellingRegId(null);
        setAdminCancelReason('');
        openParticipants(selectedEvent);
      } else {
        alert('Failed to cancel registration');
      }
    } catch (err) {
      console.error(err);
      alert('Error cancelling registration');
    }
  };

  const filteredParticipants = participants.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.email.toLowerCase().includes(searchQuery.toLowerCase());
                          
    const matchesRole = roleFilter === 'All Roles' || p.role.toLowerCase() === roleFilter.toLowerCase();
    
    let matchesStatus = true;
    if (statusFilter !== 'All Status') {
      matchesStatus = p.status.toLowerCase() === statusFilter.toLowerCase();
    }
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="p-8 font-['Inter']">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Events Management</h1>
        {!showForm && (
          <button 
            onClick={() => { setEditingId(null); setShowForm(true); }}
            className="flex items-center gap-2 bg-[#00a859] hover:bg-[#008f4c] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-green-500/20"
          >
            <RiAddCircleLine size={20} />
            Create New Event
          </button>
        )}
      </div>

      {showForm ? (
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mb-8 animate-in fade-in slide-in-from-top-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <RiAddCircleLine className="text-blue-500" />
              {editingId ? 'Edit Event' : 'Create New Event'}
            </h2>
            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-red-500">
              <RiCloseCircleLine size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">Event Title</label>
                  <input 
                    type="text" name="title" value={formData.title} onChange={handleInputChange} required
                    placeholder="Ex: District Under-19 Trials"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">Description</label>
                  <textarea 
                    name="description" value={formData.description} onChange={handleInputChange} rows="4"
                    placeholder="Details about the event, criteria, and highlights..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all resize-none"
                  ></textarea>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">Event Date</label>
                    <input 
                      type="text" name="date" value={formData.date} onChange={handleInputChange} placeholder="dd/mm/yyyy"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">Registration Deadline</label>
                    <input 
                      type="datetime-local" name="deadline" value={formData.deadline} onChange={handleInputChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">Location</label>
                    <input 
                      type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder="Ex: City Sports Club"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">Duration</label>
                    <input 
                      type="text" name="duration" value={formData.duration} onChange={handleInputChange} placeholder="Ex: 3 Days or Whole Day"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">Map Embed URL (iframe src)</label>
                  <input 
                    type="text" name="mapUrl" value={formData.mapUrl} onChange={handleInputChange} placeholder="Ex: https://www.google.com/maps/embed?pb=..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">Visibility Status</label>
                  <div className="flex gap-4 p-1 bg-gray-100 rounded-xl">
                    <label className={`flex-1 flex justify-center items-center gap-2 py-2 rounded-lg cursor-pointer font-bold text-sm transition-all ${formData.visibilityStatus === 'Published' ? 'bg-white shadow-sm text-emerald-600' : 'text-gray-500'}`}>
                      <input type="radio" name="visibilityStatus" value="Published" checked={formData.visibilityStatus === 'Published'} onChange={handleInputChange} className="hidden" />
                      <RiCheckDoubleLine /> Published
                    </label>
                    <label className={`flex-1 flex justify-center items-center gap-2 py-2 rounded-lg cursor-pointer font-bold text-sm transition-all ${formData.visibilityStatus === 'Draft' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}>
                      <input type="radio" name="visibilityStatus" value="Draft" checked={formData.visibilityStatus === 'Draft'} onChange={handleInputChange} className="hidden" />
                      <RiEditLine /> Draft
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">Registration Status</label>
                  <div className="flex gap-4 p-1 bg-gray-100 rounded-xl">
                    <label className={`flex-1 flex justify-center items-center gap-2 py-2 rounded-lg cursor-pointer font-bold text-sm transition-all ${formData.status === 'Registrations Open' ? 'bg-white shadow-sm text-emerald-600' : 'text-gray-500'}`}>
                      <input type="radio" name="status" value="Registrations Open" checked={formData.status === 'Registrations Open'} onChange={handleInputChange} className="hidden" />
                      <RiCheckDoubleLine /> Open
                    </label>
                    <label className={`flex-1 flex justify-center items-center gap-2 py-2 rounded-lg cursor-pointer font-bold text-sm transition-all ${formData.status !== 'Registrations Open' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}>
                      <input type="radio" name="status" value="Closed" checked={formData.status !== 'Registrations Open'} onChange={handleInputChange} className="hidden" />
                      <RiCloseCircleLine /> Closed
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">Banner Image</label>
                  <div className="flex gap-2 mb-2">
                    <button type="button" className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold border border-blue-100"><RiLinkM /> Direct Link</button>
                    <button type="button" className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 rounded-lg text-xs font-bold hover:bg-gray-100"><RiImageAddLine /> Upload Image</button>
                  </div>
                  <input 
                    type="text" name="image" value={formData.image} onChange={handleInputChange} placeholder="https://images.unsplash.com/..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">Event Pricing (₹)</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] font-black uppercase text-gray-500 mb-1 block">Athlete</span>
                      <input 
                        type="number" name="pricing.athlete" value={formData.pricing.athlete} onChange={handleInputChange}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-all font-bold"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase text-gray-500 mb-1 block">Coach</span>
                      <input 
                        type="number" name="pricing.coach" value={formData.pricing.coach} onChange={handleInputChange}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-all font-bold"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button type="submit" className="w-full bg-[#00a859] hover:bg-[#008f4c] text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-green-500/20 transition-all">
                    {editingId ? 'Update Event' : 'Publish Event'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className="space-y-6">
          {events.map((event) => (
            <div key={event._id} className="bg-white rounded-3xl p-4 border border-gray-100 shadow-sm flex flex-col md:flex-row gap-6 hover:shadow-md transition-all">
              {/* Image Section */}
              <div className="w-full md:w-72 h-48 rounded-2xl overflow-hidden relative shrink-0">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                   <RiCheckDoubleLine /> {event.visibilityStatus || 'PUBLISHED'}
                </div>
              </div>

              {/* Content Section */}
              <div className="flex-1 flex flex-col justify-between py-2">
                <div>
                  <h3 className="text-xl font-bold text-blue-600 mb-4">{event.title}</h3>
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="flex items-center gap-2 bg-gray-50 text-gray-600 text-xs font-bold px-4 py-2 rounded-lg border border-gray-200">
                      <RiCalendarLine className="text-blue-500" /> {event.date}
                    </span>
                    <span className="flex items-center gap-2 bg-red-50 text-red-600 text-xs font-bold px-4 py-2 rounded-lg border border-red-100">
                      <RiCalendarLine /> DEADLINE: {event.deadline || event.date}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <span className="flex items-center gap-2 bg-gray-50 text-gray-500 text-xs font-bold px-4 py-2 rounded-lg border border-gray-200">
                      <RiMapPinLine className="text-blue-500" /> {event.location}
                    </span>
                    <span className={`flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-lg border ${event.status === 'Registrations Open' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                      <div className={`w-2 h-2 rounded-full ${event.status === 'Registrations Open' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      REG: {event.status === 'Registrations Open' ? 'OPEN' : 'CLOSED'}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3 items-center border-t border-gray-100 pt-4">
                  <button 
                    onClick={() => openParticipants(event)}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold text-sm px-6 py-2.5 rounded-xl transition-all"
                  >
                    <RiGroupLine /> Participants
                  </button>
                  <button 
                    onClick={() => handleToggleStatus(event)}
                    className={`flex-1 md:flex-none flex items-center justify-center gap-2 font-bold text-sm px-6 py-2.5 rounded-xl transition-all ${event.status === 'Registrations Open' ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'}`}
                  >
                    {event.status === 'Registrations Open' ? 'Close Reg.' : 'Open Reg.'}
                  </button>
                  <div className="flex-1 md:flex-none flex gap-2 ml-auto">
                    <button 
                      onClick={() => handleEdit(event)}
                      className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-all w-full justify-center"
                    >
                      <RiEditLine /> Edit Event
                    </button>
                    <button 
                      onClick={() => handleDelete(event._id)}
                      className="bg-red-50 hover:bg-red-100 text-red-500 p-2.5 rounded-xl transition-all"
                    >
                      <RiDeleteBinLine size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Participants Modal */}
      {showParticipantsModal && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[2rem] w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="p-8 border-b border-gray-100 flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3 text-2xl font-black text-gray-900 mb-2">
                  <RiGroupLine className="text-blue-500" />
                  <h2>Participants: <span className="text-blue-600">{selectedEvent.title}</span></h2>
                </div>
                <p className="text-gray-500 text-sm font-medium">Reviewing {participants.length} registered members</p>
              </div>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 bg-[#00a859] hover:bg-[#008f4c] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-green-500/20 transition-all">
                  <RiDownload2Line /> Export
                </button>
                <button onClick={() => setShowParticipantsModal(false)} className="text-gray-400 hover:text-gray-900 bg-gray-100 p-2 rounded-full transition-all">
                  <RiCloseCircleLine size={24} />
                </button>
              </div>
            </div>

            {/* Toolbar */}
            <div className="p-8 bg-gray-50 border-b border-gray-100">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <RiSearchLine className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" placeholder="Search by name or email..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-2xl pl-12 pr-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
                  />
                </div>
                <select 
                  value={roleFilter} 
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="bg-white border border-gray-200 rounded-2xl px-6 py-3 outline-none font-bold text-gray-700"
                >
                  <option>All Roles</option>
                  <option>Athlete</option>
                  <option>Coach</option>
                </select>
                <select 
                  value={statusFilter} 
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-white border border-gray-200 rounded-2xl px-6 py-3 outline-none font-bold text-gray-700"
                >
                  <option>All Status</option>
                  <option>Confirmed</option>
                  <option>Pending</option>
                  <option>Cancelled</option>
                </select>
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-8">
              {participantsLoading ? (
                <div className="flex flex-col items-center justify-center h-40 text-blue-500">
                  <RiLoader4Line className="animate-spin mb-4" size={32} />
                  <p className="font-bold text-gray-400">Fetching Participant List...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Table Header */}
                  <div className="grid grid-cols-12 gap-4 px-6 mb-2">
                    <div className="col-span-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">Profile</div>
                    <div className="col-span-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">Registration Info</div>
                    <div className="col-span-2 text-[10px] font-black uppercase text-gray-400 tracking-widest text-center">Payment</div>
                    <div className="col-span-2 text-[10px] font-black uppercase text-gray-400 tracking-widest text-center">Status</div>
                  </div>
                  
                  {filteredParticipants.length === 0 ? (
                    <div className="text-center py-12 text-gray-400 font-bold">No participants found</div>
                  ) : (
                    filteredParticipants.map((p, idx) => (
                      <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col md:grid md:grid-cols-12 gap-4 items-center hover:shadow-md transition-shadow">
                        <div className="col-span-4 flex items-center gap-4 w-full">
                          <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden shrink-0">
                            {p.image ? <img src={p.image} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-500 font-bold">{p.name.charAt(0)}</div>}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 leading-tight">{p.name}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[9px] font-black uppercase tracking-widest text-blue-500 bg-blue-50 px-2 py-0.5 rounded">{p.role}</span>
                              <button 
                                onClick={() => setSelectedProfileId(p._id)}
                                className="text-[9px] font-bold text-gray-500 hover:text-[#cba358] flex items-center gap-1 transition-colors"
                              >
                                View Profile <RiExternalLinkLine />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-4 w-full text-sm">
                          <p className="text-gray-600 font-medium flex items-center gap-2">
                            <span className="text-gray-400 text-xs">✉</span> {p.email}
                          </p>
                          <p className="text-[10px] text-gray-400 mt-1">Registered on {new Date(p.registrationDate).toLocaleDateString()}</p>
                        </div>
                        <div className="col-span-2 w-full flex flex-col items-center">
                          <span className="bg-blue-50 text-blue-600 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-1">PAID</span>
                          <span className="font-bold text-gray-900 text-xs">₹{selectedEvent.pricing?.[p.role] || 0}</span>
                        </div>
                        <div className="col-span-2 w-full flex flex-col items-center gap-2">
                          <span className={`border text-[10px] font-black uppercase px-4 py-1.5 rounded-full ${
                            p.status === 'CONFIRMED' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' :
                            p.status === 'CANCELLED' ? 'bg-red-50 border-red-100 text-red-600' :
                            'bg-amber-50 border-amber-100 text-amber-600'
                          }`}>
                            {p.status}
                          </span>
                          
                          {p.status === 'CANCELLED' && p.cancellationReason && (
                            <button 
                              onClick={() => setSelectedReason(p.cancellationReason)}
                              className="text-[10px] text-red-500 hover:text-red-700 font-bold underline transition-colors flex items-center gap-1 mt-1"
                              title="Click to view reason"
                            >
                              <RiInformationLine size={14} /> View Reason
                            </button>
                          )}

                          {p.status !== 'CANCELLED' && (
                            <button 
                              onClick={() => setCancellingRegId(p.registrationId)}
                              className="text-[10px] text-red-500 hover:text-red-700 font-bold underline transition-colors"
                            >
                              Cancel Reg
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Embedded User Profile Modal */}
      {selectedProfileId && (
        <EventUserProfileModal 
          userId={selectedProfileId} 
          onClose={() => setSelectedProfileId(null)} 
        />
      )}

      {/* Cancellation Reason Modal */}
      {selectedReason && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSelectedReason(null)}></div>
          <div className="relative w-full max-w-sm bg-white rounded-[2rem] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between shrink-0 bg-red-50/50">
              <h2 className="text-lg font-black text-red-600 flex items-center gap-2">
                <RiInformationLine size={20} /> Cancellation Reason
              </h2>
              <button onClick={() => setSelectedReason(null)} className="p-2 hover:bg-red-100 rounded-full text-red-400 hover:text-red-600 transition-colors">
                <RiCloseLine size={20} />
              </button>
            </div>
            <div className="p-6 bg-white min-h-[100px] flex items-center justify-center text-center">
              <p className="text-sm text-gray-700 font-medium leading-relaxed">
                {selectedReason}
              </p>
            </div>
            <div className="p-4 border-t border-gray-100 flex items-center justify-center bg-gray-50 shrink-0">
              <button
                onClick={() => setSelectedReason(null)}
                className="px-8 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-bold text-sm transition-colors w-full"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Cancel Registration Modal */}
      {cancellingRegId && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => { setCancellingRegId(null); setAdminCancelReason(''); }}></div>
          <div className="relative w-full max-w-md bg-white rounded-[2rem] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between shrink-0 bg-red-50/50">
              <h2 className="text-lg font-black text-red-600 flex items-center gap-2">
                <RiCloseCircleLine size={20} /> Cancel Registration
              </h2>
              <button onClick={() => { setCancellingRegId(null); setAdminCancelReason(''); }} className="p-2 hover:bg-red-100 rounded-full text-red-400 hover:text-red-600 transition-colors">
                <RiCloseLine size={20} />
              </button>
            </div>
            <div className="p-6 bg-white flex flex-col items-center">
              <p className="text-sm font-bold text-gray-700 w-full mb-2">Please provide a reason for cancelling this registration:</p>
              <textarea
                className="w-full border border-gray-200 rounded-xl p-4 text-sm font-medium focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all resize-none"
                placeholder="Enter reason here (e.g., Payment failed, Rule violation...)"
                rows={4}
                value={adminCancelReason}
                onChange={(e) => setAdminCancelReason(e.target.value)}
              ></textarea>
            </div>
            <div className="p-4 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50 shrink-0">
              <button
                onClick={() => { setCancellingRegId(null); setAdminCancelReason(''); }}
                className="px-6 py-2.5 bg-white border border-gray-200 hover:bg-gray-100 text-gray-700 rounded-xl font-bold text-sm transition-colors"
              >
                Go Back
              </button>
              <button
                onClick={handleCancelRegistration}
                disabled={!adminCancelReason.trim()}
                className="px-6 py-2.5 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white rounded-xl font-bold text-sm transition-colors shadow-lg shadow-red-500/30"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEvents;
