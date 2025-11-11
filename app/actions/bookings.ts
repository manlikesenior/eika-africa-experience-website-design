"use server"

import { createServerClient } from "@/lib/supabase"

interface BookingData {
  tour_id: string | null
  first_name: string
  last_name: string
  email: string
  phone: string
  country: string
  trip_theme: string
  destination: string
  departure_date: string | null
  return_date: string | null
  duration: string
  travelers: number
  budget: string
  services_needed: string[]
  special_interests: string
  special_requirements: string
  message: string
}

export async function submitBooking(data: BookingData) {
  try {
    const supabase = createServerClient()

    const { error } = await supabase.from("bookings").insert([
      {
        tour_id: data.tour_id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        country: data.country,
        trip_theme: data.trip_theme,
        destination: data.destination,
        departure_date: data.departure_date,
        return_date: data.return_date,
        duration: data.duration,
        travelers: data.travelers,
        budget: data.budget,
        services_needed: data.services_needed,
        special_interests: data.special_interests,
        special_requirements: data.special_requirements,
        message: data.message,
        status: "pending",
      },
    ])

    if (error) {
      console.error("Error submitting booking:", error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error("Error in submitBooking:", error)
    return { success: false, error: "Failed to submit booking" }
  }
}

export async function fetchBookings(email: string) {
  try {
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("email", email)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching bookings:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Error in fetchBookings:", error)
    return []
  }
}
