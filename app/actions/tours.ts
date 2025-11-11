"use server"

import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export async function fetchTours() {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(supabaseUrl || "", supabaseAnonKey || "", {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch {
            // Handle cookie setting errors
          }
        },
      },
    })

    const { data, error } = await supabase.from("tours").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching tours from Supabase:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Error in fetchTours:", error)
    return []
  }
}

export async function fetchTourById(id: string) {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(supabaseUrl || "", supabaseAnonKey || "", {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch {
            // Handle cookie setting errors
          }
        },
      },
    })

    const { data, error } = await supabase.from("tours").select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching tour from Supabase:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Error in fetchTourById:", error)
    return null
  }
}
