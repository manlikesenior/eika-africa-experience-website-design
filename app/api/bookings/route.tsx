import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { Resend } from "resend"
import { type NextRequest, NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { tourId, fullName, email, phone, numberOfGuests, startDate, specialRequests } = body

    // Validate required fields
    if (!tourId || !fullName || !email || !startDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create Supabase client
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
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
      },
    )

    // Insert booking into database
    const { data: booking, error: dbError } = await supabase
      .from("bookings")
      .insert([
        {
          tour_id: tourId,
          full_name: fullName,
          email,
          phone: phone || null,
          number_of_guests: numberOfGuests,
          start_date: startDate,
          special_requests: specialRequests || null,
          status: "pending",
        },
      ])
      .select()
      .single()

    if (dbError) {
      console.error("[v0] Database error:", dbError)
      return NextResponse.json({ error: "Failed to save booking" }, { status: 500 })
    }

    // Send confirmation email to user
    const userEmailResult = await resend.emails.send({
      from: "Eika Africa <noreply@eikaafrica.com>",
      to: email,
      subject: "Booking Confirmation - Eika Africa Experience",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7C2D12;">Booking Confirmation</h2>
          <p>Dear ${fullName},</p>
          <p>Thank you for booking with Eika Africa Experience! We're excited to help you plan your unforgettable safari adventure.</p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #7C2D12; margin-top: 0;">Booking Details</h3>
            <p><strong>Booking Reference:</strong> ${booking.id}</p>
            <p><strong>Number of Guests:</strong> ${numberOfGuests}</p>
            <p><strong>Preferred Start Date:</strong> ${startDate}</p>
            <p><strong>Status:</strong> Pending Confirmation</p>
          </div>

          <p>Our team will review your booking and contact you within 24 hours to confirm availability and discuss payment options.</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #666; font-size: 12px;">
              If you have any questions, please contact us at:<br>
              Email: inquiries@eikaafrica.com<br>
              Phone: +254 116 735 102
            </p>
          </div>
        </div>
      `,
    })

    if (userEmailResult.error) {
      console.error("[v0] User email error:", userEmailResult.error)
    }

    // Send notification email to admin
    const adminEmailResult = await resend.emails.send({
      from: "Eika Africa <noreply@eikaafrica.com>",
      to: "info@eikaafrica.com",
      subject: `New Booking Request - ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7C2D12;">New Booking Request</h2>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #7C2D12; margin-top: 0;">Customer Information</h3>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
            <p><strong>Booking Reference:</strong> ${booking.id}</p>
          </div>

          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #7C2D12; margin-top: 0;">Tour Details</h3>
            <p><strong>Tour ID:</strong> ${tourId}</p>
            <p><strong>Number of Guests:</strong> ${numberOfGuests}</p>
            <p><strong>Preferred Start Date:</strong> ${startDate}</p>
            <p><strong>Special Requests:</strong> ${specialRequests || "None"}</p>
          </div>

          <p style="color: #666; font-size: 12px;">
            Please review this booking and contact the customer to confirm availability and discuss payment.
          </p>
        </div>
      `,
    })

    if (adminEmailResult.error) {
      console.error("[v0] Admin email error:", adminEmailResult.error)
    }

    return NextResponse.json(
      {
        success: true,
        message: "Booking submitted successfully",
        bookingId: booking.id,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] Booking error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
