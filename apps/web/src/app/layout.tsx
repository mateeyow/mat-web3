import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MAT | My Awesome Token',
  description: 'Get free tokens daily by checking in!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
