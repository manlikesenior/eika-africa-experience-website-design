import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Globe, Users, Award, Target, Eye, CheckCircle } from "lucide-react"

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Authenticity",
      description:
        "We showcase the genuine beauty and culture of Africa, providing authentic experiences that connect you with local communities and traditions.",
    },
    {
      icon: Users,
      title: "Customer-Centricity",
      description:
        "Your satisfaction is our priority. We listen to your needs and craft personalized experiences that exceed your expectations.",
    },
    {
      icon: CheckCircle,
      title: "Integrity",
      description:
        "We operate with honesty and transparency in all our dealings, building trust through reliable and ethical business practices.",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "We strive for the highest standards in service delivery, ensuring every aspect of your journey meets our quality benchmarks.",
    },
    {
      icon: Globe,
      title: "Innovation",
      description:
        "We continuously evolve our offerings and embrace new technologies to enhance your travel experience and stay ahead of industry trends.",
    },
    {
      icon: Target,
      title: "Sustainability",
      description:
        "We are committed to responsible tourism that benefits local communities and preserves Africa's natural heritage for future generations.",
    },
  ]

  const destinations = [
    { region: "East Africa", countries: ["Kenya", "Tanzania", "Uganda", "Rwanda", "Zanzibar"] },
    { region: "Southern Africa", countries: ["South Africa", "Zambia", "Zimbabwe", "Namibia", "Botswana"] },
    { region: "West Africa", countries: ["Ghana", "Nigeria"] },
    { region: "North Africa", countries: ["Egypt", "Morocco", "Tunisia"] },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section - Using About Us team image */}
      <section
        className="relative bg-cover bg-center bg-no-repeat text-white py-20"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/About%20Us%20Image.jpg-yvAKiiYfM8XWlwlmXQC5zTZFRRk43t.jpeg')`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">About Eika Africa Experience</h1>
              <p className="text-xl mb-6">
                Your trusted gateway to authentic, unforgettable adventures across Africa and beyond.
              </p>
              <div className="bg-white bg-opacity-20 p-6 rounded-lg">
                <p className="text-lg font-semibold italic">"Your Home to Unforgettable African Journeys"</p>
                <p className="text-sm mt-2">- Our Motto</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-amber-900">2025</CardTitle>
                <CardDescription>Year Established</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-amber-900">Nairobi</CardTitle>
                <CardDescription>Based in Kenya</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-amber-900">Registered</CardTitle>
                <CardDescription>Travel & Tours Company</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="max-w-4xl mx-auto text-lg text-gray-600 space-y-6">
              <p>
                Eika Africa Experience was founded on a deep passion for showcasing Africa's untamed beauty, vibrant
                cultures, and world-class destinations. We curate experiences that offer more than just travel - we
                deliver memories that last a lifetime.
              </p>
              <p>
                We specialize in tailor-made safaris, seamless travel logistics, and all-around tourism solutions
                designed with value, comfort, and local insight. Whether you're exploring Africa for the first time or
                returning for more, Eika Africa Experience ensures you see the continent like never before.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="p-8">
              <CardHeader className="text-center pb-6">
                <Eye className="h-12 w-12 text-amber-900 mx-auto mb-4" />
                <CardTitle className="text-3xl font-bold">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-600 text-center">
                  To be Africa's leading travel partner, inspiring the world to explore the continent's beauty, culture,
                  and diversity through personalized and unforgettable experiences.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8">
              <CardHeader className="text-center pb-6">
                <Target className="h-12 w-12 text-amber-900 mx-auto mb-4" />
                <CardTitle className="text-3xl font-bold">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-600 text-center">
                  To deliver high-quality, innovative, and reliable travel services that exceed the expectations of
                  local and international travelers by offering unique African experiences with professionalism,
                  integrity, and a personal touch.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do at Eika Africa Experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-amber-900 rounded-full flex items-center justify-center mb-4">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy - Using KICC city view */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <Image
                src="/images/design-mode/KICC1.jpg.jpeg"
                alt="Nairobi city view from KICC - showcasing Kenya's modern development"
                width={600}
                height={400}
                className="rounded-lg shadow-lg object-cover"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Philosophy</h2>
              <div className="space-y-6 text-lg text-gray-600">
                <p>
                  Travel is not just about seeing new places - it's about experiencing them with your soul. At Eika
                  Africa Experience, we believe in immersive travel where every journey is a connection to the culture,
                  people, and landscapes that make Africa so unique.
                </p>
                <p>
                  We understand that each traveler is different, with unique interests, preferences, and dreams. That's
                  why we don't believe in one-size-fits-all packages. Instead, we craft personalized experiences that
                  reflect your individual travel style and aspirations.
                </p>
                <div className="bg-white p-6 rounded-lg border-l-4 border-amber-900">
                  <p className="font-semibold text-amber-900 mb-2">Our Commitment</p>
                  <p className="text-gray-700">
                    Every experience we create is designed to foster genuine connections - with nature, with local
                    communities, and with the rich tapestry of African culture.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Destinations</h2>
            <p className="text-xl text-gray-600">
              We cover the most spectacular destinations across the African continent
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {destinations.map((destination, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-amber-900">{destination.region}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {destination.countries.map((country, countryIndex) => (
                      <Badge key={countryIndex} variant="outline" className="mr-2 mb-2">
                        {country}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Target Market */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Who We Serve</h2>
            <p className="text-xl text-gray-600">We cater to diverse travelers seeking authentic African experiences</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {[
              "Inbound Tourists",
              "Outbound Tourists",
              "Honeymooners",
              "Domestic Travelers",
              "Religious Tourists",
              "Students",
              "Corporate Clients",
            ].map((market, index) => (
              <div key={index} className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-amber-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <p className="text-sm font-medium text-gray-700">{market}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-amber-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to Experience Africa with Us?</h2>
          <p className="text-xl mb-8">
            Join thousands of satisfied travelers who have discovered the magic of Africa through our expertly crafted
            experiences. Let us be your guide to unforgettable African journeys.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/booking" className="inline-block">
              <button className="bg-white text-amber-900 hover:bg-gray-100 px-8 py-3 rounded-md font-semibold transition-colors">
                Plan Your Journey
              </button>
            </a>
            <a href="/experiences" className="inline-block">
              <button className="border-2 border-white text-white hover:bg-white hover:text-amber-900 px-8 py-3 rounded-md font-semibold transition-colors">
                Explore Experiences
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
