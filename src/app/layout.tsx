import './globals.css'
import type { Metadata } from 'next'
import { Inter, Satisfy } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const satisfy = Satisfy({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-satisfy',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'MayaGPT',
  description: 'Chat with Maya AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${satisfy.variable}`}>{children}</body>
    </html>
  )
} 