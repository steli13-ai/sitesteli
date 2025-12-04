import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY;

let supabase;
if (supabaseUrl && supabaseAnonKey) {
  // Real client when env vars exist
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
    }
  });
} else {
  // Preview-safe mock to avoid crashing the app when env is missing (e.g., local preview)
  // Provides minimal auth and query interfaces returning nulls/errors gracefully.
  // eslint-disable-next-line no-console
  if (import.meta.env?.DEV) console.warn('[Supabase] Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY. Running in preview mode with auth disabled.');

  const asyncError = (message) => Promise.resolve({ data: null, error: { message } });

  // Create a chainable builder that mimics supabase-js postgrest builders
  const makeBuilder = () => ({
    // filtering
    eq: () => makeBuilder(),
    // transforms
    select: () => makeBuilder(),
    // terminal
    single: () => asyncError('DB disabled in preview'),
  });

  const mockFrom = () => ({
    // Typical usage: from().insert(...).select().single()
    insert: () => makeBuilder(),
    update: () => makeBuilder(),
    select: () => makeBuilder(),
    eq: () => makeBuilder(),
    single: () => asyncError('DB disabled in preview'),
  });

  supabase = {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      getUser: async () => ({ data: { user: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signInWithPassword: async () => ({ data: null, error: { message: 'Auth disabled in preview' } }),
      signUp: async () => ({ data: null, error: { message: 'Auth disabled in preview' } }),
      signOut: async () => ({ error: null }),
    },
    from: () => mockFrom(),
    // Minimal storage mock so pages using uploads do not crash in preview mode
    storage: {
      from: () => ({
        upload: async (_path, _file, _opts) => ({ data: { path: 'mock/path' }, error: null }),
        getPublicUrl: (_path) => ({ data: { publicUrl: 'https://example.com/mock-upload' } }),
        createSignedUrl: async (_path, _seconds) => ({ data: { signedUrl: 'https://example.com/mock-signed-url' }, error: null }),
      }),
    },
  };
}

// eslint-disable-next-line import/prefer-default-export
export { supabase };
