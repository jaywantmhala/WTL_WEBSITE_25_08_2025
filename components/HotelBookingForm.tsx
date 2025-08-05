"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"

export default function HotelBookingForm() {
  const [roomType, setRoomType] = useState("uptoRooms")
  const [location, setLocation] = useState("Goa")
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [rooms, setRooms] = useState(1)
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [showRoomDropdown, setShowRoomDropdown] = useState(false)
  const [showPriceDropdown, setShowPriceDropdown] = useState(false)
  const [selectedPrice, setSelectedPrice] = useState("₹0-₹1500")

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0]

  const priceRanges = ["₹0-₹1500", "₹1500-₹2500", "₹2500-₹5000", "₹5000+"]

  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
  }

  const handleCheckInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value
    setCheckIn(selectedDate)
    // If check-out date is before new check-in date, update it
    if (checkOut && checkOut < selectedDate) {
      setCheckOut(selectedDate)
    }
  }

  const handleCheckOutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value
    if (!checkIn) {
      // If no check-in date is set, just ensure it's not before today
      if (selectedDate >= today) {
        setCheckOut(selectedDate)
      }
    } else {
      // If check-in date is set, ensure check-out date is not before it
      if (selectedDate >= checkIn) {
        setCheckOut(selectedDate)
      }
    }
  }

  const openDatePicker = (id: string) => {
    const dateInput = document.getElementById(id) as HTMLInputElement
    if (dateInput) {
      try {
        if (typeof dateInput.showPicker === "function") {
          dateInput.showPicker()
        }
      } catch (error) {
        console.log("Date picker not supported in this browser")
      }
    }
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowRoomDropdown(false)
        setShowPriceDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto bg-black/30 backdrop-blur-sm rounded-lg shadow-lg p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="roomType"
              value="uptoRooms"
              checked={roomType === "uptoRooms"}
              onChange={(e) => setRoomType(e.target.value)}
              className="form-radio text-blue-500"
            />
            <span className="ml-2 text-white">Upto 4 Rooms</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="roomType"
              value="groupDeals"
              checked={roomType === "groupDeals"}
              onChange={(e) => setRoomType(e.target.value)}
              className="form-radio text-blue-500"
            />
            <span className="ml-2 flex items-center text-white">
              Group Deals
              <span className="ml-1 px-2 py-0.5 text-xs bg-red-500 text-white rounded">new</span>
            </span>
          </label>
        </div>
        <div className="flex items-center text-white">
          <span>Book Domestic and International Property Online. To list your property</span>
          <a href="#" className="ml-1 text-blue-400 hover:underline">
            Click Here
          </a>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-white mb-1">City, Property Name Or Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter city or property"
              className="w-full p-2 border border-white/20 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/20 text-white placeholder-white/70"
            />
            <div className="text-xs text-white/70 mt-1">India</div>
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-white mb-1">Check-In</label>
            <div className="relative">
              <input
                type="date"
                value={checkIn}
                onChange={handleCheckInChange}
                min={today}
                className="w-full p-2 border border-white/20 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/20 text-white [&::-webkit-calendar-picker-indicator]:opacity-0"
                id="checkInDate"
              />
              <button
                type="button"
                onClick={() => openDatePicker("checkInDate")}
                className="absolute inset-y-0 right-0 flex items-center px-2 text-white hover:bg-white/10 rounded-r"
                aria-label="Open check-in date calendar"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </button>
            </div>
            <div className="text-xs text-white/70 mt-1">Wednesday</div>
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-white mb-1">Check-Out</label>
            <div className="relative">
              <input
                type="date"
                value={checkOut}
                onChange={handleCheckOutChange}
                min={checkIn || today}
                className="w-full p-2 border border-white/20 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/20 text-white [&::-webkit-calendar-picker-indicator]:opacity-0"
                id="checkOutDate"
              />
              <button
                type="button"
                onClick={() => openDatePicker("checkOutDate")}
                className="absolute inset-y-0 right-0 flex items-center px-2 text-white hover:bg-white/10 rounded-r"
                aria-label="Open check-out date calendar"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </button>
            </div>
            <div className="text-xs text-white/70 mt-1">Thursday</div>
          </div>

          <div className="md:col-span-1" ref={dropdownRef}>
            <label className="block text-sm font-medium text-white mb-1">Rooms & Guests</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowRoomDropdown(!showRoomDropdown)
                  setShowPriceDropdown(false)
                }}
                className="w-full p-2 border border-white/20 rounded text-left flex justify-between items-center focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/20 text-white"
              >
                <span>
                  {rooms} Room, {adults} Adults{children > 0 ? `, ${children} Children` : ""}
                </span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showRoomDropdown && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white/20 backdrop-blur-sm rounded-md shadow-lg z-50 border border-white/20">
                  <div className="p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="block text-white">Rooms</label>
                      </div>
                      <div className="relative w-24">
                        <select
                          value={rooms}
                          onChange={(e) => setRooms(Number(e.target.value))}
                          className="block w-full appearance-none bg-white/20 border border-white/20 text-white py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500 [&>option]:bg-white [&>option]:text-gray-900"
                        >
                          {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                            <option key={num} value={num}>
                              {num}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="block text-white">Adults</label>
                      </div>
                      <div className="relative w-24">
                        <select
                          value={adults}
                          onChange={(e) => setAdults(Number(e.target.value))}
                          className="block w-full appearance-none bg-white/20 border border-white/20 text-white py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500 [&>option]:bg-white [&>option]:text-gray-900"
                        >
                          {Array.from({ length: 30 }, (_, i) => i + 1).map((num) => (
                            <option key={num} value={num}>
                              {num}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="block text-white">Children</label>
                        <span className="text-xs text-white/70">0 - 17 Years Old</span>
                      </div>
                      <div className="relative w-24">
                        <select
                          value={children}
                          onChange={(e) => setChildren(Number(e.target.value))}
                          className="block w-full appearance-none bg-white/20 border border-white/20 text-white py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500 [&>option]:bg-white [&>option]:text-gray-900"
                        >
                          {Array.from({ length: 10 }, (_, i) => i).map((num) => (
                            <option key={num} value={num}>
                              {num}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-white/70">
                      Please provide right number of children along with their right age for best options and prices.
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowRoomDropdown(false)}
                      className="w-full bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
                    >
                      APPLY
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="text-xs text-white/70 mt-1">Basic x {rooms} Room</div>
          </div>
        </div>

        <div className="flex items-center text-sm text-white relative">
          <span className="mr-1">Price Per Night</span>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowPriceDropdown(!showPriceDropdown)}
              className="flex items-center space-x-1 p-2 border border-white/20 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/20 text-white"
            >
              <span>{selectedPrice}</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showPriceDropdown && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white/20 backdrop-blur-sm rounded-md shadow-lg z-50 border border-white/20">
                {priceRanges.map((price, index) => (
                  <button
                    key={index}
                    type="button"
                    className="block w-full text-left px-4 py-2 text-white hover:bg-white/30 first:rounded-t-md last:rounded-b-md"
                    onClick={() => {
                      setSelectedPrice(price)
                      setShowPriceDropdown(false)
                    }}
                  >
                    {price}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-12 py-3 rounded-lg text-lg font-medium hover:bg-blue-600 transition-colors"
          >
            SEARCH
          </button>
        </div>
      </form>
    </div>
  )
}

