"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ExternalLink, MapPin, Clock } from "lucide-react"
import Image from "next/image"

// Mock Google Reviews data - In a real implementation, this would come from Google Places API
const mockReviews = [
  {
    id: 1,
    author_name: "Sarah Johnson",
    author_url: "#",
    profile_photo_url: "/placeholder.svg?height=40&width=40",
    rating: 5,
    relative_time_description: "2 weeks ago",
    text: "Absolutely incredible experience with Eika Africa! They organized our Kenya safari perfectly. The guides were knowledgeable, the accommodations were top-notch, and we saw all the Big Five. Highly recommend for anyone wanting an authentic African adventure!",
    time: 1703097600,
  },
  {
    id: 2,
    author_name: "Michael Chen",
    author_url: "#",
    profile_photo_url: "/placeholder.svg?height=40&width=40",
    rating: 5,
    relative_time_description: "1 month ago",
    text: "Professional service from start to finish. Eika Africa Experience made our Tanzania trip unforgettable. The Serengeti migration was breathtaking, and the cultural visits were enlightening. Worth every penny!",
    time: 1700419200,
  },
  {
    id: 3,
    author_name: "Emma Thompson",
    author_url: "#",
    profile_photo_url: "/placeholder.svg?height=40&width=40",
    rating: 5,
    relative_time_description: "2 months ago",
    text: "Outstanding customer service and attention to detail. Our Uganda gorilla trekking experience was life-changing. The team at Eika Africa went above and beyond to ensure everything was perfect.",
    time: 1697740800,
  },
  {
    id: 4,
    author_name: "David Rodriguez",
    author_url: "#",
    profile_photo_url: "/placeholder.svg?height=40&width=40",
    rating: 4,
    relative_time_description: "3 months ago",
    text: "Great safari experience in Maasai Mara. The wildlife viewing was spectacular and our guide was very experienced. Only minor issue was some delays with transportation, but overall highly satisfied.",
    time: 1695062400,
  },
  {
    id: 5,
    author_name: "Lisa Anderson",
    author_url: "#",
    profile_photo_url: "/placeholder.svg?height=40&width=40",
    rating: 5,
    relative_time_description: "4 months ago",
    text: "Eika Africa Experience exceeded all our expectations! From booking to the actual trip, everything was seamless. The Zanzibar extension was the perfect way to end our safari adventure.",
    time: 1692384000,
  },
]

const businessInfo = {
  name: "Eika Africa Experience",
  rating: 4.8,
  total_reviews: 127,
  address: "Nairobi, Kenya",
  place_id: "ChIJJZh0l-5fXRcRUVGBa-uJSCE", // Mock place ID
  google_maps_url:
    "https://www.google.com/maps/place/Eika+Africa+Experience/@-1.3031874,36.5177334,10z/data=!3m1!4b1!4m6!3m5!1s0x22d55f2e97749825:0x214889eb6b815151!8m2!3d-1.303209!4d36.8473968!16s%2Fg%2F11xm163htz",
}

export default function GoogleReviews() {
  const [visibleReviews, setVisibleReviews] = useState(3)
  const [showAll, setShowAll] = useState(false)

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star key={index} className={`h-4 w-4 ${index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  const handleShowMore = () => {
    if (showAll) {
      setVisibleReviews(3)
      setShowAll(false)
    } else {
      setVisibleReviews(mockReviews.length)
      setShowAll(true)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
        <p className="text-xl text-gray-600 mb-6">Real reviews from travelers who experienced Africa with us</p>

        {/* Google Business Summary */}
        <Card className="max-w-2xl mx-auto mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-900 rounded-full flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-900">{businessInfo.name}</h3>
                  <p className="text-gray-600">{businessInfo.address}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl font-bold text-amber-900">{businessInfo.rating}</span>
                  <div className="flex">{renderStars(Math.floor(businessInfo.rating))}</div>
                </div>
                <p className="text-sm text-gray-600">{businessInfo.total_reviews} Google reviews</p>
              </div>
            </div>

            <div className="flex gap-3">
              <a href={businessInfo.google_maps_url} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button className="w-full bg-amber-900 hover:bg-amber-800 text-white">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View on Google Maps
                </Button>
              </a>
              <a
                href={`${businessInfo.google_maps_url}#lrd=0x22d55f2e97749825:0x214889eb6b815151,1`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button
                  variant="outline"
                  className="w-full border-amber-900 text-amber-900 hover:bg-amber-50 bg-transparent"
                >
                  Write a Review
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockReviews.slice(0, visibleReviews).map((review) => (
          <Card key={review.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              {/* Review Header */}
              <div className="flex items-start gap-3 mb-4">
                <Image
                  src={review.profile_photo_url || "/placeholder.svg"}
                  alt={review.author_name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{review.author_name}</h4>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex">{renderStars(review.rating)}</div>
                    <span className="text-sm text-gray-500">{review.relative_time_description}</span>
                  </div>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-gray-600 text-sm leading-relaxed">{review.text}</p>

              {/* Google Logo */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-sm flex items-center justify-center">
                    <span className="text-white text-xs font-bold">G</span>
                  </div>
                  <span className="text-xs text-gray-500">Posted on Google</span>
                </div>
                <Clock className="h-3 w-3 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Show More/Less Button */}
      {mockReviews.length > 3 && (
        <div className="text-center">
          <Button
            onClick={handleShowMore}
            variant="outline"
            className="border-amber-900 text-amber-900 hover:bg-amber-50 bg-transparent"
          >
            {showAll ? "Show Less Reviews" : `Show All ${mockReviews.length} Reviews`}
          </Button>
        </div>
      )}

      {/* Review Stats */}
      <div className="bg-white p-8 rounded-lg border">
        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Review Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = mockReviews.filter((review) => review.rating === stars).length
            const percentage = (count / mockReviews.length) * 100

            return (
              <div key={stars} className="flex items-center gap-2">
                <span className="text-sm font-medium w-8">{stars}</span>
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-8">{count}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-amber-50 p-8 rounded-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Join Our Happy Travelers</h3>
        <p className="text-gray-600 mb-6">
          Experience the magic of Africa and become part of our growing family of satisfied customers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/booking">
            <Button className="bg-amber-900 hover:bg-amber-800 text-white px-8 py-3">Book Your Adventure</Button>
          </a>
          <a href="/experiences">
            <Button
              variant="outline"
              className="border-amber-900 text-amber-900 hover:bg-amber-50 px-8 py-3 bg-transparent"
            >
              View Our Experiences
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}
