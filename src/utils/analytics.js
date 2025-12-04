// Lightweight client-side analytics for CRO instrumentation
// Tracks route engagement and CTA clicks, sending beacons to an endpoint or console

const endpoint = import.meta?.env?.VITE_ANALYTICS_ENDPOINT || '';

function send(eventName, payload = {}) {
  const data = {
    event: eventName,
    ts: Date.now(),
    url: typeof window !== 'undefined' ? window.location.href : '',
    ...payload,
  };
  try {
    if (endpoint) {
      // Prefer Beacon API for non-blocking sends
      if (navigator?.sendBeacon) {
        const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
        navigator.sendBeacon(endpoint, blob);
      } else {
        fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data), keepalive: true }).catch(() => {});
      }
    } else {
      // Fallback to console when endpoint not configured
      // Avoid leaking PII; payloads should be minimal
      // eslint-disable-next-line no-console
      console.debug('[analytics]', data);
    }
  } catch {}
}

export const analytics = {
  routeView: (routeId, extras = {}) => send('route_view', { routeId, ...extras }),
  ctaClick: (ctaId, extras = {}) => send('cta_click', { ctaId, ...extras }),
  funnelStep: (stepId, extras = {}) => send('funnel_step', { stepId, ...extras }),
};

export default analytics;