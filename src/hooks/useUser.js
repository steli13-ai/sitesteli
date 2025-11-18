import { useAuth } from '@/contexts/AuthContext';

/**
 * useUser: Simple convenience hook to access user state
 * Returns: { user, userProfile, loading, isAuthenticated }
 */
export default function useUser() {
  const { user, userProfile, loading, isAuthenticated } = useAuth();
  return { user, userProfile, loading, isAuthenticated };
}
