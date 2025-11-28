"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { createBooking } from "@/app/actions/enhanced-tours"

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  guests: z.coerce.number().min(1, "At least 1 guest required").max(20, "Maximum 20 guests"),
  preferredDate: z.string().min(1, "Please select a date"),
  message: z.string().optional(),
})

type BookingFormData = z.infer<typeof bookingSchema>

interface TourBookingFormProps {
  tour: {
    id: string
    title: string
    price: number
  }
}

export function TourBookingForm({ tour }: TourBookingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      guests: 2,
    },
  })

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    try {
      const result = await createBooking({
        tourId: tour.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        guests: data.guests,
        preferredDate: data.preferredDate,
        message: data.message,
      })

      if (result.success) {
        setSubmitStatus("success")
        reset()
      } else {
        setSubmitStatus("error")
        setErrorMessage(result.error || "Failed to submit booking")
      }
    } catch (error) {
      setSubmitStatus("error")
      setErrorMessage("An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="border-0 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-amber-900 to-amber-800 text-white rounded-t-lg">
        <CardTitle className="text-2xl">Book This Tour</CardTitle>
        <p className="text-amber-100 text-sm">Fill in your details to send an inquiry</p>
      </CardHeader>
      <CardContent className="p-6">
        {submitStatus === "success" ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Inquiry Sent Successfully!</h3>
            <p className="text-gray-600 mb-6">
              Thank you for your interest in {tour.title}. We'll contact you within 24 hours to discuss your booking.
            </p>
            <Button
              onClick={() => setSubmitStatus("idle")}
              variant="outline"
              className="bg-transparent border-amber-900 text-amber-900 hover:bg-amber-50"
            >
              Send Another Inquiry
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {submitStatus === "error" && (
              <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-800 text-sm">{errorMessage}</p>
              </div>
            )}

            <div className="bg-amber-50 p-4 rounded-lg mb-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Price per person</span>
                <span className="text-3xl font-bold text-amber-900">${tour.price}</span>
              </div>
            </div>

            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="John Doe"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="john@example.com"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" {...register("phone")} placeholder="+254 712 345 678" />
            </div>

            <div>
              <Label htmlFor="guests">Number of Guests *</Label>
              <Input
                id="guests"
                type="number"
                min="1"
                max="20"
                {...register("guests")}
                className={errors.guests ? "border-red-500" : ""}
              />
              {errors.guests && <p className="text-red-500 text-xs mt-1">{errors.guests.message}</p>}
            </div>

            <div>
              <Label htmlFor="preferredDate">Preferred Start Date *</Label>
              <Input
                id="preferredDate"
                type="date"
                {...register("preferredDate")}
                min={new Date().toISOString().split("T")[0]}
                className={errors.preferredDate ? "border-red-500" : ""}
              />
              {errors.preferredDate && <p className="text-red-500 text-xs mt-1">{errors.preferredDate.message}</p>}
            </div>

            <div>
              <Label htmlFor="message">Special Requests</Label>
              <Textarea
                id="message"
                {...register("message")}
                placeholder="Any dietary requirements, special occasions, or specific requests?"
                rows={4}
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-amber-900 hover:bg-amber-800 text-white py-6 text-lg font-semibold"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Sending Inquiry...
                </>
              ) : (
                "Send Inquiry"
              )}
            </Button>

            <p className="text-xs text-gray-600 text-center">
              By submitting, you agree to receive communication from Eika Africa Experience
            </p>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
