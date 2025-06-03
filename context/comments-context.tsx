"use client"

import { createContext, useContext, useEffect, useState } from "react"

export type Comment = {
  id: number
  entryId: number
  content: string
  date: string
}

interface CommentsContextType {
  comments: Comment[]
  addComment: (entryId: number, content: string) => void
  getComments: (entryId: number) => Comment[]
}

const CommentsContext = createContext<CommentsContextType | undefined>(undefined)

export const CommentsProvider = ({ children }: { children: React.ReactNode }) => {
  const [comments, setComments] = useState<Comment[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("comments")
    if (saved) {
      setComments(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments))
  }, [comments])

  const addComment = (entryId: number, content: string) => {
    const newComment = {
      id: Date.now(),
      entryId,
      content,
      date: new Date().toLocaleString(),
    }
    setComments(prev => [...prev, newComment])
  }

  const getComments = (entryId: number) => {
    return comments.filter(c => c.entryId === entryId)
  }

  return (
    <CommentsContext.Provider value={{ comments, addComment, getComments }}>
      {children}
    </CommentsContext.Provider>
  )
}

export const useComments = () => {
  const ctx = useContext(CommentsContext)
  if (!ctx) throw new Error("useComments must be used within CommentsProvider")
  return ctx
}
