'use client';

// UDAH GK KEPAKE YA

import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  loggedIn: boolean;
  userEmail: string | null;
  setLoggedIn: (loggedIn: boolean, email?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loggedIn, setLoggedInState] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const setLoggedIn = (loggedIn: boolean, email?: string) => {
    setLoggedInState(loggedIn);
    if (loggedIn && email) {
      setUserEmail(email);
    } else {
      setUserEmail(null);
    }
  };

  const logout = () => {
    setLoggedInState(false);
    setUserEmail(null);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, userEmail, setLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
