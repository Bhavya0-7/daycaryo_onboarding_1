import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Daycaryo – Onboarding Portal',
  description: 'Register your daycare in a few animated steps',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col items-center">
        <div className="bg-pastel" />
        {children}
      </body>
    </html>
  )
}