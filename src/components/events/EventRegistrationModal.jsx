import React, { useState, useEffect } from 'react';
import {
  RiCloseLine,
  RiUserHeartLine,
  RiTeamLine,
  RiBuilding2Line,
  RiEyeLine,
  RiArrowRightLine,
  RiLoader4Line,
  RiCheckDoubleLine,
  RiArrowLeftLine,
  RiInformationLine,
  RiMoneyDollarCircleLine,
  RiShieldUserLine
} from 'react-icons/ri';
import api from '../../api/apiConfig';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { validateProfileCompletion } from '../../utils/profileValidation';

// Razorpay SDK is now loaded globally via index.html but we include a dynamic fallback here
const loadRazorpaySDK = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const EventRegistrationModal = ({ event, onClose, onDashboardUpdate, initialRole }) => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState(initialRole || '');
  const [loading, setLoading] = useState(false);
  const [fetchingRole, setFetchingRole] = useState(true);
  const [backendUser, setBackendUser] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // 1: Details, 2: Review & Pay

  // 1. Fetch latest role from backend on mount
  React.useEffect(() => {
    const getLatestRole = async () => {
      if (!user) {
        setFetchingRole(false);
        return;
      }
      try {
        const response = await api.get('/auth/me');
        setBackendUser(response.data);
        let latestRole = response.data.role?.toLowerCase();
        if (latestRole === 'viewer') latestRole = 'spectator';
        if (!latestRole || latestRole === 'user' || latestRole === 'admin') latestRole = 'player'; // Default fallback
        setRole(latestRole);
      } catch (err) {
        console.error('Error fetching latest role:', err);
        setRole(user?.role?.toLowerCase() || 'player');
      } finally {
        setFetchingRole(false);
      }
    };
    getLatestRole();
  }, [user]);

  // Payment & Coupon State
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [validatingCoupon, setValidatingCoupon] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const roles = [
    { id: 'player', title: 'Player', icon: RiUserHeartLine, color: 'blue', desc: 'Participate as a competitor' },
    { id: 'coach', title: 'Coach', icon: RiTeamLine, color: 'emerald', desc: 'Join as official faculty' },
    { id: 'club', title: 'Club', icon: RiBuilding2Line, color: 'purple', desc: 'Represent your organization' }
  ];

  const validateCoupon = async () => {
    if (!couponCode.trim()) return;
    setValidatingCoupon(true);
    setError('');
    try {
      const email = user?.email || '';
      const response = await api.get(`/payment/validate-coupon/${couponCode.trim()}?email=${email}&role=${role}`);
      setAppliedCoupon(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid coupon code');
      setAppliedCoupon(null);
    } finally {
      setValidatingCoupon(false);
    }
  };

  const getBasePrice = () => {
    const schemaRole = role === 'player' ? 'athlete' : role;
    return Number(event.pricing?.[schemaRole]) || 0;
  };

  const getFinalPrice = () => {
    const basePrice = getBasePrice();

    if (!appliedCoupon) return basePrice;

    let discountedAmount = basePrice;
    if (appliedCoupon.discountType === 'fixed') {
      discountedAmount = basePrice - Number(appliedCoupon.discountValue);
    } else {
      discountedAmount = basePrice - (basePrice * (Number(appliedCoupon.discountValue) / 100));
    }

    // Ensure minimum ₹1 for paid events (Razorpay requirement)
    if (basePrice > 0 && discountedAmount < 1) {
      return 1;
    }
    
    return Math.max(0, Math.round(discountedAmount));
  };

  const handleStepNext = () => {
    if (!role) {
      setError('Please select a participation role');
      return;
    }

    if (event.registrationOpen === false || (event.registrationDeadline && new Date() > new Date(event.registrationDeadline))) {
      setError('Registration for this event is closed.');
      return;
    }

    // For logged in users, check verification
    if (user) {
      const validation = validateProfileCompletion(user);
      if (!validation.isVerified) {
        setError('Your profile is awaiting Admin verification. You cannot join events yet.');
        return;
      }
      if (!validation.isComplete) {
        setError(`Profile incomplete. Missing: ${validation.missingFields.join(', ')}`);
        return;
      }
    } else {
      setError('Please login to register for this event');
      return;
    }

    setError('');
    setStep(2);
  };

  const handleRegister = async () => {
    if (!role) {
      setError('Please select a participation role');
      return;
    }

    if (!user) {
      setError('Please login first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      let currentUser = user;

      // 2. Create Razorpay Order
      const orderResponse = await api.post('/payment/create-order', {
        eventId: event._id,
        userId: currentUser._id,
        role: role,
        couponCode: appliedCoupon ? appliedCoupon.code : null,
        offlineCode: appliedCoupon ? appliedCoupon.code : null
      });

      const { orderId, amount, registrationId, keyId } = orderResponse.data;

      // 3. Check if it's a free event
      if (orderId === 'FREE_EVENT' || amount === 0) {
        setSuccess(true);
        if (onDashboardUpdate) onDashboardUpdate();
        setLoading(false);
        return; // Skip opening Razorpay
      }

      // 4. Open Razorpay Checkout
      const options = {
        key: keyId || 'rzp_test_YOUR_KEY_ID',
        amount: amount,
        currency: 'INR',
        name: 'EFH Portal',
        description: `Registration for ${event.title}`,
        order_id: orderId,
        retry: {
          enabled: false
        },
        handler: async (response) => {
          setPaymentLoading(true);
          try {
            // 5. Verify Payment
            const verifyRes = await api.post('/payment/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              registrationId,
              status: 'success'
            });

            if (verifyRes.data.success) {
              setSuccess(true);
              if (onDashboardUpdate) onDashboardUpdate();
            } else {
              setError('Payment verification failed.');
            }
          } catch (err) {
            setError('Error verifying payment.');
          } finally {
            setPaymentLoading(false);
            setLoading(false);
          }
        },
        prefill: {
          name: currentUser.personalInfo?.firstName || currentUser.username,
          email: currentUser.email,
          contact: currentUser.contactInfo?.phone,
        },
        theme: {
          color: '#2563eb',
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            setError('Payment cancelled by user. Registration not confirmed.');
          }
        }
      };

      if (typeof window.Razorpay === 'undefined') {
        const loaded = await loadRazorpaySDK();
        if (!loaded || typeof window.Razorpay === 'undefined') {
          setError('Razorpay SDK could not be loaded. Please ensure you have an active internet connection and no script blockers.');
          setLoading(false);
          return;
        }
      }

      const rzp = new window.Razorpay(options);

      rzp.on('payment.failed', async function (response) {
        console.error('Payment Failed Event:', response.error);
        await api.post('/payment/verify', {
          razorpay_order_id: response.error.metadata.order_id,
          razorpay_payment_id: response.error.metadata.payment_id,
          registrationId,
          status: 'failed'
        });
        setError(`Payment failed: ${response.error.description}`);
        setLoading(false);
      });

      console.log('Opening Razorpay Modal...');
      try {
        rzp.open();
      } catch (err) {
        console.error('Error calling rzp.open():', err);
        setError('Could not open payment window. Check if your browser is blocking popups.');
      }

    } catch (err) {
      console.error('Registration/Payment Error:', err);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-white/90 backdrop-blur-md">
        <div className="bg-white rounded-[3rem] p-12 max-w-md w-full text-center animate-scale-in">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <RiCheckDoubleLine size={40} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4">Registration Confirmed!</h2>
          <p className="text-gray-500 font-medium mb-10 leading-relaxed">
            You have successfully joined <strong>{event.title}</strong> as a {role}. See you at the venue!
          </p>
          <button
            onClick={() => {
              if (onDashboardUpdate) onDashboardUpdate();
              onClose();
            }}
            className="w-full py-5 bg-white text-gray-900 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl"
          >
            Great, Thanks!
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-2 sm:p-4 bg-white/95 backdrop-blur-xl overflow-y-auto pt-10 pb-10 sm:pt-20 sm:pb-20">
      <div className="bg-white rounded-3xl sm:rounded-[3rem] w-full max-w-4xl relative animate-fade-in-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-8 right-8 p-3 bg-slate-100 hover:bg-slate-200 rounded-full text-gray-500 transition-colors z-20"
        >
          <RiCloseLine size={24} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-5 h-full">
          {/* Left Side: Event Summary */}
          <div className="lg:col-span-2 bg-slate-50 p-6 sm:p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-slate-100 rounded-t-3xl sm:rounded-t-[3rem] lg:rounded-t-0 lg:rounded-l-[3rem]">
            <span className="text-[#cba358] font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Joining Event</span>
            <h2 className="text-3xl font-black text-slate-900 mb-6 leading-tight">{event.title}</h2>

            <div className="space-y-6 pt-6 border-t border-slate-200">
              <div>
                <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest mb-1">Date</p>
                <p className="font-bold text-slate-700">{new Date(event.date).toDateString()}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest mb-1">Location</p>
                <p className="font-bold text-slate-700">{event.location}</p>
              </div>
            </div>

            <div className="mt-8 lg:mt-12 p-5 sm:p-6 bg-[#cba358] rounded-2xl sm:rounded-3xl text-gray-900">
              <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest mb-2">Member Perk</p>
              <p className="text-xs sm:text-sm font-medium leading-relaxed opacity-90">All your linked certificates and records will be updated automatically after the event.</p>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="lg:col-span-3 p-6 sm:p-8 lg:p-12">
            <div className="mb-10">
              <h3 className="text-2xl font-black text-slate-900 mb-2">Registration Form.</h3>
              <p className="text-gray-600 font-bold uppercase tracking-[0.2em] text-[10px]">
                {user ? `One-click member registration (${backendUser?.role || 'loading...'})` : 'Access restricted to members only'}
              </p>
            </div>

            {error && (
              <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-xs font-bold animate-shake">
                {error}
              </div>
            )}

            <div className="space-y-10">
              {!user ? (
                <div className="py-20 flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in zoom-in duration-700">
                  <div className="w-24 h-24 bg-blue-50 text-[#cba358] rounded-[2rem] flex items-center justify-center shadow-2xl shadow-[#cba358]/10 ring-8 ring-blue-50/50">
                    <RiShieldUserLine size={48} />
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic">Login <span className="text-[#cba358]">First.</span></h4>
                    <p className="text-gray-500 font-bold text-sm max-w-[280px] leading-relaxed">You need to be an EFH member to participate in events. Please sign in or create an account.</p>
                  </div>
                  <button
                    onClick={() => navigate('/login')}
                    className="px-12 py-5 bg-white text-gray-900 rounded-3xl font-black uppercase tracking-[0.3em] text-[11px] shadow-2xl shadow-slate-200 hover:bg-[#cba358] hover:-translate-y-1 active:scale-95 transition-all"
                  >
                    Go to Login Page
                  </button>
                </div>
              ) : step === 1 ? (
                <>
                  {/* Coupon Section (Step 1) */}
                  <div className="pt-2">
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mb-4 ml-1">1. Have a Coupon?</label>
                    <div className="flex gap-3">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          placeholder="Enter promo code"
                          className="w-full bg-slate-50 text-slate-900 border border-slate-100 rounded-2xl p-4 font-bold outline-none focus:bg-white focus:border-[#cba358] transition-all uppercase tracking-widest disabled:opacity-50"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                          disabled={appliedCoupon}
                        />
                        {appliedCoupon && (
                          <button
                            onClick={() => { setAppliedCoupon(null); setCouponCode(''); }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-red-500 hover:bg-red-50 rounded-full"
                          >
                            <RiCloseLine size={20} />
                          </button>
                        )}
                      </div>
                      {!appliedCoupon && (
                        <button
                          onClick={validateCoupon}
                          disabled={!couponCode || validatingCoupon}
                          className="px-6 bg-white text-gray-900 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#cba358] transition-all disabled:opacity-50"
                        >
                          {validatingCoupon ? <RiLoader4Line className="animate-spin" size={18} /> : 'Apply'}
                        </button>
                      )}
                    </div>
                    {appliedCoupon && (
                      <p className="mt-2 text-[11px] font-bold text-emerald-600 flex items-center gap-1 ml-1 animate-fadeIn">
                        <RiCheckDoubleLine size={16} />
                        {appliedCoupon.discountType === 'fixed'
                          ? `₹${appliedCoupon.discountValue} discount applied!`
                          : `${appliedCoupon.discountValue}% discount applied!`}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={handleStepNext}
                    className="w-full py-5 sm:py-6 bg-white text-gray-900 rounded-3xl sm:rounded-4xl font-black uppercase tracking-[0.3em] text-[10px] sm:text-xs transition-all hover:bg-[#cba358] flex items-center justify-center gap-3 shadow-xl shadow-slate-200"
                  >
                    Proceed to Summary <RiArrowRightLine size={18} />
                  </button>
                </>
              ) : (
                <>
                  {/* Summary Step 2 */}
                  <div className="space-y-8 animate-fade-in">
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 ml-1">Review Your Registration</label>

                    <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100">
                      <div className="flex justify-between items-center mb-6">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Participation As</span>
                          <span className="text-xl font-black text-slate-900 uppercase italic tracking-wider">{role}</span>
                        </div>
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#cba358] shadow-sm">
                          {roles.find(r => r.id === role) ? roles.find(r => r.id === role).icon({ size: 24 }) : <RiUserHeartLine size={24} />}
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#cba358]/5 rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-8 border border-blue-100">
                      <span className="text-[10px] font-black text-[#cba358] uppercase tracking-widest mb-6 block">Payment Summary</span>
                      <div className="space-y-4">
                        <div className="flex justify-between text-xs sm:text-sm font-bold text-gray-500">
                          <span>Base Fee ({role})</span>
                          <span>₹{getBasePrice()}</span>
                        </div>
                        {appliedCoupon && (
                          <div className="flex justify-between text-xs sm:text-sm font-bold text-emerald-600 italic">
                            <span>Discount ({appliedCoupon.code})</span>
                            <span>-₹{getBasePrice() - getFinalPrice()}</span>
                          </div>
                        )}
                        <div className="pt-4 border-t border-blue-200 flex justify-between items-end">
                          <span className="text-[10px] sm:text-xs font-black text-slate-900 uppercase tracking-widest">Total to Pay</span>
                          <span className="text-2xl sm:text-3xl font-black text-[#cba358] tracking-tighter">₹{getFinalPrice()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={() => setStep(1)}
                        disabled={loading}
                        className="flex-1 py-6 bg-slate-100 text-gray-600 rounded-3xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                      >
                        <RiArrowLeftLine /> Back
                      </button>
                      <button
                        disabled={
                          loading || 
                          paymentLoading || 
                          event.registrationOpen === false ||
                          (event.registrationDeadline && new Date() > new Date(event.registrationDeadline))
                        }
                        onClick={handleRegister}
                        className="flex-[2] py-6 bg-white text-gray-900 rounded-3xl font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl shadow-slate-200 hover:bg-[#cba358] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                      >
                        {(loading || paymentLoading) ? <RiLoader4Line className="animate-spin" size={20} /> :
                          (event.registrationOpen === false || (event.registrationDeadline && new Date() > new Date(event.registrationDeadline))) ? (
                            <>Registration Closed</>
                          ) : (
                            <>
                              Confirm & Pay Now <RiMoneyDollarCircleLine size={20} />
                            </>
                          )}
                      </button>
                    </div>
                  </div>
                </>
              )}

              <p className="text-center text-[10px] text-gray-600 font-bold uppercase tracking-widest mt-8">
                By registering, you agree to EFH terms & regulations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventRegistrationModal;
