"use client"

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

interface ProviderProps {
  children: ReactNode; // Properly typing the children
  session?: any; // You can replace `any` with the correct session type if known
}

const Provider: React.FC<ProviderProps> = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
};

export default Provider;
