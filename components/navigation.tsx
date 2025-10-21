"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center gap-2">
              <Image src="/logo.png" alt="Eika Africa Experience Logo" width={50} height={50} className="h-12 w-auto" />
              <span className="text-lg font-bold text-amber-900 hidden sm:inline">Eika Africa Experience</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-amber-900 px-3 py-2 text-sm font-medium">
              Home
            </Link>
            <Link href="/services" className="text-gray-700 hover:text-amber-900 px-3 py-2 text-sm font-medium">
              Services
            </Link>
            <Link href="/experiences" className="text-gray-700 hover:text-amber-900 px-3 py-2 text-sm font-medium">
              Experiences
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-amber-900 px-3 py-2 text-sm font-medium">
              About Us
            </Link>
            <Link href="/booking">
              <Button className="bg-amber-900 hover:bg-amber-800 text-white">Book Now</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link href="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-amber-900">
                Home
              </Link>
              <Link
                href="/services"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-amber-900"
              >
                Services
              </Link>
              <Link
                href="/experiences"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-amber-900"
              >
                Experiences
              </Link>
              <Link href="/about" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-amber-900">
                About Us
              </Link>
              <Link href="/booking" className="block px-3 py-2">
                <Button className="w-full bg-amber-900 hover:bg-amber-800 text-white">Book Now</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
