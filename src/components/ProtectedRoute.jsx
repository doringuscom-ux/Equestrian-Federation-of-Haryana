import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <Loader2 className="w-10 h-10 text-[#cba358] animate-spin" />
      </div>
    );
  }

  if (!user) {
    // Redirect to the appropriate login page
    return <Navigate to={adminOnly ? "/admin/login" : "/login"} state={{ from: location }} replace />;
  }

  if (adminOnly && user.role !== 'admin') {
    // If it's an admin route but user is not admin
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
