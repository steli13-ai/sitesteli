import React, { memo } from 'react';
import Header from '@/components/ui/Header';

const AuthLayout = memo(function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 container mx-auto px-4 py-8 max-w-md">{children}</main>
    </div>
  );
});

export default AuthLayout;
