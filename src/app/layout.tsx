import type { Metadata } from 'next'
import { Space_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'

const spaceMono = Space_Mono({ weight: '400', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Solaris',
  description: 'Solar system symulation',
}

const RootLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <html lang="en">
      <body className={spaceMono.className + ` bg-black flex flex-col h-screen`}>
        <Header />
        {children}
      </body>
    </html>
  )
}

export default RootLayout