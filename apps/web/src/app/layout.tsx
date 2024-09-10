import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ToastContainer } from 'react-toastify';
import StoreProvider from '@/components/StoreProvider';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600'] });

export const metadata: Metadata = {
  title: 'FullStack',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div className="pb-[60px]">
          <Navbar />
        </div>
        {/* <StoreProvider> */}
          {children}
        {/* </StoreProvider> */}
        <Footer />
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          closeOnClick
          draggable
        />
      </body>
    </html>
  );
}
