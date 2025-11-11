import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"

// We'll use a custom SVG for TikTok
const TikTokIcon = () => (
  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.92 1.75 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.07A6.83 6.83 0 0 0 5 20.1a6.83 6.83 0 0 0 11.18-0.36 6.81 6.81 0 0 0 1.02-5.91v-3.03a7.21 7.21 0 0 0 4.6 1.57V11a4.9 4.9 0 0 1-.41-0.04z" />
  </svg>
)

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image src="/logo.png" alt="Eika Africa Experience Logo" width={50} height={50} className="h-16 w-auto" />
              <div>
                <h3 className="text-2xl font-bold text-amber-400">Eika Africa Experience</h3>
                <p className="text-xs text-gray-400">Your Home to Unforgettable African Journeys</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Your trusted gateway to authentic, unforgettable adventures across Africa and beyond. We curate
              experiences that offer more than just travel - we deliver memories that last a lifetime.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=61575977277555"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-amber-400 cursor-pointer transition"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://www.instagram.com/eikaafricaexperience/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-amber-400 cursor-pointer transition"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://www.tiktok.com/@eikaafrica?_r=1&_t=ZM-91FYPnTx7fM"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-amber-400 cursor-pointer transition"
              >
                <TikTokIcon />
              </a>
              <Twitter className="h-6 w-6 text-gray-400 hover:text-amber-400 cursor-pointer transition" />
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-amber-400">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-amber-400">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/experiences" className="text-gray-300 hover:text-amber-400">
                  Experiences
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-amber-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-gray-300 hover:text-amber-400">
                  Book Now
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-amber-400 mr-2" />
                <span className="text-gray-300">Nairobi, Kenya</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-amber-400 mr-2" />
                <span className="text-gray-300">+254116735102</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-amber-400 mr-2" />
                <span className="text-gray-300">inquiries@eikafricaexperience.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Eika Africa Experience. All rights reserved. | Your Home to Unforgettable African Journeys
          </p>
        </div>
      </div>
    </footer>
  )
}
