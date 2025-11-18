// Central route config with lazy loaders
// Layout keys: 'default' | 'auth' | 'empty'

export const routesConfig = [
  {
    path: '/',
    layout: 'default',
    loader: () => import(/* webpackChunkName: "homepage" */ /* webpackPrefetch: true */ '@/pages/homepage'),
  },
  { path: '/homepage', layout: 'default', loader: () => import(/* webpackChunkName: "homepage" */ /* webpackPrefetch: true */ '@/pages/homepage') },
  { path: '/free-resources', layout: 'default', loader: () => import(/* webpackChunkName: "free-resources" */ '@/pages/free-resources') },
  { path: '/parent-resources', layout: 'default', loader: () => import(/* webpackChunkName: "parent-resources" */ '@/pages/parent-resources') },
  { path: '/premium-programs', layout: 'default', loader: () => import(/* webpackChunkName: "premium-programs" */ '@/pages/premium-programs') },
  { path: '/test-orientare', layout: 'default', loader: () => import(/* webpackChunkName: "test-orientare" */ '@/pages/test-orientare') },
  { path: '/consiliere', layout: 'default', loader: () => import(/* webpackChunkName: "consiliere" */ '@/pages/consiliere') },
  { path: '/exam-preparation', layout: 'default', loader: () => import(/* webpackChunkName: "exam-preparation" */ '@/pages/exam-preparation') },
  // Parent support contact form
  { path: '/suport-parinti', layout: 'default', loader: () => import(/* webpackChunkName: "suport-parinti" */ '@/pages/suport-parinti') },
  // Donations
  { path: '/doneaza', layout: 'default', loader: () => import(/* webpackChunkName: "donate" */ '@/pages/doneaza') },
  { path: '/donatii', layout: 'default', loader: () => import(/* webpackChunkName: "donate" */ '@/pages/doneaza') },
  { path: '/course-catalog', layout: 'default', loader: () => import(/* webpackChunkName: "course-catalog" */ /* webpackPrefetch: true */ '@/pages/course-catalog') },
  { path: '/contact', layout: 'default', loader: () => import(/* webpackChunkName: "contact" */ '@/pages/contact') },
  // FAQ page
  { path: '/intrebari-frecvente', layout: 'default', loader: () => import(/* webpackChunkName: "faq" */ '@/pages/intrebari-frecvente') },
  { path: '/faq', layout: 'default', loader: () => import(/* webpackChunkName: "faq" */ '@/pages/intrebari-frecvente') },
  // Report a problem page
  { path: '/raporteaza-o-problema', layout: 'default', loader: () => import(/* webpackChunkName: "report-problem" */ '@/pages/raporteaza-o-problema') },
  { path: '/report', layout: 'default', loader: () => import(/* webpackChunkName: "report-problem" */ '@/pages/raporteaza-o-problema') },
  // Help center & feedback
  { path: '/centru-de-ajutor', layout: 'default', loader: () => import(/* webpackChunkName: "help-center" */ '@/pages/centru-de-ajutor') },
  { path: '/help', layout: 'default', loader: () => import(/* webpackChunkName: "help-center" */ '@/pages/centru-de-ajutor') },
  { path: '/feedback', layout: 'default', loader: () => import(/* webpackChunkName: "feedback" */ '@/pages/feedback') },
  // Legal pages
  { path: '/termeni-si-conditii', layout: 'default', loader: () => import(/* webpackChunkName: "terms" */ '@/pages/termeni-si-conditii') },
  { path: '/termeni', layout: 'default', loader: () => import(/* webpackChunkName: "terms" */ '@/pages/termeni-si-conditii') },
  { path: '/politica-confidentialitate', layout: 'default', loader: () => import(/* webpackChunkName: "privacy" */ '@/pages/politica-confidentialitate') },
  { path: '/cookies', layout: 'default', loader: () => import(/* webpackChunkName: "cookies" */ '@/pages/cookies') },
  { path: '/account', layout: 'default', loader: () => import(/* webpackChunkName: "account" */ /* webpackPrefetch: true */ '@/pages/account') },
  { path: '/contul-meu', layout: 'default', loader: () => import(/* webpackChunkName: "account" */ /* webpackPrefetch: true */ '@/pages/account') },
  { path: '/checkout', layout: 'default', protected: true, loader: () => import(/* webpackChunkName: "checkout" */ /* webpackPrefetch: true */ '@/pages/checkout') },
  { path: '/confirmare-plata', layout: 'default', protected: true, loader: () => import(/* webpackChunkName: "payment-confirmation" */ /* webpackPrefetch: true */ '@/pages/payment-confirmation') },
  { path: '/autentificare', layout: 'auth', loader: () => import(/* webpackChunkName: "auth" */ '@/pages/autentificare') },
  { path: '*', layout: 'empty', loader: () => import(/* webpackChunkName: "not-found" */ '@/pages/NotFound') },
];
