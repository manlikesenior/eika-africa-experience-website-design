"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Car, Plane, Bed, Shield, Users, User } from "lucide-react"

interface ClientPageProps {
  faqData: Array<{ question: string; answer: string }>
}

export default function ClientPage({ faqData }: ClientPageProps) {
  useEffect(() => {
    // Delay script execution to ensure DOM is ready
    const timer = setTimeout(() => {
      if (typeof window !== "undefined" && window.elfsight) {
        try {
          window.elfsight.platform.run()
        } catch (error) {
          console.log("Elfsight widget already initialized")
        }
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Load Elfsight script dynamically
    if (typeof window === "undefined") return

    const script = document.createElement("script")
    script.src = "https://elfsightcdn.com/platform.js"
    script.async = true
    script.onload = () => {
      if (window.elfsight) {
        try {
          window.elfsight.platform.run()
        } catch (error) {
          console.log("Elfsight initialization handled")
        }
      }
    }
    document.body.appendChild(script)

    return () => {
      try {
        if (document.body.contains(script)) {
          document.body.removeChild(script)
        }
      } catch (error) {
        console.log("Script cleanup handled")
      }
    }
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-bg min-h-screen flex items-center justify-center text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Unforgettable African Journeys Begin Here</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Tailor-made safaris and immersive travel experiences across Kenya, Tanzania, and beyond. Experience
            authentic adventures with expert guides and private wildlife viewing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/experiences">
              <Button size="lg" className="bg-amber-900 hover:bg-amber-800 text-white px-8 py-3">
                Explore Tours
              </Button>
            </Link>
            <Link href="/booking">
              <Button
                size="lg"
                variant="outline"
                className="bg-teal-600 hover:bg-teal-700 text-white border-teal-600 px-8 py-3"
              >
                Plan Your Trip
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Eika Africa Experience</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your trusted gateway to authentic, unforgettable adventures across Africa and beyond. Founded on a deep
              passion for showcasing Africa's untamed beauty, vibrant cultures, and world-class destinations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Philosophy</h3>
              <p className="text-lg text-gray-600 mb-6">
                Travel is not just about seeing new places - it's about experiencing them with your soul. At Eika Africa
                Experience, we believe in immersive travel where every journey is a connection to the culture, people,
                and landscapes that make Africa so unique.
              </p>
              <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-amber-900">
                <p className="text-lg font-semibold text-amber-900 italic">
                  "Your Home to Unforgettable African Journeys"
                </p>
                <p className="text-sm text-gray-600 mt-2">- Our Motto</p>
              </div>
            </div>
            <div className="relative">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ewaso%20Ng%27iro.jpg-rVDkIPwU1y8OAL03GD7qPrjfhooQds.jpeg"
                alt="Ewaso Ng'iro River at sunset - scenic African landscape perfect for safari trips"
                width={600}
                height={400}
                className="rounded-lg shadow-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Travel Services</h2>
            <p className="text-xl text-gray-600">
              We offer a comprehensive suite of services to ensure your journey is seamless from start to finish.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-amber-900 rounded-full flex items-center justify-center mb-4">
                  <Car className="h-8 w-8 text-white" aria-hidden="true" />
                </div>
                <CardTitle className="text-xl">Inbound & Outbound Safaris</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Expertly crafted safari experiences across East and Southern Africa, tailored to your preferences and
                  budget.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-amber-900 rounded-full flex items-center justify-center mb-4">
                  <Plane className="h-8 w-8 text-white" aria-hidden="true" />
                </div>
                <CardTitle className="text-xl">Air Ticketing</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Domestic and international flight bookings with competitive rates and flexible options for all your
                  travel needs.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-amber-900 rounded-full flex items-center justify-center mb-4">
                  <Bed className="h-8 w-8 text-white" aria-hidden="true" />
                </div>
                <CardTitle className="text-xl">Hotel Booking & Reservations</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  From luxury lodges to budget-friendly accommodations, we secure the perfect stay for your African
                  adventure.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-amber-900 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-white" aria-hidden="true" />
                </div>
                <CardTitle className="text-xl">Travel Insurance</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Comprehensive travel insurance coverage to protect you and your investment throughout your journey.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-amber-900 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-white" aria-hidden="true" />
                </div>
                <CardTitle className="text-xl">Corporate Travel & Group Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Specialized services for corporate clients and group travelers with customized packages and dedicated
                  support.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-amber-900 rounded-full flex items-center justify-center mb-4">
                  <User className="h-8 w-8 text-white" aria-hidden="true" />
                </div>
                <CardTitle className="text-xl">Visa Consultancy Assistance</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Expert guidance and support for visa applications to ensure smooth entry to your chosen destinations.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Cultural Experience Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Samburu%20dance.jpg-IQ223utquaqmnjWMOEsEDzyqCM2Fwg.jpeg"
                alt="Cultural experience with Samburu community - traditional dance and cultural exchange in Kenya"
                width={600}
                height={400}
                className="rounded-lg shadow-lg object-cover"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Authentic Cultural Experiences</h2>
              <p className="text-lg text-gray-600 mb-6">
                Immerse yourself in the rich traditions and vibrant cultures of Africa. Our cultural experiences go
                beyond observation - they create meaningful connections with local communities, allowing you to
                participate in traditional ceremonies, learn ancient customs, and understand the deep heritage that
                makes Africa so special.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-amber-900 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700">Traditional dance and music experiences</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-amber-900 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700">Community visits and cultural exchanges</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-amber-900 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700">Local craft workshops and demonstrations</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-amber-900 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700">Traditional cuisine and cooking experiences</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our safari tours and travel services
            </p>
          </div>

          <div className="space-y-6">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Reviews Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Travelers Say</h2>
            <p className="text-xl text-gray-600">Real reviews from travelers who experienced Africa with us</p>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-4xl">
              <div className="elfsight-app-adfee181-b74b-4f49-ad37-6787b568a774" data-elfsight-app-lazy></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-amber-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">Ready for Your African Adventure?</h2>
          <p className="text-xl mb-8">
            Let us create a personalized journey that will leave you with memories to last a lifetime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking">
              <Button size="lg" variant="outline" className="bg-white text-amber-900 hover:bg-gray-100 px-8 py-3">
                Start Planning
              </Button>
            </Link>
            <Link href="/experiences">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-amber-900 px-8 py-3 bg-transparent"
              >
                View Experiences
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
