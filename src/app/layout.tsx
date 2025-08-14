import { Inter } from 'next/font/google';
import './globals.css';
import { AOSInit } from '@/components/AOSInit';
import { Navigation } from '@/components/Navigation';
import { FloatingButtons } from '@/components/FloatingButtons';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: '렌팁 - 프리미엄 수입차 렌탈',
  description: '람보르기니, 벤틀리, 포르쉐 등 최고급 수입차 렌탈 서비스',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${inter.className} scroll-smooth`}>
      <body className="bg-black text-white antialiased">
        <AOSInit />
        <Navigation />
        {children}
        <FloatingButtons />
      </body>
    </html>
  );
}