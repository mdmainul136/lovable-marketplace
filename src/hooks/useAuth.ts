import { useState, useEffect, useCallback } from 'react';
import { authService, User, LoginCredentials, RegisterData } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchProfile = useCallback(async () => {
    if (!authService.isAuthenticated()) {
      setLoading(false);
      return;
    }
    try {
      const profile = await authService.getProfile();
      setUser(profile);
    } catch (err) {
      setUser(null);
      localStorage.removeItem('authToken');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(credentials);
      setUser(response.user);
      toast({ title: 'Welcome back!', description: 'Login successful' });
      return response;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Login failed';
      setError(message);
      toast({ title: 'Login failed', description: message, variant: 'destructive' });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.register(data);
      setUser(response.user);
      toast({ title: 'Welcome!', description: 'Account created successfully' });
      return response;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Registration failed';
      setError(message);
      toast({ title: 'Registration failed', description: message, variant: 'destructive' });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      // Continue logout even if API fails
    } finally {
      setUser(null);
      toast({ title: 'Logged out', description: 'See you next time!' });
    }
  };

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    refreshProfile: fetchProfile,
  };
}

export default useAuth;
