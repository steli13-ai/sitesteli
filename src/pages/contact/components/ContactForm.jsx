import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContactForm = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors?.[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData?.name?.trim()) {
      errors.name = 'Numele este obligatoriu';
    }
    
    if (!formData?.email?.trim()) {
      errors.email = 'Email-ul este obligatoriu';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      errors.email = 'Email-ul nu este valid';
    }
    
    if (!formData?.message?.trim()) {
      errors.message = 'Mesajul este obligatoriu';
    } else if (formData?.message?.trim()?.length < 10) {
      errors.message = 'Mesajul trebuie să aibă cel puțin 10 caractere';
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors)?.length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Reset form
      setFormData({ name: '', email: '', message: '' });
      setFormErrors({});
      
      // Notify parent component
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
      
    } catch (error) {
      // Centralized error logging
      import('@/utils/logger').then(m => m.logger.error('Form submission error', error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-8 warm-shadow">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div className="space-y-2">
          <label htmlFor="name" className="block font-body font-semibold text-text-primary">
            Nume <span className="text-destructive">*</span>
          </label>
          <div className="relative">
            <Icon 
              name="User" 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
            />
            <input
              type="text"
              id="name"
              name="name"
              value={formData?.name}
              onChange={handleInputChange}
              placeholder="Scrie numele tău aici..."
              className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-input text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
                formErrors?.name 
                  ? 'border-destructive focus:ring-destructive/20' :'border-border focus:ring-teal-500/20 focus:border-teal-500'
              }`}
            />
          </div>
          {formErrors?.name && (
            <p className="text-sm text-destructive flex items-center space-x-1">
              <Icon name="AlertCircle" size={14} />
              <span>{formErrors?.name}</span>
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label htmlFor="email" className="block font-body font-semibold text-text-primary">
            Email <span className="text-destructive">*</span>
          </label>
          <div className="relative">
            <Icon 
              name="Mail" 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
            />
            <input
              type="email"
              id="email"
              name="email"
              value={formData?.email}
              onChange={handleInputChange}
              placeholder="exemplu@email.com"
              className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-input text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
                formErrors?.email 
                  ? 'border-destructive focus:ring-destructive/20' :'border-border focus:ring-teal-500/20 focus:border-teal-500'
              }`}
            />
          </div>
          {formErrors?.email && (
            <p className="text-sm text-destructive flex items-center space-x-1">
              <Icon name="AlertCircle" size={14} />
              <span>{formErrors?.email}</span>
            </p>
          )}
        </div>

        {/* Message Field */}
        <div className="space-y-2">
          <label htmlFor="message" className="block font-body font-semibold text-text-primary">
            Mesaj <span className="text-destructive">*</span>
          </label>
          <div className="relative">
            <Icon 
              name="MessageSquare" 
              size={18} 
              className="absolute left-3 top-4 text-text-secondary" 
            />
            <textarea
              id="message"
              name="message"
              value={formData?.message}
              onChange={handleInputChange}
              placeholder="Scrie mesajul tău aici... Poți să ne întrebi orice despre matematică, să ne sugerezi îmbunătățiri sau să ceri ajutor!"
              rows={6}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-input text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:border-transparent resize-vertical transition-all duration-200 ${
                formErrors?.message 
                  ? 'border-destructive focus:ring-destructive/20' :'border-border focus:ring-teal-500/20 focus:border-teal-500'
              }`}
            />
          </div>
          {formErrors?.message && (
            <p className="text-sm text-destructive flex items-center space-x-1">
              <Icon name="AlertCircle" size={14} />
              <span>{formErrors?.message}</span>
            </p>
          )}
          <p className="text-xs text-text-secondary">
            Minimum 10 caractere ({formData?.message?.length || 0}/10)
          </p>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            variant="default"
            size="lg"
            disabled={isSubmitting}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-cta font-semibold transition-all duration-200 transform hover:scale-105"
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <motion.div 
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <span>Se trimite...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Icon name="Send" size={18} />
                <span>Trimite mesaj</span>
              </div>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;