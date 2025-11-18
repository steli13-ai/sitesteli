// Sentry monitoring initialization (lazy to avoid blocking render)
// Uses env var VITE_SENTRY_DSN (define in Netlify UI or .env.production)

export function initMonitoring() {
  const dsn = import.meta.env.VITE_SENTRY_DSN;
  if (!dsn) return;
  try {
    // Dynamic import so bundle excludes Sentry if DSN absent
    import('@sentry/react').then(Sentry => {
      Sentry.init({
        dsn,
        integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
        tracesSampleRate: 0.2,
        replaysSessionSampleRate: 0.0,
        replaysOnErrorSampleRate: 0.5,
        release: import.meta.env.VITE_COMMIT_SHA || undefined,
        environment: import.meta.env.MODE,
      });
      // Optional global hook for ErrorBoundary
      window.__COMPONENT_ERROR__ = (error, errorInfo) => {
        try { Sentry.captureException(error); } catch {}
      };
    });
  } catch {
    // ignore
  }
}
