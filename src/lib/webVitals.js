// Basic Web Vitals logging to console. Extend to POST to endpoint if needed.
import { onCLS, onINP, onLCP, onFID, onTTFB } from 'web-vitals';
import { logger } from '@/utils/logger';

function report(metric) {
  logger.info('[web-vitals]', metric.name, metric.value);
  // Basic thresholds: warn if LCP > 2500ms or INP > 200ms
  try {
    if (metric.name === 'LCP' && metric.value > 2500) {
      logger.warn('High LCP detected (ms):', Math.round(metric.value));
    }
    if (metric.name === 'INP' && metric.value > 200) {
      logger.warn('High INP detected (ms):', Math.round(metric.value));
    }
  } catch {}
  // Post only in production to reduce noise
  if (import.meta.env.PROD) {
    try {
      navigator.sendBeacon?.('/api/vitals', JSON.stringify({
        name: metric.name,
        value: metric.value,
        id: metric.id,
        delta: metric.delta,
        navigationType: performance.getEntriesByType('navigation')?.[0]?.type
      })) || fetch('/api/vitals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: metric.name,
          value: metric.value,
          id: metric.id,
          delta: metric.delta,
          navigationType: performance.getEntriesByType('navigation')?.[0]?.type
        })
      }).catch(() => {});
    } catch (_) {}
  }
}

export function initWebVitals() {
  onCLS(report);
  onINP(report);
  onLCP(report);
  onFID(report);
  onTTFB(report);
}
