-- Seed script for new tours system
-- This populates the tours table with sample data

INSERT INTO tours (
  title,
  slug,
  description,
  location,
  duration,
  price,
  image_url,
  highlights,
  inclusions,
  exclusions,
  itinerary,
  featured,
  status
) VALUES
(
  '3 Days Masai Mara Safari Adventure',
  '3-days-masai-mara-adventure',
  'Experience the magic of Kenya''s most famous wildlife reserve with our immersive 3-day Masai Mara safari. Witness the incredible Big Five, explore vast savannah plains, and immerse yourself in authentic Maasai culture. This carefully curated safari offers the perfect balance of wildlife viewing, cultural experiences, and comfort.',
  'Masai Mara National Reserve, Kenya',
  '3 Days / 2 Nights',
  850,
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Samburu%20Sunset.jpg-PM37vqDjxPTd1NUY1gTkvi9dV7WPfB.jpeg',
  '["Extensive Big Five wildlife viewing", "Private safari vehicle with pop-up roof", "Professional Maasai guide", "Sunset game drives", "Visit to traditional Maasai village", "All meals and premium lodge accommodation"]'::jsonb,
  '["Park entrance fees", "Accommodation at luxury tented camp", "All meals (breakfast, lunch, dinner)", "Professional driver-guide", "Game drives in 4x4 safari vehicle", "Bottled water during game drives", "Airport transfers"]'::jsonb,
  '["International flights", "Travel insurance", "Alcoholic beverages", "Tips and gratuities", "Personal expenses", "Hot air balloon safari (optional - $450)"]'::jsonb,
  '{
    "Day 1": "Depart Nairobi early morning and drive through the Great Rift Valley to Masai Mara. Arrive at camp for lunch. Afternoon game drive to spot lions, elephants, and more. Dinner and overnight at luxury tented camp.",
    "Day 2": "Full day of game drives exploring different areas of the reserve. Picnic lunch in the bush. Optional visit to Maasai village (additional cost). Evening sundowner and night game viewing. All meals at camp.",
    "Day 3": "Early morning game drive to catch predators hunting. Return to camp for breakfast. Final game drive en route to Nairobi. Arrive Nairobi late afternoon with unforgettable memories."
  }'::jsonb,
  true,
  'published'
),
(
  'Lake Naivasha & Hells Gate Adventure',
  'lake-naivasha-hells-gate-adventure',
  'Discover the stunning beauty of Lake Naivasha and the dramatic landscapes of Hells Gate National Park. This 2-day adventure combines boat safaris, cycling through wildlife, and exploring spectacular gorges. Perfect for nature lovers and adventure seekers looking for something beyond traditional game drives.',
  'Lake Naivasha & Hells Gate, Kenya',
  '2 Days / 1 Night',
  480,
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ewaso%20Ng%27iro.jpg-rVDkIPwU1y8OAL03GD7qPrjfhooQds.jpeg',
  '["Boat safari on Lake Naivasha", "Cycling through Hells Gate with zebras and giraffes", "Dramatic gorge exploration", "Bird watching - over 400 species", "Rock climbing opportunities", "Crescent Island walking safari"]'::jsonb,
  '["Lake-side accommodation", "Boat safari equipment", "Bicycle rental at Hells Gate", "Park entrance fees", "Professional guide", "All meals", "Transportation from Nairobi"]'::jsonb,
  '["International flights", "Travel insurance", "Tips for guide and boat captain", "Optional activities", "Personal expenses"]'::jsonb,
  '{
    "Day 1": "Morning departure from Nairobi to Lake Naivasha. Boat safari to see hippos and diverse birdlife. Walking safari on Crescent Island among giraffes and zebras. Lunch at lakeside resort. Afternoon cycling through Hells Gate National Park among wildlife. Explore the spectacular gorge. Dinner and overnight at resort.",
    "Day 2": "Optional early morning bird watching walk. Breakfast at resort. Visit to geothermal spa (optional). Departure to Nairobi, arriving early afternoon."
  }'::jsonb,
  true,
  'published'
),
(
  '7 Days Ultimate Kenya Safari',
  '7-days-ultimate-kenya-safari',
  'Experience the very best of Kenya with our comprehensive 7-day safari covering Amboseli, Lake Nakuru, and the world-famous Masai Mara. This journey showcases Kenya''s incredible diversity from the snow-capped peak of Mt. Kilimanjaro to the pink shores of Lake Nakuru and the endless plains of the Mara. Perfect for first-time visitors wanting to see it all.',
  'Amboseli, Lake Nakuru & Masai Mara, Kenya',
  '7 Days / 6 Nights',
  2100,
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Inbound%20%26%20Outbound%20Safaris%201-SV0QdErLMXAmNvFuGVYEt92aZj5TTV.jpg',
  '["Mt. Kilimanjaro views from Amboseli", "Massive elephant herds", "Lake Nakuru flamingo spectacle", "Rothschild giraffes and black rhinos", "Masai Mara Big Five viewing", "Great Migration (seasonal)", "Three distinct ecosystems"]'::jsonb,
  '["All park entrance fees", "6 nights accommodation (mix of lodges and camps)", "All meals throughout", "Professional English-speaking guide", "Game drives in safari vehicle with pop-up roof", "Bottled water daily", "Airport pickup and drop-off"]'::jsonb,
  '["International flights", "Visa fees", "Travel insurance", "Alcoholic beverages", "Laundry services", "Tips (recommended $10-15 per day)", "Optional activities"]'::jsonb,
  '{
    "Day 1": "Arrive Nairobi. Meet and greet. City tour including Giraffe Centre. Overnight at Nairobi hotel.",
    "Day 2": "Drive to Amboseli National Park (4 hours). Afternoon game drive with Mt. Kilimanjaro backdrop. Large elephant herds. Overnight at Amboseli lodge.",
    "Day 3": "Full day Amboseli game drives. Optional visit to Maasai village. Spectacular mountain views. All meals at lodge.",
    "Day 4": "Morning game drive. Drive to Lake Nakuru (5 hours). Afternoon game drive seeing flamingos and rhinos. Overnight at Lake Nakuru.",
    "Day 5": "Morning at Lake Nakuru. Drive to Masai Mara (5 hours). Afternoon game drive in the Mara. Overnight at tented camp.",
    "Day 6": "Full day exploring Masai Mara with morning and afternoon game drives. Optional hot air balloon safari. Picnic lunch. All meals at camp.",
    "Day 7": "Early morning game drive. Breakfast. Drive back to Nairobi (5-6 hours). Afternoon arrival and airport transfer for your flight home."
  }'::jsonb,
  true,
  'published'
),
(
  'Samburu & Meru National Parks Explorer',
  'samburu-meru-explorer',
  'Venture off the beaten path to Kenya''s northern wilderness. Samburu and Meru offer unique wildlife species found nowhere else in Kenya including Grevy''s zebras, reticulated giraffes, and the endangered African wild dog. These lesser-visited parks provide an exclusive safari experience with fewer crowds and stunning desert landscapes.',
  'Samburu & Meru National Parks, Kenya',
  '5 Days / 4 Nights',
  1450,
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Samburu%20dance.jpg-IQ223utquaqmnjWMOEsEDzyqCM2Fwg.jpeg',
  '["Unique northern species (Samburu Special Five)", "Grevy''s zebra and reticulated giraffe", "Gerenuk and Somali ostrich", "Elephants and big cats", "Ewaso Nyiro River wildlife", "Cultural visits to Samburu villages", "Exclusive, uncrowded safari experience"]'::jsonb,
  '["All park fees", "4 nights accommodation", "All meals", "Bottled water", "Game drives", "Cultural visits", "Professional guide", "Transport in 4x4"]'::jsonb,
  '["Flights", "Insurance", "Alcoholic drinks", "Tips", "Laundry", "Personal items"]'::jsonb,
  '{
    "Day 1": "Depart Nairobi north through scenic highlands. Arrive Samburu for lunch. Afternoon game drive along Ewaso Nyiro River. Overnight at riverside camp.",
    "Day 2": "Full day Samburu game viewing. Morning and afternoon drives. Spot unique northern species. Optional village visit. All meals at camp.",
    "Day 3": "Morning game drive. Transfer to Meru National Park (3 hours). Afternoon exploring Meru. Overnight at lodge.",
    "Day 4": "Full day Meru game drives. Visit Adamson''s Falls. Track rhinos and elephants. All meals at lodge.",
    "Day 5": "Early morning game drive. Breakfast. Return journey to Nairobi arriving afternoon."
  }'::jsonb,
  false,
  'published'
),
(
  'Ol Pejeta Conservancy & Mount Kenya',
  'ol-pejeta-mount-kenya',
  'Combine wildlife conservation with mountain scenery in this unique 3-day experience. Visit the last northern white rhinos on earth, meet rescued chimpanzees, and enjoy stunning views of Mount Kenya. Ol Pejeta is at the forefront of rhino conservation and offers intimate wildlife encounters with a purpose.',
  'Ol Pejeta Conservancy & Mount Kenya Region',
  '3 Days / 2 Nights',
  720,
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Barabara%20.jpg-XNDBgPKyxpiUgaPbG3KfxM4YMrbqe4.jpeg',
  '["Meet the last northern white rhinos", "Visit Sweetwaters Chimpanzee Sanctuary", "Night game drives", "Mount Kenya views", "Lion tracking experience", "Conservation education", "Support rhino protection efforts"]'::jsonb,
  '["Conservancy fees", "Accommodation at Serena Sweetwaters", "All meals", "Day and night game drives", "Chimp sanctuary visit", "Professional guide", "Transport"]'::jsonb,
  '["Flights", "Travel insurance", "Drinks", "Optional horseback safari", "Tips", "Personal expenses"]'::jsonb,
  '{
    "Day 1": "Morning departure to Ol Pejeta Conservancy (3.5 hours). Check-in at camp. Lunch overlooking waterhole. Visit endangered species enclosure to meet the northern white rhinos. Afternoon game drive. Dinner and overnight.",
    "Day 2": "Early morning game drive with possible lion tracking. Breakfast at camp. Visit Sweetwaters Chimpanzee Sanctuary. Lunch. Afternoon at leisure or optional activities. Night game drive. Overnight at camp.",
    "Day 3": "Final morning game drive. Breakfast. Optional visit to equator. Return to Nairobi arriving early afternoon."
  }'::jsonb,
  false,
  'published'
),
(
  'Tsavo East & West Safari',
  'tsavo-east-west-safari',
  'Explore Kenya''s largest national park system on this 4-day safari through Tsavo East and West. Famous for red elephants, dramatic landscapes, and diverse wildlife, Tsavo offers a raw African wilderness experience. Visit Mzima Springs, climb volcanic hills, and discover one of Africa''s most iconic safari destinations.',
  'Tsavo East & West National Parks, Kenya',
  '4 Days / 3 Nights',
  950,
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Inbound%20%26%20Outbound%20Safaris-iOHIGgF5ep2lTkEqY4cEj5pSGE1eWz.jpg',
  '["Red elephants of Tsavo", "Mzima Springs hippo viewing", "Lugard Falls", "Mudanda Rock", "Shetani lava flows", "Diverse wildlife including lions", "Vast wilderness landscapes"]'::jsonb,
  '["All park fees for both parks", "3 nights accommodation", "All meals", "Game drives", "Visit to Mzima Springs", "Professional driver-guide", "Safari vehicle"]'::jsonb,
  '["International flights", "Travel insurance", "Beverages", "Tips", "Optional activities", "Personal items"]'::jsonb,
  '{
    "Day 1": "Depart Nairobi/Mombasa to Tsavo East. Game drive to camp. Lunch. Afternoon game drive to Aruba Dam. Overnight at lodge.",
    "Day 2": "Morning game drive to Mudanda Rock and Lugard Falls. Transfer to Tsavo West. Afternoon at Mzima Springs. Overnight at lodge.",
    "Day 3": "Full day Tsavo West. Visit Shetani lava flows and caves. Rhino sanctuary. Climbing Poachers Lookout. All meals at lodge.",
    "Day 4": "Early game drive. Breakfast. Final game viewing en route. Return to Nairobi/Mombasa arriving afternoon."
  }'::jsonb,
  false,
  'published'
);
