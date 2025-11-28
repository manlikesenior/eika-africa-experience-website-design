"use client"

import { useEffect } from "react"
import { incrementTourViews } from "@/app/actions/enhanced-tours"

interface ViewCounterProps {
  tourId: string
}

export function ViewCounter({ tourId }: ViewCounterProps) {
  useEffect(() => {
    const incrementViews = async () => {
      try {
        await incrementTourViews(tourId)
      } catch (error) {
        console.error("Failed to increment views:", error)
      }
    }

    const timer = setTimeout(() => {
      incrementViews()
    }, 3000)

    return () => clearTimeout(timer)
  }, [tourId])

  return null
}
