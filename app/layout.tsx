import type {Metadata} from 'next'
import {
  Nanum_Myeongjo,
  IBM_Plex_Serif,
} from 'next/font/google'

import './globals.css'

const nanumMyeongjo = Nanum_Myeongjo({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-nanum',
})

const ibmPlexSerif = IBM_Plex_Serif({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-ibm-plex',
})

export const metadata: Metadata = {
  title: 'in:draft',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${nanumMyeongjo.variable} ${ibmPlexSerif.variable}`}
      >
        {children}
      </body>
    </html>
  )
}