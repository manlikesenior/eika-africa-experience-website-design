"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"

interface BookingFormProps {
  tourId: string
}

export function BookingForm({ tourId }: BookingFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    numberOfGuests: "1",
    startDate: "",
    specialRequests: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus("idle")

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tourId,
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          numberOfGuests: Number.parseInt(formData.numberOfGuests),
          startDate: formData.startDate,
          specialRequests: formData.specialRequests,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit booking")
      }

      setStatus("success")
      setMessage("Booking submitted successfully! Check your email for confirmation.")
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        numberOfGuests: "1",
        startDate: "",
        specialRequests: "",
      })
    } catch (error) {
      setStatus("error")
      setMessage(error instanceof Error ? error.message : "An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-0 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-amber-900 to-amber-800 text-white rounded-t-lg">
        <CardTitle>Book This Tour</CardTitle>
        <CardDescription className="text-amber-100">Fill in your details to reserve your spot</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Status Messages */}
          {status === "success" && (
            <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-green-800">{message}</p>
            </div>
          )}

          {status === "error" && (
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-800">{message}</p>
            </div>
          )}

          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              required
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="w-full"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+254 712 345 678"
              className="w-full"
            />
          </div>

          {/* Number of Guests */}
          <div>
            <label htmlFor="numberOfGuests" className="block text-sm font-medium text-gray-700 mb-1">
              Number of Guests *
            </label>
            <Input
              id="numberOfGuests"
              name="numberOfGuests"
              type="number"
              min="1"
              max="20"
              required
              value={formData.numberOfGuests}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          {/* Start Date */}
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Start Date *
            </label>
            <Input
              id="startDate"
              name="startDate"
              type="date"
              required
              value={formData.startDate}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          {/* Special Requests */}
          <div>
            <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">
              Special Requests
            </label>
            <Textarea
              id="specialRequests"
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              placeholder="Any special requirements or preferences?"
              className="w-full min-h-24"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-amber-900 hover:bg-amber-800 text-white py-6 text-lg font-semibold"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Booking"
            )}
          </Button>

          <p className="text-xs text-gray-600 text-center">
            We'll send you a confirmation email with next steps and payment details.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
