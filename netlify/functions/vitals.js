// Netlify function to receive Web Vitals metrics
// Simple baseline storage: currently logs; extend to persist to Supabase or analytics service.

export const config = {
  path: '/api/vitals',
};

export default async (request, context) => {
  try {
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ ok: false, error: 'Method not allowed' }), { status: 405 });
    }
    const body = await request.json().catch(() => null);
    if (!body || !body.name || typeof body.value === 'undefined') {
      return new Response(JSON.stringify({ ok: false, error: 'Invalid payload' }), { status: 400 });
    }
    // Basic filtering: ignore obviously bad values
    if (body.value < 0 || body.value > 60000) {
      return new Response(JSON.stringify({ ok: false, error: 'Out of range' }), { status: 422 });
    }
    // For now, log; replace with DB insert / external analytics
    console.log('[vitals]', body.name, body.value, body.id, body.navigationType);
    return new Response(JSON.stringify({ ok: true }), { status: 202 });
  } catch (e) {
    console.error('[vitals] handler error', e);
    return new Response(JSON.stringify({ ok: false, error: 'Server error' }), { status: 500 });
  }
};
