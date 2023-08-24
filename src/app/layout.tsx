import './globals.css';
import { Inter } from 'next/font/google';
import { ToastProvider } from '@/components/ToastProvider';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { AuthProvider } from '@/components/AuthProvider';
import { Toaster } from '@/components/ui/toaster';
import { Sidebar } from '@/components/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Інтернет магазин фіалок',
  description: 'Великий асортимент фіалок ',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <AuthProvider>
        <body className={`${inter.className} pt-20 `}>
          <ToastProvider />

          <Navbar />

          <main className=' mx-auto  max-w-7xl    min-w-[300px] min-h-screen'>
            {/* <Sidebar /> */}
            <div className='p-4'>
            {children}
            </div>
          </main>

          <Toaster />
          {/* <Footer /> */}
        </body>
      </AuthProvider>
    </html>
  );
}
