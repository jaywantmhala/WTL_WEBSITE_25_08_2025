"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm text-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-teal-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-bus"
              >
                <path d="M8 6v6" />
                <path d="M16 6v6" />
                <path d="M2 12h20" />
                <path d="M18 18h2a2 2 0 0 0 2-2v-6a8 8 0 0 0-16 0v6a2 2 0 0 0 2 2h2" />
                <path d="M9 19h6" />
                <path d="M9 21h6" />
                <path d="M5 18v3" />
                <path d="M19 18v3" />
              </svg>
            </span>
            <span className="font-bold text-lg">World Trip Link</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/my-trip" className="hover:text-teal-400 transition-colors">
              MyTrip
            </Link>
            <Link href="/login" className="hover:text-teal-400 transition-colors">
              Login
            </Link>
            <Link href="/about" className="hover:text-teal-400 transition-colors">
              About
            </Link>
            <Link href="/service" className="hover:text-teal-400 transition-colors">
              Service
            </Link>
            <Link href="/contact" className="hover:text-teal-400 transition-colors">
              Contact
            </Link>
          </nav>

          <Button className="bg-teal-500 hover:bg-teal-600">Sign Up</Button>
        </div>
      </div>
    </header>
  )
}

