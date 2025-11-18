import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { safeInsert, safeUpdate } from '../../lib/supabaseSafe';
import logger from '../../utils/logger';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import { toast } from 'react-hot-toast';
import { premiumPrograms } from '../../content/premiumPrograms';

const CheckoutPage = () => {
  const { user, userProfile, loading: authLoading } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const planMode = searchParams?.get('planMode');

  // Support both subscription plans and single-course purchases
  const courseId = searchParams?.get('courseId');
  const courseTitle = searchParams?.get('courseTitle');
  const priceOverrideRaw = searchParams?.get('price');
  const durationOverride = searchParams?.get('duration');
  const priceOverride = priceOverrideRaw != null ? Number(priceOverrideRaw) : undefined;
  const planId = searchParams?.get('plan') || (courseId ? 'premium_cursuri' : null);

  // Build plan configs from canonical content
  const planConfigs = useMemo(() => {
    const map = {};
    premiumPrograms?.forEach(p => {
      map[p.id] = {
        id: p.id,
        title: p.title,
        description: p.description || p.subtitle,
        price: p.price,
        duration: p.duration,
        features: p.features,
      };
    });
    return map;
  }, []);

  useEffect(() => {
    // Course purchase flow (single course) by URL params
    if (courseId) {
      const base = planConfigs?.['premium_cursuri'] || {};
      const derived = {
        id: 'premium_cursuri',
        title: courseTitle || base?.title || 'Curs Premium',
        description: 'Acces la cursul selectat în platformă',
        price: typeof priceOverride === 'number' && !Number.isNaN(priceOverride) ? priceOverride : (base?.price ?? 0),
        duration: durationOverride || 'curs individual',
        features: base?.features || [
          'Acces la toate materialele cursului',
          'Resurse descărcabile',
          'Quiz-uri de verificare',
        ],
      };
      setSelectedPlan(derived);
    } else {
      // Validate subscription plan
      if (!planId || !planConfigs?.[planId]) {
        toast?.error('Planul selectat nu este valid.');
        navigate('/premium-programs');
        return;
      }
      setSelectedPlan(planConfigs?.[planId]);
    }

    // If user is not authenticated, redirect to unified account login
    if (!authLoading && !user) {
      const redirectQS = new URLSearchParams(Array.from(searchParams?.entries?.() || []));
      const redirect = encodeURIComponent(`/checkout?${redirectQS.toString()}`);
      navigate(`/account?auth=login&redirect=${redirect}`);
      return;
    }
  }, [user, authLoading, planId, courseId, courseTitle, priceOverride, durationOverride, planConfigs, navigate]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ro-RO', {
      style: 'currency',
      currency: 'RON'
    })?.format(amount);
  };

  const monthsFromDuration = (d) => {
    const m = /([0-9]+)/.exec(d || '');
    return m ? Math.max(1, parseInt(m[1], 10)) : 6;
  };

  const planModeInfo = useMemo(() => {
    if (!selectedPlan) return null;
    const months = monthsFromDuration(selectedPlan?.duration);
    if (planMode === 'monthly') {
      return { label: `Plată lunară`, detail: `x ${months} rate`, perRate: selectedPlan?.price / months, installments: months };
    }
    if (planMode === 'bi-monthly' || planMode === 'bi_monthly') {
      const i = Math.max(1, Math.floor(months / 2));
      const discounted = selectedPlan?.price * 0.95;
      return { label: `Plată la 2 luni`, detail: `x ${i} rate la 2 luni`, perRate: discounted / i, installments: i };
    }
    if (planMode === 'full') {
      return { label: `Plată integrală`, detail: `1 rată`, perRate: selectedPlan?.price, installments: 1 };
    }
    return null;
  }, [selectedPlan, planMode]);

  const handleNetopiaPayment = async () => {
    if (!user || !selectedPlan) {
      toast?.error('Te rugăm să te conectezi pentru a continua.');
      const redirectQS = new URLSearchParams(Array.from(searchParams?.entries?.() || []));
      const redirect = encodeURIComponent(`/checkout?${redirectQS.toString()}`);
      navigate(`/account?auth=login&redirect=${redirect}`);
      return;
    }

    setLoading(true);

    try {
      // Free access flow: create completed payment and active subscription immediately
      if ((selectedPlan?.price || 0) <= 0) {
        const { data: paymentData, error: paymentError } = await safeInsert(
          supabase
            ?.from('payments')
            ?.insert({
              user_id: user?.id,
              amount: 0,
              currency: 'RON',
              status: 'completed',
              metadata: {
                subscription_type: 'premium_cursuri',
                title: selectedPlan?.title,
                description: selectedPlan?.description,
                course_id: courseId || null,
                course_title: courseTitle || null,
                free: true,
              },
            })
            ?.select()
            ?.single(),
          'create free payment'
        );

        if (paymentError || !paymentData) throw paymentError || new Error('Nu s-a putut crea înregistrarea de acces gratuit.');

        const endDate = new Date();
        // For free course, give reasonable access window (e.g., 1 lună)
        endDate?.setMonth(endDate?.getMonth() + 1);

        const { data: subscriptionData, error: subscriptionError } = await safeInsert(
          supabase
            ?.from('subscriptions')
            ?.insert({
              user_id: user?.id,
              subscription_type: 'premium_cursuri',
              status: 'active',
              end_date: endDate?.toISOString(),
              price: 0,
              features: { included: selectedPlan?.features },
            })
            ?.select()
            ?.single(),
          'create free subscription'
        );

        if (subscriptionError || !subscriptionData) throw subscriptionError || new Error('Nu s-a putut crea abonamentul gratuit.');

        const { error: linkError } = await safeUpdate(
          supabase?.from('payments')?.update({ subscription_id: subscriptionData?.id })?.eq('id', paymentData?.id),
          'link free payment to subscription'
        );
        if (linkError) throw linkError;

        // Directly go to confirmation success page
        const returnUrl = `${window?.location?.origin}/payment-confirmation?success=1&orderId=${paymentData?.id}&subscriptionId=${subscriptionData?.id}`;
        window.location.href = returnUrl;
        return;
      }

      // 1) Create payment intent and subscription draft in Supabase
      const { data: paymentData, error: paymentError } = await safeInsert(
        supabase
          ?.from('payments')
          ?.insert({
            user_id: user?.id,
            amount: selectedPlan?.price,
            currency: 'RON',
            status: 'pending',
            metadata: {
              subscription_type: courseId ? 'premium_cursuri' : selectedPlan?.id,
              title: selectedPlan?.title,
              description: selectedPlan?.description,
              course_id: courseId || null,
              course_title: courseTitle || null,
            },
          })
          ?.select()
          ?.single(),
        'create payment'
      );

      if (paymentError || !paymentData) throw paymentError || new Error('Nu s-a putut crea plata.');

  const endDate = new Date();
  if (selectedPlan?.duration?.includes('12')) endDate?.setFullYear(endDate?.getFullYear() + 1);
  else if (selectedPlan?.duration?.includes('6')) endDate?.setMonth(endDate?.getMonth() + 6);
  else if (selectedPlan?.duration?.includes('3')) endDate?.setMonth(endDate?.getMonth() + 3);
  else endDate?.setMonth(endDate?.getMonth() + 1);

      const { data: subscriptionData, error: subscriptionError } = await safeInsert(
        supabase
          ?.from('subscriptions')
          ?.insert({
            user_id: user?.id,
            subscription_type: courseId ? 'premium_cursuri' : selectedPlan?.id,
            status: 'pending',
            end_date: endDate?.toISOString(),
            price: selectedPlan?.price,
            features: { included: selectedPlan?.features },
          })
          ?.select()
          ?.single(),
        'create subscription'
      );

      if (subscriptionError || !subscriptionData) throw subscriptionError || new Error('Nu s-a putut crea abonamentul.');

      const { error: linkError } = await safeUpdate(
        supabase?.from('payments')?.update({ subscription_id: subscriptionData?.id })?.eq('id', paymentData?.id),
        'link payment to subscription'
      );
      if (linkError) throw linkError;

      // 2) Call Edge Function / backend to get Netopia payment URL
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
          amount: selectedPlan?.price,
          description: `${selectedPlan?.title} - ${selectedPlan?.description}`,
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
      if (!payment_url) throw new Error('Răspuns invalid de la serviciul de plăți.');

      // 3) Redirect to Netopia hosted page
      window.location.href = payment_url;
    } catch (error) {
      setLoading(false);
      toast?.error(error?.message || 'A apărut o eroare la procesarea plății.');
    }
  };

  // Auth loading skeleton
  if (authLoading) {
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

  if (!selectedPlan) {
    return (
      <div className="min-h-screen bg-background">
  {/* Header provided by layout */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto text-center">
            <Icon name="AlertTriangle" size={48} className="mx-auto text-orange-500 mb-4" />
            <h1 className="text-2xl font-bold text-text-primary mb-2">Plan invalid</h1>
            <p className="text-text-secondary mb-6">Planul selectat nu a fost găsit.</p>
            <Button onClick={() => navigate('/premium-programs')}>
              Vezi toate planurile
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
  {/* Header provided by layout */}
      <Helmet>
        <title>Checkout - {selectedPlan?.title} | Mate cu Succes</title>
        <meta name="description" content={`Finalizează comanda pentru ${selectedPlan?.title}. ${selectedPlan?.description}`} />
        <link rel="canonical" href={`${window.location?.origin}/checkout?plan=${selectedPlan?.id}`} />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="language" content="ro" />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-text-secondary mb-4" aria-label="breadcrumb">
            <ol className="flex items-center space-x-2">
              <li className="flex items-center"><Icon name="User" size={14} className="mr-1" /> Cont</li>
              <li className="mx-2">→</li>
              <li className="flex items-center"><Icon name="Package" size={14} className="mr-1" /> Plan</li>
              <li className="mx-2">→</li>
              <li className="flex items-center"><Icon name="CreditCard" size={14} className="mr-1" /> Plată</li>
            </ol>
          </nav>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-text-primary mb-2">Finalizează comanda</h1>
            <p className="text-text-secondary">Doar câțiva pași până la abonamentul tău premium</p>
          </motion.div>

          <div className="space-y-8">
            {/* Plan Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-border"
            >
              <h2 className="text-xl font-semibold text-text-primary mb-4 flex items-center">
                <Icon name="Package" size={20} className="mr-2" />
                Rezumatul planului
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-text-primary text-lg">{selectedPlan?.title}</h3>
                    <p className="text-text-secondary mt-1">{selectedPlan?.description}</p>
                    <p className="text-sm text-text-secondary mt-1">Durată: {selectedPlan?.duration}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{formatCurrency(selectedPlan?.price)}</div>
                  </div>
                </div>

                {/* Features */}
                <div className="pt-4 border-t border-border">
                  <h4 className="font-medium text-text-primary mb-3">Ce include:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedPlan?.features?.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-text-secondary">
                        <Icon name="Check" size={14} className="text-green-600 mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  {planModeInfo && (
                    <div className="mt-4 p-3 rounded-md bg-blue-50 border border-blue-200 text-blue-800 text-sm">
                      Ai selectat: <strong>{planModeInfo.label}</strong> ({planModeInfo.detail}).
                      În acest moment plata se procesează integral: <strong>{formatCurrency(selectedPlan?.price)}</strong>.
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Netopia Payment Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-border"
            >
              <h2 className="text-xl font-semibold text-text-primary mb-4 flex items-center">
                <Icon name="CreditCard" size={20} className="mr-2" />
                Metoda de plată
              </h2>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Icon name="CreditCard" size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900">Netopia Payments</h3>
                    <p className="text-sm text-blue-700">Plată securizată cu cardul bancar</p>
                    <p className="text-xs text-blue-600 mt-1">Acceptăm Visa, Mastercard și alte carduri majore</p>
                  </div>
                </div>
              </div>

              {/* Customer Details */}
              {user && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h4 className="font-medium text-text-primary mb-3">Detalii facturare</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-text-secondary">Nume:</span>
                      <span className="ml-2 text-text-primary font-medium">
                        {userProfile?.full_name || 'Nu este specificat'}
                      </span>
                    </div>
                    <div>
                      <span className="text-text-secondary">Email:</span>
                      <span className="ml-2 text-text-primary font-medium">{user?.email}</span>
                    </div>
                  </div>
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
              {!user && (
                <div className="mb-4 p-3 rounded-md bg-yellow-50 border border-yellow-200 text-yellow-800" role="alert">
                  Te rugăm să te conectezi sau să îți creezi un cont pentru a continua plata.
                </div>
              )}
            </motion.div>

            {/* Payment Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <Button
                onClick={handleNetopiaPayment}
                fullWidth
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white h-12 text-lg font-semibold"
                aria-busy={loading}
                aria-disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                    Se procesează...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Icon name="Lock" size={18} className="mr-2" />
                    Plătește {formatCurrency(selectedPlan?.price)}
                  </div>
                )}
              </Button>

              <div className="flex items-center justify-center space-x-2 text-xs text-text-secondary">
                <Icon name="Shield" size={14} />
                <span>Plată 100% securizată prin SSL</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;