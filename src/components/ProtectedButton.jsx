import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from './ui/Button';
import toast from 'react-hot-toast';

const ProtectedButton = ({ 
  planId, 
  planType, 
  params = {},
  planMode, // optional shorthand, merged into params
  children, 
  className = '', 
  variant = 'default',
  ...props 
}) => {
  const { user, loading, handleUnauthorized } = useAuth();
  const navigate = useNavigate();

  const handleClick = async () => {
    if (loading) return;
    
    const query = new URLSearchParams({ plan: encodeURIComponent(planId || planType) });
    // merge optional planMode and params
    if (planMode) query.set('planMode', planMode);
    if (params && typeof params === 'object') {
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null) query.set(k, String(v));
      });
    }
    const checkoutPath = `/checkout?${query.toString()}`;

    if (!user) {
      // Show toast notification
      toast('Autentifică-te pentru a continua către plată', {
        icon: '🔐',
        duration: 3000,
      });
      
      // Redirect to unified account auth with redirect back to checkout
      navigate(`/account?auth=login&redirect=${encodeURIComponent(checkoutPath)}`);
    } else {
      // User is authenticated, go to checkout. If navigation/action hits 401 downstream, recover once.
      try {
        navigate(checkoutPath);
      } catch (err) {
        const recovered = await handleUnauthorized?.();
        if (recovered) {
          try { navigate(checkoutPath); } catch {}
        } else {
          throw err;
        }
      }
    }
  };

  if (loading) {
    return (
      <Button 
        disabled 
        variant={variant} 
        className={className} 
        {...props}
      >
        <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2"></div>
        Se încarcă...
      </Button>
    );
  }

  return (
    <Button
      onClick={handleClick}
      ctaId={props.ctaId || (planId ? `buy_${String(planId)}` : planType ? `buy_${String(planType)}` : 'checkout_start')}
      variant={variant}
      className={className}
      {...props}
    >
      {children || 'Plătește acum'}
    </Button>
  );
};

export default ProtectedButton;