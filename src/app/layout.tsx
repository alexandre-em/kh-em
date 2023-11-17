import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Provider } from '@/providers/useStore';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Khindelvert Em',
  description: 'Site de Khindelvert Em, Artiste-peintre',
  keywords: ['Em', 'Khindelvert', 'peintre', 'painter', 'lithographie', 'lithography', 'oil paints', 'acrylic paints'],
  openGraph: {
    title: 'Khindelvert Em | Official Website',
    description: 'Khindelvert Em, Painter & Lithograph artist',
    type: 'website',
    images: 'https://payload.cargocollective.com/1/19/621815/10024475/03-Femme-Girafe-60x80-2009_587.jpg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
