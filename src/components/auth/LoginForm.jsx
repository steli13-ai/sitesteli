import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Icon from '../AppIcon';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import useFocusTrap from '../../utils/useFocusTrap';

const LoginForm = ({ onClose, onSwitchToSignup, embedded = false, onSuccess }) => {
  const { signIn } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dialogRef = useRef(null);
  useFocusTrap(dialogRef, !embedded, onClose);

  // Updated demo credentials with working test accounts
  const demoCredentials = [
    { email: 'admin@matecusucces.ro', password: 'admin123', role: 'Administrator' },
    { email: 'elev@matecusucces.ro', password: 'elev123', role: 'Elev' },
    { email: 'parinte@matecusucces.ro', password: 'parinte123', role: 'Părinte' },
    // Add real demo account from database
    { email: 'demo@matecusucces.ro', password: 'demo123', role: 'Demo User' }
  ];

  const fillCredentials = (credentials) => {
    setFormData({ email: credentials?.email, password: credentials?.password });
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setErrors({});
    setLoading(true);

    // Basic validation
    if (!formData?.email || !formData?.password) {
      setErrors({ general: 'Te rugăm să completezi toate câmpurile.' });
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await signIn(formData?.email, formData?.password);
      
      if (error) {
        console.error('Login error details:', error);
        
        // Enhanced error handling with more specific messages
        if (error?.message?.includes('Invalid login credentials')) {
          setErrors({ general: 'Email sau parolă incorectă. Verifică datele și încearcă din nou.' });
        } else if (error?.message?.includes('Email not confirmed')) {
          setErrors({ general: 'Contul nu a fost confirmat. Verifică emailul pentru link-ul de confirmare.' });
        } else if (error?.message?.includes('Too many requests')) {
          setErrors({ general: 'Prea multe încercări de conectare. Te rugăm să aștepți câteva minute.' });
        } else if (error?.message?.includes('Failed to fetch') || 
                   error?.message?.includes('AuthRetryableFetchError')) {
          setErrors({ general: 'Nu se poate conecta la serviciul de autentificare. Verifică conexiunea la internet și încearcă din nou.' });
        } else if (error?.message?.includes('signup_disabled')) {
          setErrors({ general: 'Serviciul de autentificare este temporar indisponibil. Încearcă mai târziu.' });
        } else {
          setErrors({ general: error?.message || 'A apărut o eroare neașteptată. Te rugăm să încerci din nou.' });
        }
        setLoading(false);
        return;
      }

      // Success case
      toast?.success('Te-ai conectat cu succes!', {
        icon: '✅',
        duration: 3000,
      });

      // Handle redirect logic
      const urlParams = new URLSearchParams(window?.location?.search);
      const redirectPath = urlParams?.get('redirect');

      setTimeout(() => {
        if (embedded && onSuccess) {
          onSuccess();
        } else if (onClose) {
          onClose();
          if (redirectPath) {
            navigate(redirectPath);
          } else {
            navigate('/contul-meu');
          }
        }
      }, 500);
      
    } catch (error) {
      console.error('Unexpected login error:', error);
      setErrors({ general: 'A apărut o eroare neașteptată. Te rugăm să încerci din nou.' });
      toast?.error('Eroare la conectare. Încearcă din nou.', {
        icon: '❌',
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrors({});

    try {
      const { error } = await supabase?.auth?.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window?.location?.origin}/account`
        }
      });

      if (error) {
        console.error('Google login error:', error);
        if (error?.message?.includes('Failed to fetch')) {
          setErrors({ general: 'Nu se poate conecta la serviciul de autentificare Google. Verifică conexiunea la internet.' });
        } else {
          setErrors({ general: error?.message || 'Eroare la autentificarea cu Google.' });
        }
      }
    } catch (error) {
      console.error('Google login unexpected error:', error);
      setErrors({ general: 'A apărut o eroare la conectarea cu Google. Încearcă din nou.' });
    }
    
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" role="presentation">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-title"
        ref={dialogRef}
        tabIndex={-1}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Icon name="User" size={16} className="text-white" />
            </div>
            <h2 id="login-title" className="text-xl font-semibold text-text-primary">Conectează-te</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="Închide dialogul de autentificare"
          >
            <Icon name="X" size={20} className="text-text-secondary" />
          </button>
        </div>

        {/* Demo Credentials */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-sm font-medium text-blue-800 mb-3 flex items-center">
            <Icon name="Info" size={16} className="mr-2" />
            Credențiale Demo pentru Testare
          </h3>
          <div className="space-y-2">
            {demoCredentials?.map((cred, index) => (
              <div 
                key={index}
                onClick={() => fillCredentials(cred)}
                className="flex items-center justify-between p-2 bg-white rounded-md border border-blue-100 hover:border-blue-300 cursor-pointer transition-colors"
              >
                <div className="text-xs">
                  <div className="font-medium text-blue-900">{cred?.role}</div>
                  <div className="text-blue-600">{cred?.email}</div>
                </div>
                <div className="text-xs text-blue-500 font-mono">{cred?.password}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-blue-600 mt-2">Apasă pe orice credențial pentru a-l completa automat</p>
        </div>

        {/* Error Message */}
        {errors?.general && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg"
          >
            <div className="flex items-center text-red-800 text-sm">
              <Icon name="AlertCircle" size={16} className="mr-2 flex-shrink-0" />
              <span>{errors?.general}</span>
            </div>
          </motion.div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Email
            </label>
            <Input
              type="email"
              value={formData?.email}
              onChange={(e) => setFormData({ ...formData, email: e?.target?.value })}
              placeholder="nume@exemplu.ro"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Parola
            </label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                value={formData?.password}
                onChange={(e) => setFormData({ ...formData, password: e?.target?.value })}
                placeholder="Introdu parola"
                required
                disabled={loading}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary"
                disabled={loading}
              >
                <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
              </button>
            </div>
          </div>

          <Button
            type="submit"
            variant="default"
            fullWidth
            disabled={loading}
            className="bg-primary hover:bg-primary/90"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                Se conectează...
              </div>
            ) : (
              'Conectează-te'
            )}
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-border"></div>
          <span className="px-3 text-sm text-text-secondary">sau</span>
          <div className="flex-1 border-t border-border"></div>
        </div>

        {/* Google Login */}
        <Button
          onClick={handleGoogleLogin}
          variant="outline"
          fullWidth
          disabled={loading}
          className="mb-4"
        >
          <Icon name="Chrome" size={18} className="mr-2" />
          Conectează-te cu Google
        </Button>

        {/* Switch to Signup */}
        <div className="text-center">
          <p className="text-sm text-text-secondary">
            Nu ai cont?{' '}
            <button
              onClick={onSwitchToSignup}
              className="text-primary hover:text-primary/80 font-medium"
              disabled={loading}
            >
              Creează unul aici
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginForm;