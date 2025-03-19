import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Brix Marketing - Building Your Brand Block by Block',
  description: 'Creative marketing solutions built one piece at a time, just like our friendly Brix characters.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-dark text-light min-h-screen`}>
        {children}
      </body>
    </html>
  );
} 