import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';
import { RiEyeLine, RiEyeOffLine, RiCheckDoubleLine } from 'react-icons/ri';

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP & New Password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/forgotpassword`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccess('OTP sent successfully to your email.');
        setStep(2);
      } else {
        setError(data.message || 'Failed to send OTP.');
      }
    } catch (err) {
      setError('Network error. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!otp || !newPassword || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;<>,.?/~\\-]).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setError('Password does not meet the requirements');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/resetpassword`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccess('Password reset successfully! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(data.message || 'Failed to reset password.');
      }
    } catch (err) {
      setError('Network error. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 font-['Inter'] relative overflow-hidden">
      {/* Decorative Blur Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#cba358]/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-md z-10 relative">
        <Link to="/" className="flex items-center gap-3 justify-center mb-10 group">
          <div className="bg-white rounded-full p-1.5 w-16 h-16 flex items-center justify-center group-hover:bg-[#cba358] transition-colors duration-300 shadow-lg">
            <img src="/IMG/Logo.png" alt="EFH Logo" className="w-full h-full object-contain" />
          </div>
          <span className="font-[inter] font-light text-2xl tracking-[0.2em] uppercase text-white group-hover:text-[#cba358] transition-colors duration-300">
            EFH
          </span>
        </Link>

        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden backdrop-blur-sm">
          
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-white tracking-widest uppercase mb-2">Forgot Password</h1>
            <p className="text-gray-400 text-sm">
              {step === 1 ? 'Enter your email to receive a reset code.' : 'Enter the code and your new password.'}
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm mb-6 text-center">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-500/10 border border-green-500/50 text-green-400 p-3 rounded-lg text-sm mb-6 text-center">
              {success}
            </div>
          )}

          {step === 1 && (
            <form onSubmit={handleSendOtp} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#cba358]/50 focus:ring-1 focus:ring-[#cba358]/50 transition-all duration-300"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-[#cba358] hover:bg-[#b08d4b] disabled:opacity-50 text-black font-bold uppercase tracking-widest text-xs py-4 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(203,163,88,0.2)] mt-4"
              >
                {isLoading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleResetPassword} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">6-Digit OTP</label>
                <input 
                  type="text" 
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#cba358]/50 focus:ring-1 focus:ring-[#cba358]/50 transition-all duration-300 tracking-[0.3em] text-center"
                  placeholder="------"
                  maxLength={6}
                  required
                />
                <p className="text-[10px] text-center text-gray-500 mt-1">Code expires in 15 minutes</p>
              </div>

              <div className="space-y-2 relative">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">New Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3.5 pr-12 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#cba358]/50 focus:ring-1 focus:ring-[#cba358]/50 transition-all duration-300"
                    placeholder="At least 8 characters"
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <RiEyeOffLine size={20} /> : <RiEyeLine size={20} />}
                  </button>
                </div>
                {newPassword.length > 0 && (
                  <div className="mt-2 p-3 bg-[#111] border border-white/5 rounded-xl">
                    <h4 className="text-gray-400 font-black text-[10px] uppercase tracking-widest mb-2">Password Requirements</h4>
                    <div className="space-y-1.5">
                      {[
                        { label: "At least 8 characters", valid: newPassword.length >= 8 },
                        { label: "At least 1 uppercase letter", valid: /[A-Z]/.test(newPassword) },
                        { label: "At least 1 number", valid: /\d/.test(newPassword) },
                        { label: "At least 1 special character", valid: /[!@#$%^&*()_+={}\[\]:;<>,.?/~\\-]/.test(newPassword) }
                      ].map((rule, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          {rule.valid ? (
                            <RiCheckDoubleLine className="text-emerald-500" size={14} />
                          ) : (
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-600 ml-1"></div>
                          )}
                          <span className={`text-[10px] font-bold ${rule.valid ? 'text-emerald-500' : 'text-gray-500'}`}>
                            {rule.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2 relative">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Confirm Password</label>
                <div className="relative">
                  <input 
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3.5 pr-12 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#cba358]/50 focus:ring-1 focus:ring-[#cba358]/50 transition-all duration-300"
                    placeholder="Confirm your password"
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <RiEyeOffLine size={20} /> : <RiEyeLine size={20} />}
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-[#cba358] hover:bg-[#b08d4b] disabled:opacity-50 text-black font-bold uppercase tracking-widest text-xs py-4 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(203,163,88,0.2)] mt-4"
              >
                {isLoading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          )}

          <div className="mt-8 text-center">
            <Link to="/login" className="text-xs text-gray-400 hover:text-white transition-colors uppercase tracking-widest">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
