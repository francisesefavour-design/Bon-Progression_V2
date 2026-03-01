import { useState, useEffect, useCallback } from 'react';
import { store } from '@/lib/store';
import type { User } from '@/types';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    store.initialize();
    const currentUser = store.getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const login = useCallback((email: string, password: string): { success: boolean; error?: string } => {
    const foundUser = store.getUserByEmail(email);
    if (!foundUser) {
      return { success: false, error: 'User not found' };
    }
    if (foundUser.password !== password) {
      return { success: false, error: 'Invalid password' };
    }
    store.setCurrentUser(foundUser);
    setUser(foundUser);
    return { success: true };
  }, []);

  const signup = useCallback((data: {
    email: string;
    username: string;
    password: string;
    whatsapp?: string;
    profilePic?: string;
  }): { success: boolean; error?: string; user?: User } => {
    const existingUser = store.getUserByEmail(data.email);
    if (existingUser) {
      return { success: false, error: 'Email already registered' };
    }
    
    const newUser = store.createUser({
      email: data.email,
      username: data.username,
      password: data.password,
      whatsapp: data.whatsapp,
      profilePic: data.profilePic,
      role: 'member',
    });
    
    store.setCurrentUser(newUser);
    setUser(newUser);
    return { success: true, user: newUser };
  }, []);

  const logout = useCallback(() => {
    store.setCurrentUser(null);
    setUser(null);
  }, []);

  const updateProfile = useCallback((updates: Partial<User>): { success: boolean; error?: string } => {
    if (!user) return { success: false, error: 'Not logged in' };
    const updated = store.updateUser(user.id, updates);
    if (updated) {
      store.setCurrentUser(updated);
      setUser(updated);
      return { success: true };
    }
    return { success: false, error: 'Update failed' };
  }, [user]);

  const isAdmin = user?.role === 'Admin';
  const isSubAdmin = user?.role === 'Sub_Admin';

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    isAdmin,
    isSubAdmin,
    login,
    signup,
    logout,
    updateProfile,
  };
}
