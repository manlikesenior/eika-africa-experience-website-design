# Tours & Booking System Documentation

## Overview

A complete tours and booking management system has been created with the following features:

- **Tours Archive Page** (`/tours`) - Grid view of all published tours
- **Single Tour Page** (`/tours/[slug]`) - Detailed tour information with booking form
- **View Tracking** - Automatic page view counter for each tour
- **Booking System** - Complete inquiry/booking form with database storage
- **Responsive Design** - Mobile-friendly with preserved hero and "Why Choose Eika Africa" sections

## Database Schema

### Tours Table
- `id` - UUID primary key
- `slug` - Unique URL-friendly identifier
- `title`, `description`, `location`, `duration`
- `price` - Numeric price per person
- `image_url` - Main tour image
- `highlights`, `inclusions`, `exclusions` - JSONB arrays
- `itinerary` - JSONB object with day-by-day details
- `featured` - Boolean for featured tours
- `views` - Integer view counter
- `status` - published/draft
- Timestamps: `created_at`, `updated_at`

### Bookings Table
- `id` - UUID primary key
- `tour_id` - Reference to tours table
- `name`, `email`, `phone`
- `guests` - Number of travelers
- `preferred_date` - Preferred start date
- `message` - Special requests
- `status` - pending/confirmed/cancelled
- Timestamps: `created_at`, `updated_at`

## Pages Created

### `/tours` - Tours Archive
- Grid layout with 3 columns (responsive)
- Featured tour badges
- View counts displayed
- Quick tour info (location, duration)
- Preview of highlights
- Price and "View Details" CTA
- Preserved hero section and "Why Choose Eika Africa"

### `/tours/[slug]` - Single Tour Page
- Hero with image gallery
- Quick facts (duration, group size, location, availability)
- Tabbed interface:
  - Overview with highlights
  - Detailed itinerary
  - Inclusions/Exclusions comparison
- Sticky booking form sidebar
- Contact information card
- "Why Book With Us" benefits
- Related tours suggestions

## Components

### `TourBookingForm`
- React Hook Form with Zod validation
- Fields: name, email, phone, guests, date, message
- Success/error states
- Integration with server actions
- Responsive design

### `ViewCounter`
- Client component that tracks page views
- 3-second delay before incrementing
- Automatic cleanup

## Server Actions

Located in `app/actions/enhanced-tours.ts`:

- `fetchAllTours()` - Get all published tours
- `fetchTourBySlug(slug)` - Get single tour by slug
- `getFeaturedTours(limit)` - Get featured tours
- `incrementTourViews(tourId)` - Track page views
- `createBooking(data)` - Save booking inquiry

## Sample Data

6 sample tours have been seeded:
1. 3 Days Masai Mara Safari Adventure (Featured)
2. Lake Naivasha & Hells Gate Adventure (Featured)
3. 7 Days Ultimate Kenya Safari (Featured)
4. Samburu & Meru National Parks Explorer
5. Ol Pejeta Conservancy & Mount Kenya
6. Tsavo East & West Safari

## Security (RLS)

- Public can read published tours
- Public can increment views (controlled update)
- Anyone can create bookings
- Anyone can read bookings (for checking status)

## Usage

### Viewing Tours
```
Navigate to: https://yoursite.com/tours
```

### Viewing Single Tour
```
Navigate to: https://yoursite.com/tours/3-days-masai-mara-adventure
```

### Creating a Booking
Use the booking form on any tour page. Data is saved to the `bookings` table.

## Future Enhancements

Consider adding:
- Admin dashboard for tour management
- Tour filtering/search functionality
- Image galleries with lightbox
- Customer reviews and ratings
- Email notifications (configure RESEND_API_KEY)
- Payment integration
- Multi-currency support
- Tour availability calendar
- Dynamic pricing based on season

## Technical Notes

- Uses Next.js 14 App Router
- Server Components for data fetching
- Client Components for interactive forms
- Supabase for database
- TailwindCSS for styling
- Shadcn/UI components
- Responsive design with mobile-first approach

## Environment Variables Required

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
RESEND_API_KEY=your_resend_key (optional for emails)
```
