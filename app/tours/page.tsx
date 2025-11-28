import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, ArrowRight, Star } from "lucide-react"
import Script from "next/script"
import { fetchAllTours } from "@/app/actions/enhanced-tours"

export const metadata: Metadata = {
  title: "All Safari Tours & Packages | Eika Africa Experience",
  description:
    "Browse our complete collection of Kenya safari tours and African travel experiences. From Masai Mara to Amboseli, find your perfect adventure with expert guides and authentic experiences.",
  keywords: [
    "Kenya safari tours",
    "safari packages",
    "African tours",
    "wildlife safaris",
    "Kenya travel packages",
    "safari booking",
  ],
}

export default async function ToursPage() {
  const tours = await fetchAllTours()

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Safari Tours Collection",
    description: "Complete collection of curated safari tours and African travel experiences",
    url: "https://www.eikafricaexperience.com/tours",
    numberOfItems: tours.length,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Script
        id="collection-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
        suppressHydrationWarning
      />

      {/* Hero Section */}
      <section
        className="relative h-96 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Inbound%20%26%20Outbound%20Safaris%201-SV0QdErLMXAmNvFuGVYEt92aZj5TTV.jpg')`,
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Kenya Safari Tours & Experiences</h1>
            <p className="text-lg md:text-xl text-gray-100">
              Handcrafted safari experiences across Kenya's most spectacular destinations
            </p>
          </div>
        </div>
      </section>

      {/* Tours Grid Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Safari Experiences</h2>
                <p className="text-gray-600">
                  Discover {tours.length} curated safari packages designed for unforgettable African adventures
                </p>
              </div>
            </div>
          </div>

          {tours.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">No tours available at the moment. Please check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tours.map((tour) => (
                <Link key={tour.id} href={`/tours/${tour.slug}`}>
                  <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col">
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={tour.image_url || "/placeholder.svg"}
                        alt={`${tour.title} - Safari experience in ${tour.location}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                      {tour.featured && (
                        <div className="absolute top-4 left-4 bg-amber-900 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                          <Star className="h-4 w-4 fill-white" />
                          Featured
                        </div>
                      )}
                      {tour.views > 0 && (
                        <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs">
                          {tour.views} views
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex-grow">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{tour.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">{tour.description}</p>

                        {/* Quick Info */}
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="h-4 w-4 text-amber-900 flex-shrink-0" />
                            <span>{tour.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="h-4 w-4 text-amber-900 flex-shrink-0" />
                            <span>{tour.duration}</span>
                          </div>
                        </div>

                        {/* Highlights Preview */}
                        {Array.isArray(tour.highlights) && tour.highlights.length > 0 && (
                          <div className="mb-4">
                            <p className="text-xs text-gray-500 mb-2">Highlights:</p>
                            <ul className="space-y-1">
                              {tour.highlights.slice(0, 2).map((highlight: string, i: number) => (
                                <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                                  <span className="w-1 h-1 bg-amber-900 rounded-full flex-shrink-0 mt-1.5"></span>
                                  <span className="line-clamp-1">{highlight}</span>
                                </li>
                              ))}
                            </ul>
                            {tour.highlights.length > 2 && (
                              <p className="text-xs text-amber-900 mt-1">+{tour.highlights.length - 2} more</p>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Price and CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-auto">
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Starting from</p>
                          <p className="text-2xl font-bold text-amber-900">${tour.price}</p>
                        </div>
                        <Button className="bg-amber-900 hover:bg-amber-800 text-white group" size="sm">
                          View Details
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Eika Africa Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Eika Africa?</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover what makes our safari experiences truly exceptional
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">✓</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Expert Guides</h3>
              <p className="text-gray-400">Certified, experienced guides with deep knowledge of wildlife and culture</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">✓</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Private Vehicles</h3>
              <p className="text-gray-400">Exclusive safari vans with pop-up roofs for optimal wildlife viewing</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">✓</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Premium Lodges</h3>
              <p className="text-gray-400">Carefully selected accommodations for comfort and authentic experiences</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">✓</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Flexible Options</h3>
              <p className="text-gray-400">Customizable itineraries tailored to your interests and preferences</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-16 text-white"
        style={{
          backgroundColor: "#111827",
        }}
      >
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-8">Ready to Experience African Excellence?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking">
              <Button size="lg" className="bg-amber-900 hover:bg-amber-800 text-white px-8 py-3">
                Plan Your Safari
              </Button>
            </Link>
            <Link href="/booking">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white px-8 py-3 bg-transparent"
              >
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
