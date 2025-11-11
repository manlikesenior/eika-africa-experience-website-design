import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Car, Shield, Users, CheckCircle } from "lucide-react"
import { ServiceCarousel } from "@/components/service-carousel"
import Link from "next/link"
import { Button } from "@/components/ui/button"

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

      {/* Services Grid with Carousel */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceCarouselData.map((service) => (
              <Card key={service.title} className="overflow-hidden hover:shadow-lg transition-shadow">
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

      {/* CTA Section */}
      <section
        className="py-16 bg-cover bg-center text-white"
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
    </div>
  )
}
