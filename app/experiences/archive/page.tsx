import type { Metadata } from "next"
import { fetchTours } from "@/app/actions/tours"
import { TourCard } from "@/components/TourCard"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Browse All Safari Tours | Eika Africa Experience",
  description:
    "Browse our complete collection of Kenya safari tours and packages. Find the perfect adventure for your African experience.",
}

export default async function ToursArchivePage() {
  const tours = await fetchTours()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-amber-900 to-amber-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/experiences" className="inline-block mb-4">
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-amber-900 bg-transparent"
            >
              ← Back to Featured Tours
            </Button>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">All Safari Tours</h1>
          <p className="text-xl text-amber-50 max-w-2xl">
            Explore our complete collection of carefully curated Kenya safari packages and experiences
          </p>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {tours.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg mb-4">No tours available at the moment.</p>
              <Link href="/">
                <Button className="bg-amber-900 hover:bg-amber-800">Back to Home</Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <p className="text-gray-600">
                  Showing <span className="font-bold text-gray-900">{tours.length}</span> available tours
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tours.map((tour) => (
                  <TourCard
                    key={tour.id}
                    id={tour.id}
                    title={tour.title}
                    location={tour.location}
                    duration={tour.duration}
                    price={tour.price}
                    image_url={tour.image_url}
                    description={tour.description}
                    highlights={tour.highlights}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}
