import { supabase } from '@/lib/supabase';

export async function useSubscribe(email, name) {
  if (!email) throw new Error('Email required');
  const payload = { email, name: name || null };
  const { error } = await supabase.from('subscribers').insert([payload]);
  if (error) throw error;
  return true;
}
