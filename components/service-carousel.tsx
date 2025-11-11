"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface ServiceCarouselProps {
  images: string[]
  title: string
  description: string
}

export function ServiceCarousel({ images, title, description }: ServiceCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (images.length <= 1) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }, 30000) // 30 seconds

    return () => clearInterval(interval)
  }, [images.length])

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  useEffect(() => {
    if (!isModalOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false)
      if (e.key === "ArrowLeft") goToPrevious()
      if (e.key === "ArrowRight") goToNext()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isModalOpen, currentImageIndex])

  return (
    <>
      <div className="relative h-40 w-full bg-gray-200 group cursor-pointer" onClick={() => setIsModalOpen(true)}>
        <Image
          src={images[currentImageIndex] || "/placeholder.svg"}
          alt={`${title} - Image ${currentImageIndex + 1}`}
          fill
          className="object-cover transition-opacity duration-500"
          priority={currentImageIndex === 0}
        />

        {images.length > 1 && (
          <>
            {/* Previous button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                goToPrevious()
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Next button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                goToNext()
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Image indicators */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentImageIndex(index)
                  }}
                  className={`h-2 w-2 rounded-full transition-all ${
                    index === currentImageIndex ? "bg-white w-6" : "bg-white/50 hover:bg-white/75"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <span className="text-white text-sm font-medium">Click to expand</span>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setIsModalOpen(false)}
        >
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 text-white hover:bg-white/20 p-2 rounded-full transition"
            aria-label="Close modal"
          >
            <X className="h-8 w-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              goToPrevious()
            }}
            className="absolute left-4 text-white hover:bg-white/20 p-2 rounded-full transition"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          <div className="relative w-full h-full max-w-5xl max-h-screen flex items-center justify-center">
            <Image
              src={images[currentImageIndex] || "/placeholder.svg"}
              alt={`${title} - Image ${currentImageIndex + 1}`}
              fill
              className="object-contain"
              priority
            />
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation()
              goToNext()
            }}
            className="absolute right-4 text-white hover:bg-white/20 p-2 rounded-full transition"
            aria-label="Next image"
          >
            <ChevronRight className="h-8 w-8" />
          </button>

          {/* Image counter and indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
            <span className="text-white text-sm">
              {currentImageIndex + 1} / {images.length}
            </span>
            <div className="flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentImageIndex(index)
                  }}
                  className={`h-2 w-2 rounded-full transition-all ${
                    index === currentImageIndex ? "bg-white w-6" : "bg-white/50 hover:bg-white/75"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
