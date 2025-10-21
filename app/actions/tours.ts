"use server"

import { createServerClient } from "@/lib/supabase"

export async function fetchTours() {
  try {
    const supabase = createServerClient()

    const { data, error } = await supabase.from("tours").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching tours:", error)
      return getDefaultTours()
    }

    return data || getDefaultTours()
  } catch (error) {
    console.error("Error in fetchTours:", error)
    return getDefaultTours()
  }
}

export async function fetchTourById(id: string) {
  try {
    const supabase = createServerClient()

    const { data, error } = await supabase.from("tours").select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching tour:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Error in fetchTourById:", error)
    return null
  }
}

// Fallback default tours for when Supabase is unavailable
function getDefaultTours() {
  return [
    {
      id: "3-days-masai-mara",
      title: "3 Days 2 Nights Masai Mara Safari",
      location: "Masai Mara, Kenya",
      duration: "3 Days / 2 Nights",
      group_size: "Private Safari",
      price: "From $850",
      image_url:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Samburu%20Sunset.jpg-PM37vqDjxPTd1NUY1gTkvi9dV7WPfB.jpeg",
      category: "Wildlife Safari",
      difficulty: "Easy",
      overview: "Experience Kenya's most famous game reserve with private safari vehicle and professional guide.",
      highlights: ["Big Five Viewing", "Private Safari Vehicle", "Great Rift Valley", "Full Day Game Drives"],
      rating: 4.9,
      reviews_count: 167,
    },
    {
      id: "3-days-naivasha",
      title: "3 Days 2 Nights Naivasha",
      location: "Lake Naivasha, Kenya",
      duration: "3 Days / 2 Nights",
      group_size: "Private Safari",
      price: "From $650",
      image_url:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ewaso%20Ng%27iro.jpg-rVDkIPwU1y8OAL03GD7qPrjfhooQds.jpeg",
      category: "Wildlife Safari",
      difficulty: "Easy",
      overview: "Perfect escape from city life exploring Lake Naivasha, Oserengoni Sanctuary, and Crescent Island.",
      highlights: ["Oserengoni Sanctuary", "Crescent Island", "Bird Watching", "Boat Cruise"],
      rating: 4.9,
      reviews_count: 87,
    },
    {
      id: "zanzibar-dar-es-salaam",
      title: "6 Days 5 Nights Zanzibar & Dar es Salaam",
      location: "Tanzania",
      duration: "6 Days / 5 Nights",
      group_size: "Small Groups",
      price: "From $1,450",
      image_url:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/KICC%20Helipad%20Sunset%20Tour.jpg-lbw7nFkulI61T7fn5t0xgdPAl61mY4.jpeg",
      category: "Beach & Culture",
      difficulty: "Easy",
      overview: "Discover exotic Zanzibar with Stone Town's UNESCO heritage, spice tours, pristine beaches.",
      highlights: ["Stone Town UNESCO Site", "Spice Tour", "Beach Relaxation", "Turtle Swimming"],
      rating: 4.9,
      reviews_count: 124,
    },
    {
      id: "ultimate-kenya-safari",
      title: "7 Days Ultimate Kenya Safari",
      location: "Multiple Parks, Kenya",
      duration: "7 Days / 6 Nights",
      group_size: "Private Safari",
      price: "From $2,200",
      image_url:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Samburu%20Sunset.jpg-PM37vqDjxPTd1NUY1gTkvi9dV7WPfB.jpeg",
      category: "Wildlife Safari",
      difficulty: "Moderate",
      overview:
        "Ultimate Kenya safari visiting Amboseli with Mt. Kilimanjaro views, Lake Nakuru's flamingos, and Maasai Mara.",
      highlights: ["Amboseli National Park", "Lake Nakuru", "Maasai Mara", "National Museum"],
      rating: 4.9,
      reviews_count: 156,
    },
    {
      id: "adventure-safari",
      title: "4 Days Adventure Safari",
      location: "Olpejeta, Nakuru & Amboseli",
      duration: "4 Days / 3 Nights",
      group_size: "Private Safari",
      price: "From $1,350",
      image_url:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Samburu%20dance.jpg-IQ223utquaqmnjWMOEsEDzyqCM2Fwg.jpeg",
      category: "Adventure Safari",
      difficulty: "Moderate",
      overview:
        "Action-packed safari visiting Olpejeta Conservancy with night game drives and Maasai cultural experiences.",
      highlights: ["Olpejeta Chimpanzees", "Night Game Drive", "Maasai Village", "Rhino Tracking"],
      rating: 4.8,
      reviews_count: 98,
    },
    {
      id: "nanyuki-adventure",
      title: "3 Days 2 Nights Nanyuki Adventure Retreat",
      location: "Nanyuki, Kenya",
      duration: "3 Days / 2 Nights",
      group_size: "Small Groups",
      price: "From $750",
      image_url:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Barabara%20.jpg-XNDBgPKyxpiUgaPbG3KfxM4YMrbqe4.jpeg",
      category: "Adventure & Nature",
      difficulty: "Challenging",
      overview: "Adventure retreat at the Equator with water rafting, canopy walking, waterfall hiking, and swimming.",
      highlights: ["Water Rafting", "Canopy Walk", "Waterfall Hiking", "Natural Pools"],
      rating: 4.8,
      reviews_count: 73,
    },
  ]
}
