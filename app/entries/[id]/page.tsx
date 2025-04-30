"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Edit, MapPin, Calendar } from "lucide-react"
import { notFound } from "next/navigation"
import { useJournal } from "@/context/journal-context"

export default function EntryPage({ params }: { params: { id: string } }) {
  const { getEntry } = useJournal()
  const entry = getEntry(Number(params.id))

  if (!entry) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-amber-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="text-amber-800 hover:text-amber-900 hover:bg-amber-200 font-serif">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Journal
            </Button>
          </Link>
        </div>

        <article className="max-w-3xl mx-auto border-2 border-amber-800 rounded-md p-8 bg-amber-100 shadow-md">
          <header className="mb-8 border-b-2 border-amber-800 pb-4">
            <h1 className="text-3xl font-serif font-bold text-amber-900">{entry.title}</h1>
            <div className="flex flex-wrap gap-4 mt-4 text-amber-700">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span className="font-serif italic">{entry.date}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="font-serif italic">{entry.location}</span>
              </div>
            </div>
          </header>

          <div className="font-serif text-amber-900 space-y-4 leading-relaxed">
            {entry.content.split("\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {entry.image && (
            <div className="mt-8 border-t-2 border-amber-800 pt-4">
              <h2 className="text-xl font-serif font-bold text-amber-900 mb-4">Field Illustration</h2>
              <div className="bg-amber-50 p-4 border-2 border-amber-800 rounded-md">
                <img
                  src={entry.image || "/placeholder.svg"}
                  alt={`Illustration for ${entry.title}`}
                  className="mx-auto max-h-[400px] object-contain"
                />
              </div>
            </div>
          )}

          <div className="flex justify-end mt-8 pt-4 border-t-2 border-amber-800">
            <Link href={`/entries/${entry.id}/edit`}>
              <Button className="bg-amber-800 hover:bg-amber-900 text-amber-50 font-serif">
                <Edit className="mr-2 h-4 w-4" />
                Edit Entry
              </Button>
            </Link>
          </div>
        </article>
      </div>
    </div>
  )
}
