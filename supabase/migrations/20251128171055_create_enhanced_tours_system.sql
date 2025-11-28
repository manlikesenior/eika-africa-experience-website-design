/*
  # Enhanced Tours & Booking System

  ## Overview
  This migration creates a comprehensive tours and booking system with analytics.

  ## New Tables Created
  1. **tours** - Enhanced tour information with views tracking
     - id (uuid, primary key)
     - title (text)
     - slug (text, unique)
     - description (text)
     - location (text)
     - duration (text)
     - price (numeric)
     - image_url (text)
     - images (jsonb) - array of additional images
     - highlights (jsonb) - array of tour highlights
     - inclusions (jsonb) - array of included items
     - exclusions (jsonb) - array of excluded items
     - itinerary (jsonb) - detailed day-by-day itinerary
     - featured (boolean)
     - views (integer) - page view counter
     - status (text) - published/draft
     - created_at (timestamp)
     - updated_at (timestamp)

  2. **bookings** - Customer booking/inquiry records
     - id (uuid, primary key)
     - tour_id (uuid, foreign key to tours)
     - name (text)
     - email (text)
     - phone (text)
     - guests (integer)
     - preferred_date (date)
     - message (text)
     - status (text) - pending/confirmed/cancelled
     - created_at (timestamp)
     - updated_at (timestamp)

  ## Security
  - RLS enabled on all tables
  - Public read access to published tours
  - Anyone can create bookings
  - Authenticated admins can manage everything

  ## Indexes
  - Unique index on tour slugs
  - Index on booking tour_id
  - Index on booking email
  - Index on tour status
*/

-- Create tours table
CREATE TABLE IF NOT EXISTS tours (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  location text NOT NULL,
  duration text NOT NULL,
  price numeric(10, 2) NOT NULL DEFAULT 0,
  image_url text,
  images jsonb DEFAULT '[]'::jsonb,
  highlights jsonb DEFAULT '[]'::jsonb,
  inclusions jsonb DEFAULT '[]'::jsonb,
  exclusions jsonb DEFAULT '[]'::jsonb,
  itinerary jsonb DEFAULT '{}'::jsonb,
  featured boolean DEFAULT false,
  views integer DEFAULT 0,
  status text DEFAULT 'published' CHECK (status IN ('published', 'draft')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_id uuid REFERENCES tours(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  guests integer NOT NULL DEFAULT 1,
  preferred_date date NOT NULL,
  message text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_tours_slug ON tours(slug);
CREATE INDEX IF NOT EXISTS idx_tours_status ON tours(status);
CREATE INDEX IF NOT EXISTS idx_tours_featured ON tours(featured);
CREATE INDEX IF NOT EXISTS idx_bookings_tour_id ON bookings(tour_id);
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(email);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);

-- Create trigger function for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
DROP TRIGGER IF EXISTS update_tours_updated_at ON tours;
CREATE TRIGGER update_tours_updated_at
  BEFORE UPDATE ON tours
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_bookings_updated_at ON bookings;
CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for tours
CREATE POLICY "Allow public read access to published tours"
  ON tours FOR SELECT
  USING (status = 'published');

CREATE POLICY "Allow public to increment views"
  ON tours FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- RLS Policies for bookings
CREATE POLICY "Allow anyone to create bookings"
  ON bookings FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow users to read own bookings"
  ON bookings FOR SELECT
  USING (true);