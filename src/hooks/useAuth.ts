import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsAdmin(session?.user?.email === 'admin@gmail.com');
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsAdmin(session?.user?.email === 'admin@gmail.com');
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const adminSignIn = async (email: string, password: string) => {
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const response = await fetch(`${supabaseUrl}/functions/v1/admin-auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      
      if (result.success && result.isAdmin) {
        // Create a mock user object for admin
        const adminUser = {
          id: 'admin-user',
          email: 'admin@gmail.com',
          user_metadata: { full_name: 'Administrator' },
          app_metadata: {},
          aud: 'authenticated',
          created_at: new Date().toISOString(),
        } as User;
        
        setUser(adminUser);
        setIsAdmin(true);
        return { data: { user: adminUser }, error: null };
      } else {
        return { data: null, error: { message: result.error || 'Invalid credentials' } };
      }
    } catch (error) {
      console.error('Admin login error:', error);
      return { data: null, error: { message: 'Connection error' } };
    }
  };

  const signIn = async (email: string, password: string) => {
    // Check if this is an admin login attempt
    if (email === 'admin@gmail.com') {
      return adminSignIn(email, password);
    }
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  };

  const signUp = async (email: string, password: string, fullName?: string, center?: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          center: center,
        },
      },
    });
    return { data, error };
  };

  const signOut = async () => {
    setIsAdmin(false);
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  return {
    user,
    isAdmin,
    loading,
    login: signIn,
    logout: signOut,
    signIn,
    signUp,
    signOut,
  };
};