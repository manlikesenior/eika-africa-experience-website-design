"use server"

import { createServerClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export async function fetchAllTours() {
  try {
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from("tours")
      .select("*")
      .eq("status", "published")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching tours:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Error in fetchAllTours:", error)
    return []
  }
}

export async function fetchTourBySlug(slug: string) {
  try {
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from("tours")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .single()

    if (error) {
      console.error("Error fetching tour by slug:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Error in fetchTourBySlug:", error)
    return null
  }
}

export async function incrementTourViews(tourId: string) {
  try {
    const supabase = createServerClient()

    const { error } = await supabase.rpc("increment_tour_views", {
      tour_id: tourId,
    })

    if (error) {
      const { error: updateError } = await supabase
        .from("tours")
        .update({ views: supabase.raw("views + 1") })
        .eq("id", tourId)

      if (updateError) {
        console.error("Error incrementing views:", updateError)
      }
    }

    revalidatePath(`/tours/[slug]`, "page")
  } catch (error) {
    console.error("Error in incrementTourViews:", error)
  }
}

export async function createBooking(data: {
  tourId: string
  name: string
  email: string
  phone?: string
  guests: number
  preferredDate: string
  message?: string
}) {
  try {
    const supabase = createServerClient()

    const { error } = await supabase.from("bookings").insert([
      {
        tour_id: data.tourId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        guests: data.guests,
        preferred_date: data.preferredDate,
        message: data.message,
        status: "pending",
      },
    ])

    if (error) {
      console.error("Error creating booking:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/admin/bookings")
    return { success: true }
  } catch (error) {
    console.error("Error in createBooking:", error)
    return { success: false, error: "Failed to create booking" }
  }
}

export async function getFeaturedTours(limit = 3) {
  try {
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from("tours")
      .select("*")
      .eq("status", "published")
      .eq("featured", true)
      .order("created_at", { ascending: false })
      .limit(limit)

    if (error) {
      console.error("Error fetching featured tours:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Error in getFeaturedTours:", error)
    return []
  }
}
