import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login, user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user && user.role === 'admin') {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [user, loading, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    
    const result = await login(formData.email, formData.password);
    
    setIsLoading(false);
    if (result.success) {
      const from = location.state?.from?.pathname || '/admin/dashboard';
      navigate(from, { replace: true });
    } else {
      setErrorMsg(result.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] font-['Inter'] flex items-center justify-center relative overflow-hidden px-4">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#cba358]/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#cba358]/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md animate-[fadeIn_0.5s_ease-out]">
        
        {/* Back to Site Link */}
        <div className="absolute -top-16 left-0">
          <button 
            onClick={() => navigate('/')}
            className="text-gray-400 hover:text-[#cba358] flex items-center gap-2 text-sm font-semibold tracking-widest uppercase transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Site
          </button>
        </div>

        {/* Login Card */}
        <div className="bg-[#0a0a0a] border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl backdrop-blur-xl relative overflow-hidden">
          {/* Top accent line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#cba358] to-transparent opacity-50"></div>

          <div className="text-center mb-10">
            <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-white mb-3 tracking-wide">
              Admin Portal
            </h1>
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-[1px] bg-[#cba358]"></div>
              <p className="text-[#cba358] text-xs font-bold uppercase tracking-[0.2em]">Secure Access</p>
              <div className="w-8 h-[1px] bg-[#cba358]"></div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {errorMsg && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-xs text-center py-2 rounded-xl">
                {errorMsg}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#111] border border-white/5 rounded-xl px-12 py-3.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#cba358]/50 focus:ring-1 focus:ring-[#cba358]/50 transition-all duration-300"
                  placeholder="admin@hkca.org.in"
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#111] border border-white/5 rounded-xl px-12 py-3.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#cba358]/50 focus:ring-1 focus:ring-[#cba358]/50 transition-all duration-300 pr-12"
                  placeholder="••••••••"
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#cba358] transition-colors focus:outline-none"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-[#cba358] hover:bg-[#b08d4b] disabled:bg-[#cba358]/50 disabled:cursor-not-allowed text-black font-bold uppercase tracking-widest text-xs py-4 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(203,163,88,0.15)] hover:shadow-[0_0_30px_rgba(203,163,88,0.3)] flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                ) : (
                  <>
                    Sign In
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>

        </div>
        
        {/* Footer Text */}
        <div className="text-center mt-6 text-gray-600 text-xs tracking-wider">
          <p>© 2026 Equestrian Federation of Haryana</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
