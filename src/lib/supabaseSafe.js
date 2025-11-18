import { logger } from '../utils/logger';

export async function safeSelect(builderPromise, context = 'select') {
  try {
    const { data, error } = await builderPromise;
    if (error) throw error;
    return { data };
  } catch (err) {
    logger.error(`Supabase ${context} error:`, err?.message || err);
    return { error: err };
  }
}

export async function safeInsert(builderPromise, context = 'insert') {
  try {
    const { data, error } = await builderPromise;
    if (error) throw error;
    return { data };
  } catch (err) {
    logger.error(`Supabase ${context} error:`, err?.message || err);
    return { error: err };
  }
}

export async function safeUpdate(builderPromise, context = 'update') {
  try {
    const { data, error } = await builderPromise;
    if (error) throw error;
    return { data };
  } catch (err) {
    logger.error(`Supabase ${context} error:`, err?.message || err);
    return { error: err };
  }
}
