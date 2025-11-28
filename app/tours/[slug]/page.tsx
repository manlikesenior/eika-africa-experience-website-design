import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MapPin,
  Clock,
  Users,
  CheckCircle,
  Calendar,
  Phone,
  Mail,
  Share2,
  Heart,
  AlertCircle,
  Eye,
  Star,
} from "lucide-react"
import { fetchTourBySlug, fetchAllTours, getFeaturedTours } from "@/app/actions/enhanced-tours"
import { TourBookingForm } from "@/components/TourBookingForm"
import { ViewCounter } from "@/components/ViewCounter"

export async function generateStaticParams() {
  const tours = await fetchAllTours()
  return tours.map((tour) => ({
    slug: tour.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const tour = await fetchTourBySlug(slug)

  if (!tour) {
    return {
      title: "Tour Not Found",
    }
  }

  return {
    title: `${tour.title} | Eika Africa Experience`,
    description: tour.description,
    keywords: [tour.title, tour.location, "safari", "Kenya tour", "wildlife experience"],
    openGraph: {
      title: tour.title,
      description: tour.description,
      images: [{ url: tour.image_url }],
    },
  }
}

export default async function TourDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const tour = await fetchTourBySlug(slug)

  if (!tour) {
    notFound()
  }

  const relatedTours = await getFeaturedTours(3)
  const highlights = Array.isArray(tour.highlights) ? tour.highlights : []
  const inclusions = Array.isArray(tour.inclusions) ? tour.inclusions : []
  const exclusions = Array.isArray(tour.exclusions) ? tour.exclusions : []
  const images = Array.isArray(tour.images) ? tour.images : []

  return (
    <div className="min-h-screen bg-gray-50">
      <ViewCounter tourId={tour.id} />

      {/* Hero Section with Gallery */}
      <section className="relative bg-black">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-1 max-h-[600px]">
          <div className="md:col-span-3 relative h-[400px] md:h-[600px]">
            <Image
              src={tour.image_url || "/placeholder.svg"}
              alt={tour.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-wrap gap-2 mb-4">
                  {tour.featured && (
                    <Badge className="bg-amber-900 text-white">
                      <Star className="h-3 w-3 mr-1 fill-white" />
                      Featured
                    </Badge>
                  )}
                  <Badge className="bg-white/20 text-white backdrop-blur">Safari</Badge>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{tour.title}</h1>
                <div className="flex flex-wrap items-center gap-6 text-lg">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    {tour.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    {tour.duration}
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    {tour.views} views
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:grid grid-rows-3 gap-1">
            {images.slice(0, 3).map((img: string, idx: number) => (
              <div key={idx} className="relative h-full bg-gray-800">
                <Image src={img} alt={`${tour.title} - Image ${idx + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button variant="outline" size="icon" className="bg-white hover:bg-gray-100">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="bg-white hover:bg-gray-100">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Quick Facts */}
            <Card className="mb-8 border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <Clock className="h-8 w-8 text-amber-900 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-bold">{tour.duration}</p>
                  </div>
                  <div className="text-center">
                    <Users className="h-8 w-8 text-amber-900 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Group Size</p>
                    <p className="font-bold">2-12 people</p>
                  </div>
                  <div className="text-center">
                    <MapPin className="h-8 w-8 text-amber-900 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-bold">{tour.location}</p>
                  </div>
                  <div className="text-center">
                    <Calendar className="h-8 w-8 text-amber-900 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Availability</p>
                    <p className="font-bold">Year-round</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs Navigation */}
            <Tabs defaultValue="overview" className="mb-8">
              <TabsList className="grid w-full grid-cols-3 bg-white border">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                <TabsTrigger value="included">Included</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="mt-6">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Tour Overview</h2>
                    <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-wrap">{tour.description}</p>

                    <Separator className="my-6" />

                    <h3 className="text-xl font-bold text-gray-900 mb-4">Tour Highlights</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {highlights.map((highlight: string, index: number) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Itinerary Tab */}
              <TabsContent value="itinerary" className="mt-6">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Tour Itinerary</h2>
                    {tour.itinerary && typeof tour.itinerary === "object" ? (
                      <div className="space-y-6">
                        {Object.entries(tour.itinerary).map(([day, details], index) => (
                          <div key={index} className="border-l-4 border-amber-900 pl-6 pb-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{day}</h3>
                            <p className="text-gray-700 leading-relaxed">{details as string}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-700">Detailed itinerary will be provided upon booking.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Included Tab */}
              <TabsContent value="included" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
                        <CheckCircle className="h-6 w-6" />
                        What's Included
                      </h3>
                      <ul className="space-y-3">
                        {inclusions.map((item: string, index: number) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-red-700 mb-4 flex items-center gap-2">
                        <AlertCircle className="h-6 w-6" />
                        What's Not Included
                      </h3>
                      <ul className="space-y-3">
                        {exclusions.map((item: string, index: number) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <div className="w-3 h-3 border-2 border-red-600 rounded-full" />
                            </div>
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <TourBookingForm tour={tour} />

              {/* Contact Card */}
              <Card className="border-0 shadow-xl">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Need Help Planning?</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                        <Phone className="h-5 w-5 text-amber-900" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Call Us</p>
                        <p className="font-semibold">+254116735102</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                        <Mail className="h-5 w-5 text-amber-900" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Email Us</p>
                        <p className="font-semibold">inquiries@eikafricaexperience.com</p>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="bg-amber-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700">
                      <strong>Response Time:</strong> We typically respond within 24 hours
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Why Book With Us */}
              <Card className="border-0 shadow-xl">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Why Book With Us?</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Best price guarantee</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>24/7 customer support</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Expert local guides</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Flexible cancellation</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Tours */}
      {relatedTours.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedTours
                .filter((t) => t.id !== tour.id)
                .map((relatedTour) => (
                  <Card key={relatedTour.id} className="overflow-hidden hover:shadow-xl transition-shadow border-0">
                    <div className="relative h-48">
                      <Image
                        src={relatedTour.image_url || "/placeholder.svg"}
                        alt={relatedTour.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-2">{relatedTour.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{relatedTour.location}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-amber-900 font-bold">From ${relatedTour.price}</span>
                        <Link href={`/tours/${relatedTour.slug}`}>
                          <Button variant="outline" size="sm" className="bg-transparent">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
