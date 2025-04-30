import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center">
      <div className="border-2 border-amber-800 rounded-md p-8 bg-amber-100 shadow-md max-w-md w-full text-center">
        <h1 className="text-4xl font-serif font-bold text-amber-900 mb-4">Page Not Found</h1>
        <p className="text-amber-700 font-serif mb-6">
          This page appears to have been lost in the expedition. Perhaps it was carried away by the trade winds.
        </p>
        <Link href="/">
          <Button className="bg-amber-800 hover:bg-amber-900 text-amber-50 font-serif">
            <Home className="mr-2 h-4 w-4" />
            Return to Journal
          </Button>
        </Link>
      </div>
    </div>
  )
}
