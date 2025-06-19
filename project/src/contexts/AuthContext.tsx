import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, AuthUser } from '../types';

interface AuthContextType {
  auth: AuthUser;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  switchUser: (userId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Divya',
    email: 'divya@company.com',
    role: 'admin',
    createdAt: new Date(),
  },
  {
    id: '2',
    name: 'Mike Johnson',
    email: 'mike@company.com',
    role: 'manager',
    createdAt: new Date(),
  },
  {
    id: '3',
    name: 'Alex Rivera',
    email: 'alex@company.com',
    role: 'developer',
    createdAt: new Date(),
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthUser>({
    user: mockUsers[0], // Start logged in as admin for demo
    isAuthenticated: true,
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in real app, this would call an API
    const user = mockUsers.find(u => u.email === email);
    if (user) {
      setAuth({ user, isAuthenticated: true });
      return true;
    }
    return false;
  };

  const logout = () => {
    setAuth({ user: null, isAuthenticated: false });
  };

  const switchUser = (userId: string) => {
    const user = mockUsers.find(u => u.id === userId);
    if (user) {
      setAuth({ user, isAuthenticated: true });
    }
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, switchUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}