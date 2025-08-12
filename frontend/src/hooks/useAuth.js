import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from '@/lib/supabase';
import { authAPI } from '@/services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const profile = await authAPI.getCurrentUser().catch(() => null);
        if (mounted) setUser(profile);
      }
      if (mounted) setLoading(false);
    };
    init();
    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        const profile = await authAPI.getCurrentUser().catch(() => null);
        setUser(profile);
      } else {
        setUser(null);
      }
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const login = async (credentials) => {
    try {
      const { access_token, user: profile } = await authAPI.login(credentials);
      setUser(profile);
      return { success: true, user: profile, access_token };
    } catch (error) {
      return { success: false, error: error.message || 'Error al iniciar sesión' };
    }
  };

  const register = async (userData) => {
    try {
      const { access_token, user: profile } = await authAPI.register(userData);
      setUser(profile);
      return { success: true, user: profile, access_token };
    } catch (error) {
      return { success: false, error: error.message || 'Error al registrarse' };
    }
  };

  const logout = () => {
    supabase.auth.signOut().finally(() => setUser(null));
  };

  const updateUser = async (updateData) => {
    try {
      const updated = await authAPI.updateProfile(updateData);
      setUser(updated);
      return { success: true, user: updated };
    } catch (error) {
      return { success: false, error: error.message || 'Error al actualizar perfil' };
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isInstructor: user?.role === 'instructor' || user?.role === 'admin',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};