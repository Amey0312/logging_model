import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Next.js App',
  description: 'A Next.js application with authentication and CRUD dashboard',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-r from-slate-300 to-slate-500 h-screen">
        <main className="container mx-auto px-4 py-6">{children}</main>
        <footer className="bg-gray-800 text-white py-4 mt-6">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm">&copy; {new Date().getFullYear()} My App. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
