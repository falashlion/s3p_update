import type { Metadata } from 'next'
import './globals.scss'

export const metadata: Metadata = {
  title: 'Smobilpay S3P API Documentation',
  description: 'A comprehensive payment solution for bill payments, mobile money, and online transactions across Africa.',
  keywords: 'API, payments, mobile money, bill payments, Africa, Smobilpay, S3P',
  authors: [{ name: 'Maviance' }],
  viewport: 'width=device-width, initial-scale=1',
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
        <link rel="icon" type="image/svg+xml" href="/favicon.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}


import './globals.css'