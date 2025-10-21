"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { CalendarIcon, Phone, Mail, MapPin, Clock, Loader } from "lucide-react"
import { format } from "date-fns"
import { submitBooking } from "@/app/actions/bookings"

// Tour data mapping
const tourTitles: Record<string, string> = {
  "3-days-masai-mara": "3 Days 2 Nights Masai Mara Safari",
  "3-days-naivasha": "3 Days 2 Nights Naivasha",
  "zanzibar-dar-es-salaam": "6 Days 5 Nights Zanzibar & Dar es Salaam",
  "ultimate-kenya-safari": "7 Days Ultimate Kenya Safari",
  "adventure-safari": "4 Days Adventure Safari",
  "nanyuki-adventure": "3 Days 2 Nights Nanyuki Adventure Retreat",
}

export default function BookingPage() {
  const searchParams = useSearchParams()
  const [departureDate, setDepartureDate] = useState<Date>()
  const [returnDate, setReturnDate] = useState<Date>()
  const [selectedTour, setSelectedTour] = useState<string>("default")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  useEffect(() => {
    const tourId = searchParams.get("tourId")
    if (tourId) {
      setSelectedTour(tourId)
    }
  }, [searchParams])

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const bookingData = {
        tour_id: selectedTour !== "default" ? selectedTour : null,
        first_name: formData.get("firstName") as string,
        last_name: formData.get("lastName") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        country: formData.get("country") as string,
        destination: formData.get("destination") as string,
        departure_date: departureDate ? format(departureDate, "yyyy-MM-dd") : null,
        return_date: returnDate ? format(returnDate, "yyyy-MM-dd") : null,
        duration: formData.get("duration") as string,
        travelers: Number.parseInt(formData.get("travelers") as string) || 1,
        budget: formData.get("budget") as string,
        services_needed: formData.getAll("services"),
        special_interests: formData.get("interests") as string,
        special_requirements: formData.get("requirements") as string,
        message: formData.get("message") as string,
      }

      const result = await submitBooking(bookingData)

      if (result.success) {
        setSubmitSuccess(true)
        // Reset form
        const form = document.querySelector("form") as HTMLFormElement
        form?.reset()
        setDepartureDate(undefined)
        setReturnDate(undefined)
      } else {
        setSubmitError(result.error || "Failed to submit booking")
      }
    } catch (error) {
      setSubmitError("An error occurred while submitting your booking")
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center bg-no-repeat text-white py-20"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/KICC%20Helipad%20Sunset%20Tour.jpg-lbw7nFkulI61T7fn5t0xgdPAl61mY4.jpeg')`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Plan Your African Adventure</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Ready to embark on an unforgettable journey? Fill out our booking form and let our travel experts create the
            perfect African experience tailored just for you.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Booking Inquiry Form</CardTitle>
                <CardDescription>
                  Tell us about your dream African adventure and we'll create a personalized itinerary for you.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submitSuccess && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 font-semibold">
                      ✓ Your booking inquiry has been submitted successfully! We'll contact you within 24 hours.
                    </p>
                  </div>
                )}

                {submitError && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 font-semibold">✗ Error: {submitError}</p>
                  </div>
                )}

                <form action={handleSubmit} className="space-y-6">
                  {/* Tour Selection */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Select Tour (Optional)</h3>
                    <div>
                      <Label htmlFor="tour">Which tour are you interested in?</Label>
                      <Select value={selectedTour} onValueChange={setSelectedTour}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a tour or explore options" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">I'm still exploring</SelectItem>
                          <SelectItem value="3-days-masai-mara">3 Days 2 Nights Masai Mara Safari</SelectItem>
                          <SelectItem value="3-days-naivasha">3 Days 2 Nights Naivasha</SelectItem>
                          <SelectItem value="zanzibar-dar-es-salaam">
                            6 Days 5 Nights Zanzibar & Dar es Salaam
                          </SelectItem>
                          <SelectItem value="ultimate-kenya-safari">7 Days Ultimate Kenya Safari</SelectItem>
                          <SelectItem value="adventure-safari">4 Days Adventure Safari</SelectItem>
                          <SelectItem value="nanyuki-adventure">3 Days 2 Nights Nanyuki Adventure Retreat</SelectItem>
                        </SelectContent>
                      </Select>
                      {selectedTour && selectedTour !== "default" && (
                        <p className="text-sm text-amber-900 mt-2">
                          <strong>Selected Tour:</strong> {tourTitles[selectedTour]}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input id="firstName" name="firstName" placeholder="Enter your first name" required />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input id="lastName" name="lastName" placeholder="Enter your last name" required />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input id="email" name="email" type="email" placeholder="your.email@example.com" required />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input id="phone" name="phone" type="tel" placeholder="+254 XXX XXX XXX" required />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="country">Country of Residence *</Label>
                      <Select name="country" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Kenya">Kenya</SelectItem>
                          <SelectItem value="USA">United States</SelectItem>
                          <SelectItem value="UK">United Kingdom</SelectItem>
                          <SelectItem value="Canada">Canada</SelectItem>
                          <SelectItem value="Australia">Australia</SelectItem>
                          <SelectItem value="Germany">Germany</SelectItem>
                          <SelectItem value="France">France</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Travel Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Travel Details</h3>
                    <div>
                      <Label htmlFor="destination">Preferred Destination(s) *</Label>
                      <Select name="destination" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select destination" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Kenya">Kenya</SelectItem>
                          <SelectItem value="Tanzania">Tanzania</SelectItem>
                          <SelectItem value="Uganda">Uganda</SelectItem>
                          <SelectItem value="Rwanda">Rwanda</SelectItem>
                          <SelectItem value="South Africa">South Africa</SelectItem>
                          <SelectItem value="Botswana">Botswana</SelectItem>
                          <SelectItem value="Zambia">Zambia</SelectItem>
                          <SelectItem value="Zimbabwe">Zimbabwe</SelectItem>
                          <SelectItem value="Multiple">Multiple Destinations</SelectItem>
                          <SelectItem value="Flexible">I'm Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Preferred Departure Date *</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal bg-transparent"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {departureDate ? format(departureDate, "PPP") : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={departureDate} onSelect={setDepartureDate} initialFocus />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div>
                        <Label>Preferred Return Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal bg-transparent"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {returnDate ? format(returnDate, "PPP") : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={returnDate} onSelect={setReturnDate} initialFocus />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="duration">Trip Duration</Label>
                        <Select name="duration">
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3-5">3-5 days</SelectItem>
                            <SelectItem value="6-10">6-10 days</SelectItem>
                            <SelectItem value="11-15">11-15 days</SelectItem>
                            <SelectItem value="16-21">16-21 days</SelectItem>
                            <SelectItem value="22+">22+ days</SelectItem>
                            <SelectItem value="Flexible">Flexible</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="travelers">Number of Travelers *</Label>
                        <Select name="travelers" required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select number" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 person</SelectItem>
                            <SelectItem value="2">2 people</SelectItem>
                            <SelectItem value="3-5">3-5 people</SelectItem>
                            <SelectItem value="6-10">6-10 people</SelectItem>
                            <SelectItem value="11+">11+ people</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="budget">Budget Range (USD) *</Label>
                      <Select name="budget" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-2000">Under $2,000</SelectItem>
                          <SelectItem value="2000-5000">$2,000 - $5,000</SelectItem>
                          <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                          <SelectItem value="10000-20000">$10,000 - $20,000</SelectItem>
                          <SelectItem value="20000+">$20,000+</SelectItem>
                          <SelectItem value="Flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Services Needed */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Services Needed</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="safari" name="services" value="Safari Tours" />
                          <Label htmlFor="safari">Safari Tours</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="flights" name="services" value="Flight Booking" />
                          <Label htmlFor="flights">Flight Booking</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="accommodation" name="services" value="Accommodation" />
                          <Label htmlFor="accommodation">Accommodation</Label>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="insurance" name="services" value="Travel Insurance" />
                          <Label htmlFor="insurance">Travel Insurance</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="visa" name="services" value="Visa Assistance" />
                          <Label htmlFor="visa">Visa Assistance</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="transport" name="services" value="Ground Transportation" />
                          <Label htmlFor="transport">Ground Transportation</Label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Special Requirements */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Additional Information</h3>
                    <div>
                      <Label htmlFor="interests">Special Interests</Label>
                      <Textarea
                        id="interests"
                        name="interests"
                        placeholder="Tell us about your interests (wildlife photography, cultural experiences, adventure activities, etc.)"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="requirements">Special Requirements</Label>
                      <Textarea
                        id="requirements"
                        name="requirements"
                        placeholder="Any dietary restrictions, accessibility needs, or other special requirements?"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="message">Additional Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us more about your dream African adventure..."
                        rows={4}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-amber-900 hover:bg-amber-800 text-white py-3"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Booking Inquiry"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information & Quick Info */}
          <div className="space-y-8">
            {/* Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Contact Information</CardTitle>
                <CardDescription>Get in touch with our travel experts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-900 rounded-full flex items-center justify-center">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-sm text-gray-600">+254116735102</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-900 rounded-full flex items-center justify-center">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-sm text-gray-600">inquiries@eikafricaexperience.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-900 rounded-full flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">Location</p>
                    <p className="text-sm text-gray-600">Nairobi, Kenya</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-900 rounded-full flex items-center justify-center">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">Business Hours</p>
                    <p className="text-sm text-gray-600">Mon-Fri: 8AM-6PM EAT</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What Happens Next */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">What Happens Next?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-amber-900 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      1
                    </div>
                    <div>
                      <p className="font-semibold">We Review Your Request</p>
                      <p className="text-sm text-gray-600">Our team reviews your inquiry within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-amber-900 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      2
                    </div>
                    <div>
                      <p className="font-semibold">Personal Consultation</p>
                      <p className="text-sm text-gray-600">We schedule a call to discuss your preferences</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-amber-900 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      3
                    </div>
                    <div>
                      <p className="font-semibold">Custom Itinerary</p>
                      <p className="text-sm text-gray-600">We create a personalized travel plan for you</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-amber-900 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      4
                    </div>
                    <div>
                      <p className="font-semibold">Book Your Adventure</p>
                      <p className="text-sm text-gray-600">Confirm your booking and start your journey</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Popular Packages */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Popular Packages</CardTitle>
                <CardDescription>Our most popular safari and experience packages</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Link href="/experiences/3-days-masai-mara">
                    <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-amber-50 hover:border-amber-900 cursor-pointer transition">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Samburu%20Sunset.jpg-PM37vqDjxPTd1NUY1gTkvi9dV7WPfB.jpeg"
                        alt="Maasai Mara Safari"
                        width={60}
                        height={40}
                        className="rounded object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-sm">Maasai Mara Safari</p>
                        <p className="text-xs text-gray-600">3 Days - From $850</p>
                      </div>
                    </div>
                  </Link>

                  <Link href="/experiences/3-days-naivasha">
                    <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-amber-50 hover:border-amber-900 cursor-pointer transition">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ewaso%20Ng%27iro.jpg-rVDkIPwU1y8OAL03GD7qPrjfhooQds.jpeg"
                        alt="Lake Naivasha"
                        width={60}
                        height={40}
                        className="rounded object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-sm">Naivasha Experience</p>
                        <p className="text-xs text-gray-600">3 Days - From $650</p>
                      </div>
                    </div>
                  </Link>

                  <Link href="/experiences/zanzibar-dar-es-salaam">
                    <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-amber-50 hover:border-amber-900 cursor-pointer transition">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/KICC%202.jpg-mBKF2Ch5BXrehspwCEuPcgImKIUBUz.jpeg"
                        alt="Zanzibar & Dar"
                        width={60}
                        height={40}
                        className="rounded object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-sm">Zanzibar & Dar es Salaam</p>
                        <p className="text-xs text-gray-600">6 Days - From $1,450</p>
                      </div>
                    </div>
                  </Link>

                  <Link href="/experiences/adventure-safari">
                    <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-amber-50 hover:border-amber-900 cursor-pointer transition">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ewaso%20Ng%27iro.jpg-rVDkIPwU1y8OAL03GD7qPrjfhooQds.jpeg"
                        alt="Adventure Safari"
                        width={60}
                        height={40}
                        className="rounded object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-sm">Adventure Safari</p>
                        <p className="text-xs text-gray-600">4 Days - From $1,350</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
