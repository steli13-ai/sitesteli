import { useEffect } from 'react';
import { routesConfig } from '@/routes/routes.config';

// Prefetch key route chunks after idle to improve perceived navigation speed
export default function RoutePrefetcher() {
  useEffect(() => {
    const idle = (cb) => ("requestIdleCallback" in window ? window.requestIdleCallback(cb, { timeout: 2000 }) : setTimeout(cb, 1000));
    const cancel = (h) => ("cancelIdleCallback" in window ? window.cancelIdleCallback(h) : clearTimeout(h));

    const handler = idle(async () => {
      const important = [
        '/',
        '/course-catalog',
        '/exam-preparation',
        '/free-resources',
      ];
      try {
        // call the dynamic loaders for the important routes to warm code-split chunks
        await Promise.all(
          routesConfig
            .filter(r => important.includes(r.path) && typeof r.loader === 'function')
            .map(r => r.loader())
        );
      } catch (_) {
        // ignore
      }
    });

    return () => cancel(handler);
  }, []);

  return null;
}
