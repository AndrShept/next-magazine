import './globals.css';
import { Inter } from 'next/font/google';
import { ToastProvider } from '@/components/ToastProvider';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { AuthProvider } from '@/components/AuthProvider';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as  ToasterSonner} from 'sonner'

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
    <html lang='en'>
      <AuthProvider>
        <body className={`${inter.className} `}>
          <ToastProvider />

          <Navbar />
          <ToasterSonner />
          <main className=' mx-auto   max-w-7xl p-4   min-w-[300px] min-h-screen'>
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
