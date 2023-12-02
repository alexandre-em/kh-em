import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Provider as AdminProvider } from '@/providers/admin.provider';
import { Provider as StoreProvider } from '@/providers/store.provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Khindelvert Em',
  description: 'Site de Khindelvert Em, Artiste-peintre',
  keywords: ['Em', 'Khindelvert', 'peintre', 'painter', 'lithographie', 'lithography', 'oil paints', 'acrylic paints'],
  openGraph: {
    title: 'Khindelvert Em | Official Website',
    description: 'Khindelvert Em, Painter & Lithograph artist',
    type: 'website',
    images:
      'https://storage.googleapis.com/khindelvert-af786.appspot.com/uploads/0038ab85-af9d-4067-b597-42deadcf6e93/Image44-copie_1000.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <AdminProvider>{children}</AdminProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
