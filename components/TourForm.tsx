"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createTour } from "@/app/actions/tours"
import { CheckCircle } from "lucide-react"

export function TourForm({ onSuccessAction }: { onSuccessAction: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    duration: "",
    price: "",
    image_url: "",
    description: "",
    itinerary: "",
    highlights: "",
    inclusions: "",
    exclusions: "",
    gallery: [] as string[]
  })
  
  const [galleryInput, setGalleryInput] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddGalleryImage = () => {
    if (galleryInput.trim()) {
      setFormData(prev => ({
        ...prev,
        gallery: [...prev.gallery, galleryInput.trim()]
      }))
      setGalleryInput("")
    }
  }

  const handleRemoveGalleryImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage("")
    setSuccessMessage("")

    try {
      // Basic validation
      if (!formData.title || !formData.location || !formData.duration || !formData.price || !formData.image_url) {
        throw new Error("Please fill in all required fields")
      }

      // Parse array fields
      const highlights = formData.highlights
        .split("\n")
        .map((h) => h.trim())
        .filter(Boolean)
      const inclusions = formData.inclusions
        .split("\n")
        .map((i) => i.trim())
        .filter(Boolean)
      const exclusions = formData.exclusions
        .split("\n")
        .map((e) => e.trim())
        .filter(Boolean)
      const gallery = formData.gallery.filter(url => url.trim() !== '')

      const result = await createTour({
        title: formData.title,
        location: formData.location,
        duration: formData.duration,
        price: formData.price,
        image_url: formData.image_url,
        description: formData.description,
        itinerary: formData.itinerary,
        highlights,
        inclusions,
        exclusions,
        gallery
      })
      
      // If we get here, the tour was created successfully
      setSuccessMessage("Tour created successfully!")
      setFormData({
        title: "",
        location: "",
        duration: "",
        price: "",
        image_url: "",
        description: "",
        itinerary: "",
        highlights: "",
        inclusions: "",
        exclusions: "",
        gallery: []
      })
      onSuccessAction()
    } catch (error) {
      console.error("Error creating tour:", error)
      setErrorMessage(error instanceof Error ? error.message : "Failed to create tour. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div>
          <Label htmlFor="title">Tour Title *</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., 7 Days Kenya Safari"
            required
          />
        </div>

        {/* Location */}
        <div>
          <Label htmlFor="location">Location *</Label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g., Maasai Mara, Lake Nakuru"
            required
          />
        </div>

        {/* Duration */}
        <div>
          <Label htmlFor="duration">Duration *</Label>
          <Input
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="e.g., 7 Days / 6 Nights"
            required
          />
        </div>

        {/* Price */}
        <div>
          <Label htmlFor="price">Price (USD) *</Label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            placeholder="e.g., 2500"
            required
          />
        </div>
      </div>

      {/* Image URL */}
      <div>
        <Label htmlFor="image_url">Featured Image URL *</Label>
        <Input
          id="image_url"
          name="image_url"
          value={formData.image_url}
          onChange={handleChange}
          placeholder="https://..."
          required
        />
        {formData.image_url && (
          <div className="mt-2 relative h-32 rounded-lg overflow-hidden">
            <img src={formData.image_url || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Brief overview of the tour..."
          rows={4}
          required
        />
      </div>

      {/* Itinerary */}
      <div>
        <Label htmlFor="itinerary">Detailed Itinerary *</Label>
        <Textarea
          id="itinerary"
          name="itinerary"
          value={formData.itinerary}
          onChange={handleChange}
          placeholder="Day-by-day breakdown..."
          rows={6}
          required
        />
      </div>

      {/* Highlights */}
      <div>
        <Label htmlFor="highlights">Tour Highlights (one per line)</Label>
        <Textarea
          id="highlights"
          name="highlights"
          value={formData.highlights}
          onChange={handleChange}
          placeholder="Wildlife viewing&#10;Local culture&#10;Scenic landscapes"
          rows={4}
        />
      </div>

      {/* Inclusions */}
      <div>
        <Label htmlFor="inclusions">What's Included (one per line)</Label>
        <Textarea
          id="inclusions"
          name="inclusions"
          value={formData.inclusions}
          onChange={handleChange}
          placeholder="Accommodation&#10;Meals&#10;Park fees"
          rows={4}
        />
      </div>

      {/* Exclusions */}
      <div>
        <Label htmlFor="exclusions">What's Not Included (one per line)</Label>
        <Textarea
          id="exclusions"
          name="exclusions"
          value={formData.exclusions}
          onChange={handleChange}
          placeholder="International flights&#10;Travel insurance&#10;Personal expenses"
          rows={4}
        />
      </div>

      {/* Messages */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
          <p className="text-green-700">{successMessage}</p>
        </div>
      )}

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">{errorMessage}</div>
      )}

      {/* Gallery */}
      <div>
        <Label htmlFor="gallery">Gallery Images (URLs)</Label>
        <div className="flex gap-2">
          <Input
            id="gallery"
            value={galleryInput}
            onChange={(e) => setGalleryInput(e.target.value)}
            placeholder="Enter image URL"
          />
          <Button 
            type="button" 
            onClick={handleAddGalleryImage}
            variant="outline"
          >
            Add
          </Button>
        </div>
        {formData.gallery.length > 0 && (
          <div className="mt-2 space-y-2">
            {formData.gallery.map((url, index) => (
              <div key={index} className="flex items-center justify-between p-2 border rounded">
                <span className="text-sm truncate max-w-xs">{url}</span>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleRemoveGalleryImage(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submit */}
      <Button type="submit" disabled={isSubmitting} className="bg-amber-900 hover:bg-amber-800 w-full py-6 text-lg">
        {isSubmitting ? "Creating Tour..." : "Create Tour"}
      </Button>
    </form>
  )
}
