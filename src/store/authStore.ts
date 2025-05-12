import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  roles: string[];
  currentUserRole: number;
  login: (userData: User) => void;
  updateRoles: (roles: string[]) => void;
  updateUserRole: (role: number) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      roles: [],
      currentUserRole: 0,
      login: (userData: User) => set({ isAuthenticated: true, user: userData }),
      updateRoles: (roles: string[]) => set({ roles }),
      updateUserRole: (role: number) => set({ currentUserRole: role }),
      logout: () => set({ isAuthenticated: false, user: null, roles: [], currentUserRole: 0 }),
    }),
    {
      name: 'auth-storage',
    }
  )
); 