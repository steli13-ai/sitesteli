import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { safeSelect, safeUpdate } from '../../lib/supabaseSafe';
import logger from '../../utils/logger';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import { useNavigate } from 'react-router-dom';

const PaymentConfirmationPage = () => {
  const { user, userProfile, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [subscriptionDetails, setSubscriptionDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  // Get URL parameters
  const urlParams = new URLSearchParams(window?.location?.search);
  const success = urlParams?.get('success') === '1' || urlParams?.get('success') === 'true';
  const orderId = urlParams?.get('orderId');
  const subscriptionId = urlParams?.get('subscriptionId');

  useEffect(() => {
    // Protect route
    if (!authLoading && !user) {
      const search = window?.location?.search || '';
      const redirect = encodeURIComponent(`/payment-confirmation${search}`);
      navigate(`/account?auth=login&redirect=${redirect}`);
      return;
    }

    if (orderId) {
      fetchPaymentDetails();
    } else {
      setLoading(false);
      setError('ID-ul comenzii nu a fost găsit.');
    }
  }, [orderId, user, authLoading, navigate]);

  const fetchPaymentDetails = async () => {
    try {
      // Fetch payment details
      const { data: paymentData, error: paymentError } = await safeSelect(
        supabase
          ?.from('payments')
          ?.select('*')
          ?.eq('id', orderId)
          ?.single(),
        'fetch payment details'
      );

      if (paymentError || !paymentData) {
        throw new Error('Nu s-au găsit detaliile plății.');
      }

      setPaymentDetails(paymentData);

      // Verify ownership and update status if needed
      if (paymentData && user?.id && paymentData?.user_id === user?.id) {
        if (success && paymentData?.status !== 'completed') {
          await safeUpdate(
            supabase?.from('payments')?.update({ status: 'completed' })?.eq('id', paymentData?.id),
            'mark payment completed'
          );
          if ((subscriptionId || paymentData?.subscription_id)) {
            await safeUpdate(
              supabase
                ?.from('subscriptions')
                ?.update({ status: 'active' })
                ?.eq('id', subscriptionId || paymentData?.subscription_id),
              'activate subscription'
            );
          }
          // Fire-and-forget email confirmation if configured
          if (!emailSent) {
            try {
              const emailFnUrl = import.meta.env?.VITE_EMAIL_FUNCTION_URL;
              if (emailFnUrl) {
                const subject = 'Confirmare acces - Mate cu Succes';
                const itemTitle = paymentData?.metadata?.course_title || paymentData?.metadata?.title || 'Abonament';
                const body = `Bună ${userProfile?.full_name || user?.email},\n\nPlata ta a fost confirmată. Ai acum acces la: ${itemTitle}.\nSuma: ${new Intl.NumberFormat('ro-RO', { style: 'currency', currency: 'RON' }).format(paymentData?.amount || 0)}\n\nÎți mulțumim!`;
                fetch(emailFnUrl, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    to: user?.email,
                    subject,
                    text: body,
                    metadata: {
                      orderId: paymentData?.id,
                      subscriptionId: subscriptionId || paymentData?.subscription_id,
                      itemTitle,
                      courseId: paymentData?.metadata?.course_id || null,
                    },
                  }),
                }).catch(() => {});
                setEmailSent(true);
              }
            } catch (_) {}
          }
        }
        if (!success && paymentData?.status === 'pending') {
          await safeUpdate(
            supabase?.from('payments')?.update({ status: 'failed' })?.eq('id', paymentData?.id),
            'mark payment failed'
          );
        }
      }

      // Fetch subscription details if available
      if (subscriptionId || paymentData?.subscription_id) {
        const { data: subscriptionData, error: subscriptionError } = await safeSelect(
          supabase
            ?.from('subscriptions')
            ?.select('*')
            ?.eq('id', subscriptionId || paymentData?.subscription_id)
            ?.single(),
          'fetch subscription details'
        );

        if (!subscriptionError && subscriptionData) {
          setSubscriptionDetails(subscriptionData);
        }
      }

    } catch (error) {
      logger.error('Error fetching payment details:', error);
      setError(error?.message || 'A apărut o eroare la încărcarea detaliilor plății.');
    }
    
    setLoading(false);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ro-RO', {
      style: 'currency',
      currency: 'RON'
    })?.format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('ro-RO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSubscriptionTypeLabel = (type) => {
    const labels = {
      'bac_2025': 'Abonament BAC 2025',
      'evaluare_nationala': 'Evaluare Națională',
      'premium_cursuri': 'Cursuri Premium',
      'fise_complete': 'Fișe Complete'
    };
    return labels?.[type] || type;
  };

  const handleGoToAccount = () => {
    // Navigate to account page with subscriptions tab active
    window.location.href = '/account?tab=abonamente';
  };

  const handleRetryPayment = () => {
    if (paymentDetails?.metadata?.subscription_type) {
      window.location.href = `/checkout?plan=${paymentDetails?.metadata?.subscription_type}`;
    } else {
      window.location.href = '/premium-programs';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
  {/* Header provided by layout */}
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
            <span className="text-text-secondary">Se încarcă...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
  {/* Header provided by layout */}
      <Helmet>
        <title>{success ? 'Plată finalizată cu succes' : 'Plata nu a fost finalizată'} | Mate cu Succes</title>
        <meta name="description" content={success ? 'Plata ta a fost procesată cu succes. Acum ai acces la conținutul premium.' : 'Plata nu a putut fi procesată. Încearcă din nou.'} />
        <link rel="canonical" href={`${window.location?.origin}/confirmare-plata`} />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="language" content="ro" />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {success ? (
            /* Success State */
            (<motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              {/* Success Animation */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Icon name="CheckCircle" size={48} className="text-green-600" />
              </motion.div>
              {/* Success Message with Framer Motion */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold text-text-primary mb-4"
              >
                ✅ Felicitări, {userProfile?.full_name || user?.email?.split('@')?.[0]}!
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-text-secondary mb-8"
              >
                Plata a fost finalizată cu succes. Ai acces la cursurile tale!
              </motion.p>
              {/* Enhanced Payment Details Card */}
              {paymentDetails && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white rounded-xl p-6 shadow-sm mb-8 text-left border-l-4 border-green-500"
                >
                  <h2 className="text-xl font-semibold text-text-primary mb-4 flex items-center">
                    <Icon name="Receipt" size={20} className="mr-2 text-green-600" />
                    Detalii comandă
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-text-secondary">Numărul comenzii:</span>
                      <span className="font-mono text-text-primary bg-gray-100 px-2 py-1 rounded">
                        #{paymentDetails?.id?.slice(-8)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-text-secondary">Suma plătită:</span>
                      <span className="font-semibold text-text-primary text-lg text-green-600">
                        {formatCurrency(paymentDetails?.amount)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-text-secondary">Data plății:</span>
                      <span className="text-text-primary">
                        {formatDate(paymentDetails?.updated_at || paymentDetails?.created_at)}
                      </span>
                    </div>

                    {paymentDetails?.netopia_transaction_id && (
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-text-secondary">ID tranzacție:</span>
                        <span className="font-mono text-text-primary text-sm">
                          {paymentDetails?.netopia_transaction_id}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between items-center py-2">
                      <span className="text-text-secondary">Status:</span>
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.7 }}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        ✅ Finalizată
                      </motion.span>
                    </div>
                  </div>
                </motion.div>
              )}
              {/* Enhanced Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  onClick={handleGoToAccount}
                  variant="default"
                  fullWidth
                  className="bg-primary hover:bg-primary/90 h-12 text-lg font-semibold"
                >
                  <Icon name="User" size={20} className="mr-2" />
                  Mergi la contul meu
                </Button>
              </motion.div>
              {/* Subscription Details Card */}
              {subscriptionDetails && (
                <div className="bg-white rounded-xl p-6 shadow-sm mb-8 text-left">
                  <h2 className="text-xl font-semibold text-text-primary mb-4 flex items-center">
                    <Icon name="Crown" size={20} className="mr-2" />
                    Abonamentul tău
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-text-secondary">Tip abonament:</span>
                      <span className="font-semibold text-text-primary">
                        {getSubscriptionTypeLabel(subscriptionDetails?.subscription_type)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-text-secondary">Data activării:</span>
                      <span className="text-text-primary">
                        {formatDate(subscriptionDetails?.start_date || subscriptionDetails?.created_at)}
                      </span>
                    </div>

                    {subscriptionDetails?.end_date && (
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-text-secondary">Data expirării:</span>
                        <span className="text-text-primary">
                          {formatDate(subscriptionDetails?.end_date)}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between items-center py-2">
                      <span className="text-text-secondary">Status:</span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                        {subscriptionDetails?.status === 'active' ? 'Activ' : 'În procesare'}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  {subscriptionDetails?.features?.included && (
                    <div className="mt-6 pt-4 border-t border-border">
                      <h3 className="font-medium text-text-primary mb-3">Ce include abonamentul:</h3>
                      <ul className="space-y-2">
                        {subscriptionDetails?.features?.included?.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm text-text-secondary">
                            <Icon name="Check" size={16} className="text-green-600 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
              {/* Next Steps */}
              <div className="bg-blue-50 rounded-xl p-6 mb-8 text-left border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
                  <Icon name="Lightbulb" size={18} className="mr-2" />
                  Următorii pași
                </h3>
                <ul className="text-blue-800 space-y-2 text-sm">
                  <li className="flex items-start">
                    <Icon name="ArrowRight" size={14} className="mr-2 mt-0.5 flex-shrink-0" />
                    Accesează secțiunea "Contul meu" pentru a vedea abonamentul activ
                  </li>
                  <li className="flex items-start">
                    <Icon name="ArrowRight" size={14} className="mr-2 mt-0.5 flex-shrink-0" />
                    Explorează conținutul premium disponibil în platformă
                  </li>
                  <li className="flex items-start">
                    <Icon name="ArrowRight" size={14} className="mr-2 mt-0.5 flex-shrink-0" />
                    Vei primi un email de confirmare în curând
                  </li>
                </ul>
              </div>
            </motion.div>)
          ) : (
            /* Error State */
            (<motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              {/* Error Animation */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Icon name="XCircle" size={48} className="text-red-600" />
              </motion.div>
              {/* Error Message */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold text-text-primary mb-4"
              >
                ❌ Plata nu a fost finalizată
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-text-secondary mb-8"
              >
                Încearcă din nou.
              </motion.p>
              {/* Enhanced Error Details */}
              {paymentDetails && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white rounded-xl p-6 shadow-sm mb-8 text-left border-l-4 border-red-500"
                >
                  <h2 className="text-xl font-semibold text-text-primary mb-4 flex items-center">
                    <Icon name="AlertTriangle" size={20} className="mr-2 text-red-600" />
                    Detalii comandă
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-text-secondary">Numărul comenzii:</span>
                      <span className="font-mono text-text-primary bg-gray-100 px-2 py-1 rounded">
                        #{paymentDetails?.id?.slice(-8)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-text-secondary">Suma:</span>
                      <span className="font-semibold text-text-primary text-lg">
                        {formatCurrency(paymentDetails?.amount)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-2">
                      <span className="text-text-secondary">Status:</span>
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                        ❌ Eșuată
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
              {/* Enhanced Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  onClick={handleRetryPayment}
                  variant="default"
                  fullWidth
                  className="bg-primary hover:bg-primary/90 h-12 text-lg font-semibold"
                >
                  <Icon name="ArrowLeft" size={20} className="mr-2" />
                  Reia plata
                </Button>
                <Button
                  onClick={() => window.location.href = '/'}
                  variant="outline"
                  fullWidth
                  className="h-12"
                >
                  <Icon name="Home" size={20} className="mr-2" />
                  Înapoi la pagina principală
                </Button>
              </motion.div>
              {/* Help Section */}
              <div className="bg-yellow-50 rounded-xl p-6 mb-8 text-left border border-yellow-200">
                <h3 className="font-semibold text-yellow-900 mb-3 flex items-center">
                  <Icon name="HelpCircle" size={18} className="mr-2" />
                  Ai nevoie de ajutor?
                </h3>
                <p className="text-yellow-800 text-sm mb-4">
                  Dacă ai întâmpinat probleme cu plata, te rugăm să:
                </p>
                <ul className="text-yellow-800 space-y-2 text-sm">
                  <li className="flex items-start">
                    <Icon name="ArrowRight" size={14} className="mr-2 mt-0.5 flex-shrink-0" />
                    Verifici datele cardului și încearcă din nou
                  </li>
                  <li className="flex items-start">
                    <Icon name="ArrowRight" size={14} className="mr-2 mt-0.5 flex-shrink-0" />
                    Contactezi banca pentru a verifica tranzacția
                  </li>
                  <li className="flex items-start">
                    <Icon name="ArrowRight" size={14} className="mr-2 mt-0.5 flex-shrink-0" />
                    Ne scrii la contact@matecusucces.ro pentru suport
                  </li>
                </ul>
              </div>
            </motion.div>)
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmationPage;