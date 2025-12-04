import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabase';
import { safeSelect, safeUpdate } from '../lib/supabaseSafe';
import logger from '../utils/logger';

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [profileLoading, setProfileLoading] = useState(false)

  // Isolated async operations - never called from auth callbacks
  const profileOperations = {
    async load(userId) {
      if (!userId) return
      setProfileLoading(true)
      try {
        logger.info('Loading profile for user:', userId);
        const { data, error } = await safeSelect(
          supabase?.from('user_profiles')?.select('*')?.eq('id', userId)?.single(),
          'load user profile'
        )
        if (error) {
          logger.error('Profile load error:', error);
        } else {
          logger.info('Profile loaded successfully:', data);
          setUserProfile(data);
        }
      } catch (error) {
        logger.error('Profile load unexpected error:', error)
      } finally {
        setProfileLoading(false)
      }
    },

    clear() {
      setUserProfile(null)
      setProfileLoading(false)
    }
  }

  // Auth state handlers - PROTECTED from async modification
  const authStateHandlers = {
    // This handler MUST remain synchronous - Supabase requirement
    onChange: (event, session) => {
  logger.info('Auth state changed:', event, session?.user?.email);
      setUser(session?.user ?? null)
      setLoading(false)
      
      if (session?.user) {
        profileOperations?.load(session?.user?.id) // Fire-and-forget
      } else {
        profileOperations?.clear()
      }
    }
  }

  useEffect(() => {
    // Initial session check
    supabase?.auth?.getSession()?.then(({ data: { session } }) => {
      logger.info('Initial session check:', session?.user?.email);
      authStateHandlers?.onChange(null, session)
    })

    // CRITICAL: This must remain synchronous
    const { data: { subscription } } = supabase?.auth?.onAuthStateChange(
      authStateHandlers?.onChange
    )

    return () => subscription?.unsubscribe()
  }, [])

  // Auth methods with enhanced error handling
  const signIn = async (email, password) => {
    try {
      logger.info('Attempting sign in for:', email);
      const { data, error } = await supabase?.auth?.signInWithPassword({ 
        email: email?.trim()?.toLowerCase(), 
        password 
      })
      
      if (error) {
        logger.error('Sign in error:', error);
      } else {
        logger.info('Sign in successful:', data?.user?.email);
      }
      
      return { data, error }
    } catch (error) {
      logger.error('Sign in unexpected error:', error);
      return { error: { message: 'Eroare de rețea. Te rugăm să încerci din nou.' } }
    }
  }

  const signUp = async (email, password, metadata = {}) => {
    try {
      logger.info('Attempting sign up for:', email);
      const { data, error } = await supabase?.auth?.signUp({
        email: email?.trim()?.toLowerCase(),
        password,
        options: {
          data: metadata
        }
      })
      
      if (error) {
        logger.error('Sign up error:', error);
      } else {
        logger.info('Sign up successful:', data?.user?.email);
      }
      
      return { data, error }
    } catch (error) {
      logger.error('Sign up unexpected error:', error);
      return { error: { message: 'Eroare de rețea. Te rugăm să încerci din nou.' } }
    }
  }

  const signOut = async () => {
    try {
      logger.info('Attempting sign out');
      const { error } = await supabase?.auth?.signOut()
      if (!error) {
        setUser(null)
        profileOperations?.clear()
        logger.info('Sign out successful');
      } else {
        logger.error('Sign out error:', error);
      }
      return { error }
    } catch (error) {
      logger.error('Sign out unexpected error:', error);
      return { error: { message: 'Eroare de rețea. Te rugăm să încerci din nou.' } }
    }
  }

  const updateProfile = async (updates) => {
    if (!user) return { error: { message: 'Nu există utilizator autentificat' } }
    
    try {
      logger.info('Updating profile for user:', user?.id);
      const { data, error } = await safeUpdate(
        supabase?.from('user_profiles')?.update(updates)?.eq('id', user?.id)?.select()?.single(),
        'update user profile'
      )
      if (!error) {
        setUserProfile(data)
        logger.info('Profile updated successfully:', data);
      } else {
        logger.error('Profile update error:', error);
      }
      return { data, error }
    } catch (error) {
      logger.error('Profile update unexpected error:', error);
      return { error: { message: 'Eroare de rețea. Te rugăm să încerci din nou.' } }
    }
  }

  const revalidateSession = async () => {
    try {
      const { data, error } = await supabase?.auth?.getSession();
      if (error) {
        logger.warn('Session revalidation error:', error);
      }
      // Attempt token refresh if near expiry
      const exp = data?.session?.expires_at;
      const now = Math.floor(Date.now() / 1000);
      if (exp && exp - now < 60) {
        try {
          await supabase?.auth?.refreshSession();
          const post = await supabase?.auth?.getSession();
          return { data: post?.data, error: post?.error };
        } catch (rfErr) {
          logger.warn('Token refresh attempt failed:', rfErr);
        }
      }
      return { data, error };
    } catch (e) {
      logger.error('Session revalidation unexpected error:', e);
      return { error: { message: 'Eroare la verificarea sesiunii' } };
    }
  };

  const value = useMemo(() => ({
    user,
    userProfile,
    loading,
    profileLoading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    isAuthenticated: !!user,
    revalidateSession,
    // Unified 401 recovery helper for consumers
    handleUnauthorized: async () => {
      try {
        const { data } = await supabase?.auth?.getSession();
        if (!data?.session) return false;
        const refreshed = await supabase?.auth?.refreshSession();
        return !refreshed?.error;
      } catch { return false; }
    },
  }), [user, userProfile, loading, profileLoading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}