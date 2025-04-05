"use client"

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

interface CustomSession {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id?: string;
  };
  expires: string;
}

interface ProviderProps {
  children: ReactNode;
  session?: CustomSession | null;
}

const Provider: React.FC<ProviderProps> = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
};

export default Provider;