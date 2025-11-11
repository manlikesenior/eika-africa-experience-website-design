import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Clock, Users, CheckCircle, Calendar, Phone, Mail, Share2, Heart, AlertCircle } from "lucide-react"
import { notFound } from "next/navigation"
import { BookingForm } from "@/components/BookingForm"
import { fetchTourById, fetchTours } from "@/app/actions/tours"

export async function generateStaticParams() {
  const tours = await fetchTours()
  return tours.map((tour: any) => ({
    id: tour.id,
  }))
}

export default async function ExperienceDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const experience = await fetchTourById(id)

  if (!experience) {
    notFound()
  }

  // Parse highlights and inclusions if they're stored as JSON arrays
  const highlights = Array.isArray(experience.highlights) ? experience.highlights : []
  const inclusions = Array.isArray(experience.inclusions) ? experience.inclusions : []
  const exclusions = Array.isArray(experience.exclusions) ? experience.exclusions : []

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Gallery */}
      <section className="relative bg-black">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-1 max-h-[600px]">
          <div className="md:col-span-3 relative h-[400px] md:h-[600px]">
            <Image
              src={experience.image_url || "/placeholder.svg"}
              alt={experience.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="bg-white text-gray-900">Safari</Badge>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{experience.title}</h1>
                <div className="flex flex-wrap items-center gap-6 text-lg">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    {experience.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    {experience.duration}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:grid grid-rows-3 gap-1">
            <div className="relative h-full bg-gray-800"></div>
            <div className="relative h-full bg-gray-800"></div>
            <div className="relative h-full bg-gray-800"></div>
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
                    <p className="font-bold">{experience.duration}</p>
                  </div>
                  <div className="text-center">
                    <Users className="h-8 w-8 text-amber-900 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Group Size</p>
                    <p className="font-bold">2-12 people</p>
                  </div>
                  <div className="text-center">
                    <MapPin className="h-8 w-8 text-amber-900 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-bold">{experience.location}</p>
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
              <TabsList className="grid w-full grid-cols-4 bg-white border">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                <TabsTrigger value="included">Included</TabsTrigger>
                <TabsTrigger value="accommodation">Accommodation</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="mt-6">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Tour Overview</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">{experience.description}</p>

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
                    <div className="prose prose-sm max-w-none">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{experience.itinerary}</p>
                    </div>
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

              {/* Accommodation Tab */}
              <TabsContent value="accommodation" className="mt-6">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Accommodation</h2>
                    <p className="text-gray-700">
                      This tour includes carefully selected accommodations at premium lodges and resorts that enhance
                      your safari experience with comfort and authentic African hospitality.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <BookingForm tourId={params.id} />

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
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Similar Tours You May Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-xl transition-shadow border-0">
              <div className="relative h-48">
                <Image
                  src="/images/design-mode/Samburu%20Sunset.jpg(2).jpeg"
                  alt="Masai Mara Safari"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">3 Days Masai Mara Safari</h3>
                <p className="text-gray-600 text-sm mb-4">Masai Mara National Reserve</p>
                <div className="flex items-center justify-between">
                  <span className="text-amber-900 font-bold">From $850</span>
                  <Link href="/experiences/3-days-masai-mara">
                    <Button variant="outline" size="sm" className="bg-transparent">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-shadow border-0">
              <div className="relative h-48">
                <Image
                  src="/images/design-mode/Ewaso%20Ng%27iro.jpg(2).jpeg"
                  alt="Lake Naivasha"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">3 Days Naivasha</h3>
                <p className="text-gray-600 text-sm mb-4">Lake Naivasha & Crescent Island</p>
                <div className="flex items-center justify-between">
                  <span className="text-amber-900 font-bold">From $650</span>
                  <Link href="/experiences/3-days-naivasha">
                    <Button variant="outline" size="sm" className="bg-transparent">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-shadow border-0">
              <div className="relative h-48">
                <Image
                  src="/images/design-mode/Samburu%20dance.jpg(2).jpeg"
                  alt="Adventure Safari"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">4 Days Adventure Safari</h3>
                <p className="text-gray-600 text-sm mb-4">Olpejeta, Nakuru & Amboseli</p>
                <div className="flex items-center justify-between">
                  <span className="text-amber-900 font-bold">From $1,350</span>
                  <Link href="/experiences/adventure-safari">
                    <Button variant="outline" size="sm" className="bg-transparent">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
