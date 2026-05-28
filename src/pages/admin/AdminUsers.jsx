import React, { useState, useEffect, useRef } from 'react';
import {
  RiShieldUserLine, RiSearchLine, RiDownload2Line, RiCloseLine,
  RiLoader4Line, RiCheckLine, RiCloseLine as RiCloseX, RiUserLine,
  RiMailLine, RiPhoneLine, RiMapPinLine, RiFileTextLine, RiShieldCheckLine,
  RiEditLine, RiDeleteBinLine, RiExternalLinkLine, RiKeyLine, RiMessage2Line,
  RiLockUnlockLine, RiTrophyLine, RiCheckDoubleLine, RiErrorWarningLine,
  RiRefreshLine, RiGroupLine
} from 'react-icons/ri';
import { useSearchParams } from 'react-router-dom';
import { API_BASE_URL } from '../../config/api';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [verificationFilter, setVerificationFilter] = useState('All');
  const [roleFilter, setRoleFilter] = useState('All');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [actionLoading, setActionLoading] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [adminNote, setAdminNote] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createFormData, setCreateFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'player',
    firstName: '',
    lastName: '',
    phone: '',
    clubName: '',
    contactPerson: '',
  });
  
  const fileInputRef = useRef(null);
  const [uploadingDocKey, setUploadingDocKey] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  // Open profile automatically if highlight parameter is present
  useEffect(() => {
    const highlightId = searchParams.get('highlight');
    if (highlightId && users.length > 0) {
      const userToHighlight = users.find(u => u._id === highlightId);
      if (userToHighlight) {
        setSelectedUser(userToHighlight);
        setShowProfileModal(true);
        // Clear the param so it doesn't reopen if closed
        setSearchParams({});
      }
    }
  }, [searchParams, users, setSearchParams]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_BASE_URL}/auth/admin/users`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching users:', err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const showError = (msg) => {
    setErrorMsg(msg);
    setTimeout(() => setErrorMsg(''), 3000);
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (!createFormData.username.trim() || !createFormData.email.trim() || !createFormData.password.trim() || !createFormData.role) {
      return showError('Username, Email, Password and Role are required');
    }
    if (createFormData.password.length < 8) {
      return showError('Password must be at least 8 characters long');
    }
    setActionLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      
      const payload = {
        username: createFormData.username,
        email: createFormData.email,
        password: createFormData.password,
        role: createFormData.role,
        personalInfo: {
          firstName: createFormData.firstName,
          lastName: createFormData.lastName,
        },
        contactInfo: {
          email: createFormData.email,
          phone: createFormData.phone,
        },
        clubInfo: createFormData.role === 'club' ? {
          clubName: createFormData.clubName,
          contactPerson: createFormData.contactPerson,
        } : undefined
      };

      const res = await fetch(`${API_BASE_URL}/auth/admin/users`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok) {
        showSuccess('User created successfully!');
        setShowCreateModal(false);
        setCreateFormData({
          username: '',
          email: '',
          password: '',
          role: 'player',
          firstName: '',
          lastName: '',
          phone: '',
          clubName: '',
          contactPerson: '',
        });
        fetchUsers();
      } else {
        showError(data.message || 'Failed to create user');
      }
    } catch (err) {
      showError('Error creating user');
    } finally {
      setActionLoading(false);
    }
  };

  const handleSetVerification = async (userId, status) => {
    setActionLoading(true);
    const isVerified = status === 'verified';
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_BASE_URL}/auth/admin/users/${userId}/verify`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ verificationStatus: status, isVerified })
      });
      if (res.ok) {
        showSuccess(`User marked as ${status}`);
        fetchUsers();
        if (selectedUser?._id === userId) {
          setSelectedUser(prev => ({ ...prev, verificationStatus: status, isVerified }));
        }
      } else {
        showError('Failed to update status');
      }
    } catch (err) {
      showError('Error updating status');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_BASE_URL}/auth/admin/users/${userId}/role`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole })
      });
      if (res.ok) {
        fetchUsers();
        showSuccess('Role updated!');
      }
    } catch (err) {
      showError('Error updating role');
    }
  };

  const handlePaymentStatusChange = async (userId, currentStatus) => {
    const newStatus = !currentStatus;
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_BASE_URL}/auth/admin/users/${userId}/payment`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentStatus: newStatus ? 'paid' : 'unpaid', isFeeReceived: newStatus })
      });
      if (res.ok) {
        fetchUsers();
        if (selectedUser?._id === userId) {
          setSelectedUser(prev => ({ ...prev, paymentStatus: newStatus ? 'paid' : 'unpaid', isFeeReceived: newStatus }));
        }
        showSuccess(`Payment marked as ${newStatus ? 'Received' : 'Pending'}!`);
      }
    } catch (err) {
      showError('Error updating payment status');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to permanently delete this user?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await fetch(`${API_BASE_URL}/auth/admin/users/${userId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchUsers();
      setShowProfileModal(false);
      showSuccess('User deleted.');
    } catch (err) {
      showError('Error deleting user');
    }
  };

  const handleDocumentDelete = async (docKey) => {
    if (!window.confirm('Are you sure you want to delete this document?')) return;
    setActionLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const updatedDocuments = { ...selectedUser.documents, [docKey]: '' };
      const res = await fetch(`${API_BASE_URL}/auth/admin/users/${selectedUser._id}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ documents: updatedDocuments })
      });
      if (res.ok) {
        showSuccess('Document deleted!');
        fetchUsers();
        setSelectedUser(prev => ({ ...prev, documents: updatedDocuments }));
      } else {
        showError('Failed to delete document');
      }
    } catch (err) {
      showError('Error deleting document');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDocumentUploadClick = (docKey) => {
    setUploadingDocKey(docKey);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !uploadingDocKey) return;
    if (file.size > 5 * 1024 * 1024) return showError('File size must be less than 5MB');

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const token = localStorage.getItem('adminToken');
      const uploadRes = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }, // Note: No Content-Type for FormData
        body: formData
      });
      if (!uploadRes.ok) throw new Error('Upload failed');
      const uploadData = await uploadRes.json();
      
      const updatedDocuments = { ...selectedUser.documents, [uploadingDocKey]: uploadData.url };
      const res = await fetch(`${API_BASE_URL}/auth/admin/users/${selectedUser._id}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ documents: updatedDocuments })
      });

      if (res.ok) {
        showSuccess('Document uploaded!');
        fetchUsers();
        setSelectedUser(prev => ({ ...prev, documents: updatedDocuments }));
      } else {
        showError('Failed to save document URL');
      }
    } catch (err) {
      showError('Error uploading document');
    } finally {
      setUploading(false);
      setUploadingDocKey(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleUpdatePassword = async (userId) => {
    if (!newPassword.trim()) return showError('Please enter a new password');
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;<>,.?/~\\-]).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      return showError('Password must be at least 8 characters, with 1 uppercase, 1 number, and 1 special char');
    }
    setActionLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_BASE_URL}/auth/admin/users/${userId}/password`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: newPassword })
      });
      if (res.ok) {
        setNewPassword('');
        showSuccess('Password updated successfully!');
      } else {
        showError('Failed to update password');
      }
    } catch (err) {
      showError('Error updating password');
    } finally {
      setActionLoading(false);
    }
  };

  const handleSendNote = async (userId, unlock = false) => {
    if (!adminNote.trim()) return showError('Please enter a message');
    setActionLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_BASE_URL}/auth/admin/users/${userId}/note`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminMessage: adminNote, unlock })
      });
      if (res.ok) {
        showSuccess(unlock ? 'Profile unlocked for correction!' : 'Note sent to user!');
        setAdminNote('');
        fetchUsers();
        if (selectedUser?._id === userId && unlock) {
          setSelectedUser(prev => ({ ...prev, verificationStatus: 'rejected', isVerified: false }));
        }
      } else {
        showError('Failed to send note');
      }
    } catch (err) {
      showError('Error sending note');
    } finally {
      setActionLoading(false);
    }
  };

  const handleUnlockForCorrection = async (userId) => {
    handleSendNote(userId, true);
  };

  const handleExportCSV = () => {
    const headers = ['Username', 'Email', 'Role', 'Phone', 'Verification', 'Payment', 'Registered'];
    const rows = filteredUsers.map(u => [
      u.username || '',
      u.email || '',
      u.role || '',
      u.contactInfo?.phone || '',
      u.verificationStatus || '',
      u.isFeeReceived ? 'Received' : 'Pending',
      u.isRegistered ? 'Yes' : 'No'
    ]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users.csv';
    a.click();
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = !searchQuery ||
      u.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.personalInfo?.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.contactInfo?.phone?.includes(searchQuery);

    const matchesVerification = verificationFilter === 'All' ||
      (verificationFilter === 'Pending' && u.verificationStatus === 'pending') ||
      (verificationFilter === 'Verified' && u.verificationStatus === 'verified') ||
      (verificationFilter === 'Rejected' && u.verificationStatus === 'rejected');

    const matchesRole = roleFilter.toLowerCase() === 'all' ||
      u.role?.toLowerCase() === roleFilter.toLowerCase();

    return matchesSearch && matchesVerification && matchesRole;
  });

  const totalRegistered = users.length;
  const pendingApproval = users.filter(u => u.verificationStatus === 'pending').length;

  const getVerificationBadge = (status) => {
    switch (status) {
      case 'verified': return <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100"><RiCheckLine size={12} /> Verified</span>;
      case 'rejected': return <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full bg-red-50 text-red-600 border border-red-100"><RiCloseX size={12} /> Rejected</span>;
      default: return <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full bg-amber-50 text-amber-600 border border-amber-100"><RiLoader4Line size={12} /> Pending</span>;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'player': case 'athlete': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'coach': return 'bg-purple-50 text-purple-700 border-purple-100';
      case 'club': return 'bg-orange-50 text-orange-700 border-orange-100';
      case 'admin': return 'bg-red-50 text-red-700 border-red-100';
      case 'viewer': return 'bg-indigo-50 text-indigo-700 border-indigo-100';
      case 'user': return 'bg-teal-50 text-teal-700 border-teal-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  const handleSaveProfile = async () => {
    setActionLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const payload = {
        email: editFormData.email,
        username: editFormData.username,
        personalInfo: {
          ...selectedUser.personalInfo,
          firstName: editFormData.firstName,
          lastName: editFormData.lastName,
          gender: editFormData.gender,
          birthDate: editFormData.birthDate,
          bloodGroup: editFormData.bloodGroup,
          aadhaarNumber: editFormData.aadhaarNumber,
        },
        guardianInfo: {
          ...selectedUser.guardianInfo,
          fatherName: editFormData.fatherName,
          motherName: editFormData.motherName,
        },
        contactInfo: {
          ...selectedUser.contactInfo,
          phone: editFormData.phone,
          address: {
            ...selectedUser.contactInfo?.address,
            line1: editFormData.line1,
            city: editFormData.city,
            state: editFormData.state,
            pinCode: editFormData.pinCode,
          }
        },
        clubInfo: {
          ...selectedUser.clubInfo,
          clubName: editFormData.clubName,
          contactPerson: editFormData.contactPerson,
        }
      };

      const res = await fetch(`${API_BASE_URL}/auth/admin/users/${selectedUser._id}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        showSuccess('Profile updated successfully!');
        setIsEditingProfile(false);
        fetchUsers();
        const updatedUser = await res.json();
        setSelectedUser(updatedUser);
      } else {
        const errorData = await res.json();
        showError(errorData.message || 'Failed to update profile');
      }
    } catch (err) {
      showError('Error updating profile');
    } finally {
      setActionLoading(false);
    }
  };

  const openProfile = (user) => {
    setSelectedUser(user);
    setShowProfileModal(true);
    setIsEditingProfile(false);
    setEditFormData({
      username: user.username || '',
      firstName: user.personalInfo?.firstName || '',
      lastName: user.personalInfo?.lastName || '',
      gender: user.personalInfo?.gender || '',
      birthDate: user.personalInfo?.birthDate ? new Date(user.personalInfo.birthDate).toISOString().split('T')[0] : '',
      bloodGroup: user.personalInfo?.bloodGroup || '',
      aadhaarNumber: user.personalInfo?.aadhaarNumber || '',
      fatherName: user.guardianInfo?.fatherName || '',
      motherName: user.guardianInfo?.motherName || '',
      email: user.email || '',
      phone: user.contactInfo?.phone || '',
      line1: user.contactInfo?.address?.line1 || '',
      city: user.contactInfo?.address?.city || '',
      state: user.contactInfo?.address?.state || '',
      pinCode: user.contactInfo?.address?.pinCode || '',
      clubName: user.clubInfo?.clubName || '',
      contactPerson: user.clubInfo?.contactPerson || '',
    });
    setNewPassword('');
    setAdminNote('');
  };

  return (
    <div className="p-6 font-['Inter'] min-h-screen bg-[#F8FAFC]">

      {/* Toast notifications */}
      {successMsg && (
        <div className="fixed top-6 right-6 z-[100] bg-emerald-500 text-white px-6 py-4 rounded-2xl shadow-2xl font-bold flex items-center gap-3 animate-in slide-in-from-top-2">
          <RiCheckDoubleLine size={20} /> {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="fixed top-6 right-6 z-[100] bg-red-500 text-white px-6 py-4 rounded-2xl shadow-2xl font-bold flex items-center gap-3 animate-in slide-in-from-top-2">
          <RiErrorWarningLine size={20} /> {errorMsg}
        </div>
      )}

      {/* Header Card */}
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
            <RiShieldUserLine size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">Manage Users</h1>
            <p className="text-gray-500 text-sm mt-0.5">Control user roles and access permissions across the EFH platform.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="bg-blue-50 rounded-2xl px-6 py-4 text-center border border-blue-100">
            <p className="text-3xl font-black text-blue-600">{totalRegistered}</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mt-0.5">Total Registered</p>
          </div>
          <div className="bg-amber-50 rounded-2xl px-6 py-4 text-center border border-amber-100">
            <p className="text-3xl font-black text-amber-600">{pendingApproval}</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-amber-400 mt-0.5">Pending Approval</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-3xl px-6 py-4 border border-gray-100 shadow-sm mb-6 flex flex-wrap items-center gap-4">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <RiSearchLine className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-2.5 text-sm font-medium outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
          />
        </div>

        {/* Verification Filter */}
        <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
          {['All', 'Pending', 'Verified', 'Rejected'].map(f => (
            <button
              key={f}
              onClick={() => setVerificationFilter(f)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                verificationFilter === f ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Role Filter */}
        <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
          <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center text-gray-500 shadow-sm">
            <RiShieldUserLine size={14} />
          </div>
          {['All', 'Admin', 'Player', 'Coach'].map(f => (
            <button
              key={f}
              onClick={() => setRoleFilter(f.toLowerCase())}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                (roleFilter === f.toLowerCase()) || (f === 'All' && roleFilter === 'All')
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <button
          onClick={fetchUsers}
          className="p-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl transition-all"
          title="Refresh"
        >
          <RiRefreshLine size={18} />
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="px-8 py-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
            <h2 className="text-base font-black text-gray-900">System Users</h2>
            <span className="text-xs font-bold text-gray-400 ml-1">({filteredUsers.length})</span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-500/20"
            >
              <RiUserLine size={16} /> Create User
            </button>
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-emerald-500/20"
            >
              <RiDownload2Line size={16} /> Export CSV
            </button>
          </div>
        </div>

        {/* Column Headers */}
        <div className="grid grid-cols-12 gap-4 px-8 py-3 bg-gray-50 border-b border-gray-100">
          <div className="col-span-4 text-[10px] font-black uppercase tracking-widest text-gray-400">User Profile</div>
          <div className="col-span-3 text-[10px] font-black uppercase tracking-widest text-gray-400">Contact Info</div>
          <div className="col-span-1 text-[10px] font-black uppercase tracking-widest text-gray-400 text-center">Verification</div>
          <div className="col-span-1 text-[10px] font-black uppercase tracking-widest text-gray-400 text-center">Payment</div>
          <div className="col-span-2 text-[10px] font-black uppercase tracking-widest text-gray-400 text-center">System Role</div>
          <div className="col-span-1 text-[10px] font-black uppercase tracking-widest text-gray-400 text-center">Actions</div>
        </div>

        {/* Rows */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-blue-500">
            <RiLoader4Line className="animate-spin mb-3" size={32} />
            <p className="font-bold text-gray-400 text-sm">Loading users...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <RiGroupLine size={40} className="mb-3 opacity-30" />
            <p className="font-bold">No users found</p>
            <p className="text-sm mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {filteredUsers.map((user) => (
              <div key={user._id} className="grid grid-cols-12 gap-4 px-8 py-5 items-center hover:bg-blue-50/30 transition-all group">
                {/* User Profile */}
                <div className="col-span-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-blue-50 shrink-0 border border-gray-100">
                    {user.documents?.photograph
                      ? <img src={user.documents.photograph} alt={user.username} className="w-full h-full object-cover" />
                      : <div className="w-full h-full flex items-center justify-center text-blue-500 font-black text-lg">
                          {(user.personalInfo?.firstName || user.username || '?')[0].toUpperCase()}
                        </div>
                    }
                  </div>
                  <div>
                    <p className="font-black text-gray-900 text-sm uppercase tracking-wide">
                      {user.personalInfo?.firstName
                        ? `${user.personalInfo.firstName} ${user.personalInfo.lastName || ''}`.trim()
                        : user.username}
                    </p>
                    <p className="text-xs font-medium text-gray-400 mt-0.5">{user.username}</p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="col-span-3">
                  <p className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
                    <RiMailLine size={12} className="text-gray-400 shrink-0" />
                    <span className="truncate">{user.email}</span>
                  </p>
                  {user.contactInfo?.phone && (
                    <p className="text-xs font-medium text-gray-500 flex items-center gap-1.5 mt-1">
                      <RiPhoneLine size={12} className="text-gray-400 shrink-0" />
                      {user.contactInfo.phone}
                    </p>
                  )}
                </div>

                {/* Verification */}
                <div className="col-span-1 flex justify-center">
                  {getVerificationBadge(user.verificationStatus)}
                </div>

                {/* Payment */}
                <div className="col-span-1 flex justify-center">
                  <button 
                    onClick={() => handlePaymentStatusChange(user._id, user.isFeeReceived)}
                    className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full border transition-all hover:scale-105 ${
                    user.isFeeReceived ? 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100' : 'bg-orange-50 text-orange-500 border-orange-100 hover:bg-orange-100'
                  }`}>
                    {user.isFeeReceived ? <><RiCheckLine size={12} /> Received</> : 'Pending'}
                  </button>
                </div>

                {/* System Role */}
                <div className="col-span-2 flex justify-center">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className={`text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full border outline-none cursor-pointer transition-all ${getRoleColor(user.role)}`}
                  >
                    <option value="admin">Admin</option>
                    <option value="player">Player</option>
                    <option value="coach">Coach</option>
                  </select>
                </div>

                {/* Actions */}
                <div className="col-span-1 flex items-center justify-center gap-2">
                  <button
                    onClick={() => openProfile(user)}
                    className="p-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 transition-all"
                    title="View Profile"
                  >
                    <RiFileTextLine size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-500 transition-all"
                    title="Delete User"
                  >
                    <RiDeleteBinLine size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Member Profile Modal */}
      {showProfileModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="p-8 border-b border-gray-100 flex items-start justify-between shrink-0">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 overflow-hidden">
                  {selectedUser.documents?.photograph
                    ? <img src={selectedUser.documents.photograph} className="w-full h-full object-cover" alt="" />
                    : <RiUserLine size={28} />
                  }
                </div>
                <div>
                  <h2 className="text-xl font-black text-gray-900">Member Profile</h2>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      ID: {selectedUser._id?.toUpperCase().slice(-16)}
                    </span>
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${getRoleColor(selectedUser.role)}`}>
                      {selectedUser.role}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex flex-col gap-1 mr-4">
                  <select
                    value={selectedUser.verificationStatus}
                    onChange={(e) => handleSetVerification(selectedUser._id, e.target.value)}
                    disabled={actionLoading}
                    className={`text-[11px] font-black uppercase tracking-wider px-4 py-2.5 rounded-xl border outline-none cursor-pointer transition-all ${
                      selectedUser.verificationStatus === 'verified' ? 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-sm shadow-emerald-500/10' :
                      selectedUser.verificationStatus === 'rejected' ? 'bg-red-50 text-red-600 border-red-100 shadow-sm shadow-red-500/10' :
                      'bg-amber-50 text-amber-600 border-amber-100 shadow-sm shadow-amber-500/10'
                    }`}
                  >
                    <option value="pending">⏳ Pending</option>
                    <option value="verified">✅ Verified</option>
                    <option value="rejected">❌ Rejected</option>
                  </select>
                </div>
                <button
                  onClick={() => setShowProfileModal(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 transition-all"
                >
                  <RiCloseLine size={20} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6">

              {/* Personal Details */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <RiUserLine className="text-blue-500" size={18} />
                    <h3 className="text-xs font-black uppercase tracking-widest text-gray-700">Personal Details</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    {isEditingProfile && (
                      <button 
                        onClick={handleSaveProfile}
                        disabled={actionLoading}
                        className="text-xs font-black uppercase tracking-widest bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                      >
                        {actionLoading ? "Saving..." : "Save"}
                      </button>
                    )}
                    <button 
                      onClick={() => setIsEditingProfile(!isEditingProfile)}
                      className="text-xs font-black uppercase tracking-widest text-blue-500 hover:text-blue-600 transition-colors"
                    >
                      {isEditingProfile ? "Cancel" : "Edit Profile"}
                    </button>
                  </div>
                </div>
                
                {isEditingProfile ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl px-4 py-3 border border-gray-100">
                      <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Username</p>
                      <input type="text" value={editFormData.username || ""} onChange={e => setEditFormData({...editFormData, username: e.target.value})} className="w-full font-bold text-gray-800 text-sm outline-none" />
                    </div>
                    <div className="bg-white rounded-xl px-4 py-3 border border-gray-100">
                      <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">First Name</p>
                      <input type="text" value={editFormData.firstName || ""} onChange={e => setEditFormData({...editFormData, firstName: e.target.value})} className="w-full font-bold text-gray-800 text-sm outline-none" />
                    </div>
                    <div className="bg-white rounded-xl px-4 py-3 border border-gray-100">
                      <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Last Name</p>
                      <input type="text" value={editFormData.lastName || ""} onChange={e => setEditFormData({...editFormData, lastName: e.target.value})} className="w-full font-bold text-gray-800 text-sm outline-none" />
                    </div>
                    <div className="bg-white rounded-xl px-4 py-3 border border-gray-100">
                      <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Gender</p>
                      <select value={editFormData.gender || ""} onChange={e => setEditFormData({...editFormData, gender: e.target.value})} className="w-full font-bold text-gray-800 text-sm outline-none bg-transparent">
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="bg-white rounded-xl px-4 py-3 border border-gray-100">
                      <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Birth Date</p>
                      <input type="date" value={editFormData.birthDate || ""} onChange={e => setEditFormData({...editFormData, birthDate: e.target.value})} className="w-full font-bold text-gray-800 text-sm outline-none" />
                    </div>
                    <div className="bg-white rounded-xl px-4 py-3 border border-gray-100">
                      <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Blood Group</p>
                      <input type="text" value={editFormData.bloodGroup || ""} onChange={e => setEditFormData({...editFormData, bloodGroup: e.target.value})} className="w-full font-bold text-gray-800 text-sm outline-none" />
                    </div>
                    <div className="bg-white rounded-xl px-4 py-3 border border-gray-100">
                      <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Aadhaar Number</p>
                      <input type="text" value={editFormData.aadhaarNumber || ""} onChange={e => setEditFormData({...editFormData, aadhaarNumber: e.target.value})} className="w-full font-bold text-gray-800 text-sm outline-none" />
                    </div>
                    <div className="bg-white rounded-xl px-4 py-3 border border-gray-100">
                      <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Father's Name</p>
                      <input type="text" value={editFormData.fatherName || ""} onChange={e => setEditFormData({...editFormData, fatherName: e.target.value})} className="w-full font-bold text-gray-800 text-sm outline-none" />
                    </div>
                    <div className="bg-white rounded-xl px-4 py-3 border border-gray-100">
                      <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Mother's Name</p>
                      <input type="text" value={editFormData.motherName || ""} onChange={e => setEditFormData({...editFormData, motherName: e.target.value})} className="w-full font-bold text-gray-800 text-sm outline-none" />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      ["Username", selectedUser.username || "N/A"],
                      ["First Name", selectedUser.personalInfo?.firstName || "N/A"],
                      ["Last Name", selectedUser.personalInfo?.lastName || "N/A"],
                      ["Gender", selectedUser.personalInfo?.gender || "N/A"],
                      ["Birth Date", selectedUser.personalInfo?.birthDate ? new Date(selectedUser.personalInfo.birthDate).toLocaleDateString() : "N/A"],
                      ["Blood Group", selectedUser.personalInfo?.bloodGroup || "N/A"],
                      ["Aadhaar Number", selectedUser.personalInfo?.aadhaarNumber || "N/A"],
                      ["Father's Name", selectedUser.guardianInfo?.fatherName || "N/A"],
                      ["Mother's Name", selectedUser.guardianInfo?.motherName || "N/A"],
                    ].map(([label, value]) => (
                      <div key={label} className="bg-white rounded-xl px-4 py-3 border border-gray-100">
                        <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">{label}</p>
                        <p className="font-bold text-gray-800 text-sm">{value}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Contact & Address */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-5">
                  <RiMapPinLine className="text-blue-500" size={18} />
                  <h3 className="text-xs font-black uppercase tracking-widest text-gray-700">Contact & Address</h3>
                </div>
                
                {isEditingProfile ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl px-4 py-3 border border-gray-100">
                      <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Email Address</p>
                      <input type="email" value={editFormData.email || ""} onChange={e => setEditFormData({...editFormData, email: e.target.value})} className="w-full font-bold text-gray-800 text-sm outline-none" />
                    </div>
                    <div className="bg-white rounded-xl px-4 py-3 border border-gray-100">
                      <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Phone Number</p>
                      <input type="text" value={editFormData.phone || ""} onChange={e => setEditFormData({...editFormData, phone: e.target.value})} className="w-full font-bold text-gray-800 text-sm outline-none" />
                    </div>
                    <div className="col-span-2 bg-white rounded-xl px-4 py-3 border border-gray-100">
                      <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Address Line 1</p>
                      <input type="text" value={editFormData.line1 || ""} onChange={e => setEditFormData({...editFormData, line1: e.target.value})} className="w-full font-bold text-gray-800 text-sm outline-none" />
                    </div>
                    <div className="bg-white rounded-xl px-4 py-3 border border-gray-100">
                      <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">City</p>
                      <input type="text" value={editFormData.city || ""} onChange={e => setEditFormData({...editFormData, city: e.target.value})} className="w-full font-bold text-gray-800 text-sm outline-none" />
                    </div>
                    <div className="bg-white rounded-xl px-4 py-3 border border-gray-100">
                      <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">State</p>
                      <input type="text" value={editFormData.state || ""} onChange={e => setEditFormData({...editFormData, state: e.target.value})} className="w-full font-bold text-gray-800 text-sm outline-none" />
                    </div>
                    <div className="bg-white rounded-xl px-4 py-3 border border-gray-100">
                      <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Pin Code</p>
                      <input type="text" value={editFormData.pinCode || ""} onChange={e => setEditFormData({...editFormData, pinCode: e.target.value})} className="w-full font-bold text-gray-800 text-sm outline-none" />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl px-4 py-3 border border-gray-100">
                      <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Email Address</p>
                      <p className="font-bold text-gray-800 text-sm break-all">{selectedUser.contactInfo?.email || selectedUser.email}</p>
                    </div>
                    <div className="bg-white rounded-xl px-4 py-3 border border-gray-100">
                      <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Phone Number</p>
                      <p className="font-bold text-gray-800 text-sm">{selectedUser.contactInfo?.phone || "N/A"}</p>
                    </div>
                    <div className="col-span-2 bg-white rounded-xl px-4 py-3 border border-gray-100">
                      <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Permanent Address</p>
                      <p className="font-bold text-gray-800 text-sm">
                        {[
                          selectedUser.contactInfo?.address?.line1,
                          selectedUser.contactInfo?.address?.city,
                          selectedUser.contactInfo?.address?.state,
                          selectedUser.contactInfo?.address?.pinCode
                        ].filter(Boolean).join(", ") || "N/A"}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Club Info */}
              {selectedUser.clubInfo && (selectedUser.clubInfo.clubName || selectedUser.clubInfo.contactPerson) && (
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <div className="flex items-center gap-3 mb-5">
                    <RiShieldUserLine className="text-blue-500" size={18} />
                    <h3 className="text-xs font-black uppercase tracking-widest text-gray-700">Club Details</h3>
                  </div>
                  {isEditingProfile ? (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-xl px-4 py-3 border border-gray-100">
                        <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Club Name</p>
                        <input type="text" value={editFormData.clubName || ""} onChange={e => setEditFormData({...editFormData, clubName: e.target.value})} className="w-full font-bold text-gray-800 text-sm outline-none" />
                      </div>
                      <div className="bg-white rounded-xl px-4 py-3 border border-gray-100">
                        <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Contact Person</p>
                        <input type="text" value={editFormData.contactPerson || ""} onChange={e => setEditFormData({...editFormData, contactPerson: e.target.value})} className="w-full font-bold text-gray-800 text-sm outline-none" />
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-xl px-4 py-3 border border-gray-100">
                        <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Club Name</p>
                        <p className="font-bold text-gray-800 text-sm">{selectedUser.clubInfo?.clubName || "N/A"}</p>
                      </div>
                      <div className="bg-white rounded-xl px-4 py-3 border border-gray-100">
                        <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Contact Person</p>
                        <p className="font-bold text-gray-800 text-sm">{selectedUser.clubInfo?.contactPerson || "N/A"}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Hidden File Input for Admin Document Upload */}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*,.pdf" 
              />

              {/* Registration Documents */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-5">
                  <RiFileTextLine className="text-blue-500" size={18} />
                  <h3 className="text-xs font-black uppercase tracking-widest text-gray-700">Registration Documents</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    ['Photograph', 'photograph'],
                    ['DOB Proof', 'dobProof'],
                    ['Aadhaar Front', 'aadhaarFront'],
                    ['Aadhaar Back', 'aadhaarBack'],
                    ['Signature', 'signature'],
                    ['ID Proof', 'idProof'],
                    ['Address Proof', 'addressProof'],
                  ].map(([label, key]) => (
                    <div key={key} className="flex flex-col bg-white border border-gray-100 rounded-xl px-4 py-3 group hover:border-blue-200 transition-all">
                      <div className="flex items-center gap-3 mb-2">
                        <RiFileTextLine className={selectedUser.documents?.[key] ? "text-blue-400" : "text-gray-400"} size={16} />
                        <span className={`text-xs font-black uppercase tracking-wider ${selectedUser.documents?.[key] ? "text-gray-700" : "text-gray-400"}`}>
                          {label}
                        </span>
                      </div>
                      <div className="flex gap-2 mt-auto pt-2 border-t border-gray-50">
                        {selectedUser.documents?.[key] ? (
                          <>
                            <button onClick={() => setPreviewImage(selectedUser.documents[key])} className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded hover:bg-blue-100 transition-colors flex-1 flex items-center justify-center gap-1">
                              <RiExternalLinkLine size={12} /> View
                            </button>
                            <button onClick={() => handleDocumentDelete(key)} className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-1 rounded hover:bg-red-100 transition-colors flex items-center justify-center gap-1" disabled={actionLoading}>
                              <RiDeleteBinLine size={12} /> Delete
                            </button>
                          </>
                        ) : (
                          <button onClick={() => handleDocumentUploadClick(key)} className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded hover:bg-emerald-100 transition-colors flex-1 flex items-center justify-center gap-1" disabled={uploading}>
                            {uploading && uploadingDocKey === key ? 'Uploading...' : 'Upload File'}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Admin Action Center */}
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <div className="flex items-center gap-3 mb-5">
                  <RiShieldCheckLine className="text-blue-600" size={18} />
                  <h3 className="text-xs font-black uppercase tracking-widest text-blue-800">Admin Action Center</h3>
                </div>
                <div className="space-y-4">
                  {/* Verification control */}
                  <div className="bg-white rounded-xl px-4 py-3 border border-blue-100 flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Verification Status</p>
                      <p className="font-bold text-gray-700 text-sm capitalize">{selectedUser.verificationStatus || 'pending'}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleSetVerification(selectedUser._id, 'verified')} disabled={actionLoading || selectedUser.verificationStatus === 'verified'} className="text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-40 transition-all">✅ Verify</button>
                      <button onClick={() => handleSetVerification(selectedUser._id, 'rejected')} disabled={actionLoading || selectedUser.verificationStatus === 'rejected'} className="text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600 disabled:opacity-40 transition-all">❌ Reject</button>
                      <button onClick={() => handleSetVerification(selectedUser._id, 'pending')} disabled={actionLoading || selectedUser.verificationStatus === 'pending'} className="text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg bg-amber-400 text-white hover:bg-amber-500 disabled:opacity-40 transition-all">⏳ Pending</button>
                    </div>
                  </div>

                  {/* Payment control */}
                  <div className="bg-white rounded-xl px-4 py-3 border border-blue-100 flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Payment Status</p>
                      <p className={`font-bold text-sm ${selectedUser.isFeeReceived ? 'text-emerald-600' : 'text-orange-500'}`}>{selectedUser.isFeeReceived ? 'Received ✅' : 'Pending ⏳'}</p>
                    </div>
                    <button onClick={() => handlePaymentStatusChange(selectedUser._id, selectedUser.isFeeReceived)} className={`text-[10px] font-black uppercase tracking-wider px-4 py-2 rounded-lg transition-all ${selectedUser.isFeeReceived ? 'bg-orange-100 text-orange-600 hover:bg-orange-200' : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'}`}>
                      {selectedUser.isFeeReceived ? 'Mark Pending' : 'Mark Paid'}
                    </button>
                  </div>

                  {/* Admin Note / Unlock */}
                  <div className="bg-white rounded-xl px-4 py-3 border border-blue-100">
                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2">Send Note / Unlock Profile</p>
                    <textarea
                      value={adminNote}
                      onChange={e => setAdminNote(e.target.value)}
                      rows={2}
                      placeholder="Write a message to send to the user..."
                      className="w-full text-sm font-medium text-gray-700 outline-none resize-none border-0 bg-transparent"
                    />
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => handleSendNote(selectedUser._id)} disabled={actionLoading || !adminNote.trim()} className="text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-40 transition-all flex items-center gap-1"><RiMessage2Line size={12}/> Send Note</button>
                      <button onClick={() => handleSendNote(selectedUser._id, true)} disabled={actionLoading || !adminNote.trim()} className="text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg bg-amber-500 text-white hover:bg-amber-600 disabled:opacity-40 transition-all flex items-center gap-1"><RiLockUnlockLine size={12}/> Unlock + Send</button>
                    </div>
                  </div>

                  {/* Delete User */}
                  <div className="flex justify-end pt-2">
                    <button onClick={() => handleDeleteUser(selectedUser._id)} className="text-[10px] font-black uppercase tracking-wider px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 border border-red-100 flex items-center gap-1.5 transition-all">
                      <RiDeleteBinLine size={13}/> Delete This User
                    </button>
                  </div>
                </div>
              </div>

              {/* Security Management */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-5">
                  <RiKeyLine className="text-blue-500" size={18} />
                  <h3 className="text-xs font-black uppercase tracking-widest text-gray-700">Security Management</h3>
                </div>
                <div className="flex gap-3 items-center">
                  <input
                    type="text"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    placeholder="Set new password for user..."
                    className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 outline-none focus:border-blue-300 transition-all"
                  />
                  <button
                    onClick={() => handleUpdatePassword(selectedUser._id)}
                    disabled={actionLoading || !newPassword.trim()}
                    className="text-[10px] font-black uppercase tracking-wider px-4 py-2.5 rounded-xl bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-40 transition-all whitespace-nowrap"
                  >
                    {actionLoading ? 'Saving...' : 'Update Password'}
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative max-w-5xl w-full max-h-[95vh] flex items-center justify-center">
            <button 
              onClick={() => setPreviewImage(null)}
              className="absolute -top-12 right-0 md:-right-12 w-10 h-10 bg-white/20 hover:bg-red-500 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <RiCloseLine size={24} />
            </button>
            <img src={previewImage} alt="Document Preview" className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl" />
          </div>
        </div>
      )}
      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="p-8 border-b border-gray-100 flex items-start justify-between shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <RiUserLine size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-gray-900">Create New User</h2>
                  <p className="text-xs text-gray-400 font-bold mt-1 uppercase tracking-wider">Add a user with any system role</p>
                </div>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 transition-all"
              >
                <RiCloseLine size={20} />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleCreateUser} className="flex-1 overflow-y-auto p-8 space-y-6">
              {/* Account Credentials */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-700 mb-4 flex items-center gap-2">
                  <RiShieldUserLine size={16} className="text-blue-500" /> Account Credentials
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl px-4 py-3 border border-gray-100">
                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Username *</p>
                    <input 
                      type="text" 
                      required 
                      value={createFormData.username} 
                      onChange={e => setCreateFormData({...createFormData, username: e.target.value})} 
                      placeholder="e.g. johndoe" 
                      className="w-full font-bold text-gray-800 text-sm outline-none bg-transparent" 
                    />
                  </div>
                  <div className="bg-white rounded-xl px-4 py-3 border border-gray-100">
                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Email Address *</p>
                    <input 
                      type="email" 
                      required 
                      value={createFormData.email} 
                      onChange={e => setCreateFormData({...createFormData, email: e.target.value})} 
                      placeholder="e.g. john@example.com" 
                      className="w-full font-bold text-gray-800 text-sm outline-none bg-transparent" 
                    />
                  </div>
                  <div className="bg-white rounded-xl px-4 py-3 border border-gray-100">
                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Password *</p>
                    <input 
                      type="password" 
                      required 
                      value={createFormData.password} 
                      onChange={e => setCreateFormData({...createFormData, password: e.target.value})} 
                      placeholder="Min 8 characters" 
                      className="w-full font-bold text-gray-800 text-sm outline-none bg-transparent" 
                    />
                  </div>
                  <div className="bg-white rounded-xl px-4 py-3 border border-gray-100">
                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">System Role *</p>
                    <select 
                      value={createFormData.role} 
                      onChange={e => setCreateFormData({...createFormData, role: e.target.value})} 
                      className="w-full font-bold text-gray-800 text-sm outline-none bg-transparent capitalize cursor-pointer"
                    >
                      <option value="player">Player / Athlete</option>
                      <option value="coach">Coach</option>
                      <option value="admin">Admin</option>
                      <option value="club">Club</option>
                      <option value="viewer">Viewer</option>
                      <option value="user">User</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Personal Details */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-700 mb-4 flex items-center gap-2">
                  <RiUserLine size={16} className="text-blue-500" /> Profile Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl px-4 py-3 border border-gray-100">
                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">First Name</p>
                    <input 
                      type="text" 
                      value={createFormData.firstName} 
                      onChange={e => setCreateFormData({...createFormData, firstName: e.target.value})} 
                      placeholder="First name" 
                      className="w-full font-bold text-gray-800 text-sm outline-none bg-transparent" 
                    />
                  </div>
                  <div className="bg-white rounded-xl px-4 py-3 border border-gray-100">
                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Last Name</p>
                    <input 
                      type="text" 
                      value={createFormData.lastName} 
                      onChange={e => setCreateFormData({...createFormData, lastName: e.target.value})} 
                      placeholder="Last name" 
                      className="w-full font-bold text-gray-800 text-sm outline-none bg-transparent" 
                    />
                  </div>
                  <div className="col-span-2 bg-white rounded-xl px-4 py-3 border border-gray-100">
                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Phone Number</p>
                    <input 
                      type="text" 
                      value={createFormData.phone} 
                      onChange={e => setCreateFormData({...createFormData, phone: e.target.value})} 
                      placeholder="10 digit mobile number" 
                      className="w-full font-bold text-gray-800 text-sm outline-none bg-transparent" 
                    />
                  </div>
                </div>
              </div>

              {/* Conditional Club Info */}
              {createFormData.role === 'club' && (
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <h3 className="text-xs font-black uppercase tracking-widest text-gray-700 mb-4 flex items-center gap-2">
                    <RiShieldUserLine size={16} className="text-blue-500" /> Club Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl px-4 py-3 border border-gray-100">
                      <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Club Name</p>
                      <input 
                        type="text" 
                        value={createFormData.clubName} 
                        onChange={e => setCreateFormData({...createFormData, clubName: e.target.value})} 
                        placeholder="e.g. Royal Riders Club" 
                        className="w-full font-bold text-gray-800 text-sm outline-none bg-transparent" 
                      />
                    </div>
                    <div className="bg-white rounded-xl px-4 py-3 border border-gray-100">
                      <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Contact Person</p>
                      <input 
                        type="text" 
                        value={createFormData.contactPerson} 
                        onChange={e => setCreateFormData({...createFormData, contactPerson: e.target.value})} 
                        placeholder="e.g. John Doe" 
                        className="w-full font-bold text-gray-800 text-sm outline-none bg-transparent" 
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-4 pt-4 shrink-0 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-3.5 rounded-xl border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-blue-500/20 disabled:opacity-50"
                >
                  {actionLoading ? 'Creating...' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
