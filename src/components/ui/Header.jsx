import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../AppIcon';
import { useT } from '@/contexts/I18nContext';
import { LOGO_URL } from '../../config/publicLinks';
import Button from './Button';
import LoginForm from '../auth/LoginForm';
import SignupForm from '../auth/SignupForm';
import { useAuth } from '../../contexts/AuthContext';
import { darkTheme } from '@/config/darkTheme';
import { routesConfig } from '@/routes/routes.config';

const Header = ({ className = '' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [siteNameFlipped, setSiteNameFlipped] = useState(false);
  const [showTransitionElement, setShowTransitionElement] = useState(false);
  const [transitionElementType, setTransitionElementType] = useState('star');
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [logoAvailable, setLogoAvailable] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, userProfile, loading: authLoading, signOut } = useAuth();
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('m4a_theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('m4a_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('m4a_theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(d => !d);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get page-specific color and theme
  const getPageTheme = (pathname) => {
    switch (pathname) {
      case '/homepage': case'/':
        return { color: 'bg-blue-200', textColor: 'text-acasa-blue', hoverClass: 'hover-acasa' };
      case '/free-resources':
        return { color: 'bg-red-200', textColor: 'text-resurse-red', hoverClass: 'hover-resurse-gratuite' };
      case '/exam-preparation':
        return { color: 'bg-purple-200', textColor: 'text-examene-purple', hoverClass: 'hover-pregatire-examene' };
      case '/course-catalog':
        return { color: 'bg-green-200', textColor: 'text-cursuri-green', hoverClass: 'hover-catalog-cursuri' };
      case '/parent-resources':
        return { color: 'bg-yellow-200', textColor: 'text-parinti-yellow', hoverClass: 'hover-resurse-parinti' };
      case '/contact':
        return { color: 'bg-teal-200', textColor: 'text-contact-teal', hoverClass: 'hover-contact' };
      case '/premium-programs':
        return { color: 'bg-orange-200', textColor: 'text-premium-orange', hoverClass: 'hover-programe-premium' };
      case '/contul-meu':
        return { color: 'bg-indigo-200', textColor: 'text-indigo-600', hoverClass: 'hover-account' };
      default:
        return { color: 'bg-primary', textColor: 'text-primary', hoverClass: '' };
    }
  };

  const currentTheme = getPageTheme(location?.pathname);

  const { t, lang, setLang } = useT();
  const navigationItems = [
    { name: t('nav.home'), path: '/homepage', icon: 'Home', theme: getPageTheme('/homepage') },
    { name: t('nav.freeResources'), path: '/free-resources', icon: 'BookOpen', theme: getPageTheme('/free-resources') },
    { name: t('nav.examPreparation'), path: '/exam-preparation', icon: 'GraduationCap', theme: getPageTheme('/exam-preparation') },
    { name: t('nav.courseCatalog'), path: '/course-catalog', icon: 'Library', theme: getPageTheme('/course-catalog') },
    { name: t('nav.parentResources'), path: '/parent-resources', icon: 'Users', theme: getPageTheme('/parent-resources') },
    { name: t('nav.contact'), path: '/contact', icon: 'MessageCircle', theme: getPageTheme('/contact') },
    { name: t('nav.premiumPrograms'), path: '/premium-programs', icon: 'Star', theme: getPageTheme('/premium-programs') }
  ];

  const secondaryItems = [];

  const isActivePath = (path) => location?.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handlePageNavigation = (path) => {
    // Trigger page transition animation
    const elements = ['star', 'cube', 'circle'];
    setTransitionElementType(elements?.[Math.floor(Math.random() * elements?.length)]);
    setShowTransitionElement(true);
    
    // Trigger site name flip
    setSiteNameFlipped(true);
    
    // Navigate after brief delay
    setTimeout(() => {
      navigate(path);
    }, 300);
    
    // Reset animations
    setTimeout(() => {
      setShowTransitionElement(false);
      setSiteNameFlipped(false);
    }, 1200);
  };

  const prefetchRoute = (path) => {
    try {
      const route = routesConfig?.find(r => r.path === path);
      if (route && typeof route.loader === 'function') {
        // Fire and forget to warm the chunk
        route.loader()?.catch(() => {});
      }
    } catch {}
  };

  const handleAuthAction = () => {
    if (user) {
      navigate('/account');
    } else {
      setShowLoginForm(true);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const renderTransitionElement = () => {
    if (!showTransitionElement) return null;
    
    const elementContent = {
      star: (
        <svg viewBox="0 0 24 24" className="w-full h-full text-yellow-400" fill="currentColor">
          <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
        </svg>
      ),
      cube: (
        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg transform rotate-45"></div>
      ),
      circle: (
        <div className="w-full h-full bg-gradient-to-br from-green-400 to-blue-500 rounded-full"></div>
      )
    };

    return (
      <div className="page-transition-element">
        {elementContent?.[transitionElementType]}
      </div>
    );
  };

  return (
    <>
      {renderTransitionElement()}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-background/70 supports-[backdrop-filter]:bg-background/60 backdrop-blur-lg warm-shadow border-b border-border' 
            : 'bg-background'
        } ${className}`}
        role="banner"
      >
        {/* Page-specific highlight bar */}
        <div className={`h-1 ${currentTheme?.color} transition-all duration-500`} />
        
        <div className="w-full">
          <div className="flex items-center justify-between h-16 px-4 lg:px-6">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                  {logoAvailable ? (
                    <img
                      src={LOGO_URL}
                      alt="Mate cu succes logo"
                      className="w-20 h-20 rounded-3xl object-cover warm-shadow shadow-lg ring-2 ring-primary/40 transition-transform duration-300 hover:scale-105"
                      onError={() => setLogoAvailable(false)}
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center warm-shadow shadow-lg ring-2 ring-primary/40">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-10 h-10 text-white"
                        fill="currentColor"
                      >
                        <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
                      </svg>
                    </div>
                  )}
              </div>
              <div className={`font-headline font-bold text-2xl text-primary tracking-tight transition-all duration-300 ${siteNameFlipped ? 'site-name-flip' : ''}`}>
                {siteNameFlipped ? (
                  <>Succes cu <span className="text-secondary">Mate</span></>
                ) : (
                  <>Mate cu <span className="text-secondary">Succes</span></>
                )}
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2" role="navigation" aria-label="Navigare principală">
              {navigationItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handlePageNavigation(item?.path)}
                  onMouseEnter={() => prefetchRoute(item?.path)}
                  aria-label={item?.name}
                  aria-current={isActivePath(item?.path) ? 'page' : undefined}
                  className={`group relative flex items-center space-x-2 px-5 py-2 rounded-2xl font-body font-medium transition-all duration-300 border min-h-[48px] ${
                    isActivePath(item?.path)
                      ? 'bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white border-green-400 shadow-lg shadow-green-400/30 scale-[1.05]'
                      : 'bg-gradient-to-r from-background to-background text-text-secondary border-border/10 hover:from-green-50 hover:to-emerald-50 hover:text-foreground hover:border-green-300/40 hover:shadow-[0_4px_16px_rgba(16,185,129,0.25)] hover:scale-105'
                  }`}
                >
                  {/* Removed white circular overlay icon */}
                  <Icon name={item?.icon} size={20} className="transition-transform duration-300 group-hover:scale-110" />
                  <span className="relative">
                    {item?.name}
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary/40 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </span>
                </button>
              ))}
              <button
                onClick={toggleTheme}
                aria-label={darkMode ? t('actions.toggleLight') : t('actions.toggleDark')}
                aria-pressed={darkMode}
                className="group relative flex items-center space-x-2 px-4 py-2 rounded-xl font-body font-medium transition-all duration-300 border min-h-[44px] bg-background/40 text-text-secondary hover:bg-background/70 hover:text-foreground"
              >
                <Icon name={darkMode ? 'Sun' : 'Moon'} size={20} className="transition-transform duration-300 group-hover:scale-110" />
                <span>{darkMode ? t('actions.toggleLight') : t('actions.toggleDark')}</span>
              </button>
            </nav>

            {/* Auth/CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              {authLoading ? (
                <div className="w-8 h-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
              ) : user ? (
                <div className="flex items-center space-x-3">
                  <Button 
                    onClick={() => navigate('/account')}
                    variant="outline" 
                    size="sm"
                    className="font-cta flex items-center space-x-2"
                  >
                    <Icon name="User" size={16} />
                    <span>Contul meu</span>
                  </Button>
                  <Button 
                    onClick={handleSignOut}
                    variant="outline" 
                    size="sm"
                    className="font-cta text-red-600 border-red-300 hover:bg-red-50"
                  >
                    <Icon name="LogOut" size={16} />
                  </Button>
                </div>
              ) : (
                <>
                  <Button 
                    onClick={() => setShowLoginForm(true)}
                    variant="outline" 
                    size="sm"
                    className="font-cta"
                  >
                    {t('actions.login')}
                  </Button>
                  <Button 
                    onClick={() => setShowSignupForm(true)}
                    variant="default" 
                    size="sm"
                    className="bg-warning text-warning-foreground hover:bg-warning/90 font-cta font-semibold"
                  >
                    {t('actions.startFree')}
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-3 rounded-lg hover:bg-muted transition-colors duration-200 min-h-[44px]"
              aria-label="Deschide/închide meniul mobil"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <Icon 
                name={isMobileMenuOpen ? "X" : "Menu"} 
                size={24} 
                className="text-text-primary"
              />
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden overflow-hidden"
                id="mobile-menu"
              >
                <div className="px-4 py-4 bg-card border-t border-border">
                  <nav className="space-y-2">
                    {[...navigationItems, ...secondaryItems]?.map((item) => (
                      <button
                        key={item?.path}
                        onClick={() => {
                          handlePageNavigation(item?.path);
                          setIsMobileMenuOpen(false);
                        }}
                        onMouseEnter={() => prefetchRoute(item?.path)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-body font-medium transition-all duration-200 w-full text-left min-h-[44px] ${
                          isActivePath(item?.path)
                            ? `${currentTheme?.color} text-white`
                            : `text-text-secondary ${item?.theme?.hoverClass}`
                        }`}
                        aria-current={isActivePath(item?.path) ? 'page' : undefined}
                      >
                        <Icon name={item?.icon} size={20} />
                        <span>{item?.name}</span>
                      </button>
                    ))}
                  </nav>
                  
                  <div className="mt-6 pt-4 border-t border-border space-y-3">
                    {authLoading ? (
                      <div className="flex items-center justify-center py-2">
                        <div className="w-6 h-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                      </div>
                    ) : user ? (
                      <>
                        <Button 
                          onClick={() => {
                            navigate('/account');
                            setIsMobileMenuOpen(false);
                          }}
                          variant="outline" 
                          fullWidth
                          className="font-cta flex items-center justify-center space-x-2"
                        >
                          <Icon name="User" size={16} />
                          <span>Contul meu</span>
                        </Button>
                        <Button 
                          onClick={() => {
                            handleSignOut();
                            setIsMobileMenuOpen(false);
                          }}
                          variant="outline" 
                          fullWidth
                          className="font-cta text-red-600 border-red-300 hover:bg-red-50"
                        >
                          <Icon name="LogOut" size={16} className="mr-2" />
                          Deconectare
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button 
                          onClick={() => {
                            setShowLoginForm(true);
                            setIsMobileMenuOpen(false);
                          }}
                          variant="outline" 
                          fullWidth
                          className="font-cta"
                        >
                          Conectare
                        </Button>
                        <Button 
                          onClick={() => {
                            setShowSignupForm(true);
                            setIsMobileMenuOpen(false);
                          }}
                          variant="default" 
                          fullWidth
                          className="bg-warning text-warning-foreground hover:bg-warning/90 font-cta font-semibold"
                        >
                          Începe Gratuit
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Mathematical Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-4 right-20 text-primary/10 text-2xl font-bold math-symbol-float">
            π
          </div>
          <div className="absolute top-8 left-1/3 text-secondary/10 text-xl font-bold math-symbol-float animate-math-float-slow">
            √
          </div>
          <div className="absolute top-6 right-1/4 text-accent/10 text-lg font-bold math-symbol-float animate-math-float-slower">
            ∑
          </div>
        </div>

        {/* Pastel background shapes */}
        <div className="pastel-shapes" aria-hidden="true">
          <div className="floating-shape w-8 h-8 bg-blue-200 top-4 left-1/4" />
          <div className="floating-shape w-6 h-6 bg-pink-200 top-12 right-1/3" />
          <div className="floating-star top-8 left-1/2">
            <svg className="w-5 h-5 text-yellow-200" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
            </svg>
          </div>
          <div className="floating-cube w-7 h-7 bg-green-200 top-6 right-1/4 rounded" />
          <div className="floating-shape w-5 h-5 bg-purple-200 top-10 left-1/6" />
        </div>
      </header>
      {/* Auth Modals */}
      <AnimatePresence>
        {showLoginForm && (
          <LoginForm
            onClose={() => setShowLoginForm(false)}
            onSwitchToSignup={() => {
              setShowLoginForm(false);
              setShowSignupForm(true);
            }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showSignupForm && (
          <SignupForm
            onClose={() => setShowSignupForm(false)}
            onSwitchToLogin={() => {
              setShowSignupForm(false);
              setShowLoginForm(true);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default React.memo(Header);