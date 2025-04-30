"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusCircle, BookOpen } from "lucide-react"
import { useJournal } from "@/context/journal-context"

export default function Home() {
  const { entries } = useJournal()

  return (
    <div className="min-h-screen bg-amber-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center border-b-2 border-amber-800 pb-4">
          <h1 className="text-4xl font-serif font-bold text-amber-900">Darwin's Discovery Journal</h1>
          <p className="text-amber-700 font-serif italic mt-2">Document your observations and discoveries</p>
        </header>

        <div className="flex justify-end mb-6">
          <Link href="/new-entry">
            <Button className="bg-amber-800 hover:bg-amber-900 text-amber-50 font-serif">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Entry
            </Button>
          </Link>
        </div>

        <div className="grid gap-6">
          {entries.map((entry) => (
            <Link href={`/entries/${entry.id}`} key={entry.id}>
              <div className="border-2 border-amber-800 rounded-md p-6 bg-amber-100 hover:bg-amber-200 transition-colors shadow-md">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-2xl font-serif font-bold text-amber-900">{entry.title}</h2>
                        <p className="text-amber-700 font-serif italic">{entry.date}</p>
                      </div>
                      <div className="bg-amber-800 text-amber-50 px-3 py-1 rounded-full text-sm font-serif">
                        {entry.location}
                      </div>
                    </div>
                    <div className="mt-4 font-serif text-amber-900 line-clamp-3">{entry.content}</div>
                    <div className="flex justify-end mt-4">
                      <Button
                        variant="ghost"
                        className="text-amber-800 hover:text-amber-900 hover:bg-amber-200 font-serif"
                      >
                        <BookOpen className="mr-2 h-4 w-4" />
                        Read More
                      </Button>
                    </div>
                  </div>

                  {entry.image && (
                    <div className="md:w-1/4 flex-shrink-0">
                      <div className="bg-amber-50 p-2 border-2 border-amber-800 rounded-md h-40 overflow-hidden">
                        <img
                          src={entry.image || "/placeholder.svg"}
                          alt={`ImageIcon for ${entry.title}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
