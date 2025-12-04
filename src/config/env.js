import { z } from 'zod';

const EnvSchema = z.object({
  VITE_SITE_URL: z.string().url(),
  VITE_SUPABASE_URL: z.string().url().optional(),
  VITE_SUPABASE_ANON_KEY: z.string().min(20).optional(),
  VITE_DEMO_VIDEO_URL: z.string().url().optional(),
  VITE_FREE_RESOURCES_DRIVE_URL: z.string().url().optional(),
  VITE_LOGO_URL: z.string().optional(),
});

export function getEnv() {
  const raw = import.meta.env || {};
  const parsed = EnvSchema.safeParse(raw);
  if (!parsed.success) {
    const issues = parsed.error.issues.map(i => `${i.path.join('.')}: ${i.message}`);
    // Surface clearly in dev and during CI
    console.error('[env] Invalid environment:', issues);
    throw new Error('Invalid environment configuration');
  }
  return parsed.data;
}

export const env = (() => {
  try { return getEnv(); } catch { return { VITE_SITE_URL: 'https://matecusucces.ro' }; }
})();
