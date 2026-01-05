import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Innovators Collecte',
  description: 'Plateforme de collecte de fonds transparente pour les Innovators',
  generator: 'Innovators',
  icons: {
    icon: [
      {
        url: '/Madagascar.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/Madagascar.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
