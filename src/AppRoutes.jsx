import React, { Suspense, lazy, useEffect, useState, startTransition } from 'react';
import { BrowserRouter as Router, Routes as RouterRoutes, Route } from 'react-router-dom';
import ScrollToTop from 'components/ScrollToTop';
import ErrorBoundary from 'components/ErrorBoundary';
// AuthProvider deferred: loaded only after idle or when a protected route is active
// Removed direct import to avoid pulling auth + supabase code into initial bundle
import ProtectedRoute from './components/ProtectedRoute';
import { routesConfig } from './routes/routes.config';
import DefaultLayout from '@/layouts/DefaultLayout';
import AuthLayout from '@/layouts/AuthLayout';
import EmptyLayout from '@/layouts/EmptyLayout';
import SkeletonPage from '@/components/ui/SkeletonPage';
import RoutePrefetcher from '@/components/RoutePrefetcher';
import analytics from '@/utils/analytics';

// Mitigate occasional PWA chunk cache mismatches by reloading once on chunk load failure
function lazyWithRetry(loader) {
  return lazy(() =>
    loader().catch((err) => {
      const msg = String(err?.message || err || '');
      const isChunkError = /Chunk|Loading|dynamic import|Failed to fetch/i.test(msg);
      if (isChunkError && !window.__RELOADED_ONCE__) {
        window.__RELOADED_ONCE__ = true;
        // Try to prompt SW to update then reload
        try { navigator.serviceWorker?.getRegistrations?.().then(rs => rs.forEach(r => r.update())); } catch {}
        window.location.reload();
      }
      throw err;
    })
  );
}

const AppRoutes = () => {
  return (
    <Router>
      <LazyAuthProvider>
        <ErrorBoundary>
          <ScrollToTop />
          <RoutePrefetcher />
          <Suspense fallback={<SkeletonPage />}>
            <RouterRoutes>
              {routesConfig.map(({ path, layout, protected: isProtected, loader }, idx) => {
                const Lazy = lazyWithRetry(loader);
                const Layout = layout === 'auth' ? AuthLayout : layout === 'empty' ? EmptyLayout : DefaultLayout;
                const element = (
                  <Layout>
                    <ErrorBoundary>
                      <RouteEngagement routePath={path}>
                        <Lazy />
                      </RouteEngagement>
                    </ErrorBoundary>
                  </Layout>
                );
                return (
                  <Route
                    key={idx}
                    path={path}
                    element={isProtected ? <ProtectedRoute>{element}</ProtectedRoute> : element}
                  />
                );
              })}
            </RouterRoutes>
          </Suspense>
        </ErrorBoundary>
      </LazyAuthProvider>
    </Router>
  );
};

function RouteEngagement({ routePath, children }) {
  useEffect(() => {
    const id = String(routePath || '').replace(/^\//, '').replace(/\W+/g, '_') || 'root';
    analytics.routeView(id);
  }, [routePath]);
  return children;
}

function LazyAuthProvider({ children }) {
  const [Provider, setProvider] = useState(null);
  
  useEffect(() => {
    let cancelled = false;
    const isProtectedPath = () => {
      try {
        const current = window.location.pathname;
        return routesConfig.some(r => r.protected && r.path === current);
      } catch { return false; }
    };
    const loader = () => import('./contexts/AuthContext').then(mod => {
      if (!cancelled) setProvider(() => mod.AuthProvider);
    }).catch(err => {
      import('@/utils/logger').then(m => m.logger.error('Failed to load AuthContext', err));
    });
    
    if (isProtectedPath()) {
      loader();
    } else {
      if (window.requestIdleCallback) {
        window.requestIdleCallback(() => startTransition(loader));
      } else {
        setTimeout(() => startTransition(loader), 50);
      }
    }
    return () => { cancelled = true; };
  }, []);
  
  if (!Provider) return <>{children}</>;
  return <Provider>{children}</Provider>;
}

export default AppRoutes;
