import React, { useState, useEffect } from 'react';
import { 
  RiCloseLine, RiUserLine, RiPhoneLine, RiMailLine, RiMapPinLine, 
  RiFileTextLine, RiExternalLinkLine, RiLoader4Line, RiShieldUserLine,
  RiParentLine, RiIdCardLine, RiGroupLine, RiCheckLine
} from 'react-icons/ri';
import { API_BASE_URL } from '../../config/api';

const InfoRow = ({ label, value }) => (
  <div className="bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
    <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">{label}</p>
    <p className="font-bold text-gray-800 text-sm break-all">{value || 'N/A'}</p>
  </div>
);

const SectionHeader = ({ icon, title }) => (
  <div className="flex items-center gap-3 mb-4">
    <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
      {icon}
    </div>
    <h3 className="text-xs font-black uppercase tracking-widest text-gray-800">{title}</h3>
  </div>
);

const EventUserProfileModal = ({ userId, onClose }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const res = await fetch(`${API_BASE_URL}/auth/admin/users/${userId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (userId) fetchUser();
  }, [userId]);

  if (!userId) return null;

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
        
        <div className="relative w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white rounded-t-[2rem]">
            <div className="flex items-center gap-3">
              {user?.documents?.photograph ? (
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-gray-200 shrink-0">
                  <img src={user.documents.photograph} alt="Profile" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 text-xl font-black shrink-0">
                  {user?.username?.charAt(0).toUpperCase() || <RiUserLine />}
                </div>
              )}
              <div>
                <h2 className="text-xl font-black text-gray-900">Participant Profile</h2>
                {user && (
                  <p className="text-xs text-gray-400 font-bold mt-0.5">
                    @{user.username} &middot; <span className="capitalize">{user.role}</span>
                    {user.isVerified && (
                      <span className="ml-2 inline-flex items-center gap-1 text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wider">
                        <RiCheckLine size={10} /> Verified
                      </span>
                    )}
                  </p>
                )}
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
              <RiCloseLine size={24} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 md:p-8 overflow-y-auto flex-1 space-y-6">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-40 text-blue-500">
                <RiLoader4Line className="animate-spin mb-4" size={32} />
                <p className="font-bold text-gray-400">Loading participant profile...</p>
              </div>
            ) : !user ? (
              <div className="text-center py-12 text-gray-400 font-bold">Failed to load user profile.</div>
            ) : (
              <>
                {/* Personal Details */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <SectionHeader icon={<RiUserLine size={16} />} title="Personal Details" />
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <InfoRow label="Username" value={user.username} />
                    <InfoRow label="First Name" value={user.personalInfo?.firstName} />
                    <InfoRow label="Last Name" value={user.personalInfo?.lastName} />
                    <InfoRow label="Gender" value={user.personalInfo?.gender} />
                    <InfoRow label="Date of Birth" value={user.personalInfo?.birthDate ? new Date(user.personalInfo.birthDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : null} />
                    <InfoRow label="Blood Group" value={user.personalInfo?.bloodGroup} />
                    <InfoRow label="Aadhaar Number" value={user.personalInfo?.aadhaarNumber} />
                    <InfoRow label="Role" value={user.role} />
                    <InfoRow label="Verification" value={user.verificationStatus} />
                  </div>
                </div>

                {/* Guardian Info */}
                {(user.guardianInfo?.fatherName || user.guardianInfo?.motherName || user.guardianInfo?.guardianName) && (
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <SectionHeader icon={<RiParentLine size={16} />} title="Guardian Information" />
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      <InfoRow label="Father's Name" value={user.guardianInfo?.fatherName} />
                      <InfoRow label="Mother's Name" value={user.guardianInfo?.motherName} />
                      {user.guardianInfo?.guardianName && <InfoRow label="Guardian Name" value={user.guardianInfo?.guardianName} />}
                    </div>
                  </div>
                )}

                {/* Contact & Address */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <SectionHeader icon={<RiMapPinLine size={16} />} title="Contact & Address" />
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <InfoRow label="Email Address" value={user.contactInfo?.email || user.email} />
                    <InfoRow label="Phone Number" value={user.contactInfo?.phone} />
                    <InfoRow label="City" value={user.contactInfo?.address?.city} />
                    <InfoRow label="State" value={user.contactInfo?.address?.state} />
                    <InfoRow label="Pin Code" value={user.contactInfo?.address?.pinCode} />
                    <div className="col-span-2 md:col-span-3">
                      <InfoRow label="Full Address" value={[
                        user.contactInfo?.address?.line1,
                        user.contactInfo?.address?.city,
                        user.contactInfo?.address?.state,
                        user.contactInfo?.address?.pinCode
                      ].filter(Boolean).join(', ') || null} />
                    </div>
                  </div>
                </div>

                {/* Documents */}
                {user.documents && Object.keys(user.documents).some(k => user.documents[k]) && (
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <SectionHeader icon={<RiFileTextLine size={16} />} title="Uploaded Documents" />
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {[
                        ['Photograph', 'photograph'],
                        ['DOB Proof', 'dobProof'],
                        ['Aadhaar Front', 'aadhaarFront'],
                        ['Aadhaar Back', 'aadhaarBack'],
                        ['Signature', 'signature'],
                        ['ID Proof', 'idProof'],
                        ['Address Proof', 'addressProof'],
                      ].map(([label, key]) => (
                        user.documents[key] ? (
                          <button
                            key={key}
                            onClick={() => setPreviewImage(user.documents[key])}
                            className="flex items-center justify-between w-full text-left bg-blue-50/50 border border-blue-100 rounded-xl px-4 py-3 hover:border-blue-300 hover:bg-blue-50 transition-all group"
                          >
                            <span className="text-xs font-black uppercase tracking-wider text-gray-700">{label}</span>
                            <RiExternalLinkLine className="text-blue-500 group-hover:scale-110 transition-transform" size={16} />
                          </button>
                        ) : null
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100 flex items-center justify-end shrink-0 bg-white rounded-b-[2rem]">
            <button
              onClick={onClose}
              className="px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-bold text-sm transition-colors"
            >
              Close Profile
            </button>
          </div>
        </div>
      </div>

      {/* Image Lightbox */}
      {previewImage && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
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
    </>
  );
};

export default EventUserProfileModal;
