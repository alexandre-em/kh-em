import React from 'react';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main style={{ fontFamily: 'roboto', height: '100%', overflowX: 'hidden' }}>
      <Navbar />
      <div className="m-3 min-h-[calc(100vh-152px)]">{children}</div>
      <Footer />
    </main>
  );
}
