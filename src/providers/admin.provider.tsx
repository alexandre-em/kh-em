'use client';
import React, { createContext, useCallback, useContext, useState } from 'react';

type AdminValueType = {
  isConnected: boolean;
  dispatch: (type: 'LOGIN' | 'LOGOUT', payload: { password: string }) => void;
};

const AdminContext = createContext<AdminValueType | null>(null);

// This hook can be used to access the user info.
export function useAdminContext() {
  return useContext(AdminContext);
}

export function Provider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const dispatch = useCallback((type: 'LOGIN' | 'LOGOUT', payload: { password: string }) => {
    switch (type) {
      case 'LOGIN':
        if (payload.password === process.env.NEXT_PUBLIC_PASSWORD) {
          setIsConnected(true);
        }
        break;
      case 'LOGOUT':
        setIsConnected(false);
        break;
      default:
        break;
    }
  }, []);

  return <AdminContext.Provider value={{ isConnected, dispatch }}>{children}</AdminContext.Provider>;
}
