import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, ArrowRight } from "lucide-react"
import { generateSchemaMarkup } from "@/lib/seo"
import Script from "next/script"
import { fetchTours } from "@/app/actions/tours"

export const metadata: Metadata = {
  title: "Kenya Safari Tours & Packages | Eika Africa Experience",
  description:
    "Discover our curated Kenya safari tours including Amboseli, Lake Nakuru, and Maasai Mara packages. Expert guides, private vehicles, and authentic wildlife experiences.",
  keywords: [
    "Kenya safari tours",
    "safari packages",
    "Amboseli safari",
    "Lake Nakuru tour",
    "Maasai Mara safari",
    "wildlife safari",
  ],
}

export default async function ExperiencesPage() {
  const tours = await fetchTours()

  const tourSchemaList = tours.map((tour) =>
    generateSchemaMarkup("tour", {
      title: tour.title,
      description: tour.description,
      image: tour.image_url,
      price: tour.price,
    }),
  )

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Kenya Safari Tours",
    description: "Collection of curated Kenya safari tours and packages",
    url: "https://www.eikafricaexperience.com/experiences",
    mainEntity: tourSchemaList,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Script
        id="collection-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
        suppressHydrationWarning
      />

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

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Safari Experiences</h2>
            <p className="text-gray-600">
              Choose from our carefully curated selection of Kenya safari packages, each designed to showcase the best
              of African wildlife and culture.
            </p>
          </div>

          {tours.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">No tours available at the moment. Please check back soon!</p>
            </div>
          ) : (
            <div className="space-y-12">
              {tours.map((tour, index) => (
                <div
                  key={tour.id}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${index % 2 === 1 ? "lg:grid-cols-2 lg:[&>*:first-child]:order-2" : ""}`}
                  >
                    {/* Image */}
                    <div className="relative h-80 lg:h-96 overflow-hidden">
                      <Image
                        src={tour.image_url || "/placeholder.svg"}
                        alt={`${tour.title} - Safari experience in ${tour.location}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-8 lg:p-10 flex flex-col justify-between">
                      <div>
                        <div className="mb-4">
                          <h3 className="text-3xl font-bold text-gray-900 mb-3">{tour.title}</h3>
                          <p className="text-gray-600 text-lg leading-relaxed mb-6">{tour.description}</p>
                        </div>

                        {/* Quick Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-200">
                          <div className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 text-amber-900 flex-shrink-0 mt-0.5" aria-hidden="true" />
                            <div>
                              <p className="text-sm text-gray-600 font-semibold">Location</p>
                              <p className="text-gray-900">{tour.location}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Clock className="h-5 w-5 text-amber-900 flex-shrink-0 mt-0.5" aria-hidden="true" />
                            <div>
                              <p className="text-sm text-gray-600 font-semibold">Duration</p>
                              <p className="text-gray-900">{tour.duration}</p>
                            </div>
                          </div>
                        </div>

                        {/* Highlights */}
                        {Array.isArray(tour.highlights) && tour.highlights.length > 0 && (
                          <div className="mb-6">
                            <h4 className="font-semibold text-gray-900 mb-3">Highlights</h4>
                            <ul className="space-y-2">
                              {tour.highlights.slice(0, 4).map((highlight: string, i: number) => (
                                <li key={i} className="flex items-start gap-2 text-gray-600">
                                  <span className="w-1.5 h-1.5 bg-amber-900 rounded-full flex-shrink-0 mt-2"></span>
                                  <span>{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Price and CTA */}
                      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Starting from</p>
                          <p className="text-3xl font-bold text-amber-900">${tour.price}</p>
                        </div>
                        <Link href={`/experiences/${tour.id}`}>
                          <Button className="bg-amber-900 hover:bg-amber-800 text-white group">
                            View Full Itinerary
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

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
