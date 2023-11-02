import './globals.css'
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';


const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Flexcache',
  description: 'Open source NPM module that allows developers to add server side caching to their applications with persisting data to their SQL database.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} grid min-h-screen grid-rows-layout`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
