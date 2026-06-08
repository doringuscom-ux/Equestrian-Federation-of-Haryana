import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  RiUserLine, 
  RiClipboardLine, 
  RiShieldCheckLine,
  RiArrowLeftLine,
  RiArrowRightLine,
  RiCloseLine,
  RiEyeLine,
  RiEyeOffLine,
  RiLockLine,
  RiLoader4Line,
  RiMoneyDollarCircleLine,
  RiQrCodeLine,
  RiBankCardLine,
  RiFileUploadLine,
  RiCheckDoubleLine,
  RiMapPinLine,
  RiParentLine,
  RiFileTextLine,
  RiUploadCloud2Line,
  RiDeleteBinLine
} from 'react-icons/ri';
import { API_BASE_URL } from '../config/api';

const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    body: formData
  });
  if (!res.ok) throw new Error('Upload failed');
  const data = await res.json();
  return data.url;
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [currentStep, setCurrentStep] = useState(1); // 1 = Account, 2 = Personal, 3 = Review
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingStates, setUploadingStates] = useState({}); // { field: 'loading' | 'success' | 'error' }
  const [passwordError, setPasswordError] = useState('');
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '', 
    role: 'player',
    personalInfo: {
      firstName: '',
      lastName: '',
      gender: '',
      birthDate: '',
      bloodGroup: '',
      aadhaarNumber: '',
    },
    guardianInfo: {
      fatherName: '',
      motherName: '',
      guardianName: '',
    },
    contactInfo: {
      email: '',
      phone: '',
      address: {
        line1: '',
        city: '',
        pinCode: '',
        district: '',
        state: '',
        village: '',
        postOffice: '',
      },
    },
documents: {
      photograph: '',
      aadhaarFront: '',
      aadhaarBack: '',
      dobProof: '',
      signature: '',
      clubLogo: '',
      clubLegalDoc: '',
    }
  });

  const [registrationFees, setRegistrationFees] = useState({ player: 0, coach: 0, club: 0 });
  const [paymentMethod, setPaymentMethod] = useState('online'); // 'online' or 'offline'
  const [regCode, setRegCode] = useState('');
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [previewDoc, setPreviewDoc] = useState(null);
  const [previewTitle, setPreviewTitle] = useState('');

  // Fetch Registration Fees
  React.useEffect(() => {
    const fetchFees = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/payment/fees`);
        if(res.ok) {
          const data = await res.json();
          setRegistrationFees(data);
        }
      } catch (err) {
        console.error('Error fetching fees:', err);
      }
    };
    fetchFees();
  }, []);

  const steps = [
    { id: 1, title: 'Account', icon: RiUserLine },
    { id: 2, title: 'Bio', icon: RiClipboardLine },
    { id: 3, title: 'Address', icon: RiMapPinLine },
    { id: 4, title: 'Files', icon: RiFileUploadLine },
    { id: 5, title: 'Review', icon: RiShieldCheckLine },
    { id: 6, title: 'Payment', icon: RiMoneyDollarCircleLine },
  ];

  const handleInputChange = (section, field, value) => {
    if (field === 'password') setPasswordError('');
    if (section === 'root') {
      setFormData(prev => {
        const newState = { ...prev, [field]: value };
        if (field === 'email') {
          newState.contactInfo = { ...prev.contactInfo, email: value };
        }
        return newState;
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [section]: { ...prev[section], [field]: value }
      }));
    }
  };

  const handleAddressChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      contactInfo: {
        ...(prev.contactInfo || {}),
        address: {
          ...(prev.contactInfo?.address || {}),
          [field]: value
        }
      }
    }));

    // PIN fetch disabled to prevent SSL errors
  };

  const handleFileUpload = async (field, file) => {
    if (!file) return;
    
    // Only JPG/PNG
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      alert('❌ Only JPG or PNG images are allowed.');
      return;
    }
    
    setUploadingStates(prev => ({ ...prev, [field]: 'loading' }));
    try {
      const url = await uploadToCloudinary(file);
      setFormData(prev => ({
        ...prev,
        documents: { ...prev.documents, [field]: url }
      }));
      setUploadingStates(prev => ({ ...prev, [field]: 'success' }));
    } catch (err) {
      console.error(err);
      setUploadingStates(prev => ({ ...prev, [field]: 'error' }));
      alert(`Upload failed: ${err.message}`);
    }
  };

  const [errors, setErrors] = useState({});

  const validateStep = (step) => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.username || formData.username.length < 3) newErrors.username = true;
      if (!formData.email || !formData.email.includes('@')) newErrors.email = true;
      
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;<>,.?/~\\-]).{8,}$/;
      if (!formData.password || !passwordRegex.test(formData.password)) {
        newErrors.password = true;
        setPasswordError("Password must be at least 8 characters long, contain at least 1 uppercase letter, 1 number, and 1 special character.");
      }
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = true;
      
      const allowedRoles = ['player', 'coach', 'club'];
      if (!formData.role || !allowedRoles.includes(formData.role)) {
        newErrors.role = 'Please select a valid role';
      }
    } else if (step === 2) {
      if (formData.role === 'club') {
if (!formData.clubInfo.contactPerson) newErrors.contactPerson = true;
      } else {
        if (!formData.personalInfo.firstName) newErrors.firstName = true;
        if (!formData.personalInfo.gender) newErrors.gender = true;
        if (!formData.personalInfo.birthDate) newErrors.birthDate = true;
        
        if (formData.role === 'player') {
          if (!formData.guardianInfo.fatherName) newErrors.fatherName = true;
          if (!formData.guardianInfo.motherName) newErrors.motherName = true;
        }
      }
      if (!formData.personalInfo.aadhaarNumber || !/^\d{12}$/.test(formData.personalInfo.aadhaarNumber)) newErrors.aadhaarNumber = true;
      if (!formData.contactInfo.phone || !/^\d{10}$/.test(formData.contactInfo.phone)) newErrors.phone = true;
    } else if (step === 3) {
      if (!formData.contactInfo.address.line1) newErrors.addressLine1 = true;
      if (!formData.contactInfo.address.pinCode || formData.contactInfo.address.pinCode.length !== 6) newErrors.pinCode = true;
      if (!formData.contactInfo.address.city) newErrors.city = true;
      if (!formData.contactInfo.address.state) newErrors.state = true;
    } else if (step === 4) {
      if (!formData.documents.photograph) newErrors.photograph = true;
      if (!formData.documents.aadhaarFront) newErrors.aadhaarFront = true;
      if (!formData.documents.aadhaarBack) newErrors.aadhaarBack = true;
      if (!formData.documents.signature) newErrors.signature = true;
      if (formData.role === 'player' && !formData.documents.dobProof) newErrors.dobProof = true;
      if (formData.role === 'club') {
        if (!formData.documents.clubLogo) newErrors.clubLogo = true;
        if (!formData.documents.clubLegalDoc) newErrors.clubLegalDoc = true;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 6) {
        setCurrentStep(prev => prev + 1);
        window.scrollTo(0, 0);
      } else {
        handleSubmit();
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async (directPaymentDetails = null) => {
    if (!validateStep(1) || !validateStep(2) || !validateStep(3) || !validateStep(4)) return;
    
    setIsSubmitting(true);
    try {
      const registrationData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        personalInfo: formData.personalInfo,
        guardianInfo: formData.guardianInfo,
        contactInfo: formData.contactInfo,
documents: formData.documents,
        paymentDetails: directPaymentDetails || paymentDetails,
        registrationCode: regCode,
        isRegistered: true
      };

      const result = await register(registrationData);
      if (result.success) {
        navigate('/profile');
      } else {
        alert(result.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-12 font-['Inter'] selection:bg-[#cba358]/30">
      <div className="max-w-4xl mx-auto px-4">
        {/* Dynamic Header */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-top-4 duration-1000">
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
            Join the <span className="text-[#cba358] font-['Playfair_Display']">EFH</span> Portal
          </h1>
          <p className="text-gray-600 text-lg font-medium max-w-xl mx-auto leading-relaxed">
            Quick 2-minute registration. Complete your full profile later to join major events.
          </p>
        </div>

        <div className="bg-white rounded-[2.5rem] p-1 shadow-2xl border border-gray-200/50">
          {isModalOpen && (
            <div className="p-8 md:p-12">
              {/* Progress Indicator */}
              <div className="flex justify-between items-center mb-16 relative">
                 {/* Progress Line */}
                <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-200 -translate-y-1/2 z-0" />
                <div 
                  className="absolute top-1/2 left-0 h-[2px] bg-[#cba358] -translate-y-1/2 z-0 transition-all duration-700 ease-out" 
                  style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                />
                
                {steps.map((step) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.id} className="relative z-10 flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-xl ${
                        currentStep === step.id ? 'bg-[#cba358] text-gray-900 scale-110 shadow-[#cba358]/20' : 
                        currentStep > step.id ? 'bg-emerald-500 text-gray-900' : 'bg-gray-100 text-gray-500 border border-gray-200'
                      }`}>
                        {currentStep > step.id ? <RiShieldCheckLine size={20} /> : <Icon size={20} />}
                      </div>
                      <span className={`absolute -bottom-8 whitespace-nowrap text-[8px] font-black uppercase tracking-widest transition-colors duration-500 ${
                        currentStep === step.id ? 'text-[#cba358]' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Form Content */}
              <div className="mt-20 min-h-[400px]">
                {/* --- Step 1: Account Setup --- */}
                {currentStep === 1 && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Username</label>
                        <div className="relative group">
                          <RiUserLine className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#cba358] transition-colors" />
                          <input 
                            type="text" 
                            placeholder="johndoe123"
                            className={`w-full bg-gray-50 border ${errors.username ? 'border-red-500' : 'border-gray-200'} text-gray-900 pl-12 pr-6 py-5 rounded-3xl outline-none focus:border-[#cba358]/50 focus:ring-4 focus:ring-[#cba358]/10 transition-all font-bold`}
                            onChange={(e) => handleInputChange('root', 'username', e.target.value)}
                            value={formData.username}
                          />
                        </div>
                        {errors.username && <p className="text-red-500 text-[10px] font-bold uppercase ml-1">Min 3 characters required</p>}
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Email Address</label>
                        <input 
                          type="email" 
                          placeholder="john@example.com"
                          className={`w-full bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-200'} text-gray-900 px-6 py-5 rounded-3xl outline-none focus:border-[#cba358]/50 focus:ring-4 focus:ring-[#cba358]/10 transition-all font-bold`}
                          onChange={(e) => handleInputChange('root', 'email', e.target.value)}
                          value={formData.email}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2 relative">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Password</label>
                        <div className="relative group">
                          <RiLockLine className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#cba358] transition-colors" />
                          <input 
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className={`w-full bg-gray-50 border ${errors.password ? 'border-red-500' : 'border-gray-200'} text-gray-900 pl-12 pr-14 py-5 rounded-3xl outline-none focus:border-[#cba358]/50 focus:ring-4 focus:ring-[#cba358]/10 transition-all font-bold`}
                            onChange={(e) => handleInputChange('root', 'password', e.target.value)}
                            value={formData.password}
                          />
                          <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900 transition-colors"
                          >
                            {showPassword ? <RiEyeOffLine size={20} /> : <RiEyeLine size={20} />}
                          </button>
                        </div>
                          {(formData.password.length > 0 || passwordError) && (
                            <div className="mt-3 p-4 bg-slate-50 border border-slate-100 rounded-2xl animate-in fade-in slide-in-from-top-2">
                              <h4 className="text-slate-700 font-black text-[10px] uppercase tracking-widest mb-3">Password Requirements</h4>
                              <div className="space-y-2">
                                {[
                                  { label: "At least 8 characters", valid: formData.password.length >= 8 },
                                  { label: "At least 1 uppercase letter", valid: /[A-Z]/.test(formData.password) },
                                  { label: "At least 1 number", valid: /\d/.test(formData.password) },
                                  { label: "At least 1 special character", valid: /[!@#$%^&*()_+={}\[\]:;<>,.?/~\\-]/.test(formData.password) }
                                ].map((rule, idx) => (
                                  <div key={idx} className="flex items-center gap-2">
                                    {rule.valid ? (
                                      <RiCheckDoubleLine className="text-emerald-500" size={14} />
                                    ) : (
                                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300 ml-1"></div>
                                    )}
                                    <span className={`text-[11px] font-bold ${rule.valid ? 'text-emerald-600' : 'text-slate-500'}`}>
                                      {rule.label}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                      </div>

                      <div className="space-y-2 relative">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Confirm Password</label>
                        <input 
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className={`w-full bg-gray-50 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'} text-gray-900 px-6 py-5 rounded-3xl outline-none focus:border-[#cba358]/50 focus:ring-4 focus:ring-[#cba358]/10 transition-all font-bold`}
                          onChange={(e) => handleInputChange('root', 'confirmPassword', e.target.value)}
                          value={formData.confirmPassword}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Select Role</label>
                      <select
                        className={`w-full bg-gray-50 border ${errors.role ? 'border-red-500' : 'border-gray-200'} text-gray-900 px-6 py-5 rounded-3xl outline-none focus:border-[#cba358]/50 focus:ring-4 focus:ring-[#cba358]/10 transition-all font-bold`}
                        onChange={(e) => handleInputChange('root', 'role', e.target.value)}
                        value={formData.role}
                      >
                        <option value="player">Player</option>
                        <option value="coach">Coach</option>
                      </select>
                      {errors.role && <p className="text-red-500 text-[10px] font-bold uppercase ml-1">{errors.role}</p>}
                    </div>
                  </div>
                )}

                {/* --- Step 2: Bio Information --- */}
                {currentStep === 2 && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
                    {formData.role === 'club' ? (
                      /* Club Specific Fields */
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Club Name</label>
                          <input 
                            type="text" 
                            placeholder="Enter Club Name" 
                            className={`w-full bg-gray-50 border ${errors.clubName ? 'border-red-500' : 'border-gray-200'} text-gray-900 px-6 py-5 rounded-3xl outline-none focus:border-[#cba358]/50 focus:ring-4 focus:ring-[#cba358]/10 transition-all font-bold`}
                            onChange={(e) => handleInputChange('clubInfo', 'clubName', e.target.value)}
                            value={formData.clubInfo.clubName}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Contact Person</label>
                          <input 
                            type="text" 
                            placeholder="Full Name of Representative" 
                            className={`w-full bg-gray-50 border ${errors.contactPerson ? 'border-red-500' : 'border-gray-200'} text-gray-900 px-6 py-5 rounded-3xl outline-none focus:border-[#cba358]/50 focus:ring-4 focus:ring-[#cba358]/10 transition-all font-bold`}
                            onChange={(e) => handleInputChange('clubInfo', 'contactPerson', e.target.value)}
                            value={formData.clubInfo.contactPerson}
                          />
                        </div>
                      </div>
                    ) : (
                      /* Player & Coach Fields */
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">First Name</label>
                            <input 
                              type="text" 
                              placeholder="First Name" 
                              className={`w-full bg-gray-50 border ${errors.firstName ? 'border-red-500' : 'border-gray-200'} text-gray-900 px-6 py-5 rounded-3xl outline-none transition-all font-bold`}
                              onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
                              value={formData.personalInfo.firstName}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Last Name (Optional)</label>
                            <input 
                              type="text" 
                              placeholder="Last Name (Optional)" 
                              className={`w-full bg-gray-50 border ${errors.lastName ? 'border-red-500' : 'border-gray-200'} text-gray-900 px-6 py-5 rounded-3xl outline-none transition-all font-bold`}
                              onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
                              value={formData.personalInfo.lastName}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Gender</label>
                            <select
                              className={`w-full bg-gray-50 border ${errors.gender ? 'border-red-500' : 'border-gray-200'} text-gray-900 px-6 py-5 rounded-3xl outline-none transition-all font-bold`}
                              onChange={(e) => handleInputChange('personalInfo', 'gender', e.target.value)}
                              value={formData.personalInfo.gender}
                            >
                              <option value="">Select Gender</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Date of Birth</label>
                            <input 
                              type="date" 
                              className={`w-full bg-gray-50 border ${errors.birthDate ? 'border-red-500' : 'border-gray-200'} text-gray-900 px-6 py-5 rounded-3xl outline-none transition-all font-bold`}
                              onChange={(e) => handleInputChange('personalInfo', 'birthDate', e.target.value)}
                              value={formData.personalInfo.birthDate}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Blood Group</label>
                            <select
                              className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-6 py-5 rounded-3xl outline-none transition-all font-bold"
                              onChange={(e) => handleInputChange('personalInfo', 'bloodGroup', e.target.value)}
                              value={formData.personalInfo.bloodGroup}
                            >
                              <option value="">Select Blood Group</option>
                              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Father's Name {formData.role === 'player' && <span className="text-red-500">*</span>}</label>
                            <input 
                              type="text" 
                              placeholder="Father's Full Name" 
                              className={`w-full bg-gray-50 border ${errors.fatherName ? 'border-red-500' : 'border-gray-200'} text-gray-900 px-6 py-5 rounded-3xl outline-none transition-all font-bold`}
                              onChange={(e) => handleInputChange('guardianInfo', 'fatherName', e.target.value)}
                              value={formData.guardianInfo.fatherName}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Mother's Name {formData.role === 'player' && <span className="text-red-500">*</span>}</label>
                            <input 
                              type="text" 
                              placeholder="Mother's Full Name" 
                              className={`w-full bg-gray-50 border ${errors.motherName ? 'border-red-500' : 'border-gray-200'} text-gray-900 px-6 py-5 rounded-3xl outline-none transition-all font-bold`}
                              onChange={(e) => handleInputChange('guardianInfo', 'motherName', e.target.value)}
                              value={formData.guardianInfo.motherName}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Guardian Name (Optional)</label>
                            <input 
                              type="text" 
                              placeholder="Guardian's Name" 
                              className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-6 py-5 rounded-3xl outline-none transition-all font-bold"
                              onChange={(e) => handleInputChange('guardianInfo', 'guardianName', e.target.value)}
                              value={formData.guardianInfo.guardianName}
                            />
                          </div>
                        </div>
                      </>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Phone Number (10 Digits)</label>
                        <input 
                          type="tel" 
                          placeholder="9468000044" 
                          maxLength="10"
                          className={`w-full bg-gray-50 border ${errors.phone ? 'border-red-500' : 'border-gray-200'} text-gray-900 px-6 py-5 rounded-3xl outline-none transition-all font-bold`}
                          onChange={(e) => handleInputChange('contactInfo', 'phone', e.target.value.replace(/\D/g, ''))}
                          value={formData.contactInfo.phone}
                        />
                        {errors.phone && <p className="text-red-500 text-[8px] font-black uppercase ml-1 mt-1">Valid 10-digit number required</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Aadhaar Number (12 Digits)</label>
                        <input 
                          type="text" 
                          placeholder="000011112222" 
                          maxLength="12"
                          className={`w-full bg-gray-50 border ${errors.aadhaarNumber ? 'border-red-500' : 'border-gray-200'} text-gray-900 px-6 py-5 rounded-3xl outline-none transition-all font-bold`}
                          onChange={(e) => handleInputChange('personalInfo', 'aadhaarNumber', e.target.value.replace(/\D/g, ''))}
                          value={formData.personalInfo.aadhaarNumber}
                        />
                        {errors.aadhaarNumber && <p className="text-red-500 text-[8px] font-black uppercase ml-1 mt-1">Valid 12-digit number required</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* --- Step 3: Address & Units --- */}
                {currentStep === 3 && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">

                    <div className="space-y-8">
                      <h3 className="text-xs font-black uppercase tracking-widest text-gray-600 border-b border-gray-200 pb-4">Residential Address</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="md:col-span-2 space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Address Line 1</label>
                          <input 
                            type="text" 
                            placeholder="House No, Street, Locality" 
                            className={`w-full bg-gray-50 border ${errors.addressLine1 ? 'border-red-500' : 'border-gray-200'} text-gray-900 px-6 py-5 rounded-3xl outline-none transition-all font-bold`}
                            onChange={(e) => handleAddressChange('line1', e.target.value)}
                            value={formData.contactInfo.address.line1}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Pin Code (Auto-fills City/State)</label>
                          <input 
                            type="text" 
                            placeholder="6-digit PIN" 
                            maxLength="6"
                            className={`w-full bg-gray-50 border ${errors.pinCode ? 'border-red-500' : 'border-gray-200'} text-gray-900 px-6 py-5 rounded-3xl outline-none transition-all font-bold`}
                            onChange={(e) => handleAddressChange('pinCode', e.target.value.replace(/\D/g, ''))}
                            value={formData.contactInfo.address.pinCode}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">City / Town</label>
                          <input 
                            type="text" 
                            className={`w-full bg-gray-50 border ${errors.city ? 'border-red-500' : 'border-gray-200'} text-gray-900 px-6 py-5 rounded-3xl outline-none transition-all font-bold`}
                            onChange={(e) => handleAddressChange('city', e.target.value)}
                            value={formData.contactInfo.address.city}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">District</label>
                          <input 
                            type="text" 
                            className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-6 py-5 rounded-3xl outline-none transition-all font-bold"
                            onChange={(e) => handleAddressChange('district', e.target.value)}
                            value={formData.contactInfo.address.district}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">State</label>
                          <input 
                            type="text" 
                            className={`w-full bg-gray-50 border ${errors.state ? 'border-red-500' : 'border-gray-200'} text-gray-900 px-6 py-5 rounded-3xl outline-none transition-all font-bold`}
                            onChange={(e) => handleAddressChange('state', e.target.value)}
                            value={formData.contactInfo.address.state}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* --- Step 4: Documents --- */}
                {currentStep === 4 && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* Photograph */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Photograph <span className="text-red-500">*</span></label>
                        <div className={`relative border-2 border-dashed rounded-3xl p-4 transition-all ${formData.documents.photograph ? 'border-emerald-500 bg-green-50' : errors.photograph ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'}`}>
                           <div className="flex flex-col items-center justify-center py-4 gap-2">
                              <RiUserLine className={formData.documents.photograph ? 'text-emerald-500' : 'text-gray-400'} size={24} />
                              <span className="text-[9px] font-black uppercase tracking-widest text-gray-500 text-center">
                                {uploadingStates.photograph === 'loading' ? 'Uploading...' : formData.documents.photograph ? 'Uploaded ✅' : 'Choose Photo'}
                              </span>
                              {formData.documents.photograph && (
                                <button 
                                  type="button"
                                  onClick={() => { setPreviewDoc(formData.documents.photograph); setPreviewTitle('Photograph'); }}
                                  className="z-20 mt-2 px-4 py-1.5 bg-[#cba358] hover:bg-[#cba358] text-gray-900 text-[8px] font-black uppercase rounded-xl transition-all"
                                >
                                  View File
                                </button>
                              )}
                           </div>
                           <input type="file" className={`absolute inset-0 opacity-0 cursor-pointer ${formData.documents.photograph ? 'z-10 w-1/2' : 'z-10'}`} onChange={(e) => handleFileUpload('photograph', e.target.files[0])} disabled={uploadingStates.photograph === 'loading'} title={formData.documents.photograph ? "Change File" : "Choose File"} />
                        </div>
                      </div>

                      {/* Signature */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Signature <span className="text-red-500">*</span></label>
                        <div className={`relative border-2 border-dashed rounded-3xl p-4 transition-all ${formData.documents.signature ? 'border-emerald-500 bg-green-50' : errors.signature ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'}`}>
                           <div className="flex flex-col items-center justify-center py-4 gap-2">
                              <RiFileUploadLine className={formData.documents.signature ? 'text-emerald-500' : 'text-gray-400'} size={24} />
                              <span className="text-[9px] font-black uppercase tracking-widest text-gray-500 text-center">
                                {uploadingStates.signature === 'loading' ? 'Uploading...' : formData.documents.signature ? 'Uploaded ✅' : 'Digital Sign'}
                              </span>
                              {formData.documents.signature && (
                                <button 
                                  type="button"
                                  onClick={() => { setPreviewDoc(formData.documents.signature); setPreviewTitle('Signature'); }}
                                  className="z-20 mt-2 px-4 py-1.5 bg-[#cba358] hover:bg-[#cba358] text-gray-900 text-[8px] font-black uppercase rounded-xl transition-all"
                                >
                                  View File
                                </button>
                              )}
                           </div>
                           <input type="file" className={`absolute inset-0 opacity-0 cursor-pointer ${formData.documents.signature ? 'z-10 w-1/2' : 'z-10'}`} onChange={(e) => handleFileUpload('signature', e.target.files[0])} disabled={uploadingStates.signature === 'loading'} title={formData.documents.signature ? "Change File" : "Choose File"} />
                        </div>
                      </div>

                      {/* DOB Proof (Required for Players) */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">DOB Proof {formData.role === 'player' && <span className="text-red-500">*</span>}</label>
                        <div className={`relative border-2 border-dashed rounded-3xl p-4 transition-all ${formData.documents.dobProof ? 'border-emerald-500 bg-green-50' : errors.dobProof ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'}`}>
                           <div className="flex flex-col items-center justify-center py-4 gap-2">
                              <RiFileTextLine className={formData.documents.dobProof ? 'text-emerald-500' : 'text-gray-400'} size={24} />
                              <span className="text-[9px] font-black uppercase tracking-widest text-gray-500 text-center">
                                {uploadingStates.dobProof === 'loading' ? 'Uploading...' : formData.documents.dobProof ? 'Uploaded ✅' : 'DMC / Birth Cert'}
                              </span>
                              {formData.documents.dobProof && (
                                <button 
                                  type="button"
                                  onClick={() => { setPreviewDoc(formData.documents.dobProof); setPreviewTitle('DOB Proof'); }}
                                  className="z-20 mt-2 px-4 py-1.5 bg-[#cba358] hover:bg-[#cba358] text-gray-900 text-[8px] font-black uppercase rounded-xl transition-all"
                                >
                                  View File
                                </button>
                              )}
                           </div>
                           <input type="file" className={`absolute inset-0 opacity-0 cursor-pointer ${formData.documents.dobProof ? 'z-10 w-1/2' : 'z-10'}`} onChange={(e) => handleFileUpload('dobProof', e.target.files[0])} disabled={uploadingStates.dobProof === 'loading'} title={formData.documents.dobProof ? "Change File" : "Choose File"} />
                        </div>
                      </div>

                      {/* Aadhaar Front */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Aadhaar Front <span className="text-red-500">*</span></label>
                        <div className={`relative border-2 border-dashed rounded-3xl p-4 transition-all ${formData.documents.aadhaarFront ? 'border-emerald-500 bg-green-50' : errors.aadhaarFront ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'}`}>
                           <div className="flex flex-col items-center justify-center py-4 gap-2">
                              <RiUploadCloud2Line className={formData.documents.aadhaarFront ? 'text-emerald-500' : 'text-gray-400'} size={24} />
                              <span className="text-[9px] font-black uppercase tracking-widest text-gray-500 text-center">
                                {uploadingStates.aadhaarFront === 'loading' ? 'Uploading...' : formData.documents.aadhaarFront ? 'Uploaded ✅' : 'Front Side'}
                              </span>
                              {formData.documents.aadhaarFront && (
                                <button 
                                  type="button"
                                  onClick={() => { setPreviewDoc(formData.documents.aadhaarFront); setPreviewTitle('Aadhaar Front'); }}
                                  className="z-20 mt-2 px-4 py-1.5 bg-[#cba358] hover:bg-[#cba358] text-gray-900 text-[8px] font-black uppercase rounded-xl transition-all"
                                >
                                  View File
                                </button>
                              )}
                           </div>
                           <input type="file" className={`absolute inset-0 opacity-0 cursor-pointer ${formData.documents.aadhaarFront ? 'z-10 w-1/2' : 'z-10'}`} onChange={(e) => handleFileUpload('aadhaarFront', e.target.files[0])} disabled={uploadingStates.aadhaarFront === 'loading'} title={formData.documents.aadhaarFront ? "Change File" : "Choose File"} />
                        </div>
                      </div>

                      {/* Aadhaar Back */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Aadhaar Back <span className="text-red-500">*</span></label>
                        <div className={`relative border-2 border-dashed rounded-3xl p-4 transition-all ${formData.documents.aadhaarBack ? 'border-emerald-500 bg-green-50' : errors.aadhaarBack ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'}`}>
                           <div className="flex flex-col items-center justify-center py-4 gap-2">
                              <RiUploadCloud2Line className={formData.documents.aadhaarBack ? 'text-emerald-500' : 'text-gray-400'} size={24} />
                              <span className="text-[9px] font-black uppercase tracking-widest text-gray-500 text-center">
                                {uploadingStates.aadhaarBack === 'loading' ? 'Uploading...' : formData.documents.aadhaarBack ? 'Uploaded ✅' : 'Back Side'}
                              </span>
                              {formData.documents.aadhaarBack && (
                                <button 
                                  type="button"
                                  onClick={() => { setPreviewDoc(formData.documents.aadhaarBack); setPreviewTitle('Aadhaar Back'); }}
                                  className="z-20 mt-2 px-4 py-1.5 bg-[#cba358] hover:bg-[#cba358] text-gray-900 text-[8px] font-black uppercase rounded-xl transition-all"
                                >
                                  View File
                                </button>
                              )}
                           </div>
                           <input type="file" className={`absolute inset-0 opacity-0 cursor-pointer ${formData.documents.aadhaarBack ? 'z-10 w-1/2' : 'z-10'}`} onChange={(e) => handleFileUpload('aadhaarBack', e.target.files[0])} disabled={uploadingStates.aadhaarBack === 'loading'} title={formData.documents.aadhaarBack ? "Change File" : "Choose File"} />
                        </div>
                      </div>

                      {formData.role === 'club' && (
                        <>
                          {/* Club Logo / Image */}
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Club Logo / Photo <span className="text-red-500">*</span></label>
                            <div className={`relative border-2 border-dashed rounded-3xl p-4 transition-all ${formData.documents.clubLogo ? 'border-emerald-500 bg-green-50' : errors.clubLogo ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'}`}>
                               <div className="flex flex-col items-center justify-center py-4 gap-2">
                                  <RiUploadCloud2Line className={formData.documents.clubLogo ? 'text-emerald-500' : 'text-gray-400'} size={24} />
                                  <span className="text-[9px] font-black uppercase tracking-widest text-gray-500 text-center">
                                    {uploadingStates.clubLogo === 'loading' ? 'Uploading...' : formData.documents.clubLogo ? 'Uploaded ✅' : 'Upload Logo'}
                                  </span>
                                  {formData.documents.clubLogo && (
                                    <button 
                                      type="button"
                                      onClick={() => { setPreviewDoc(formData.documents.clubLogo); setPreviewTitle('Club Logo'); }}
                                      className="z-20 mt-2 px-4 py-1.5 bg-[#cba358] hover:bg-[#cba358] text-gray-900 text-[8px] font-black uppercase rounded-xl transition-all"
                                    >
                                      View File
                                    </button>
                                  )}
                               </div>
                               <input type="file" className={`absolute inset-0 opacity-0 cursor-pointer ${formData.documents.clubLogo ? 'z-10 w-1/2' : 'z-10'}`} onChange={(e) => handleFileUpload('clubLogo', e.target.files[0])} disabled={uploadingStates.clubLogo === 'loading'} title={formData.documents.clubLogo ? "Change File" : "Choose File"} />
                            </div>
                          </div>

                          {/* Club Legal Document */}
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Legal / Reg. Document <span className="text-red-500">*</span></label>
                            <div className={`relative border-2 border-dashed rounded-3xl p-4 transition-all ${formData.documents.clubLegalDoc ? 'border-emerald-500 bg-green-50' : errors.clubLegalDoc ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'}`}>
                               <div className="flex flex-col items-center justify-center py-4 gap-2">
                                  <RiFileTextLine className={formData.documents.clubLegalDoc ? 'text-emerald-500' : 'text-gray-400'} size={24} />
                                  <span className="text-[9px] font-black uppercase tracking-widest text-gray-500 text-center">
                                    {uploadingStates.clubLegalDoc === 'loading' ? 'Uploading...' : formData.documents.clubLegalDoc ? 'Uploaded ✅' : 'Upload Proof'}
                                  </span>
                                  {formData.documents.clubLegalDoc && (
                                    <button 
                                      type="button"
                                      onClick={() => { setPreviewDoc(formData.documents.clubLegalDoc); setPreviewTitle('Legal Document'); }}
                                      className="z-20 mt-2 px-4 py-1.5 bg-[#cba358] hover:bg-[#cba358] text-gray-900 text-[8px] font-black uppercase rounded-xl transition-all"
                                    >
                                      View File
                                    </button>
                                  )}
                               </div>
                               <input type="file" className={`absolute inset-0 opacity-0 cursor-pointer ${formData.documents.clubLegalDoc ? 'z-10 w-1/2' : 'z-10'}`} onChange={(e) => handleFileUpload('clubLegalDoc', e.target.files[0])} disabled={uploadingStates.clubLegalDoc === 'loading'} title={formData.documents.clubLegalDoc ? "Change File" : "Choose File"} />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* --- Step 5: Final Review --- */}
                {currentStep === 5 && (
                  <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-700">
                    <div className="bg-[#cba358]/5 rounded-4xl p-10 border border-[#cba358]/10 backdrop-blur-3xl">
                      <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                        <RiShieldCheckLine className="text-[#cba358]" /> Final Review
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-sm">
                        <div className="space-y-6">
                           <div className="space-y-2">
                             <p className="text-gray-500 uppercase text-[10px] font-black tracking-widest">Account Info</p>
                             <p className="text-gray-900 font-bold"><span className="text-gray-400">Email:</span> {formData.email}</p>
                             <p className="text-gray-900 font-bold"><span className="text-gray-400">Role:</span> <span className="capitalize">{formData.role}</span></p>
                           </div>
                           
                           <div className="space-y-2">
                             <p className="text-gray-500 uppercase text-[10px] font-black tracking-widest">Bio Data</p>
                             {formData.role === 'club' ? (
                               <>

                               </>
                             ) : (
                               <>
                                 <p className="text-gray-900 font-bold"><span className="text-gray-400">Name:</span> {formData.personalInfo.firstName} {formData.personalInfo.middleName} {formData.personalInfo.lastName}</p>
                                 <p className="text-gray-900 font-bold"><span className="text-gray-400">DOB:</span> {formData.personalInfo.birthDate}</p>
                                 {formData.role === 'player' && <p className="text-gray-900 font-bold"><span className="text-gray-400">Parents:</span> {formData.guardianInfo.fatherName} / {formData.guardianInfo.motherName}</p>}
                               </>
                             )}
                             <p className="text-gray-900 font-bold"><span className="text-gray-400">Phone:</span> {formData.contactInfo.phone}</p>
                             <p className="text-gray-900 font-bold"><span className="text-gray-400">Aadhaar:</span> {formData.personalInfo.aadhaarNumber}</p>
                           </div>
                        </div>

                        <div className="space-y-6">
                           <div className="space-y-2">
                             <p className="text-gray-500 uppercase text-[10px] font-black tracking-widest">Address & Units</p>
                             <p className="text-gray-900 font-bold line-clamp-2"><span className="text-gray-400">Address:</span> {formData.contactInfo.address.line1}, {formData.contactInfo.address.city}, {formData.contactInfo.address.state} - {formData.contactInfo.address.pinCode}</p>
                           </div>

                           <div className="space-y-2">
                             <p className="text-gray-500 uppercase text-[10px] font-black tracking-widest">Documents Status</p>
                             <div className="flex flex-wrap gap-2 pt-1">
                               {Object.entries(formData.documents)
                                 .filter(([key]) => {
                                   if (key === 'dobProof') return formData.role === 'player';
                                   if (key === 'clubLogo' || key === 'clubLegalDoc') return formData.role === 'club';
                                   return true;
                                 })
                                 .map(([key, url]) => (
                                   <button 
                                     key={key} 
                                     type="button"
                                     onClick={() => url && (setPreviewDoc(url), setPreviewTitle(key))}
                                     className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter transition-all ${url ? 'bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/30 cursor-pointer' : 'bg-red-500/20 text-red-500 cursor-not-allowed'}`}
                                   >
                                     {key}: {url ? 'View' : 'Missing'}
                                   </button>
                                 ))}
                             </div>
                           </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 bg-emerald-500/10 p-6 rounded-3xl border border-emerald-500/20">
                        <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-gray-900 shrink-0">
                            <RiShieldCheckLine size={24} />
                        </div>
                        <p className="text-emerald-500 font-bold text-[10px] uppercase tracking-widest leading-relaxed">
                            I verify that all information provided is accurate and belongs to me. Any false information may lead to rejection of membership.
                        </p>
                    </div>
                  </div>
                )}


                {/* --- Step 6: Payment & Verification --- */}
                {currentStep === 6 && (
                  <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-700">
                    <div className="bg-gray-100/50 rounded-4xl p-10 border border-gray-200 backdrop-blur-3xl">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                        <div>
                          <h3 className="text-2xl font-black text-gray-900 mb-2">Registration Fee</h3>
                          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Selected Role: <span className="text-[#cba358]">{formData.role}</span></p>
                        </div>
                        <div className="text-4xl font-black text-gray-900 bg-[#cba358]/10 px-8 py-4 rounded-3xl border border-[#cba358]/20">
                          ₹{registrationFees[formData.role] || 0}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('online')}
                          className={`flex items-center gap-4 p-6 rounded-3xl border transition-all ${
                            paymentMethod === 'online' 
                            ? 'bg-[#cba358] border-[#cba358] text-gray-900 shadow-xl shadow-[#cba358]/20' 
                            : 'bg-gray-50 border-gray-200 text-gray-500 hover:border-slate-700'
                          }`}
                        >
                          <RiBankCardLine size={24} />
                          <div className="text-left">
                            <p className="font-black text-xs uppercase tracking-widest">Pay Online</p>
                            <p className="text-[10px] opacity-60">UPI Only (Google Pay, PhonePe, Paytm, etc.)</p>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPaymentMethod('offline')}
                          className={`flex items-center gap-4 p-6 rounded-3xl border transition-all ${
                            paymentMethod === 'offline' 
                            ? 'bg-emerald-600 border-emerald-400 text-gray-900 shadow-xl shadow-emerald-500/20' 
                            : 'bg-gray-50 border-gray-200 text-gray-500 hover:border-slate-700'
                          }`}
                        >
                          <RiQrCodeLine size={24} />
                          <div className="text-left">
                            <p className="font-black text-xs uppercase tracking-widest">Offline Code</p>
                            <p className="text-[10px] opacity-60">Enter code for cash payments</p>
                          </div>
                        </button>
                      </div>

                      {paymentMethod === 'offline' && (
                        <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-top-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Registration Code</label>
                          <input 
                            type="text" 
                            placeholder="ENTER CODE" 
                            className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-8 py-5 rounded-3xl outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 transition-all font-black text-center tracking-[0.5em] uppercase"
                            value={regCode}
                            onChange={(e) => setRegCode(e.target.value)}
                          />
                          <p className="text-[10px] text-gray-500 text-center font-medium">Please enter the code provided by the EFH Admin for your email: <span className="text-slate-300">{formData.email}</span></p>
                        </div>
                      )}

                      {paymentMethod === 'online' && !paymentDetails && (
                        <div className="mt-8 text-center animate-in fade-in slide-in-from-top-2">
                           <button
                            type="button"
                            onClick={async () => {
                              try {
                                setIsSubmitting(true);
                                const res = await fetch(`${API_BASE_URL}/payment/create-registration-order`, {
                                  method: 'POST',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({
                                    role: formData.role,
                                    email: formData.email,
                                    username: formData.username
                                  })
                                });
                                if (!res.ok) {
                                  const errorData = await res.json();
                                  throw new Error(errorData.message || 'Error creating payment order');
                                }
                                const data = await res.json();

                                const options = {
                                  key: data.keyId,
                                  amount: data.amount,
                                  currency: "INR",
                                  name: "EFH Portal",
                                  description: `Registration Fee for ${formData.role}`,
                                  order_id: data.orderId,
                                  handler: function (response) {
                                    setPaymentDetails(response);
                                    handleSubmit(response);
                                  },
                                  prefill: {
                                    name: `${formData.personalInfo.firstName} ${formData.personalInfo.lastName}`,
                                    email: formData.email,
                                  },
                                  theme: {
                                    color: "#cba358",
                                  },
                                  retry: {
                                    enabled: false
                                  },
                                  modal: {
                                    ondismiss: function() {
                                      setIsSubmitting(false);
                                    }
                                  }
                                };

                                const rzp = new window.Razorpay(options);
                                rzp.open();
                              } catch (err) {
                                alert(err.response?.data?.message || 'Error creating payment order');
                              } finally {
                                // Don't set isSubmitting to false here because we want it to stay true 
                                // until registration is complete after payment, or until modal is closed
                              }
                            }}
                            className="px-10 py-5 bg-[#cba358] hover:bg-blue-700 text-gray-900 rounded-3xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-[#cba358]/20"
                           >
                             Initialize Payment
                           </button>
                        </div>
                      )}

                      {paymentMethod === 'online' && paymentDetails && (
                        <div className="mt-8 flex items-center gap-4 bg-emerald-500/10 p-6 rounded-3xl border border-emerald-500/20 animate-in zoom-in-95">
                           <RiShieldCheckLine className="text-emerald-500" size={32} />
                           <div>
                             <p className="text-emerald-500 font-black text-xs uppercase tracking-widest">Payment Verified</p>
                             <p className="text-emerald-500/70 text-[10px] font-bold">Transaction ID: {paymentDetails.razorpay_payment_id}</p>
                           </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* --- Navigation Buttons --- */}
                <div className="flex flex-col sm:flex-row justify-between items-center pt-16 gap-6">
                  {currentStep > 1 ? (
                    <button 
                      onClick={handlePrev}
                      className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 bg-white/5 border border-gray-200 text-gray-600 rounded-4xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-white/10 hover:text-gray-900 transition-all shadow-sm"
                    >
                      <RiArrowLeftLine /> Back
                    </button>
                  ) : <div className="hidden sm:block"></div>}
                  
                  <button 
                    onClick={handleNext}
                    disabled={isSubmitting || (currentStep === 6 && paymentMethod === 'online' && !paymentDetails && registrationFees[formData.role] > 0)}
                    className={`w-full sm:w-auto flex items-center justify-center gap-4 px-16 py-6 rounded-4xl font-black text-[13px] uppercase tracking-[0.3em] transition-all shadow-2xl active:scale-95 group ${
                        currentStep === 6 ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20' : 'bg-[#cba358] hover:bg-blue-700 shadow-[#cba358]/20'
                    } text-gray-900 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <>
                        <RiLoader4Line className="animate-spin text-gray-900" /> {currentStep === 6 ? 'Finalizing...' : 'Processing...'}
                      </>
                    ) : (
                      <>
                        {currentStep === 6 ? 'Complete Registration' : 'Continue'} <RiArrowRightLine className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Document Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="relative w-full max-w-4xl bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-200">
              <div className="flex justify-between items-center px-8 py-6 border-b border-gray-200">
                 <h3 className="text-gray-900 font-black uppercase tracking-widest text-sm">{previewTitle}</h3>
                 <button onClick={() => setPreviewDoc(null)} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors">
                    <RiCloseLine size={24} />
                 </button>
              </div>
              <div className="p-8 flex justify-center items-center bg-gray-50 min-h-[400px]">
                 {previewDoc.toLowerCase().includes('.pdf') ? (
                   <iframe src={previewDoc} className="w-full h-[600px] rounded-2xl" title="PDF Preview"></iframe>
                 ) : (
                   <img src={previewDoc} alt="Preview" className="max-w-full max-h-[70vh] rounded-2xl object-contain shadow-2xl" />
                 )}
              </div>
           </div>
        </div>
      )}

    </div>
  );
};

export default RegisterPage;
