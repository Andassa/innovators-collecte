import type { Metadata, Viewport } from 'next'
import { Manrope, Rowdies } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const manrope = Manrope({ 
  subsets: ["latin"],
  variable: '--font-manrope',
  display: 'swap',
})

const rowdies = Rowdies({ 
  weight: ['300', '400', '700'],
  subsets: ["latin"],
  variable: '--font-rowdies',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: 'Innovators Collecte',
  description: 'Plateforme de collecte de fonds transparente pour l\'équipe Innovators - Madagascar',
  generator: 'Innovators',
  icons: {
    icon: '/Madagascar.png',
    apple: '/Madagascar.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`${manrope.variable} ${rowdies.variable} font-sans antialiased overflow-x-hidden`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
