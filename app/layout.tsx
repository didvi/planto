import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { JournalProvider } from "@/context/journal-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Darwin's Discovery Journal",
  description: "Document your observations and discoveries like a naturalist",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <JournalProvider>{children}</JournalProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
