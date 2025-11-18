// Prefetch non-critical route chunks after idle to speed up subsequent navigation.
import { routesConfig } from '@/routes/routes.config';

export function prefetchRoutes(limit = 6) {
  const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 250));
  idle(() => {
    routesConfig
      .filter(r => !r.protected && r.path !== '/' && r.path !== '/homepage')
      .slice(0, limit)
      .forEach(r => {
        try { r.loader()?.catch(() => {}); } catch {}
      });
  });
}
