import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Car, Plane, Bed, Shield, Users, User, CheckCircle } from "lucide-react"

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Using road journey image */}
      <section
        className="relative bg-cover bg-center bg-no-repeat text-white py-20"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Barabara%20.jpg-XNDBgPKyxpiUgaPbG3KfxM4YMrbqe4.jpeg')`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Travel Services</h1>
          <p className="text-xl max-w-3xl mx-auto">
            We offer a comprehensive suite of services to ensure your journey is seamless from start to finish. Every
            service is designed with value, comfort, and local insight in mind.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Inbound & Outbound Safaris */}
            <Card className="overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Samburu%20Sunset.jpg-PM37vqDjxPTd1NUY1gTkvi9dV7WPfB.jpeg"
                  alt="Safari Experience - African sunset landscape"
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-900 rounded-full flex items-center justify-center">
                    <Car className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl">Inbound & Outbound Safaris</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  Experience the wild heart of Africa with our expertly crafted safari packages. From the Maasai Mara to
                  the Serengeti, we create unforgettable wildlife encounters.
                </CardDescription>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Game drives in premium 4x4 vehicles</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Professional safari guides</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Luxury lodge and camp accommodations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Cultural village visits</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Air Ticketing */}
            <Card className="overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/KICC%202.jpg-mBKF2Ch5BXrehspwCEuPcgImKIUBUz.jpeg"
                  alt="Air Travel - Nairobi city skyline view"
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-900 rounded-full flex items-center justify-center">
                    <Plane className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl">Air Ticketing (Domestic & International)</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  Seamless flight booking services with competitive rates and flexible options. We handle all your air
                  travel needs across Africa and beyond.
                </CardDescription>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Competitive flight prices</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Flexible booking options</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>24/7 booking support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Multi-city itinerary planning</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Hotel Booking */}
            <Card className="overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ewaso%20Ng%27iro.jpg-rVDkIPwU1y8OAL03GD7qPrjfhooQds.jpeg"
                  alt="Hotel Accommodation - Scenic river lodge view"
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-900 rounded-full flex items-center justify-center">
                    <Bed className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl">Hotel Booking & Reservations</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  From luxury safari lodges to budget-friendly accommodations, we secure the perfect stay that matches
                  your preferences and budget.
                </CardDescription>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Luxury safari lodges</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Budget-friendly options</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>City hotels and resorts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Special group rates</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Travel Insurance */}
            <Card className="overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/KICC1.jpg-zmFlfEIgrEPhhrgiLHg0eojiS2RUZa.jpeg"
                  alt="Travel Insurance - Safe travel with city views"
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-900 rounded-full flex items-center justify-center">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl">Travel Insurance</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  Comprehensive travel insurance coverage to protect you and your investment. Travel with peace of mind
                  knowing you're covered for unexpected situations.
                </CardDescription>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Medical emergency coverage</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Trip cancellation protection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Baggage and personal effects</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>24/7 emergency assistance</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Corporate Travel */}
            <Card className="overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/KICC%20Helipad%20Sunset%20Tour.jpg-lbw7nFkulI61T7fn5t0xgdPAl61mY4.jpeg"
                  alt="Corporate Travel - Professional city tour experience"
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-900 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl">Corporate Travel & Group Bookings</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  Specialized services for corporate clients and group travelers. We handle all logistics for business
                  trips, conferences, and group adventures.
                </CardDescription>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Corporate travel packages</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Group discounts available</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Dedicated account management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Flexible payment terms</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Visa Consultancy */}
            <Card className="overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/About%20Us%20Image.jpg-yvAKiiYfM8XWlwlmXQC5zTZFRRk43t.jpeg"
                  alt="Visa Services - International travel assistance"
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-900 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl">Visa Consultancy Assistance</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  Expert guidance and support for visa applications to ensure smooth entry to your chosen destinations.
                  We simplify the visa process for you.
                </CardDescription>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Visa requirement consultation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Application form assistance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Document verification</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Embassy appointment booking</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Eika Africa Experience?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine local expertise with international standards to deliver exceptional travel experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Local Expertise</h3>
              <p className="text-gray-600">Deep knowledge of African destinations and cultures</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Reliability</h3>
              <p className="text-gray-600">Trusted service with 24/7 support throughout your journey</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized Service</h3>
              <p className="text-gray-600">Tailor-made experiences designed just for you</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Value for Money</h3>
              <p className="text-gray-600">Competitive pricing without compromising on quality</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
