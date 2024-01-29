import { AuthProvider } from '@/components/AuthProvider';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { ToastProvider } from '@/components/ToastProvider';
import { Toaster } from '@/components/ui/toaster';
import { Inter } from 'next/font/google';
import { Toaster as ToasterSonner } from 'sonner';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Інтернет магазин фіалок',
  description: 'Великий асортимент фіалок ',
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={`${inter.className}  `}>
          <ToastProvider />
          <div className="sticky top-0 z-50  w-full border-b bg-zinc-100/80 p-1 drop-shadow-sm backdrop-blur-md">
            <Navbar />
          </div>
          <ToasterSonner />
          <main className=" mx-auto   min-h-screen min-w-[300px]   max-w-7xl p-4">
            {children}
          </main>

          <Toaster />
          {/* <Footer /> */}
          {modal}
        </body>
      </AuthProvider>
    </html>
  );
}
