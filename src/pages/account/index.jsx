import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { safeSelect } from '../../lib/supabaseSafe';
import logger from '../../utils/logger';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Icon from '../../components/AppIcon';
import { useSearchParams, useNavigate } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';
import SignupForm from '../../components/auth/SignupForm';
import { toast } from 'react-hot-toast';

const AccountPage = () => {
  const { user, userProfile, signOut, updateProfile, loading: authLoading } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Set active tab from URL params or default to personal
  const [activeTab, setActiveTab] = useState(searchParams?.get('tab') || 'personal');
  const [personalData, setPersonalData] = useState({
    fullName: '',
    email: '',
    gradeLevel: '',
    preferences: {}
  });
  const [worksheets, setWorksheets] = useState([]);
  const [payments, setPayments] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

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

  useEffect(() => {
    if (userProfile) {
      setPersonalData({
        fullName: userProfile?.full_name || '',
        email: userProfile?.email || '',
        gradeLevel: userProfile?.grade_level || '',
        preferences: userProfile?.preferences || {}
      });
      fetchUserData();
    }
  }, [userProfile]);

  const fetchUserData = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    try {
      // Fetch saved worksheets
      const { data: worksheetsData } = await safeSelect(
        supabase
          ?.from('saved_worksheets')
          ?.select('*')
          ?.eq('user_id', user?.id)
          ?.order('saved_at', { ascending: false }),
        'fetch saved worksheets'
      );

      // Fetch user progress
      const { data: progressData } = await safeSelect(
        supabase
          ?.from('user_progress')
          ?.select('*')
          ?.eq('user_id', user?.id)
          ?.order('last_accessed', { ascending: false }),
        'fetch user progress'
      );

      // Fetch subscriptions
      const { data: subscriptionsData } = await safeSelect(
        supabase
          ?.from('subscriptions')
          ?.select('*')
          ?.eq('user_id', user?.id)
          ?.order('created_at', { ascending: false }),
        'fetch subscriptions'
      );

      // Fetch payments
      const { data: paymentsData } = await safeSelect(
        supabase
          ?.from('payments')
          ?.select('*, subscriptions(*)')
          ?.eq('user_id', user?.id)
          ?.order('created_at', { ascending: false }),
        'fetch payments'
      );

      setWorksheets(worksheetsData || []);
      setSubscriptions(subscriptionsData || []);
      setPayments(paymentsData || []);

      // Merge progress data with worksheets
      const worksheetsWithProgress = (worksheetsData || [])?.map(worksheet => {
        const progress = progressData?.find(p => p?.worksheet_id === worksheet?.worksheet_id);
        return { ...worksheet, progress };
      });
      setWorksheets(worksheetsWithProgress);

    } catch (error) {
      logger.error('Error fetching user data:', error);
    }
    setLoading(false);
  };

  const handlePersonalDataUpdate = async (e) => {
    e?.preventDefault();
    setSaving(true);
    setMessage('');

    const { error } = await updateProfile({
      full_name: personalData?.fullName,
      grade_level: personalData?.gradeLevel,
      preferences: personalData?.preferences
    });

    if (error) {
      setMessage({ type: 'error', text: 'Eroare la salvarea datelor. Încearcă din nou.' });
    } else {
      setMessage({ type: 'success', text: 'Datele au fost actualizate cu succes!' });
    }

    setSaving(false);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('ro-RO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ro-RO', {
      style: 'currency',
      currency: 'RON'
    })?.format(amount);
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

  const getStatusColor = (status) => {
    const colors = {
      'active': 'bg-green-100 text-green-800',
      'expired': 'bg-red-100 text-red-800',
      'cancelled': 'bg-gray-100 text-gray-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'completed': 'bg-green-100 text-green-800',
      'failed': 'bg-red-100 text-red-800'
    };
    return colors?.[status] || 'bg-gray-100 text-gray-800';
  };

  const tabs = [
    { id: 'personal', label: 'Date personale', icon: 'User' },
    { id: 'worksheets', label: 'Fișele mele', icon: 'FileText' },
    { id: 'abonamente', label: 'Abonamente', icon: 'Crown' },
    { id: 'payments', label: 'Istoric plăți', icon: 'CreditCard' }
  ];

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
        </div>
      </div>
    );
  }

  // If not authenticated, render embedded login/signup based on query
  if (!user) {
    const authMode = (searchParams?.get('auth') || 'login').toLowerCase();
    const redirect = searchParams?.get('redirect') || '/account';

    const handleAuthSuccess = () => {
      const dest = redirect?.startsWith('/') ? redirect : '/account';
      navigate(dest);
    };

    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
                <Icon name="User" size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-text-primary mb-2">
                {authMode === 'signup' ? 'Creează-ți contul' : 'Conectează-te'}
              </h1>
              <p className="text-text-secondary">Autentifică-te pentru a continua: <span className="font-medium">{redirect}</span></p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
              {authMode === 'signup' ? (
                <SignupForm embedded={true} onSuccess={handleAuthSuccess} onSwitchToLogin={() => navigate(`/account?auth=login&redirect=${encodeURIComponent(redirect)}`)} onClose={() => navigate('/')} />
              ) : (
                <LoginForm embedded={true} onSuccess={handleAuthSuccess} onSwitchToSignup={() => navigate(`/account?auth=signup&redirect=${encodeURIComponent(redirect)}`)} onClose={() => navigate('/')} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Contul meu</h1>
            <p className="text-text-secondary mt-1">
              Bun venit, {userProfile?.full_name || user?.email}!
            </p>
          </div>
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <Icon name="LogOut" size={18} />
            <span>Deconectare</span>
          </Button>
        </div>

        {/* Message */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-lg ${
              message?.type === 'error' ?'bg-red-50 border border-red-200 text-red-800' :'bg-green-50 border border-green-200 text-green-800'
            }`}
          >
            <div className="flex items-center">
              <Icon 
                name={message?.type === 'error' ? 'AlertCircle' : 'CheckCircle'} 
                size={18} 
                className="mr-2" 
              />
              {message?.text}
            </div>
          </motion.div>
        )}

        {/* Enhanced Tabs */}
        <div className="flex space-x-1 bg-muted p-1 rounded-lg mb-8 overflow-x-auto">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors whitespace-nowrap ${
                activeTab === tab?.id
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name={tab?.icon} size={18} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          {activeTab === 'personal' && (
            <div>
              <h2 className="text-xl font-semibold text-text-primary mb-6">Date personale</h2>
              
              <form onSubmit={handlePersonalDataUpdate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Nume complet
                    </label>
                    <Input
                      type="text"
                      value={personalData?.fullName}
                      onChange={(e) => setPersonalData(prev => ({
                        ...prev,
                        fullName: e?.target?.value
                      }))}
                      placeholder="Prenume Nume"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      value={personalData?.email}
                      disabled
                      className="bg-gray-50"
                    />
                    <p className="text-xs text-text-secondary mt-1">
                      Emailul nu poate fi modificat
                    </p>
                  </div>

                  {userProfile?.role === 'student' && (
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Clasa
                      </label>
                      <Select
                        value={personalData?.gradeLevel}
                        onChange={(value) => setPersonalData(prev => ({
                          ...prev,
                          gradeLevel: value
                        }))}
                        options={gradeLevelOptions}
                        placeholder="Selectează clasa"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Rol
                    </label>
                    <Input
                      type="text"
                      value={userProfile?.role === 'student' ? 'Elev' : 
                            userProfile?.role === 'parent' ? 'Părinte' : 
                            userProfile?.role === 'teacher' ? 'Profesor' : 
                            userProfile?.role}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={saving}
                    className="bg-primary hover:bg-primary/90"
                  >
                    {saving ? 'Se salvează...' : 'Salvează modificările'}
                  </Button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'worksheets' && (
            <div>
              <h2 className="text-xl font-semibold text-text-primary mb-6">Fișele mele</h2>
              
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent"></div>
                  <span className="ml-2 text-text-secondary">Se încarcă...</span>
                </div>
              ) : worksheets?.length > 0 ? (
                <div className="space-y-4">
                  {worksheets?.map((worksheet) => (
                    <div key={worksheet?.id} className="border border-border rounded-lg p-4 hover:border-primary/30 transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-text-primary">{worksheet?.title}</h3>
                          <p className="text-sm text-text-secondary mt-1">
                            {worksheet?.subject} • {gradeLevelOptions?.find(g => g?.value === worksheet?.grade_level)?.label}
                          </p>
                          <p className="text-xs text-text-secondary mt-1">
                            Salvată pe: {formatDate(worksheet?.saved_at)}
                          </p>
                          {worksheet?.progress && (
                            <div className="mt-2 flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <div className="w-20 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-primary h-2 rounded-full transition-all"
                                    style={{ width: `${worksheet?.progress?.completion_percentage}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs text-text-secondary">
                                  {worksheet?.progress?.completion_percentage}%
                                </span>
                              </div>
                              {worksheet?.progress?.score && (
                                <span className="text-xs text-primary font-medium">
                                  Scor: {worksheet?.progress?.score}/20
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                        <Button variant="outline" size="sm">
                          <Icon name="ExternalLink" size={16} className="mr-1" />
                          Deschide
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Icon name="FileText" size={48} className="mx-auto text-text-secondary mb-4" />
                  <h3 className="text-lg font-medium text-text-primary mb-2">Nicio fișă salvată</h3>
                  <p className="text-text-secondary">Salvează fișe din secțiunea "Resurse gratuite" pentru a le vedea aici.</p>
                </div>
              )}
            </div>
          )}

          {/* New Subscriptions Tab */}
          {activeTab === 'abonamente' && (
            <div>
              <h2 className="text-xl font-semibold text-text-primary mb-6">Abonamentele mele</h2>
              
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent"></div>
                  <span className="ml-2 text-text-secondary">Se încarcă...</span>
                </div>
              ) : (
                <>
                  {/* Active Subscriptions */}
                  {subscriptions?.filter(s => s?.status === 'active')?.length > 0 ? (
                    <div className="mb-8">
                      <h3 className="text-lg font-medium text-text-primary mb-4 flex items-center">
                        <Icon name="Crown" size={20} className="mr-2 text-yellow-500" />
                        Abonamente active
                      </h3>
                      <div className="space-y-4">
                        {subscriptions?.filter(s => s?.status === 'active')?.map((subscription) => (
                          <motion.div 
                            key={subscription?.id} 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="border border-green-200 rounded-xl p-6 bg-gradient-to-r from-green-50 to-blue-50"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                                    <Icon name="Star" size={18} className="text-white" />
                                  </div>
                                  <h4 className="font-semibold text-text-primary text-lg">
                                    {getSubscriptionTypeLabel(subscription?.subscription_type)}
                                  </h4>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <span className="text-text-secondary">Data activării:</span>
                                    <p className="font-medium text-text-primary">
                                      {formatDate(subscription?.start_date)}
                                    </p>
                                  </div>
                                  {subscription?.end_date && (
                                    <div>
                                      <span className="text-text-secondary">Data expirării:</span>
                                      <p className="font-medium text-text-primary">
                                        {formatDate(subscription?.end_date)}
                                      </p>
                                    </div>
                                  )}
                                </div>

                                {/* Features */}
                                {subscription?.features?.included && (
                                  <div className="mt-4 pt-3 border-t border-green-200">
                                    <h5 className="font-medium text-text-primary mb-2 text-sm">Beneficii incluse:</h5>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                                      {subscription?.features?.included?.slice(0, 4)?.map((feature, index) => (
                                        <div key={index} className="flex items-center text-xs text-text-secondary">
                                          <Icon name="Check" size={12} className="text-green-600 mr-1 flex-shrink-0" />
                                          <span>{feature}</span>
                                        </div>
                                      ))}
                                      {subscription?.features?.included?.length > 4 && (
                                        <div className="text-xs text-primary font-medium">
                                          +{subscription?.features?.included?.length - 4} alte beneficii
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                              
                              <div className="text-right ml-6">
                                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium flex items-center">
                                  <Icon name="CheckCircle" size={12} className="mr-1" />
                                  Activ
                                </span>
                                <p className="text-lg font-bold text-green-600 mt-2">
                                  {formatCurrency(subscription?.price)}
                                </p>
                                <p className="text-xs text-text-secondary">o singură dată</p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {/* All Subscriptions */}
                  <div>
                    <h3 className="text-lg font-medium text-text-primary mb-4">Toate abonamentele</h3>
                    {subscriptions?.length > 0 ? (
                      <div className="space-y-3">
                        {subscriptions?.map((subscription) => (
                          <div key={subscription?.id} className="border border-border rounded-lg p-4 hover:border-primary/30 transition-colors">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium text-text-primary">
                                  {getSubscriptionTypeLabel(subscription?.subscription_type)}
                                </h4>
                                <p className="text-sm text-text-secondary mt-1">
                                  Activat pe: {formatDate(subscription?.start_date)}
                                </p>
                                {subscription?.end_date && (
                                  <p className="text-sm text-text-secondary">
                                    {subscription?.status === 'active' ? 'Expiră' : 'A expirat'} pe: {formatDate(subscription?.end_date)}
                                  </p>
                                )}
                              </div>
                              <div className="text-right">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(subscription?.status)}`}>
                                  {subscription?.status === 'active' ? 'Activ' :
                                   subscription?.status === 'expired' ? 'Expirat' :
                                   subscription?.status === 'cancelled' ? 'Anulat' :
                                   subscription?.status === 'pending' ? 'În procesare' :
                                   subscription?.status}
                                </span>
                                <p className="text-sm font-medium text-text-primary mt-1">
                                  {formatCurrency(subscription?.price)}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Icon name="Crown" size={48} className="mx-auto text-text-secondary mb-4" />
                        <h3 className="text-lg font-medium text-text-primary mb-2">Niciun abonament</h3>
                        <p className="text-text-secondary mb-6">Nu ai încă niciun abonament activ. Explorează opțiunile noastre premium!</p>
                        <Button 
                          onClick={() => window.location.href = '/premium-programs'}
                          className="bg-primary hover:bg-primary/90"
                        >
                          <Icon name="Star" size={16} className="mr-2" />
                          Vezi planurile premium
                        </Button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Updated Payments Tab */}
          {activeTab === 'payments' && (
            <div>
              <h2 className="text-xl font-semibold text-text-primary mb-6">Istoric plăți</h2>
              
              {/* Payment History */}
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent"></div>
                  <span className="ml-2 text-text-secondary">Se încarcă...</span>
                </div>
              ) : payments?.length > 0 ? (
                <div className="space-y-4">
                  {payments?.map((payment) => (
                    <div key={payment?.id} className="border border-border rounded-lg p-4 hover:border-primary/30 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              payment?.status === 'completed' ? 'bg-green-100' :
                              payment?.status === 'pending' ? 'bg-yellow-100' :
                              payment?.status === 'failed' ? 'bg-red-100' : 'bg-gray-100'
                            }`}>
                              <Icon 
                                name={payment?.status === 'completed' ? 'CheckCircle' :
                                      payment?.status === 'pending' ? 'Clock' :
                                      payment?.status === 'failed' ? 'XCircle' : 'CreditCard'} 
                                size={16} 
                                className={
                                  payment?.status === 'completed' ? 'text-green-600' :
                                  payment?.status === 'pending' ? 'text-yellow-600' :
                                  payment?.status === 'failed' ? 'text-red-600' : 'text-gray-600'
                                }
                              />
                            </div>
                            <div>
                              <h4 className="font-medium text-text-primary">
                                {payment?.subscriptions ? 
                                  getSubscriptionTypeLabel(payment?.subscriptions?.subscription_type) : 
                                  payment?.metadata?.title || 'Plată generală'
                                }
                              </h4>
                              <p className="text-sm text-text-secondary">
                                {formatDate(payment?.created_at)}
                              </p>
                            </div>
                          </div>
                          
                          {payment?.netopia_transaction_id && (
                            <p className="text-xs text-text-secondary">
                              ID tranzacție: {payment?.netopia_transaction_id}
                            </p>
                          )}
                        </div>
                        
                        <div className="text-right">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment?.status)}`}>
                            {payment?.status === 'completed' ? 'Finalizată' :
                             payment?.status === 'pending' ? 'În procesare' :
                             payment?.status === 'failed' ? 'Eșuată' :
                             payment?.status === 'refunded' ? 'Rambursată' :
                             payment?.status}
                          </span>
                          <p className="text-lg font-medium text-text-primary mt-1">
                            {formatCurrency(payment?.amount)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Icon name="CreditCard" size={48} className="mx-auto text-text-secondary mb-4" />
                  <h3 className="text-lg font-medium text-text-primary mb-2">Nicio plată efectuată</h3>
                  <p className="text-text-secondary mb-6">Nu ai încă nicio plată înregistrată.</p>
                  <Button 
                    onClick={() => window.location.href = '/premium-programs'}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Icon name="ShoppingCart" size={16} className="mr-2" />
                    Explorează ofertele
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;