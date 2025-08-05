"use client"

import { useState } from "react"

interface RoomSelections {
  rooms: number;
  adults: number;
  children: number;
}

export default function HolidayBookingForm() {
  const [activeTab, setActiveTab] = useState("search");
  const [showRoomDropdown, setShowRoomDropdown] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [roomSelections, setRoomSelections] = useState<RoomSelections>({
    rooms: 1,
    adults: 2,
    children: 0
  });

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split('T')[0];

  const tabs = [
    { id: "search", icon: "🔍", label: "Search" },
    { id: "salespecial", icon: "🏷️", label: "Salespecial" },
    { id: "honeymoon", icon: "🌙", label: "Honeymoon" },
    { id: "airindia", icon: "✈️", label: "Air India Express Holidays" }
  ];

  const filters = [
    "Adventure",
    "Beach",
    "Hill Station",
    "Wildlife",
    "Heritage",
    "Pilgrimage"
  ];

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Tabs */}
      <div className="flex items-center space-x-6 mb-4 overflow-x-auto py-2 px-4 bg-black/30 backdrop-blur-sm rounded-t-lg shadow-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center p-2 text-white ${
              activeTab === tab.id ? "border-b-2 border-blue-500" : "text-white/80 hover:text-white"
            }`}
          >
            <span className="text-lg mr-2">{tab.icon}</span>
            <span className="whitespace-nowrap font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Form */}
      <form className="bg-black/30 backdrop-blur-sm rounded-b-lg shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* From City */}
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-white mb-1">From City</label>
            <div className="relative">
              <input
                type="text"
                className="w-full p-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/20 text-white"
                defaultValue="New Delhi"
                readOnly
              />
              <div className="text-xl font-bold text-white mt-1">New Delhi</div>
              <div className="text-sm text-white/70 mt-1">India</div>
            </div>
          </div>

          {/* To City/Country/Category */}
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-white mb-1">To City/Country/Category</label>
            <div className="relative">
              <input
                type="text"
                className="w-full p-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/20 text-white"
                defaultValue="Goa"
                readOnly
              />
              <div className="text-xl font-bold text-white mt-1">Goa</div>
            </div>
          </div>

          {/* Departure Date */}
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-white mb-1">
              Departure Date
              <svg className="w-4 h-4 inline-block ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </label>
            <div className="relative">
              <input
                type="date"
                min={today}
                className="w-full p-3 border border-white/20 rounded-lg text-left focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/20 text-white [&::-webkit-calendar-picker-indicator]:brightness-200"
                onChange={(e) => {
                  // Prevent selecting past dates even if browser doesn't support 'min'
                  const selectedDate = new Date(e.target.value);
                  const todayDate = new Date(today);
                  if (selectedDate < todayDate) {
                    e.target.value = today;
                  }
                }}
              />
            </div>
          </div>

          {/* Rooms & Guests */}
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-white mb-1">
              Rooms & Guests
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowRoomDropdown(!showRoomDropdown)}
                className="w-full p-3 border border-white/20 rounded-lg text-left focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/20 text-white"
              >
                <div className="text-lg font-bold flex items-center justify-between">
                  {roomSelections.rooms} Room{roomSelections.rooms > 1 ? 's' : ''}, {roomSelections.adults + roomSelections.children} Guest{roomSelections.adults + roomSelections.children > 1 ? 's' : ''}
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Room Selection Dropdown */}
              {showRoomDropdown && (
                <div className="absolute z-50 mt-2 w-full bg-black/30 backdrop-blur-sm rounded-lg shadow-lg border border-white/20">
                  <div className="p-4">
                    <div className="space-y-4">
                      {/* Rooms */}
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-white">Rooms</div>
                        <div className="flex items-center space-x-3">
                          <button
                            type="button"
                            onClick={() => setRoomSelections(prev => ({
                              ...prev,
                              rooms: Math.max(1, prev.rooms - 1)
                            }))}
                            className="p-1 rounded-full border border-white/20 hover:bg-white/10 bg-white/5"
                          >
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="w-8 text-center text-white">{roomSelections.rooms}</span>
                          <button
                            type="button"
                            onClick={() => setRoomSelections(prev => ({
                              ...prev,
                              rooms: Math.min(5, prev.rooms + 1)
                            }))}
                            className="p-1 rounded-full border border-white/20 hover:bg-white/10 bg-white/5"
                          >
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Adults */}
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-white">Adults</div>
                          <div className="text-sm text-white/70">Age 12+</div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            type="button"
                            onClick={() => setRoomSelections(prev => ({
                              ...prev,
                              adults: Math.max(1, prev.adults - 1)
                            }))}
                            className="p-1 rounded-full border border-white/20 hover:bg-white/10 bg-white/5"
                          >
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="w-8 text-center text-white">{roomSelections.adults}</span>
                          <button
                            type="button"
                            onClick={() => setRoomSelections(prev => ({
                              ...prev,
                              adults: Math.min(10, prev.adults + 1)
                            }))}
                            className="p-1 rounded-full border border-white/20 hover:bg-white/10 bg-white/5"
                          >
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Children */}
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-white">Children</div>
                          <div className="text-sm text-white/70">Age 0-11</div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            type="button"
                            onClick={() => setRoomSelections(prev => ({
                              ...prev,
                              children: Math.max(0, prev.children - 1)
                            }))}
                            className="p-1 rounded-full border border-white/20 hover:bg-white/10 bg-white/5"
                          >
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="w-8 text-center text-white">{roomSelections.children}</span>
                          <button
                            type="button"
                            onClick={() => setRoomSelections(prev => ({
                              ...prev,
                              children: Math.min(6, prev.children + 1)
                            }))}
                            className="p-1 rounded-full border border-white/20 hover:bg-white/10 bg-white/5"
                          >
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Apply Button */}
                      <button
                        type="button"
                        onClick={() => setShowRoomDropdown(false)}
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

          {/* Filters */}
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-white mb-1">
              Filters
              <svg className="w-4 h-4 inline-block ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="w-full p-3 border border-white/20 rounded-lg text-left focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/20 text-white"
              >
                <div className="text-lg font-bold flex items-center justify-between">
                  Select Filters (Optional)
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Filter Dropdown */}
              {showFilterDropdown && (
                <div className="absolute z-50 mt-2 w-full bg-black/30 backdrop-blur-sm rounded-lg shadow-lg border border-white/20">
                  <div className="p-4">
                    <div className="space-y-2">
                      {filters.map((filter) => (
                        <label key={filter} className="flex items-center space-x-2 text-white cursor-pointer">
                          <input
                            type="checkbox"
                            className="form-checkbox text-blue-500 rounded border-white/20 bg-white/5"
                          />
                          <span>{filter}</span>
                        </label>
                      ))}
                      <button
                        type="button"
                        onClick={() => setShowFilterDropdown(false)}
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors mt-4"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search Button */}
        <div className="flex justify-center mt-6 relative">
          <button
            type="submit"
            className="bg-blue-500 text-white px-20 py-3 rounded-full text-lg font-medium hover:bg-blue-600 transition-colors"
          >
            SEARCH
          </button>
        </div>
      </form>
    </div>
  );
} 