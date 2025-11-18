import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import LoginForm from '../../components/auth/LoginForm';
import SignupForm from '../../components/auth/SignupForm';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AuthenticationPage = () => {
  const { user, loading: authLoading } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeForm, setActiveForm] = useState('login');

  const redirectUrl = searchParams?.get('redirect');
  const planId = searchParams?.get('plan');

  useEffect(() => {
    // If user is already authenticated, redirect to intended destination
    if (!authLoading && user) {
      if (redirectUrl && planId) {
        navigate(`${redirectUrl}?plan=${planId}`);
      } else if (redirectUrl) {
        navigate(redirectUrl);
      } else {
        navigate('/contul-meu');
      }
    }
  }, [user, authLoading, redirectUrl, planId, navigate]);

  const handleAuthSuccess = () => {
    // Redirect after successful authentication
    if (redirectUrl && planId) {
      navigate(`${redirectUrl}?plan=${planId}`);
    } else if (redirectUrl) {
      navigate(redirectUrl);
    } else {
      navigate('/contul-meu');
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
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
      <Header />
      {/* Meta tags for SEO */}
      <div style={{ display: 'none' }}>
        <title>Autentificare | Mate cu Succes</title>
        <meta name="description" content="Conectează-te la contul tău Mate cu Succes pentru a accesa cursurile și resursele premium." />
        <link rel="canonical" href={`${window.location?.origin}/autentificare`} />
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
              <Icon name="User" size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary mb-2">
              {activeForm === 'login' ? 'Bun venit înapoi!' : 'Creează-ți contul'}
            </h1>
            <p className="text-text-secondary">
              {activeForm === 'login' ? 'Conectează-te pentru a accesa cursurile tale' : 'Începe să înveți cu Mate cu Succes'}
            </p>
            
            {/* Show redirect info if applicable */}
            {redirectUrl && planId && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center text-blue-800 text-sm">
                  <Icon name="Info" size={16} className="mr-2 flex-shrink-0" />
                  <span>După autentificare vei fi redirecționat pentru a finaliza comanda.</span>
                </div>
              </div>
            )}
          </motion.div>

          {/* Auth Forms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-border"
          >
            {/* Form Tabs */}
            <div className="flex space-x-1 bg-muted p-1 rounded-lg mb-6">
              <button
                onClick={() => setActiveForm('login')}
                className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                  activeForm === 'login' ? 'bg-white text-primary shadow-sm' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Conectare
              </button>
              <button
                onClick={() => setActiveForm('signup')}
                className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                  activeForm === 'signup' ? 'bg-white text-primary shadow-sm' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Creare cont
              </button>
            </div>

            {/* Form Content */}
            <div className="min-h-[400px]">
              {activeForm === 'login' ? (
                <LoginForm
                  embedded={true}
                  onSuccess={handleAuthSuccess}
                  onSwitchToSignup={() => setActiveForm('signup')}
                  onClose={() => navigate('/')}
                />
              ) : (
                <SignupForm
                  embedded={true}
                  onSuccess={handleAuthSuccess}
                  onSwitchToLogin={() => setActiveForm('login')}
                  onClose={() => navigate('/')}
                />
              )}
            </div>
          </motion.div>

          {/* Additional Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-center"
          >
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="text-text-secondary"
            >
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              Înapoi la pagina principală
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationPage;