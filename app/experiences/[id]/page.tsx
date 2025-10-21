import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Clock, Users, CheckCircle, Calendar, Phone, Mail, Share2, Heart, AlertCircle } from "lucide-react"
import { notFound } from "next/navigation"
import { BookingForm } from "@/components/BookingForm"

// Complete experience data with all tours
const experiences: Record<string, any> = {
  "3-days-masai-mara": {
    title: "3 Days 2 Nights Masai Mara Safari",
    location: "Masai Mara National Reserve, Kenya",
    duration: "3 Days / 2 Nights",
    groupSize: "Private Safari",
    price: "From $850",
    pricePerPerson: "$850 per person",
    rating: 4.9,
    reviews: 167,
    difficulty: "Easy",
    category: "Wildlife Safari",
    heroImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Samburu%20Sunset.jpg-PM37vqDjxPTd1NUY1gTkvi9dV7WPfB.jpeg",
    gallery: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Samburu%20Sunset.jpg-PM37vqDjxPTd1NUY1gTkvi9dV7WPfB.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Samburu%20dance.jpg-IQ223utquaqmnjWMOEsEDzyqCM2Fwg.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ewaso%20Ng%27iro.jpg-rVDkIPwU1y8OAL03GD7qPrjfhooQds.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/KICC1.jpg-zmFlfEIgrEPhhrgiLHg0eojiS2RUZa.jpeg",
    ],
    overview:
      "Enjoy a thrilling 3-day Masai Mara Safari tour starting and ending in Nairobi using quality mid-range safari lodges or tented camps, typically located inside or close to the main Maasai Mara National Reserve. This 2-night, 3-day tour includes road transport from Nairobi with private Safari game drives inside the reserve. The trip may also include extra options such as a visit to a Maasai village. Full-day game drives can be had at no extra charge for the second day of the itinerary in Masai Mara.",
    highlights: [
      "Private safari vehicle with game viewing roof hatch",
      "Professional English-speaking driver-guide",
      "Big Five wildlife viewing opportunities",
      "Great Rift Valley viewpoint stop",
      "Full-day game drive options available",
      "Optional Maasai village cultural visit",
      "Quality mid-range lodge accommodation",
      "All park entrance fees included",
    ],
    itinerary: [
      {
        day: 1,
        title: "Start of your Safari from Nairobi",
        description:
          "Your Driver-Guide reports to your hotel for the start of the safari to Masai Mara with a 7.30 am to 8 am departure for a picturesque drive descending the Great Rift Valley and onwards to Maasai Mara, Kenya's famous game reserve. (Drive time 5.5 hours). Stop at the Great Rift Valley viewpoint to enjoy amazing views. Arrive at Masai Mara for lunch. The afternoon game drive at 3.30 pm allows for spotting magnificent wildlife ranging from the Big Cats such as Lion, Leopard, and Cheetah to Rhino, Elephant, and Wildebeest. Return to your lodge by 6.30 pm.",
        meals: "Lunch, Dinner",
        accommodation: "Keekorok Lodge (or similar)",
      },
      {
        day: 2,
        title: "Enjoy Full Day in Masai Mara",
        description:
          "Two safari game drives today: morning from 6.15 am to 9 am, followed by breakfast, and late afternoon after lunch from 3.30 pm to 6.30 pm. As your Masai Mara safari is private, game drive timings are flexible. You may choose a full-day game drive with packed picnic lunch at no extra cost. Return in the evening for dinner and overnight.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Keekorok Lodge (or similar)",
      },
      {
        day: 3,
        title: "Return to Nairobi",
        description:
          "After breakfast and check-out, depart for return transfer to Nairobi with a shortened morning game drive en route. Arrive in Nairobi by early afternoon (typically by 2.30 pm). Drop off at your hotel or free transfer to the airport.",
        meals: "Breakfast",
        accommodation: "N/A",
      },
    ],
    included: [
      "Accommodation on Full board basis in the lodge",
      "Exclusive transport in Safari Tour Microbus with game viewing roof hatch and UHF radio",
      "03 Private Safari game drives",
      "Certified Professional English-speaking Driver Guide with all expenses",
      "Fuel, driver and car park fees, driver's allowance",
      "All Park entrance fees for clients, driver guide, and vehicle",
      "24-hour Back-Up support",
    ],
    excluded: [
      "International flight tickets and visa costs",
      "Tips, drinks, laundry, calls, and personal expenses",
      "Credit Card Surcharge of 5 to 7% or Bank Transfer Fees of USD 50",
      "Optional Maasai village visit",
      "Hot air balloon safari",
    ],
    accommodation: [
      {
        name: "Keekorok Lodge",
        type: "Mid-range Lodge",
        description:
          "Located inside the Masai Mara National Reserve with excellent wildlife viewing from the lodge grounds.",
      },
      {
        name: "Sarova Mara Camp",
        type: "Tented Camp",
        description: "Luxury tented camp offering an authentic safari experience with modern amenities.",
      },
    ],
  },
  "3-days-naivasha": {
    title: "3 Days 2 Nights Naivasha",
    location: "Lake Naivasha, Kenya",
    duration: "3 Days / 2 Nights",
    groupSize: "Private Safari",
    price: "From $650",
    pricePerPerson: "$650 per person",
    rating: 4.9,
    reviews: 87,
    difficulty: "Easy",
    category: "Wildlife Safari",
    heroImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ewaso%20Ng%27iro.jpg-rVDkIPwU1y8OAL03GD7qPrjfhooQds.jpeg",
    gallery: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ewaso%20Ng%27iro.jpg-rVDkIPwU1y8OAL03GD7qPrjfhooQds.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Samburu%20Sunset.jpg-PM37vqDjxPTd1NUY1gTkvi9dV7WPfB.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/KICC1.jpg-zmFlfEIgrEPhhrgiLHg0eojiS2RUZa.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Barabara%20.jpg-XNDBgPKyxpiUgaPbG3KfxM4YMrbqe4.jpeg",
    ],
    overview:
      "A 2-night, 3-day short stay in Naivasha is the perfect escape from city life. Explore Lake Naivasha, Oserengoni Sanctuary, Crescent Island, and other freshwater lakes located approximately 100 kilometers northwest of Nairobi. Home to over 400 bird species, hippos, zebras, and giraffes.",
    highlights: [
      "Oserengoni Wildlife Sanctuary spanning 18,000 acres",
      "Crescent Island walking safari among free-roaming wildlife",
      "Over 400 bird species for bird watching enthusiasts",
      "Boat cruise on Lake Naivasha",
      "Great Rift Valley viewpoint",
      "All-inclusive accommodation at Chui Lodge",
      "Professional English-speaking guide",
      "Private safari vehicle with pop-up roof",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival and Transfer to Naivasha",
        description:
          "Our driver-guide will pick you up from your hotel. Journey to Naivasha with a stopover at the Great Rift Valley viewpoint for photos. Proceed to Chui Lodge for check-in and lunch. In the afternoon, visit Lake Naivasha Game Park to observe beautiful bird life. Return to lodge for dinner and overnight.",
        meals: "Lunch, Dinner",
        accommodation: "Chui Lodge Oserengoni",
      },
      {
        day: 2,
        title: "Oserengoni Sanctuary and Crescent Island",
        description:
          "After breakfast, embark on excursion to Chui Lodge's wildlife sanctuary spanning 18,000 acres. The sanctuary is home to over 50 mammal species including Leopard, Topi, Grevy's zebra, and Warthog, plus over 400 bird species. After morning game drive, return for lunch and relaxation, then head to Crescent Island for afternoon boat cruise. Perfect for wildlife watching and bird enthusiasts.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Chui Lodge",
      },
      {
        day: 3,
        title: "Departure Back to Nairobi",
        description:
          "After breakfast, return to Nairobi. Our driver guide will drop you at your preferred destination.",
        meals: "Breakfast",
        accommodation: "N/A",
      },
    ],
    included: [
      "Park entrance fees at Sanctuary and National Park",
      "All-Inclusive accommodation (Breakfast, Lunch, Dinner)",
      "Experienced English-speaking driver guides",
      "All meals per itinerary",
      "Bottled water",
      "Airport transfers in Nairobi",
      "All road transportation in custom safari Landcruiser with pop-up roof",
      "Professional English driver guide services",
    ],
    excluded: [
      "All other flights",
      "Additional sightseeing or deviation from itinerary",
      "Personal items (tobacco, laundry, phone calls, etc.)",
      "Tips and drinks/beverages",
      "Medical/Travel Insurance",
      "Any items not mentioned above",
    ],
    accommodation: [
      {
        name: "Chui Lodge Oserengoni",
        type: "All-Inclusive Lodge",
        description:
          "Located within Oserengoni Wildlife Sanctuary with stunning views of Lake Naivasha and abundant wildlife.",
      },
    ],
  },
  "zanzibar-dar-es-salaam": {
    title: "6 Days 5 Nights Zanzibar & Dar es Salaam",
    location: "Tanzania",
    duration: "6 Days / 5 Nights",
    groupSize: "Small Groups",
    price: "From $1,450",
    pricePerPerson: "$1,450 per person",
    rating: 4.9,
    reviews: 124,
    difficulty: "Easy",
    category: "Beach & Culture",
    heroImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/KICC%20Helipad%20Sunset%20Tour.jpg-lbw7nFkulI61T7fn5t0xgdPAl61mY4.jpeg",
    gallery: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/KICC%20Helipad%20Sunset%20Tour.jpg-lbw7nFkulI61T7fn5t0xgdPAl61mY4.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/KICC%202.jpg-mBKF2Ch5BXrehspwCEuPcgImKIUBUz.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Samburu%20Sunset.jpg-PM37vqDjxPTd1NUY1gTkvi9dV7WPfB.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ewaso%20Ng%27iro.jpg-rVDkIPwU1y8OAL03GD7qPrjfhooQds.jpeg",
    ],
    overview:
      "Immerse yourself in the rich culture and stunning beaches of Zanzibar. This comprehensive tour includes Stone Town exploration, spice plantation visits, beach relaxation, and unique experiences like swimming with turtles at Baraka Aquarium. Discover the exotic spice islands with UNESCO heritage sites, pristine beaches, and the famous Forodhani food market.",
    highlights: [
      "Stone Town UNESCO World Heritage Site exploration",
      "Spice plantation tour with tasting session",
      "Baraka Aquarium turtle swimming experience",
      "Forodhani food market evening visit",
      "Prison Island giant tortoises viewing",
      "Sunset beach cruise on traditional dhow",
      "Ferry crossing from Dar es Salaam",
      "Traditional Swahili lunch at spice farm",
    ],
    itinerary: [
      {
        day: 1,
        title: "Departure from Nairobi to Dar es Salaam",
        description:
          "Depart from Nairobi to Dar es Salaam, widely known as an important economic center and one of the fastest-growing cities in the world. Our driver guide will receive you upon arrival and transfer you to your hotel for check-in, dinner, and overnight stay.",
        meals: "Dinner",
        accommodation: "Selected Hotel in Dar es Salaam",
      },
      {
        day: 2,
        title: "Ferry crossing to Zanzibar and Old Town Tour, Visit to Forodhani Food Market",
        description:
          "After breakfast, depart to Zanzibar by Ferry crossing. Stone Town tour includes the cultural and architecturally important town with century-long history. Visit the former slave market site (now Anglican church built in 1871), town market, and Zanzibar Memorial Museum. See the House of Wonder built in 1883. At 2:30 pm, visit Forodhani food market. As the sun sets, Stone Town's Forodhani Gardens transforms into an open-air food market with fish kebabs, urojo soup, chickpea fritters, and hand-pressed sugarcane juice.",
        meals: "Breakfast, Lunch",
        accommodation: "Stone Town Hotel",
      },
      {
        day: 3,
        title: "Spice Tour and Visit to Nungwi",
        description:
          "Start early with breakfast before visiting the Spice Tour Island, one of Zanzibar's most famous excursions. The island got its name from its history as a leading producer of clove, nutmeg, and cinnamon in the 19th century. Tour a spice farm to see how spices, herbs, and fruits grow and are cultivated. Smell and taste various spices and enjoy traditional Swahili lunch at the farm. After lunch, go for the Dhow sunset tour at Nungwi Beach starting at 4 PM, returning around 6:30 PM after sunset.",
        meals: "Breakfast, Lunch",
        accommodation: "Beach Resort",
      },
      {
        day: 4,
        title: "Baraka Aquarium and Sunset Beach Cruise",
        description:
          "Full-day tour experiencing both Mnemba Island snorkeling and swimming with turtles. Explore Nungwi Village and visit Baraka Natural Aquarium, home to endangered sea turtles and variety of fish carved from coral bedrock by wave erosion. Swim with sea turtles and feed them seaweed. Spend time in water or snorkel to watch them in natural environment. Lunch around the site. The island is flanked by amazing beach of reef sanctuary, ideal for swimming, snorkeling, and beach relaxation. Return to Stone Town for dinner and overnight.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Beach Resort",
      },
      {
        day: 5,
        title: "Prison Island and Stone Town",
        description:
          "Visit Prison Island to see giant tortoises. Free time for shopping and exploring Stone Town's narrow streets, markets, and historic buildings. Experience the blend of Arab, Persian, Indian, and European influences in the architecture and culture.",
        meals: "Breakfast, Dinner",
        accommodation: "Stone Town Hotel",
      },
      {
        day: 6,
        title: "Departure",
        description: "Transfer to airport for your flight back to Nairobi after breakfast.",
        meals: "Breakfast",
        accommodation: "N/A",
      },
    ],
    included: [
      "Ferry crossing to Zanzibar",
      "Accommodation with breakfast",
      "Spice tour with professional guide",
      "Stone Town walking tour",
      "Baraka Aquarium entrance and turtle swimming",
      "Prison Island tour and giant tortoise viewing",
      "Sunset beach cruise on traditional dhow",
      "Airport/hotel transfers in Dar es Salaam and Zanzibar",
      "Traditional Swahili lunch at spice farm",
    ],
    excluded: [
      "International flights from/to Nairobi",
      "Visa fees for Tanzania",
      "Lunch and dinner except where specified",
      "Travel and medical insurance",
      "Tips and gratuities for guides and drivers",
      "Personal expenses and shopping",
      "Optional activities and excursions",
      "Alcoholic beverages",
    ],
    accommodation: [
      {
        name: "Dar es Salaam City Hotel",
        type: "Mid-range Hotel",
        description: "Comfortable accommodation in the heart of Dar es Salaam with modern amenities.",
      },
      {
        name: "Stone Town Heritage Hotel",
        type: "Boutique Hotel",
        description:
          "Charming hotel in historic Stone Town, walking distance to all major attractions and the waterfront.",
      },
      {
        name: "Nungwi Beach Resort",
        type: "Beach Resort",
        description:
          "Beautiful beachfront resort with pristine white sand beaches, perfect for relaxation and water activities.",
      },
    ],
  },
  "ultimate-kenya-safari": {
    title: "7 Days Ultimate Kenya Safari",
    location: "Multiple Parks, Kenya",
    duration: "7 Days / 6 Nights",
    groupSize: "Private Safari",
    price: "From $2,200",
    pricePerPerson: "$2,200 per person",
    rating: 4.9,
    reviews: 156,
    difficulty: "Moderate",
    category: "Wildlife Safari",
    heroImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Samburu%20Sunset.jpg-PM37vqDjxPTd1NUY1gTkvi9dV7WPfB.jpeg",
    gallery: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Samburu%20Sunset.jpg-PM37vqDjxPTd1NUY1gTkvi9dV7WPfB.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Samburu%20dance.jpg-IQ223utquaqmnjWMOEsEDzyqCM2Fwg.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ewaso%20Ng%27iro.jpg-rVDkIPwU1y8OAL03GD7qPrjfhooQds.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/KICC1.jpg-zmFlfEIgrEPhhrgiLHg0eojiS2RUZa.jpeg",
    ],
    overview:
      "Experience the best of Kenya's wildlife and culture in this comprehensive 7-day safari. From the elephant herds of Amboseli to the pink flamingos of Lake Nakuru and the Big Five of Maasai Mara, this tour covers Kenya's most iconic destinations. Includes National Museum visit, Mt. Kilimanjaro views, and comprehensive wildlife viewing across three premier national parks.",
    highlights: [
      "Amboseli National Park with Mt. Kilimanjaro views",
      "Lake Nakuru flamingo viewing and rhino tracking",
      "Maasai Mara Big Five safari experience",
      "National Museum and Snake Park visit",
      "Professional English-speaking driver-guide",
      "Quality lodge accommodation throughout",
      "Private safari vehicle with pop-up roof",
      "All park entrance fees and game drives included",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival - National Museum & Snake Park",
        description:
          "Arrive in Nairobi. Visit the National Museum to learn about Kenya's history, culture, and heritage. Explore the Snake Park featuring various reptiles and freshwater/marine fish. The park also serves as research and training center. Return to hotel for relaxation.",
        meals: "Lunch, Dinner",
        accommodation: "Ole Sereni / Eka Hotel",
      },
      {
        day: 2,
        title: "Nairobi - Amboseli National Park",
        description:
          "Depart early to Amboseli National Park, an amazing destination you wouldn't miss. Views of Mt. Kilimanjaro (weather permitting) are thrilling. Opportunity to see big herds of elephants up close as you drive into the park. Visit observation point for bird's eye view of the expansive park teeming with wildlife. Check in to hotel for lunch and relax. Optional Maasai village visit. Return to lodge in evening.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Oltukai Lodge / Serena Amboseli",
      },
      {
        day: 3,
        title: "Full Day Amboseli",
        description:
          "Full day exploring Amboseli with morning and afternoon game drives. Opportunity to see large elephant herds, lions, cheetahs, buffalo, and other wildlife. Visit observation hill for panoramic views. Optional Maasai cultural village visit to learn about their traditions and lifestyle.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Oltukai Lodge / Serena Amboseli",
      },
      {
        day: 4,
        title: "Amboseli - Lake Nakuru National Park",
        description:
          "Drive to Lake Nakuru, a magical Kenya safari park visited mostly by travelers due to scenic view, great vegetation of bushy grasslands, woodlands, and euphorbia forest. Famous for harbor of Pink flamingo, named the Pink City. Over 450 bird species and 50 mammal species. Upon arrival, check in with lunch, relax and enjoy scenic view. Evening game drive in the park. Enjoy breathtaking sunset view at lakeside.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Sarova Lion Hill Lodge",
      },
      {
        day: 5,
        title: "Lake Nakuru - Maasai Mara",
        description:
          "Morning game drive in Lake Nakuru for flamingo viewing and rhino tracking, then drive to Maasai Mara. Check-in at lodge for lunch. Evening game drive in the world-famous Maasai Mara National Reserve. Begin your search for the Big Five.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Mara Lodge",
      },
      {
        day: 6,
        title: "Full Day Maasai Mara",
        description:
          "Full day in Maasai Mara with morning and afternoon game drives. Search for the Big Five and witness the great migration (seasonal, July-October). Optional Maasai village visit to experience traditional culture, dances, and crafts. Optional hot air balloon safari at dawn for aerial views.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Mara Lodge",
      },
      {
        day: 7,
        title: "Maasai Mara - Nairobi Departure",
        description:
          "Early morning game drive, then return to Nairobi. Lunch en route. Airport transfer for departure flight.",
        meals: "Breakfast, Lunch",
        accommodation: "N/A",
      },
    ],
    included: [
      "All park entrance fees at National Reserves and Parks",
      "Accommodation on Half Board (Lunch and Dinner)",
      "Experienced English-speaking driver guides",
      "All meals per itinerary (Indian Cuisine available)",
      "02 500ml bottles of water per day while on safari",
      "Airport pickups & transfers in Nairobi",
      "All road transportation in custom safari Coaster and 4WD Van with pop-up roof",
      "Professional English driver guide throughout safari",
      "National Museum entrance fee",
    ],
    excluded: [
      "All flights",
      "Additional sightseeing or deviation from itinerary",
      "Personal items (laundry, phone calls, etc.)",
      "Tips and drinks/beverages",
      "Medical/Travel Insurance",
      "Hot Air Balloon Safari (optional)",
      "Maasai Village Cultural Visit (optional)",
      "Any items not mentioned above",
    ],
    accommodation: [
      {
        name: "Ole Sereni / Eka Hotel",
        type: "City Hotel",
        description: "Modern hotel in Nairobi with excellent facilities and service.",
      },
      {
        name: "Oltukai Lodge / Serena Amboseli",
        type: "Safari Lodge",
        description: "Quality lodge in Amboseli with views of Mt. Kilimanjaro and wildlife.",
      },
      {
        name: "Sarova Lion Hill Lodge",
        type: "Safari Lodge",
        description: "Perched on a hillside overlooking Lake Nakuru with spectacular views.",
      },
      {
        name: "Mara Safari Lodge",
        type: "Safari Lodge",
        description: "Comfortable accommodation in the heart of Maasai Mara with excellent game viewing.",
      },
    ],
  },
  "adventure-safari": {
    title: "4 Days Adventure Safari",
    location: "Olpejeta, Nakuru & Amboseli",
    duration: "4 Days / 3 Nights",
    groupSize: "Private Safari",
    price: "From $1,350",
    pricePerPerson: "$1,350 per person",
    rating: 4.8,
    reviews: 98,
    difficulty: "Moderate",
    category: "Adventure Safari",
    heroImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Samburu%20dance.jpg-IQ223utquaqmnjWMOEsEDzyqCM2Fwg.jpeg",
    gallery: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Samburu%20dance.jpg-IQ223utquaqmnjWMOEsEDzyqCM2Fwg.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Samburu%20Sunset.jpg-PM37vqDjxPTd1NUY1gTkvi9dV7WPfB.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ewaso%20Ng%27iro.jpg-rVDkIPwU1y8OAL03GD7qPrjfhooQds.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/KICC1.jpg-zmFlfEIgrEPhhrgiLHg0eojiS2RUZa.jpeg",
    ],
    overview:
      "This adventure safari combines wildlife viewing with unique experiences like night game drives and visits to endangered species sanctuaries. See the last northern white rhinos at Olpejeta, explore diverse ecosystems, and immerse yourself in Maasai culture. Action-packed itinerary visiting three of Kenya's premier wildlife destinations.",
    highlights: [
      "Olpejeta Conservancy chimpanzee sanctuary visit",
      "Night game drive experience to spot nocturnal wildlife",
      "Lake Nakuru National Park flamingo viewing",
      "Amboseli National Park elephant viewing",
      "Maasai cultural village visit and interaction",
      "Last northern white rhinos viewing (Najin and Fatu)",
      "Professional guide and private safari vehicle",
      "Full board accommodation at quality lodges",
    ],
    itinerary: [
      {
        day: 1,
        title: "Nairobi - Olpejeta Conservancy (Nanyuki)",
        description:
          "Driver guide will receive you at Jomo Kenyatta International Airport. 4-hour drive from Nairobi to Nanyuki, arriving around 9:00 am. Proceed to Sweetwaters Serena Hotel for check-in and breakfast. Day game drive where you'll see chimpanzees and other wildlife in the conservancy with Tourist Driver Guide. Return for lunch at hotel while viewing animals that come to the waterhole at the front of the lodge. Rest after lunch. Night game drive begins at 7 pm to 9 pm to view nocturnals that come out to graze or feed. Expect to see the white rhinos, the only remaining Najin and Fatu.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Sweetwaters Serena Hotel",
      },
      {
        day: 2,
        title: "Depart from Olpejeta Conservancy to Lake Nakuru NP",
        description:
          "After early breakfast, check out and proceed to Lake Nakuru National Park, approximately 3 hours drive. A magical Kenya safari park visited mostly by travelers due to its scenic view, great vegetation of bushy grasslands, woodlands, and euphorbia forest. Famous for harbor of Pink flamingo, thus named the Pink City. Over 450 bird species and 50 mammal species. Upon arrival at Sarova Lion Hill Hotel, check in with lunch, relax and enjoy scenic view. Evening game drive in the park. Enjoy breathtaking sunset view at lakeside and evening grazing animals.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Sarova Lion Hill Lodge",
      },
      {
        day: 3,
        title: "Full Day Amboseli National Park and Maasai Cultural Experience",
        description:
          "Early departure from Nakuru after breakfast heading to Amboseli National Park, home to African Elephants. You'll enjoy guaranteed sighting of elephants in their natural environment. Busy day, so hit the road before sunrise at 4:30 am. Along the way you'll awaken with sun spreading over countryside, shining upon local farms and homesteads. Along drive you may see Maasai herders in colorful Shuka wraps tending to grazing cattle. Unbelievable elephant spotting, plus lions, giraffes, buffalo, impala, cheetahs, and wildebeest. Visit Maasai village to experience traditional culture.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Amboseli Lodge",
      },
      {
        day: 4,
        title: "Amboseli - Nairobi Departure",
        description: "Early morning game drive, then return to Nairobi for airport transfer and departure.",
        meals: "Breakfast",
        accommodation: "N/A",
      },
    ],
    included: [
      "All park and conservancy entrance fees",
      "Accommodation on full board basis",
      "Night game drive at Olpejeta Conservancy",
      "Chimpanzee sanctuary visit",
      "Maasai village visit and cultural experience",
      "Private safari vehicle with pop-up roof",
      "Professional English-speaking driver-guide",
      "All game drives as per itinerary",
      "Bottled water during safari",
    ],
    excluded: [
      "International flights and visa fees",
      "Travel and medical insurance",
      "Tips and gratuities for guide and hotel staff",
      "Personal expenses and shopping",
      "Drinks and beverages at lodges",
      "Any items not mentioned in inclusions",
      "Optional activities not listed",
    ],
    accommodation: [
      {
        name: "Sweetwaters Serena Hotel",
        type: "Safari Lodge",
        description:
          "Located in Olpejeta Conservancy with waterhole views and close proximity to chimpanzee sanctuary.",
      },
      {
        name: "Sarova Lion Hill Lodge",
        type: "Safari Lodge",
        description: "Perched on hillside overlooking Lake Nakuru with spectacular bird and wildlife viewing.",
      },
      {
        name: "Amboseli Safari Lodge",
        type: "Safari Lodge",
        description: "Quality lodge in Amboseli with views of Mt. Kilimanjaro and abundant elephant herds.",
      },
    ],
  },
  "nanyuki-adventure": {
    title: "3 Days 2 Nights Nanyuki Adventure Retreat",
    location: "Nanyuki, Kenya",
    duration: "3 Days / 2 Nights",
    groupSize: "Small Groups",
    price: "From $750",
    pricePerPerson: "$750 per person",
    rating: 4.8,
    reviews: 73,
    difficulty: "Challenging",
    category: "Adventure & Nature",
    heroImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Barabara%20.jpg-XNDBgPKyxpiUgaPbG3KfxM4YMrbqe4.jpeg",
    gallery: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Barabara%20.jpg-XNDBgPKyxpiUgaPbG3KfxM4YMrbqe4.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ewaso%20Ng%27iro.jpg-rVDkIPwU1y8OAL03GD7qPrjfhooQds.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/KICC1.jpg-zmFlfEIgrEPhhrgiLHg0eojiS2RUZa.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Samburu%20Sunset.jpg-PM37vqDjxPTd1NUY1gTkvi9dV7WPfB.jpeg",
    ],
    overview:
      "This adventure-packed retreat combines adrenaline activities with nature exploration. Located at the Equator, Nanyuki offers unique experiences from white-water rafting to forest canopy walks and pristine natural pools. Perfect place to create a bond with yourself through fun adventure activities.",
    highlights: [
      "Sagana River white-water rafting (1.5-2 hours)",
      "Ngare Ndare forest canopy walk experience",
      "Waterfall hiking and swimming in azure natural pools",
      "Natural pool swimming in crystal-clear waters",
      "OlPejeta Conservancy wildlife viewing",
      "Equator crossing experience and photos",
      "Full board accommodation with vegetarian options",
      "Professional water facilitators and guides",
    ],
    itinerary: [
      {
        day: 1,
        title: "Nairobi - Nanyuki - Water Rafting",
        description:
          "Drive to Nanyuki in clean safari vehicle. Afternoon white-water rafting adventure on Sagana River, 1.5-2 hours guided by professional water facilitators. Cross the Equator for unique experience and photos. Check-in at lodge for dinner and overnight.",
        meals: "Lunch, Dinner",
        accommodation: "Nanyuki Lodge",
      },
      {
        day: 2,
        title: "Ngare Ndare Full-Day Adventure",
        description:
          "Full day at Ngare Ndare Forest. Experience canopy walk through the treetops. Exciting and thrilling hike to waterfalls. Swimming in azure natural pools surrounded by pristine forest. Forest exploration with professional guide. Activities include Mount Kenya entry, hiking, and guiding fees.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Nanyuki Lodge",
      },
      {
        day: 3,
        title: "OlPejeta Conservancy - Departure",
        description:
          "Morning visit to OlPejeta Conservancy for wildlife viewing and conservation experience. Return to Nairobi in clean safari vehicle.",
        meals: "Breakfast, Lunch",
        accommodation: "N/A",
      },
    ],
    included: [
      "Return transport in clean safari vehicle with good music & reception",
      "Accommodation on 2 pax sharing basis",
      "Vegetarian & non-vegetarian meals on Full Board (FB) basis",
      "Canopy walk, Mount Kenya entry, hiking & guiding fees",
      "Hike to waterfalls & swimming in Ngare Ndare",
      "1.5-2 Hours River water rafting in River Sagana guided by professionals",
      "OlPejeta Conservancy entrance and game drive",
      "All adventure activities as per itinerary",
    ],
    excluded: [
      "Beverages & alcoholic drinks",
      "Laundry services",
      "Tips & gratuities",
      "Items & expenses of personal use",
      "Visas and passport fees",
      "Medical & travel/baggage insurance",
      "Any items not mentioned in inclusions",
    ],
    accommodation: [
      {
        name: "Nanyuki Adventure Lodge",
        type: "Adventure Lodge",
        description: "Comfortable lodge in Nanyuki with easy access to all adventure activities and the Equator.",
      },
    ],
  },
}

export default function ExperienceDetailPage({ params }: { params: { id: string } }) {
  const experience = experiences[params.id]

  if (!experience) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Gallery */}
      <section className="relative bg-black">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-1 max-h-[600px]">
          <div className="md:col-span-3 relative h-[400px] md:h-[600px]">
            <Image
              src={experience.heroImage || "/placeholder.svg"}
              alt={experience.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="bg-white text-gray-900">{experience.category}</Badge>
                  <Badge className="bg-amber-900">{experience.difficulty}</Badge>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{experience.title}</h1>
                <div className="flex flex-wrap items-center gap-6 text-lg">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    {experience.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    {experience.duration}
                  </div>
                  {/* Removed Star rating from hero section */}
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:grid grid-rows-3 gap-1">
            {experience.gallery.slice(1, 4).map((image: string, index: number) => (
              <div key={index} className="relative h-full">
                <Image src={image || "/placeholder.svg"} alt={`Gallery ${index + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button variant="outline" size="icon" className="bg-white hover:bg-gray-100">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="bg-white hover:bg-gray-100">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Quick Facts */}
            <Card className="mb-8 border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <Clock className="h-8 w-8 text-amber-900 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-bold">{experience.duration}</p>
                  </div>
                  <div className="text-center">
                    <Users className="h-8 w-8 text-amber-900 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Group Size</p>
                    <p className="font-bold">{experience.groupSize}</p>
                  </div>
                  <div className="text-center">
                    <MapPin className="h-8 w-8 text-amber-900 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Difficulty</p>
                    <p className="font-bold">{experience.difficulty}</p>
                  </div>
                  <div className="text-center">
                    <Calendar className="h-8 w-8 text-amber-900 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Availability</p>
                    <p className="font-bold">Year-round</p>
                  </div>
                  {/* Replaced Star rating with "Highly Rated" */}
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Rating</p>
                    <p className="font-bold">Highly Rated</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs Navigation */}
            <Tabs defaultValue="overview" className="mb-8">
              <TabsList className="grid w-full grid-cols-4 bg-white border">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                <TabsTrigger value="included">Included</TabsTrigger>
                <TabsTrigger value="accommodation">Accommodation</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="mt-6">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Tour Overview</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">{experience.overview}</p>

                    <Separator className="my-6" />

                    <h3 className="text-xl font-bold text-gray-900 mb-4">Tour Highlights</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {experience.highlights.map((highlight: string, index: number) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Itinerary Tab */}
              <TabsContent value="itinerary" className="mt-6">
                <div className="space-y-6">
                  {experience.itinerary.map((day: any, index: number) => (
                    <Card key={index} className="border-0 shadow-lg overflow-hidden">
                      <div className="bg-gradient-to-r from-amber-900 to-amber-800 text-white p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <span className="text-2xl font-bold">Day {day.day}</span>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold">{day.title}</h3>
                            <p className="text-amber-100 mt-1">
                              {day.meals} • {day.accommodation}
                            </p>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <p className="text-gray-700 leading-relaxed">{day.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Included Tab */}
              <TabsContent value="included" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
                        <CheckCircle className="h-6 w-6" />
                        What's Included
                      </h3>
                      <ul className="space-y-3">
                        {experience.included.map((item: string, index: number) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-red-700 mb-4 flex items-center gap-2">
                        <AlertCircle className="h-6 w-6" />
                        What's Not Included
                      </h3>
                      <ul className="space-y-3">
                        {experience.excluded.map((item: string, index: number) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <div className="w-3 h-3 border-2 border-red-600 rounded-full" />
                            </div>
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Accommodation Tab */}
              <TabsContent value="accommodation" className="mt-6">
                <div className="space-y-6">
                  {experience.accommodation.map((acc: any, index: number) => (
                    <Card key={index} className="border-0 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <MapPin className="h-8 w-8 text-amber-900" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{acc.name}</h3>
                            <Badge variant="outline" className="mb-3">
                              {acc.type}
                            </Badge>
                            <p className="text-gray-700">{acc.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <BookingForm tourId={params.id} />

              {/* Contact Card */}
              <Card className="border-0 shadow-xl">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Need Help Planning?</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                        <Phone className="h-5 w-5 text-amber-900" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Call Us</p>
                        <p className="font-semibold">+254116735102</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                        <Mail className="h-5 w-5 text-amber-900" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Email Us</p>
                        <p className="font-semibold">inquiries@eikafricaexperience.com</p>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="bg-amber-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700">
                      <strong>Response Time:</strong> We typically respond within 24 hours
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Why Book With Us */}
              <Card className="border-0 shadow-xl">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Why Book With Us?</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Best price guarantee</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>24/7 customer support</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Expert local guides</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Flexible cancellation</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Tours */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Similar Tours You May Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-xl transition-shadow border-0">
              <div className="relative h-48">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Samburu%20Sunset.jpg-PM37vqDjxPTd1NUY1gTkvi9dV7WPfB.jpeg"
                  alt="Masai Mara Safari"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">3 Days Masai Mara Safari</h3>
                <p className="text-gray-600 text-sm mb-4">Masai Mara National Reserve</p>
                <div className="flex items-center justify-between">
                  <span className="text-amber-900 font-bold">From $850</span>
                  <Link href="/experiences/3-days-masai-mara">
                    <Button variant="outline" size="sm" className="bg-transparent">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-shadow border-0">
              <div className="relative h-48">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ewaso%20Ng%27iro.jpg-rVDkIPwU1y8OAL03GD7qPrjfhooQds.jpeg"
                  alt="Lake Naivasha"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">3 Days Naivasha</h3>
                <p className="text-gray-600 text-sm mb-4">Lake Naivasha & Crescent Island</p>
                <div className="flex items-center justify-between">
                  <span className="text-amber-900 font-bold">From $650</span>
                  <Link href="/experiences/3-days-naivasha">
                    <Button variant="outline" size="sm" className="bg-transparent">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-shadow border-0">
              <div className="relative h-48">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Samburu%20dance.jpg-IQ223utquaqmnjWMOEsEDzyqCM2Fwg.jpeg"
                  alt="Adventure Safari"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">4 Days Adventure Safari</h3>
                <p className="text-gray-600 text-sm mb-4">Olpejeta, Nakuru & Amboseli</p>
                <div className="flex items-center justify-between">
                  <span className="text-amber-900 font-bold">From $1,350</span>
                  <Link href="/experiences/adventure-safari">
                    <Button variant="outline" size="sm" className="bg-transparent">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
