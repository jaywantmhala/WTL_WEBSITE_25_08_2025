"use client"

import { useState } from "react"

interface GuestSelections {
  adults: number;
  children: number;
}

export default function HomestaysBookingForm() {
  const [guestSelections, setGuestSelections] = useState<GuestSelections>({
    adults: 1,
    children: 0
  });
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);

  const priceRanges = [
    "₹0-₹1500",
    "₹1500-₹2500",
    "₹2500-₹5000",
    "₹5000-₹10000",
    "₹10000+"
  ];

  return (
    <form className="w-full max-w-6xl mx-auto bg-black/30 backdrop-blur-sm rounded-lg shadow-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* City/Property Input */}
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-white mb-1">City, Property Name Or Location</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter city or property"
              className="w-full p-3 pl-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/20 text-white placeholder-white/70"
              defaultValue="Delhi"
            />
            <div className="text-xl font-bold text-white mt-1">Delhi</div>
            <div className="text-sm text-white/70 mt-1">India</div>
          </div>
        </div>

        {/* Check-In Date */}
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-white mb-1">Check-In</label>
          <div className="relative">
            <input
              type="date"
              className="w-full p-3 pl-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/20 text-white"
            />
          </div>
        </div>

        {/* Check-Out Date */}
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-white mb-1">Check-Out</label>
          <div className="relative">
            <input
              type="date"
              className="w-full p-3 pl-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/20 text-white"
            />
          </div>
        </div>

        {/* Guests */}
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-white mb-1">Guests</label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowGuestDropdown(!showGuestDropdown)}
              className="w-full p-3 pl-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/20 text-white text-left"
            >
              <div className="text-lg font-bold">
                {guestSelections.adults + guestSelections.children} Guest{guestSelections.adults + guestSelections.children !== 1 ? 's' : ''}
              </div>
            </button>

            {/* Guests Dropdown */}
            {showGuestDropdown && (
              <div className="absolute z-50 mt-2 w-full bg-white rounded-lg shadow-lg">
                <div className="p-4">
                  <div className="space-y-4">
                    {/* Adults */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Adults</div>
                        <div className="text-sm text-gray-500">Age 13+</div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          type="button"
                          onClick={() => setGuestSelections(prev => ({
                            ...prev,
                            adults: Math.max(1, prev.adults - 1)
                          }))}
                          className="p-1 rounded-full border hover:bg-gray-100"
                        >
                          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        <span className="w-8 text-center">{guestSelections.adults}</span>
                        <button
                          type="button"
                          onClick={() => setGuestSelections(prev => ({
                            ...prev,
                            adults: Math.min(10, prev.adults + 1)
                          }))}
                          className="p-1 rounded-full border hover:bg-gray-100"
                        >
                          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Children */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Children</div>
                        <div className="text-sm text-gray-500">Age 0-12</div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          type="button"
                          onClick={() => setGuestSelections(prev => ({
                            ...prev,
                            children: Math.max(0, prev.children - 1)
                          }))}
                          className="p-1 rounded-full border hover:bg-gray-100"
                        >
                          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        <span className="w-8 text-center">{guestSelections.children}</span>
                        <button
                          type="button"
                          onClick={() => setGuestSelections(prev => ({
                            ...prev,
                            children: Math.min(6, prev.children + 1)
                          }))}
                          className="p-1 rounded-full border hover:bg-gray-100"
                        >
                          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Apply Button */}
                    <button
                      type="button"
                      onClick={() => setShowGuestDropdown(false)}
                      className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Price Range */}
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-white mb-1">Price Per Night</label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowPriceDropdown(!showPriceDropdown)}
              className="w-full p-3 pl-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/20 text-white text-left"
            >
              <div className="text-lg font-bold">Select Price Range</div>
            </button>

            {/* Price Range Dropdown */}
            {showPriceDropdown && (
              <div className="absolute z-50 mt-2 w-full bg-white rounded-lg shadow-lg">
                <div className="p-4">
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <button
                        key={range}
                        type="button"
                        onClick={() => {
                          // Handle price range selection
                          setShowPriceDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search Button */}
      <div className="flex justify-center mt-6">
        <button
          type="submit"
          className="bg-blue-500 text-white px-12 py-3 rounded-lg text-lg font-medium hover:bg-blue-600 transition-colors"
        >
          SEARCH
        </button>
      </div>
    </form>
  )
} 