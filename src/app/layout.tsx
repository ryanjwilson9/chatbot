import './globals.css'
import type { Metadata } from 'next'
import { Inter, Satisfy } from 'next/font/google'
import Background from '@/components/Background'

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
    <html lang="en" className="dark">
      <body className={`${inter.className} ${satisfy.variable} bg-gray-900`}>
        <Background />
        <main className="relative z-10 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
} 