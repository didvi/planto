"use client"

import type React from "react"
import { createContext, useState, useEffect, useContext } from "react"

export type JournalEntry = {
  id: number
  title: string
  date: string
  location: string
  content: string
  image?: string
}

type JournalContextType = {
  entries: JournalEntry[]
  addEntry: (entry: Omit<JournalEntry, "id" | "date">) => void
  updateEntry: (id: number, updatedEntry: Partial<JournalEntry>) => void
  getEntry: (id: number) => JournalEntry | undefined
}

const JournalContext = createContext<JournalContextType | undefined>(undefined)

export const JournalProvider = ({ children }: { children: React.ReactNode }) => {
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    if (typeof window !== "undefined") {
      const savedEntries = localStorage.getItem("journalEntries")
      if (savedEntries) {
        return JSON.parse(savedEntries)
      }
      localStorage.setItem("journalEntries", JSON.stringify(sampleEntries))
    }
    return sampleEntries
  })

  // Persist entries to localStorage whenever they change
  useEffect(() => {
    if (entries.length > 0) {
      localStorage.setItem("journalEntries", JSON.stringify(entries))
    }
  }, [entries])

  const addEntry = (entry: Omit<JournalEntry, "id" | "date">) => {
    const newEntry = {
      ...entry,
      id: Date.now(),
      date: new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    }
    setEntries((prev) => [newEntry, ...prev])
  }

  const updateEntry = (id: number, updatedEntry: Partial<JournalEntry>) => {
    setEntries((prev) =>
      prev.map((entry) => {
        if (entry.id === id) {
          return { ...entry, ...updatedEntry }
        }
        return entry
      }),
    )
  }

  const getEntry = (id: number) => {
    return entries.find((entry) => entry.id === id)
  }

  return (
    <JournalContext.Provider value={{ entries, addEntry, updateEntry, getEntry }}>{children}</JournalContext.Provider>
  )
}

export const useJournal = () => {
  const context = useContext(JournalContext)
  if (context === undefined) {
    throw new Error("useJournal must be used within a JournalProvider")
  }
  return context
}

// Sample entries for initial state
const sampleEntries: JournalEntry[] = [
  {
    id: 1,
    title: "Remarkable Finch Variations",
    date: "September 15, 1835",
    location: "Galapagos",
    content:
      "Today I observed the most peculiar variations in the finches across different islands. The beaks of these birds appear to be adapted to their specific environments and food sources. This observation leads me to question whether these adaptations might be the result of some natural process of selection.\n\nThe specimens collected today will require further examination. I have noted at least four distinct variations in beak shape and size, each seemingly corresponding to different feeding habits. The finches on the more arid islands possess stronger, more robust beaks suitable for cracking seeds, while those in more verdant areas have more delicate beaks appropriate for insect consumption.\n\nI must consider whether these variations represent different species entirely, or if they are adaptations of a common ancestor. This question shall occupy my thoughts for some time to come.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 2,
    title: "Unusual Marine Iguanas",
    date: "October 2, 1835",
    location: "Galapagos",
    content:
      "Encountered a species of iguana that swims in the ocean and feeds on seaweed. Unlike any reptile I have previously documented, these creatures have developed flattened tails that aid in swimming and specialized glands to expel excess salt.\n\nTheir dark coloration appears to help them absorb heat after emerging from the cold waters. I have sketched several specimens and noted their behaviors. They are remarkably adept swimmers, diving to considerable depths to graze on algae growing on submerged rocks.\n\nThe local inhabitants inform me that these iguanas are found nowhere else in the world. This fact, combined with their unique adaptations, suggests they have evolved in isolation on these islands for a considerable period. I shall collect several specimens for further study upon our return to England.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 3,
    title: "Geological Formations at Santiago",
    date: "October 14, 1835",
    location: "Santiago Island",
    content:
      "The volcanic formations here provide compelling evidence for Mr. Lyell's theories on geological processes. I observed layers of solidified lava flows, suggesting multiple eruptions over vast periods.\n\nThe gradual changes in the landscape through these slow processes mirror what I am beginning to suspect about the development of species. Nature seems to operate through small, incremental changes over immense time periods.\n\nI collected several rock samples displaying various stages of weathering and mineral composition. The island itself appears to be relatively young in geological terms, yet the diversity of life it supports is remarkable. This paradox of young land and diverse biota requires explanation.",
    image: "/placeholder.svg?height=400&width=600",
  },
]
