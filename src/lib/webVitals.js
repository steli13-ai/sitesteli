// Basic Web Vitals logging to console. Extend to POST to endpoint if needed.
import { onCLS, onINP, onLCP, onFID, onTTFB } from 'web-vitals';

function log(metric) {
  // eslint-disable-next-line no-console
  console.log('[web-vitals]', metric.name, metric.value, metric);
}

export function initWebVitals() {
  onCLS(log);
  onINP(log);
  onLCP(log);
  onFID(log);
  onTTFB(log);
}
