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
        release: import.meta.env.VITE_RELEASE || import.meta.env.VITE_COMMIT_SHA || undefined,
        environment: import.meta.env.MODE,
      });
      // Optional global hook for ErrorBoundary
      window.__COMPONENT_ERROR__ = (error, errorInfo) => {
        try {
          // Basic PII scrubbing before capturing
          const sanitize = (msg) => {
            try {
              let s = String(msg ?? '');
              s = s.replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, '[redacted-email]');
              s = s.replace(/(bearer\s+)[a-z0-9-_\.]+/gi, '$1[redacted-token]');
              return s;
            } catch { return 'error'; }
          };
          const e = error instanceof Error ? error : new Error(sanitize(error));
          Sentry.captureException(e, {
            tags: {
              release: import.meta.env.VITE_RELEASE || import.meta.env.VITE_COMMIT_SHA || 'unknown',
              commit: import.meta.env.VITE_COMMIT_SHA || 'unknown',
            }
          });
        } catch {}
      };
    });
  } catch {
    // ignore
  }
}

// Minimal Web Vitals reporting
export async function reportWebVitals(send) {
  try {
    const mod = await import('web-vitals');
    const handler = (metric) => {
      try { send(metric); } catch {}
    };
    mod.onTTFB(handler);
    mod.onFCP(handler);
    mod.onLCP(handler);
    mod.onCLS(handler);
    mod.onINP(handler);
  } catch {
    // ignore if web-vitals missing
  }
}
