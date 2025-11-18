import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '@/lib/supabase';

// Minimal ProtectedRoute: redirects unauthenticated users to /account with next URL
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    let mounted = true;
    const verify = async () => {
      if (loading) return; // wait for initial context load

      // Early-exit: if user exists in context, skip network verification
      if (user) {
        if (mounted) setVerifying(false);
        return;
      }
      try {
        const { data, error } = await supabase.auth.getUser();
        if (!mounted) return;
        // If no user returned, treat as unauthenticated
        if (error || !data?.user) {
          setVerifying(false);
          return;
        }
        setVerifying(false);
      } catch {
        if (mounted) setVerifying(false);
      }
    };
    verify();
    return () => { mounted = false; };
  }, [loading, user]);

  if (loading || verifying) {
    return (
      <div className="min-h-screen flex items-center justify-center text-text-secondary">
        Se încarcă...
      </div>
    );
  }

  if (!user) {
    const redirect = encodeURIComponent(`${location.pathname}${location.search || ''}`);
    return <Navigate to={`/account?auth=login&redirect=${redirect}`} replace />;
  }

  return children;
};

export default ProtectedRoute;
