const fs = require("fs");
const filePath = "d:/Rakesh React/Horse/Horse Riding/src/pages/admin/AdminUsers.jsx";
let content = fs.readFileSync(filePath, "utf8");

const startMarker = "              {/* Personal Details */}";
const endMarker = "              {/* Registration Documents */}";

const startIdx = content.indexOf(startMarker);
const endIdx = content.indexOf(endMarker);

const newUI = `              {/* Personal Details */}
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
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-5">
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
`;

if(startIdx !== -1 && endIdx !== -1) {
  content = content.substring(0, startIdx) + newUI + content.substring(endIdx);
  fs.writeFileSync(filePath, content, "utf8");
  console.log("Updated!");
} else {
  console.log("Not found.");
}
