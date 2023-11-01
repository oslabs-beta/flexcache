import './globals.css'
import Metadata from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';


const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
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
