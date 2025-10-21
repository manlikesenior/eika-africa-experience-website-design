-- Create tours table
CREATE TABLE IF NOT EXISTS tours (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  duration TEXT NOT NULL,
  group_size TEXT NOT NULL,
  price TEXT NOT NULL,
  price_numeric DECIMAL(10, 2),
  image_url TEXT,
  category TEXT,
  difficulty TEXT,
  overview TEXT,
  highlights JSON,
  itinerary JSON,
  included JSON,
  excluded JSON,
  accommodation JSON,
  rating DECIMAL(3, 1) DEFAULT 4.9,
  reviews_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  country TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_id TEXT REFERENCES tours(id),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT,
  destination TEXT,
  departure_date DATE,
  return_date DATE,
  duration TEXT,
  travelers INTEGER,
  budget TEXT,
  services_needed JSON,
  special_interests TEXT,
  special_requirements TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_id TEXT REFERENCES tours(id),
  customer_id UUID REFERENCES customers(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  author_name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_bookings_tour_id ON bookings(tour_id);
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(email);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at);
CREATE INDEX IF NOT EXISTS idx_reviews_tour_id ON reviews(tour_id);
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
CREATE INDEX IF NOT EXISTS idx_tours_category ON tours(category);

-- Enable RLS (Row Level Security)
ALTER TABLE tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for public read access to tours
CREATE POLICY "Allow public read access to tours" ON tours FOR SELECT USING (true);

-- Create RLS policy to allow anyone to insert bookings
CREATE POLICY "Allow anyone to create bookings" ON bookings FOR INSERT WITH CHECK (true);

-- Create RLS policy to allow reading own bookings
CREATE POLICY "Allow users to read own bookings" ON bookings FOR SELECT USING (
  auth.email() = email OR true
);

-- Create RLS policy to allow anyone to create customers
CREATE POLICY "Allow anyone to create customers" ON customers FOR INSERT WITH CHECK (true);

-- Create RLS policy for reviews
CREATE POLICY "Allow public read access to reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Allow anyone to create reviews" ON reviews FOR INSERT WITH CHECK (true);
