import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import Button from '../ui/Button';
import Icon from '../AppIcon';
import useFocusTrap from '../../utils/useFocusTrap';
import logger from '../../utils/logger';

const NetopiaCheckout = ({ 
  subscriptionType, 
  price, 
  title, 
  description, 
  features = [], 
  onClose, 
  onSuccess 
}) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dialogRef = useRef(null);
  useFocusTrap(dialogRef, true, onClose);

  // Subscription type mapping
  const subscriptionTypes = {
    'bac_2025': {
      name: 'Abonament BAC 2025',
      duration: '12 luni',
      features: ['Toate fișele BAC', 'Simulări complete', 'Suport prioritar']
    },
    'evaluare_nationala': {
      name: 'Evaluare Națională',
      duration: '6 luni',
      features: ['Fișe clasa VIII', 'Teste de evaluare', 'Rezolvări detaliate']
    },
    'premium_cursuri': {
      name: 'Cursuri Premium',
      duration: '6 luni',
      features: ['Video cursuri', 'Exerciții interactive', 'Certificat de completare']
    },
    'fise_complete': {
      name: 'Fișe Complete',
      duration: '3 luni',
      features: ['Toate fișele', 'Download nelimitat', 'Actualizări gratuite']
    }
  };

  const currentSubscription = subscriptionTypes?.[subscriptionType] || {
    name: title,
    duration: 'Variabil',
    features: features
  };

  const handleNetopiaPayment = async () => {
    if (!user) {
      setError('Trebuie să fii conectat pentru a efectua o plată.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Create payment record in database
      const { data: paymentData, error: paymentError } = await supabase
        ?.from('payments')
        ?.insert({
          user_id: user?.id,
          amount: price,
          currency: 'RON',
          status: 'pending',
          metadata: {
            subscription_type: subscriptionType,
            title: title,
            description: description
          }
        })
        ?.select()
        ?.single();

      if (paymentError) {
        throw new Error('Eroare la crearea înregistrării de plată');
      }

      // Create subscription record
      const endDate = new Date();
      const duration = currentSubscription?.duration;
      if (duration?.includes('12')) {
        endDate?.setFullYear(endDate?.getFullYear() + 1);
      } else if (duration?.includes('6')) {
        endDate?.setMonth(endDate?.getMonth() + 6);
      } else if (duration?.includes('3')) {
        endDate?.setMonth(endDate?.getMonth() + 3);
      } else {
        endDate?.setMonth(endDate?.getMonth() + 1);
      }

      const { data: subscriptionData, error: subscriptionError } = await supabase
        ?.from('subscriptions')
        ?.insert({
          user_id: user?.id,
          subscription_type: subscriptionType,
          status: 'pending',
          end_date: endDate?.toISOString(),
          price: price,
          features: {
            included: currentSubscription?.features || features
          }
        })
        ?.select()
        ?.single();

      if (subscriptionError) {
        throw new Error('Eroare la crearea abonamentului');
      }

      // Update payment with subscription ID
      await supabase
        ?.from('payments')
        ?.update({ subscription_id: subscriptionData?.id })
        ?.eq('id', paymentData?.id);

      // Call backend Edge Function to receive Netopia payment URL
      const fnUrl = import.meta.env?.VITE_NETOPIA_FUNCTION_URL;
      const isDev = !!import.meta.env?.DEV;
      const simulate = (import.meta.env?.VITE_ENABLE_PAYMENT_SIMULATOR || '').toString().toLowerCase() === 'true';
      const returnUrl = `${window?.location?.origin}/payment-confirmation?success=1&orderId=${paymentData?.id}&subscriptionId=${subscriptionData?.id}`;
      const cancelUrl = `${window?.location?.origin}/payment-confirmation?success=0&orderId=${paymentData?.id}`;

      if (isDev && (simulate || !fnUrl)) {
        logger.warn('Netopia function URL missing or simulator enabled (dev). Redirecting to simulated success URL.');
        window.location.href = returnUrl;
        return;
      }
      if (!fnUrl) {
        throw new Error('Configurare lipsă: VITE_NETOPIA_FUNCTION_URL nu este setat.');
      }

      const res = await fetch(`${fnUrl}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: paymentData?.id,
          amount: price,
          description: `${currentSubscription?.name} - ${description}`,
          returnUrl,
          cancelUrl,
        }),
      });

      if (!res?.ok) {
        const text = await res?.text?.();
        logger.error('Netopia init failed:', res?.status, text);
        if (isDev && simulate) {
          window.location.href = returnUrl;
          return;
        }
        throw new Error('Nu s-a putut inițializa plata Netopia.');
      }
      const { payment_url } = await res.json();
      if (!payment_url) throw new Error('Răspuns Netopia invalid.');

      window.location.href = payment_url;
      
    } catch (error) {
      logger.error('Payment error:', error);
      setError(error?.message || 'A apărut o eroare la procesarea plății. Te rugăm să încerci din nou.');
      setLoading(false);
    }
  };

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('ro-RO', {
      style: 'currency',
      currency: 'RON'
    })?.format(amount);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" role="presentation">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
        ref={dialogRef}
        tabIndex={-1}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <Icon name="CreditCard" size={16} className="text-white" />
            </div>
            <h2 id="checkout-title" className="text-xl font-semibold text-text-primary">Finalizează comanda</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="Închide fereastra de plată"
            disabled={loading}
          >
            <Icon name="X" size={20} className="text-text-secondary" />
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg"
          >
            <div className="flex items-center text-red-800 text-sm">
              <Icon name="AlertCircle" size={16} className="mr-2 flex-shrink-0" />
              <span>{error}</span>
            </div>
          </motion.div>
        )}

        {/* Order Summary */}
        <div className="bg-muted rounded-lg p-4 mb-6">
          <h3 className="font-medium text-text-primary mb-3">Rezumatul comenzii</h3>
          
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium text-text-primary">{currentSubscription?.name}</h4>
                <p className="text-sm text-text-secondary">{description}</p>
                <p className="text-sm text-text-secondary">Durată: {currentSubscription?.duration}</p>
              </div>
              <span className="text-lg font-semibold text-text-primary">
                {formatPrice(price)}
              </span>
            </div>

            {/* Features */}
            <div className="pt-3 border-t border-border">
              <p className="text-sm font-medium text-text-primary mb-2">Include:</p>
              <ul className="text-sm text-text-secondary space-y-1">
                {currentSubscription?.features?.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Icon name="Check" size={14} className="text-green-600 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="mb-6">
          <h3 className="font-medium text-text-primary mb-3">Metodă de plată</h3>
          <div className="border rounded-lg p-4 bg-white border-primary">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Icon name="CreditCard" size={18} className="text-white" />
              </div>
              <div>
                <h4 className="font-medium text-text-primary">Netopia Payments</h4>
                <p className="text-sm text-text-secondary">Plată securizată cu cardul bancar</p>
              </div>
            </div>
          </div>
        </div>

        {/* User Info */}
        {user && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="text-sm font-medium text-blue-800 mb-2">Detalii client</h4>
            <p className="text-sm text-blue-700">{user?.email}</p>
          </div>
        )}

        {/* Terms */}
        <div className="mb-6">
          <label className="flex items-start space-x-3 text-sm text-text-secondary">
            <input type="checkbox" className="mt-1" required />
            <span>
              Sunt de acord cu{' '}
              <a href="/termeni" className="text-primary hover:underline" target="_blank">
                termenii și condițiile
              </a>{' '}
              și{' '}
              <a href="/politica-confidentialitate" className="text-primary hover:underline" target="_blank">
                politica de confidențialitate
              </a>.
            </span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleNetopiaPayment}
            variant="default"
            fullWidth
            disabled={loading || !user}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                Se procesează plata...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Icon name="Lock" size={16} className="mr-2" />
                Plătește {formatPrice(price)}
              </div>
            )}
          </Button>

          <Button
            onClick={onClose}
            variant="outline"
            fullWidth
            disabled={loading}
          >
            Anulează
          </Button>
        </div>

        {/* Security Notice */}
        <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-text-secondary">
          <Icon name="Shield" size={14} />
          <span>Plată securizată SSL</span>
        </div>
      </motion.div>
    </div>
  );
};

export default NetopiaCheckout;