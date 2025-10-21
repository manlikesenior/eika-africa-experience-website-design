import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Users, ArrowRight } from "lucide-react"
import { generateSchemaMarkup } from "@/lib/seo"
import Script from "next/script"
import { fetchTours } from "@/app/actions/tours"

export const metadata: Metadata = {
  title: "Kenya Safari Tours & Packages | Eika Africa Experience",
  description:
    "Discover our curated Kenya safari tours including Masai Mara, Lake Naivasha, and Zanzibar packages. Expert guides, private vehicles, and authentic wildlife experiences. Book your African adventure today.",
  keywords: [
    "Kenya safari tours",
    "safari packages Kenya",
    "Masai Mara safari",
    "Lake Naivasha tour",
    "Tanzania beach holiday",
    "wildlife safari Kenya",
    "adventure tours",
  ],
  openGraph: {
    title: "Kenya Safari Tours & Packages | Eika Africa Experience",
    description: "Discover curated Kenya safari tours with expert guides and private vehicles.",
    type: "website",
  },
}

export default async function ExperiencesPage() {
  const tours = await fetchTours()

  // Generate schema markup for all tours
  const tourSchemaList = tours.map((tour) =>
    generateSchemaMarkup("tour", {
      title: tour.title,
      description: tour.overview,
      image: tour.image_url,
      price: tour.price,
      rating: tour.rating,
      reviews: tour.reviews_count,
    }),
  )

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Kenya Safari Tours",
    description: "Our collection of curated Kenya safari tours and packages",
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

      {/* Hero Section */}
      <section
        className="relative h-[500px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Samburu%20Sunset.jpg-PM37vqDjxPTd1NUY1gTkvi9dV7WPfB.jpeg')`,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Kenya Safari Tours</h1>
            <p className="text-xl md:text-2xl">
              Discover handcrafted safari experiences across Kenya's most spectacular destinations
            </p>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="bg-white shadow-sm sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="Search tours..."
                aria-label="Search tours"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
              />
            </div>
            <select
              aria-label="Filter by category"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
            >
              <option>All Categories</option>
              <option>Wildlife Safari</option>
              <option>Beach & Culture</option>
              <option>Adventure Safari</option>
              <option>Adventure & Nature</option>
            </select>
            <select
              aria-label="Filter by duration"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
            >
              <option>Duration</option>
              <option>1-3 Days</option>
              <option>4-6 Days</option>
              <option>7+ Days</option>
            </select>
            <select
              aria-label="Filter by price"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
            >
              <option>Price Range</option>
              <option>Under $1,000</option>
              <option>$1,000 - $2,000</option>
              <option>$2,000+</option>
            </select>
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">All Tours ({tours.length})</h2>
              <p className="text-gray-600 mt-1">Showing all Kenya safari tours</p>
            </div>
            <select
              aria-label="Sort tours"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
            >
              <option>Sort by: Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Duration: Short to Long</option>
              <option>Duration: Long to Short</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour) => (
              <Card
                key={tour.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-0"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={tour.image_url || "/placeholder.svg"}
                    alt={`${tour.title} - Safari tour in ${tour.location}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-white text-gray-900 hover:bg-white">{tour.category}</Badge>
                    <Badge className="bg-amber-900">{tour.difficulty}</Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-900 transition-colors">
                      <Link href={`/experiences/${tour.id}`}>{tour.title}</Link>
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{tour.overview}</p>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4 text-amber-900" aria-hidden="true" />
                      <span>{tour.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4 text-amber-900" aria-hidden="true" />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="h-4 w-4 text-amber-900" aria-hidden="true" />
                      <span>{tour.group_size}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {Array.isArray(tour.highlights) &&
                      tour.highlights.slice(0, 3).map((highlight: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                  </div>

                  <div className="border-t pt-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">From</p>
                      <p className="text-2xl font-bold text-amber-900">{tour.price}</p>
                    </div>
                    <Link href={`/experiences/${tour.id}`}>
                      <Button className="bg-amber-900 hover:bg-amber-800 group">
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {tours.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No tours available at the moment. Please check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Book With Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Book Your Safari With Us?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the difference with Eika Africa's personalized safari services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-10 w-10 text-amber-900" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold mb-2">Expert Guides</h3>
              <p className="text-gray-600">Professional, certified guides with deep local knowledge</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-10 w-10 text-amber-900" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold mb-2">Private Safaris</h3>
              <p className="text-gray-600">Exclusive private vehicle with pop-up roof for optimal viewing</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-10 w-10 text-amber-900" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold mb-2">Best Locations</h3>
              <p className="text-gray-600">Access to Kenya's premier wildlife destinations</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-10 w-10 text-amber-900" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold mb-2">Flexible Options</h3>
              <p className="text-gray-600">Customizable itineraries to suit your preferences</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-amber-900 to-amber-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-lg mb-8">
            Let us create a custom safari experience tailored specifically to your interests and budget
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking">
              <Button size="lg" variant="outline" className="bg-white text-amber-900 hover:bg-gray-100 border-0">
                Request Custom Safari
              </Button>
            </Link>
            <Link href="/booking">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-amber-900 bg-transparent"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
