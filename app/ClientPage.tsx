"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ServiceCarousel } from "@/components/service-carousel"

interface ClientPageProps {
  faqData: Array<{ question: string; answer: string }>
}

const serviceCarouselData = [
  {
    title: "Hotel Booking & Reservations",
    description:
      "From luxury lodges to budget-friendly accommodations, we secure the perfect stay for your African adventure.",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hotel%20Booking%20%26%20Reservations-sJ4VjtZ2T38EZ1gRs2EyXzc4CT2PC9.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hotel%20Booking%20%26%20Reservations%202-y5y54NaEIxGJ8EymrKFwQPMFRA2BiD.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hotel%20Booking%20%26%20Reservations%201-abvJruRZu6GVcHmmist5qep9qZYh9w.jpg",
    ],
  },
  {
    title: "Air Ticketing",
    description:
      "Domestic and international flight bookings with competitive rates and flexible options for all your travel needs.",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Air%20Ticketing%201-PLDwBlnbGAmHCqQhitt4CSq6cawUHS.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Air%20Ticketing%20%282%29-BSBTP7qz9Zd4dCDVDgr2T6jsB6vFeS.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Air%20Ticketing%203-qbz404YjT66OgGSlTCoBu5BfOaHJ8h.png",
    ],
  },
  {
    title: "Travel Insurance",
    description:
      "Comprehensive travel insurance coverage including AMREF Flying Doctor services to protect you and your investment throughout your journey.",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Travel%20Insurance-eXiYonXJW8r05LssDLqA3bTQGeAt8z.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Travel%20Insurance%201-Xrllv9jcqxQtAQO11xIncNMwQsh3BV.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Travel%20Insurance%202-ilg2MSjR3Xap2PZR9yphC73NiRknif.jpg",
    ],
  },
  {
    title: "Corporate Travel & Group Bookings",
    description:
      "Specialized services for corporate clients and group travelers with customized packages and dedicated support.",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Corporate%20Travel%20%26%20Group%20Bookings-eocnwQPIocjXHBezc7fx6p0iRLrpdQ.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Corporate%20Travel%20%26%20Group%20Bookings%201-cyfyMXp55ZOZA3D19ttPIzTCV5yUUu.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Corporate%20Travel%20%26%20Group%20Bookings%202-inPaRT99uJ55zdujIs8dgQYXFpVwjA.jpg",
    ],
  },
  {
    title: "Visa Consultancy Assistance",
    description:
      "Expert guidance and support for visa applications to ensure smooth entry to your chosen destinations.",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Visa%20Consultancy%20Assistance-R2v1z0XgR59ShhLtJdIwhiTYW3GDTn.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Visa%20Consultancy%20Assistance%201-OjgGaWwt3swlA9AT7hSuMM1IyIV3na.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Visa%20Consultancy%20Assistance%202-Opf1Yc85yGChpUIlTaiMbbskcH067D.jpg",
    ],
  },
  {
    title: "Inbound & Outbound Safaris",
    description:
      "Expertly crafted safari experiences across East and Southern Africa, tailored to your preferences and budget.",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Inbound%20%26%20Outbound%20Safaris-iOHIGgF5ep2lTkEqY4cEj5pSGE1eWz.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Inbound%20%26%20Outbound%20Safaris%201-SV0QdErLMXAmNvFuGVYEt92aZj5TTV.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Inbound%20%26%20Outbound%20Safaris%202-ahxdd6tq7QD61VY7fDTSVmBIFfWvFL.jpg",
    ],
  },
]

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
                src="/images/design-mode/Ewaso%20Ng%27iro.jpg.jpeg"
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
            {serviceCarouselData.map((service) => (
              <Card key={service.title} className="text-center hover:shadow-lg transition-shadow overflow-hidden">
                <ServiceCarousel images={service.images} title={service.title} description={service.description} />
                <CardHeader>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section after Services */}
      <section
        className="py-16 text-white"
        style={{
          backgroundColor: "#111827",
        }}
      >
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-8">Ready to Experience African Excellence?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/experiences">
              <Button size="lg" className="bg-amber-900 hover:bg-amber-800 text-white px-8 py-3">
                Explore Tours
              </Button>
            </Link>
            <Link href="/booking">
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3">
                Plan Your Trip
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Cultural Experience Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <Image
                src="/images/design-mode/Samburu%20dance.jpg.jpeg"
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
