-- Create tours table
CREATE TABLE IF NOT EXISTS tours (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  duration TEXT NOT NULL,
  group_size TEXT NOT NULL,
  price TEXT NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  overview TEXT NOT NULL,
  highlights TEXT[] NOT NULL,
  rating DECIMAL(3,1) NOT NULL,
  reviews_count INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert tour data
INSERT INTO tours (id, title, location, duration, group_size, price, image_url, category, difficulty, overview, highlights, rating, reviews_count) VALUES
('3-days-masai-mara', '3 Days 2 Nights Masai Mara Safari', 'Masai Mara, Kenya', '3 Days / 2 Nights', 'Private Safari', 'From $850', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Samburu%20Sunset.jpg-PM37vqDjxPTd1NUY1gTkvi9dV7WPfB.jpeg', 'Wildlife Safari', 'Easy', 'Experience Kenya''s most famous game reserve with private safari vehicle and professional guide.', ARRAY['Big Five Viewing', 'Private Safari Vehicle', 'Great Rift Valley', 'Full Day Game Drives'], 4.9, 167),
('3-days-naivasha', '3 Days 2 Nights Naivasha', 'Lake Naivasha, Kenya', '3 Days / 2 Nights', 'Private Safari', 'From $650', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ewaso%20Ng%27iro.jpg-rVDkIPwU1y8OAL03GD7qPrjfhooQds.jpeg', 'Wildlife Safari', 'Easy', 'Perfect escape from city life exploring Lake Naivasha, Oserengoni Sanctuary, and Crescent Island.', ARRAY['Oserengoni Sanctuary', 'Crescent Island', 'Bird Watching', 'Boat Cruise'], 4.9, 87),
('zanzibar-dar-es-salaam', '6 Days 5 Nights Zanzibar & Dar es Salaam', 'Tanzania', '6 Days / 5 Nights', 'Small Groups', 'From $1,450', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/KICC%20Helipad%20Sunset%20Tour.jpg-lbw7nFkulI61T7fn5t0xgdPAl61mY4.jpeg', 'Beach & Culture', 'Easy', 'Discover exotic Zanzibar with Stone Town''s UNESCO heritage, spice tours, pristine beaches.', ARRAY['Stone Town UNESCO Site', 'Spice Tour', 'Beach Relaxation', 'Turtle Swimming'], 4.9, 124),
('ultimate-kenya-safari', '7 Days Ultimate Kenya Safari', 'Multiple Parks, Kenya', '7 Days / 6 Nights', 'Private Safari', 'From $2,200', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Samburu%20Sunset.jpg-PM37vqDjxPTd1NUY1gTkvi9dV7WPfB.jpeg', 'Wildlife Safari', 'Moderate', 'Ultimate Kenya safari visiting Amboseli with Mt. Kilimanjaro views, Lake Nakuru''s flamingos, and Maasai Mara.', ARRAY['Amboseli National Park', 'Lake Nakuru', 'Maasai Mara', 'National Museum'], 4.9, 156),
('adventure-safari', '4 Days Adventure Safari', 'Olpejeta, Nakuru & Amboseli', '4 Days / 3 Nights', 'Private Safari', 'From $1,350', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Samburu%20dance.jpg-IQ223utquaqmnjWMOEsEDzyqCM2Fwg.jpeg', 'Adventure Safari', 'Moderate', 'Action-packed safari visiting Olpejeta Conservancy with night game drives and Maasai cultural experiences.', ARRAY['Olpejeta Chimpanzees', 'Night Game Drive', 'Maasai Village', 'Rhino Tracking'], 4.8, 98),
('nanyuki-adventure', '3 Days 2 Nights Nanyuki Adventure Retreat', 'Nanyuki, Kenya', '3 Days / 2 Nights', 'Small Groups', 'From $750', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Barabara%20.jpg-XNDBgPKyxpiUgaPbG3KfxM4YMrbqe4.jpeg', 'Adventure & Nature', 'Challenging', 'Adventure retreat at the Equator with water rafting, canopy walking, waterfall hiking, and swimming.', ARRAY['Water Rafting', 'Canopy Walk', 'Waterfall Hiking', 'Natural Pools'], 4.8, 73);
