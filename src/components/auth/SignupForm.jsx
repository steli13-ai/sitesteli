import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Icon from '../AppIcon';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-hot-toast';
import useFocusTrap from '../../utils/useFocusTrap';

const SignupForm = ({ onClose, onSwitchToLogin, embedded = false, onSuccess }) => {
  const { signUp } = useAuth();
  const dialogRef = useRef(null);
  useFocusTrap(dialogRef, !embedded, onClose);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student'
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState('');

  const roleOptions = [
    { value: 'student', label: 'Elev' },
    { value: 'parent', label: 'Părinte' },
    { value: 'teacher', label: 'Profesor' }
  ];

  const gradeLevelOptions = [
    { value: 'clasa_5', label: 'Clasa V' },
    { value: 'clasa_6', label: 'Clasa VI' },
    { value: 'clasa_7', label: 'Clasa VII' },
    { value: 'clasa_8', label: 'Clasa VIII' },
    { value: 'clasa_9', label: 'Clasa IX' },
    { value: 'clasa_10', label: 'Clasa X' },
    { value: 'clasa_11', label: 'Clasa XI' },
    { value: 'clasa_12', label: 'Clasa XII' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setErrors({});

    // Validation
    const newErrors = {};
    if (!formData?.fullName?.trim()) newErrors.fullName = 'Numele este obligatoriu';
    if (!formData?.email?.trim()) newErrors.email = 'Emailul este obligatoriu';
    if (!formData?.password?.trim()) newErrors.password = 'Parola este obligatorie';
    if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Parolele nu se potrivesc';
    }
    if (formData?.password?.length < 6) {
      newErrors.password = 'Parola trebuie să aibă cel puțin 6 caractere';
    }

    if (Object.keys(newErrors)?.length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await signUp(formData?.email, formData?.password, {
        full_name: formData?.fullName,
        role: formData?.role
      });

      if (error) {
        if (error?.message?.includes('already registered')) {
          setErrors({ general: 'Acest email este deja înregistrat. Încearcă să te conectezi.' });
        } else {
          setErrors({ general: error?.message });
        }
        setLoading(false);
        return;
      }

      // Success case
      toast?.success('Cont creat cu succes!', {
        icon: '🎉',
      });

      if (embedded && onSuccess) {
        onSuccess();
      } else if (onClose) {
        onClose();
      }

    } catch (error) {
      setErrors({ general: 'A apărut o eroare. Te rugăm să încerci din nou.' });
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
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
        if (error?.message?.includes('Failed to fetch')) {
          setErrors({ general: 'Nu se poate conecta la serviciul Google. Verifică conexiunea la internet.' });
        } else {
          setErrors({ general: error?.message || 'Eroare la înregistrarea cu Google.' });
        }
      }
    } catch (error) {
      setErrors({ general: 'A apărut o eroare la conectarea cu Google. Încearcă din nou.' });
    }
    
    setLoading(false);
  };

  if (embedded) {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Nume complet *
          </label>
          <Input
            type="text"
            value={formData?.fullName}
            onChange={(e) => handleInputChange('fullName', e?.target?.value)}
            placeholder="Prenume Nume"
            required
            disabled={loading}
          />
          {errors?.fullName && <p className="text-red-500 text-sm mt-1">{errors?.fullName}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Email *
          </label>
          <Input
            type="email"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            placeholder="nume@exemplu.ro"
            required
            disabled={loading}
          />
          {errors?.email && <p className="text-red-500 text-sm mt-1">{errors?.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Tip utilizator *
          </label>
          <Select
            value={formData?.role}
            onChange={(value) => handleInputChange('role', value)}
            options={roleOptions}
            disabled={loading}
          />
        </div>
        {formData?.role === 'student' && (
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Clasa *
            </label>
            <Select
              value={formData?.gradeLevel}
              onChange={(value) => handleInputChange('gradeLevel', value)}
              options={gradeLevelOptions}
              placeholder="Selectează clasa"
              disabled={loading}
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Parola *
          </label>
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              value={formData?.password}
              onChange={(e) => handleInputChange('password', e?.target?.value)}
              placeholder="Minim 6 caractere"
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
          {errors?.password && <p className="text-red-500 text-sm mt-1">{errors?.password}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Confirmă parola *
          </label>
          <Input
            type={showPassword ? 'text' : 'password'}
            value={formData?.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
            placeholder="Repetă parola"
            required
            disabled={loading}
          />
          {errors?.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors?.confirmPassword}</p>}
        </div>
        <Button
          type="submit"
          variant="default"
          fullWidth
          disabled={loading}
          className="bg-secondary hover:bg-secondary/90"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
              Se creează contul...
            </div>
          ) : (
            'Creează contul'
          )}
        </Button>
      </form>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" role="presentation">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="signup-title"
        ref={dialogRef}
        tabIndex={-1}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center">
              <Icon name="UserPlus" size={16} className="text-white" />
            </div>
            <h2 id="signup-title" className="text-xl font-semibold text-text-primary">Creează cont</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="Închide dialogul de înregistrare"
          >
            <Icon name="X" size={20} className="text-text-secondary" />
          </button>
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

        {/* Success Message */}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg"
          >
            <div className="flex items-center text-green-800 text-sm">
              <Icon name="CheckCircle" size={16} className="mr-2 flex-shrink-0" />
              <span>{success}</span>
            </div>
          </motion.div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Nume complet *
            </label>
            <Input
              type="text"
              value={formData?.fullName}
              onChange={(e) => handleInputChange('fullName', e?.target?.value)}
              placeholder="Prenume Nume"
              required
              disabled={loading}
            />
            {errors?.fullName && <p className="text-red-500 text-sm mt-1">{errors?.fullName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Email *
            </label>
            <Input
              type="email"
              value={formData?.email}
              onChange={(e) => handleInputChange('email', e?.target?.value)}
              placeholder="nume@exemplu.ro"
              required
              disabled={loading}
            />
            {errors?.email && <p className="text-red-500 text-sm mt-1">{errors?.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Tip utilizator *
            </label>
            <Select
              value={formData?.role}
              onChange={(value) => handleInputChange('role', value)}
              options={roleOptions}
              disabled={loading}
            />
          </div>

          {formData?.role === 'student' && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Clasa *
              </label>
              <Select
                value={formData?.gradeLevel}
                onChange={(value) => handleInputChange('gradeLevel', value)}
                options={gradeLevelOptions}
                placeholder="Selectează clasa"
                disabled={loading}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Parola *
            </label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                value={formData?.password}
                onChange={(e) => handleInputChange('password', e?.target?.value)}
                placeholder="Minim 6 caractere"
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
            {errors?.password && <p className="text-red-500 text-sm mt-1">{errors?.password}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Confirmă parola *
            </label>
            <Input
              type={showPassword ? 'text' : 'password'}
              value={formData?.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
              placeholder="Repetă parola"
              required
              disabled={loading}
            />
            {errors?.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors?.confirmPassword}</p>}
          </div>

          <Button
            type="submit"
            variant="default"
            fullWidth
            disabled={loading}
            className="bg-secondary hover:bg-secondary/90"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                Se creează contul...
              </div>
            ) : (
              'Creează contul'
            )}
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-border"></div>
          <span className="px-3 text-sm text-text-secondary">sau</span>
          <div className="flex-1 border-t border-border"></div>
        </div>

        {/* Google Signup */}
        <Button
          onClick={handleGoogleSignup}
          variant="outline"
          fullWidth
          disabled={loading}
          className="mb-4"
        >
          <Icon name="Chrome" size={18} className="mr-2" />
          Înregistrează-te cu Google
        </Button>

        {/* Switch to Login */}
        <div className="text-center">
          <p className="text-sm text-text-secondary">
            Ai deja cont?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-primary hover:text-primary/80 font-medium"
              disabled={loading}
            >
              Conectează-te aici
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupForm;