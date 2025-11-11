import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const tours = [
  {
    title: "7 Days Kenya Safari",
    location: "Kenya - Amboseli, Lake Nakuru, Maasai Mara",
    duration: "7 Days",
    price: 1800,
    description:
      "Embark on a thrilling 7-day safari adventure across Kenya, exploring Amboseli National Park famous for its large elephant population and Mt. Kilimanjaro views, Lake Nakuru known for pink flamingos, and the world-famous Maasai Mara with the great migration.",
    highlights: [
      "Mt. Kilimanjaro views from Amboseli",
      "Pink flamingo lake viewing",
      "Great Migration in Maasai Mara",
      "Big Five wildlife viewing",
      "Game drives and cultural visits",
    ],
    inclusions: [
      "Park entrance fees",
      "Accommodation (full board)",
      "English-speaking driver guides",
      "All meals per itinerary",
      "Game drives in 4WD safari vehicle",
      "Airport pickups and transfers",
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Personal items and laundry",
      "Tips and beverages",
      "Activities outside itinerary",
    ],
    itinerary: {
      "Day 1": "Arrival in Nairobi - National Museum and Snake Park visit",
      "Day 2": "Nairobi to Amboseli National Park with game drives",
      "Day 3": "Amboseli to Lake Elementaita and Lake Nakuru",
      "Day 4": "Lake Nakuru to Maasai Mara with afternoon game drive",
      "Day 5": "Full-day Maasai Mara game drives",
      "Day 6": "Maasai Mara to Nairobi",
      "Day 7": "Departure",
    },
    image_url:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Inbound%20%26%20Outbound%20Safaris%201-SV0QdErLMXAmNvFuGVYEt92aZj5TTV.jpg",
  },
  {
    title: "8 Days Kenya Safari Experience",
    location: "Kenya - Olpejeta, Lake Nakuru, Lake Naivasha, Maasai Mara",
    duration: "8 Days",
    price: 2500,
    description:
      "The ideal 8-day Kenya safari to see the best that Kenya has to offer. Experience the spectacular Olpejeta Conservancy, encounter the only 2 white rhinos, visit Lake Naivasha and Crescent Island, the bird-watchers paradise of Lake Nakuru, and the world-famous Maasai Mara.",
    highlights: [
      "White rhinos at Olpejeta Conservancy",
      "Night game drives",
      "Pink flamingos at Lake Nakuru",
      "Bicycle safari experience",
      "Hell's Gate and Olkaria geothermal area",
      "Crescent Island boat cruise",
      "Maasai cultural experience",
    ],
    inclusions: [
      "Park entrance fees",
      "Accommodation (full board)",
      "English-speaking driver guides",
      "All meals per itinerary",
      "Night game drive",
      "Airport transfers",
      "Custom 4WD safari van with pop-up roof",
      "Maasai village visit",
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Hot air balloon safari (optional)",
      "Personal items",
      "Tips and beverages",
    ],
    itinerary: {
      "Day 1": "Arrival - Transfer to Olpejeta Conservancy (Night game drive)",
      "Day 2": "Transfer to Lake Nakuru - Evening lake view game drive",
      "Day 3": "Morning game drive - Afternoon bicycle experience",
      "Day 4": "Hell's Gate and Olkaria - Afternoon Crescent Island boat cruise",
      "Day 5": "Transfer to Maasai Mara",
      "Day 6": "Full-day Maasai Mara game drives",
      "Day 7": "Maasai Mara and cultural experience",
      "Day 8": "Return to Nairobi",
    },
    image_url:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Inbound%20%26%20Outbound%20Safaris-iOHIGgF5ep2lTkEqY4cEj5pSGE1eWz.jpg",
  },
  {
    title: "Lake Nakuru Full-Day Tour",
    location: "Kenya - Lake Nakuru National Park",
    duration: "1 Day",
    price: 180,
    description:
      "Discover the beautiful Lake Nakuru National Park, famous for its thousands of pink flamingos and abundant wildlife. Experience game drives, photography, boat rides, and visit the magical Crescent Island Game Sanctuary.",
    highlights: [
      "Millions of pink flamingos",
      "Rothschild giraffes",
      "Over 450 bird species",
      "Crescent Island wildlife sanctuary",
      "Boat ride on the lake",
      "Game drives",
      "Photography opportunities",
    ],
    inclusions: ["Transport", "Park entrance fees", "Boat ride", "Crescent Island visit", "All taxes"],
    exclusions: ["Lunch", "Photography permits", "Personal items", "Drinks and beverages"],
    itinerary: {
      Morning: "Early breakfast, 3.5-hour drive from Nairobi to Lake Nakuru",
      "Mid-morning": "Game viewing drive with bird watching",
      Afternoon: "Boat cruise to Crescent Island sanctuary",
      "Late afternoon": "Guided walking tour on the island",
      Evening: "Photography at Great Rift Valley viewpoint, return to Nairobi",
    },
    image_url:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Inbound%20%26%20Outbound%20Safaris%202-ahxdd6tq7QD61VY7fDTSVmBIFfWvFL.jpg",
  },
]

export async function POST() {
  try {
    if (!supabaseUrl || !supabaseServiceRoleKey) {
      return NextResponse.json({ error: "Missing Supabase configuration" }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

    console.log("[v0] Starting tour seeding...")

    // Delete existing tours
    const { error: deleteError } = await supabase
      .from("tours")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000")

    if (deleteError) {
      console.error("[v0] Error deleting existing tours:", deleteError)
    }

    // Insert new tours
    const { data, error } = await supabase.from("tours").insert(tours)

    if (error) {
      console.error("[v0] Error inserting tours:", error)
      return NextResponse.json({ error: "Failed to seed tours", details: error.message }, { status: 500 })
    }

    console.log("[v0] Successfully seeded tours:", tours.length)
    return NextResponse.json({ success: true, count: tours.length }, { status: 200 })
  } catch (error) {
    console.error("[v0] API seed error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
