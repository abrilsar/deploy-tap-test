import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import './globals.css';
import { QueryProvider } from '@/context/query-context';
import { NextAuthProvider } from '@/context/auth-provider';
import { DataProvider } from '@/context/data-provider';
import { SearchProvider } from '@/context/search-provider';
import Navbar from '@/components/dashboard/Navbar';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Deploy-tap',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-bgColor font-sans antialiased',
          inter.variable
        )}
      >
        <QueryProvider>
          <NextAuthProvider>
            <DataProvider>
              <SearchProvider>
                <Navbar />
                <Toaster
                    position="bottom-right"
                    reverseOrder={false}
                  />
                {children}
              </SearchProvider>
            </DataProvider>
          </NextAuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
