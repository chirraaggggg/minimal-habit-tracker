import { useState, useEffect } from 'react';
import { supabase } from '../supabase';

/**
 * useAuth — single source of truth for Supabase auth state.
 *
 * Returns:
 *   session      — current Supabase Session (null if logged out)
 *   user         — current Supabase User (null if logged out)
 *   authLoading  — true while the initial session check is in progress
 *   signOut      — async function to sign the user out
 */
export function useAuth() {
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    // 1. Grab whatever session Supabase already has in storage (handles refreshes)
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
      setAuthLoading(false);
    });

    // 2. Keep state in sync for any future auth changes (login, logout, token refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession ?? null);
      setAuthLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    // onAuthStateChange will fire and set session → null automatically
  };

  return {
    session,
    user: session?.user ?? null,
    authLoading,
    signOut,
  };
}
