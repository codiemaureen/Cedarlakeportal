import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title:'Cedar Lake Forms', description:'Employee purchase order portal for Cedar Lake Carpentry' };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }
