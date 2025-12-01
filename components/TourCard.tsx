"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Clock, Star, ArrowRight } from "lucide-react"

interface TourCardProps {
  id: string
  title: string
  location: string
  duration: string
  price: number
  image_url: string
  description: string
  highlights?: string[]
  rating?: number
}

export function TourCard({
  id,
  title,
  location,
  duration,
  price,
  image_url,
  description,
  highlights,
  rating,
}: TourCardProps) {
  const features = Array.isArray(highlights) ? highlights.slice(0, 3) : []

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 border-0 flex flex-col h-full">
      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-gray-200">
        <Image
          src={image_url || "/placeholder.svg?height=256&width=400&query=safari tour"}
          alt={`${title} - Safari in ${location}`}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
        />
        {rating && (
          <div className="absolute top-4 right-4 bg-amber-900 text-white px-3 py-1 rounded-full flex items-center gap-1">
            <Star className="h-4 w-4 fill-white" />
            <span className="text-sm font-semibold">{rating}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <CardContent className="p-6 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{title}</h3>

        {/* Location & Duration */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 flex-shrink-0" />
            <span>{duration}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

        {/* Features/Highlights */}
        {features.length > 0 && (
          <div className="mb-4 flex-grow">
            <ul className="space-y-2">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 bg-amber-900 rounded-full flex-shrink-0 mt-1.5"></span>
                  <span className="line-clamp-1">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Price & Button */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 gap-4">
          <div>
            <p className="text-xs text-gray-600 mb-1">Starting from</p>
            <p className="text-2xl font-bold text-amber-900">${price}</p>
          </div>
          <Link href={`/experiences/${id}`} className="flex-shrink-0">
            <Button className="bg-amber-900 hover:bg-amber-800 text-white group">
              Details
              <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
