"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save, ImageIcon } from "lucide-react"
import { useJournal } from "@/context/journal-context"

export default function NewEntryPage() {
  const router = useRouter()
  const { addEntry } = useJournal()

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    content: "",
    image: "",
  })

  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()

      reader.onloadend = () => {
        const result = reader.result as string
        setImagePreview(result)
        setFormData((prev) => ({ ...prev, image: result }))
      }

      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Add the new entry
    addEntry({
      title: formData.title,
      location: formData.location,
      content: formData.content,
      image: formData.image,
    })

    // Navigate back to the home page
    router.push("/")
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

        <div className="max-w-2xl mx-auto border-2 border-amber-800 rounded-md p-6 bg-amber-100 shadow-md">
          <h1 className="text-3xl font-serif font-bold text-amber-900 mb-6 text-center border-b-2 border-amber-800 pb-4">
            New Discovery Entry
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-amber-900 font-serif">
                Title of Discovery
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="border-amber-800 bg-amber-50 font-serif text-amber-900"
                placeholder="e.g., Remarkable Finch Variations"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-amber-900 font-serif">
                Location
              </Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="border-amber-800 bg-amber-50 font-serif text-amber-900"
                placeholder="e.g., Galapagos Islands"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content" className="text-amber-900 font-serif">
                Observations & Notes
              </Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                className="border-amber-800 bg-amber-50 font-serif text-amber-900 min-h-[200px]"
                placeholder="Detail your observations, sketches, and thoughts..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image" className="text-amber-900 font-serif">
                Field Illustration or Photograph
              </Label>
              <div className="border-2 border-dashed border-amber-800 rounded-md p-4 bg-amber-50">
                {imagePreview ? (
                  <div className="space-y-4">
                    <div className="bg-amber-50 p-2 border border-amber-800 rounded-md max-h-60 overflow-hidden">
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        className="mx-auto max-h-56 object-contain"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      className="border-amber-800 text-amber-800 hover:bg-amber-200"
                      onClick={() => {
                        setImagePreview(null)
                        setFormData((prev) => ({ ...prev, image: "" }))
                      }}
                    >
                      Remove Image
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <ImageIcon className="mx-auto h-12 w-12 text-amber-800/50 mb-2" />
                    <p className="text-amber-800 font-serif mb-4">Add an illustration or photograph</p>
                    <Input id="image" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                    <Button
                      type="button"
                      variant="outline"
                      className="border-amber-800 text-amber-800 hover:bg-amber-200"
                      onClick={() => document.getElementById("image")?.click()}
                    >
                      Select Image
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t-2 border-amber-800">
              <div className="text-amber-700 font-serif italic">
                {new Date().toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
              <Button type="submit" className="bg-amber-800 hover:bg-amber-900 text-amber-50 font-serif">
                <Save className="mr-2 h-4 w-4" />
                Save Entry
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
