"use client"

import { useState } from "react"

interface TravellerSelections {
  adults: number;
  children: number;
  infants: number;
  travelClass: string;
}

export default function FlightBookingForm() {
  const [travellerSelections, setTravellerSelections] = useState<TravellerSelections>({
    adults: 1,
    children: 0,
    infants: 0,
    travelClass: 'Economy/Premium Economy'
  });

  return (
    <form className="w-full max-w-6xl mx-auto bg-black/30 backdrop-blur-sm rounded-lg shadow-lg p-6">
      <div className="space-y-6">
        {/* Trip Type Selection */}
        <div className="flex space-x-6">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="tripType"
              value="one-way"
              defaultChecked
              className="form-radio text-blue-500 focus:ring-blue-500"
            />
            <span className="text-white">One Way</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="tripType"
              value="round-trip"
              className="form-radio text-blue-500 focus:ring-blue-500"
            />
            <span className="text-white">Round Trip</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="tripType"
              value="multi-city"
              className="form-radio text-blue-500 focus:ring-blue-500"
            />
            <span className="text-white">Multi City</span>
          </label>
          <span className="ml-auto text-sm text-white">Book International and Domestic Flights</span>
        </div>

        {/* Main Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* From Field */}
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-white mb-1">From</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter city or airport"
                className="w-full p-3 pl-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/20 text-white placeholder-white/70"
                defaultValue="Delhi"
              />
              <div className="text-sm text-white/70 mt-1">DEL, Delhi Airport India</div>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex items-center justify-center">
            <button type="button" className="p-2 rounded-full bg-white/20 hover:bg-white/30">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </button>
          </div>

          {/* To Field */}
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-white mb-1">To</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter city or airport"
                className="w-full p-3 pl-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/20 text-white placeholder-white/70"
                defaultValue="Mumbai"
              />
              <div className="text-sm text-white/70 mt-1">BOM, Chhatrapati Shivaji International</div>
            </div>
          </div>

          {/* Departure Field */}
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-white mb-1">Departure</label>
            <div className="relative">
              <input
                type="text"
                className="w-full p-3 pl-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/20 text-white"
                defaultValue="26 Mar'25"
                readOnly
              />
              <div className="text-sm text-white/70 mt-1">Wednesday</div>
            </div>
          </div>

          {/* Travellers & Class Field */}
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-white mb-1">Travellers & Class</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  const dropdown = document.getElementById('travellersDropdown');
                  const button = document.activeElement;
                  if (dropdown) {
                    const isHidden = dropdown.classList.toggle('hidden');
                    if (button instanceof HTMLElement) {
                      if (!isHidden) {
                        button.classList.add('ring-2', 'ring-blue-500', 'bg-white/30');
                      } else {
                        button.classList.remove('ring-2', 'ring-blue-500', 'bg-white/30');
                      }
                    }
                  }
                }}
                className="w-full p-3 pl-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/20 text-white text-left transition-all"
              >
                <div>{travellerSelections.adults + travellerSelections.children + travellerSelections.infants} Traveller{(travellerSelections.adults + travellerSelections.children + travellerSelections.infants) !== 1 ? 's' : ''}</div>
                <div className="text-sm text-white/70 mt-1">{travellerSelections.travelClass}</div>
              </button>

              {/* Travellers Dropdown */}
              <div id="travellersDropdown" className="hidden absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-xl z-[100] w-[320px] max-h-[450px] overflow-y-auto">
                <div className="p-4 space-y-4">
                  {/* Adults Section */}
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-medium text-gray-900">ADULTS (12y+)</div>
                        <div className="text-sm text-gray-500">on the day of travel</div>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {[1,2,3,4,5,6,7,8,9,'>9'].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setTravellerSelections({
                            ...travellerSelections,
                            adults: typeof num === 'string' ? 9 : num
                          })}
                          className={`w-8 h-8 flex items-center justify-center rounded border ${num === travellerSelections.adults || (num === '>9' && travellerSelections.adults > 9) ? 'bg-blue-500 text-white border-blue-500' : 'border-gray-300 text-gray-700 hover:border-blue-500'}`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Children Section */}
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-medium text-gray-900">CHILDREN (2y-12y)</div>
                        <div className="text-sm text-gray-500">on the day of travel</div>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {[0,1,2,3,4,5,6,'>6'].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setTravellerSelections({
                            ...travellerSelections,
                            children: typeof num === 'string' ? 6 : num
                          })}
                          className={`w-8 h-8 flex items-center justify-center rounded border ${num === travellerSelections.children || (num === '>6' && travellerSelections.children > 6) ? 'bg-blue-500 text-white border-blue-500' : 'border-gray-300 text-gray-700 hover:border-blue-500'}`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Infants Section */}
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-medium text-gray-900">INFANTS (below 2y)</div>
                        <div className="text-sm text-gray-500">on the day of travel</div>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {[0,1,2,3,4,5,6,'>6'].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setTravellerSelections({
                            ...travellerSelections,
                            infants: typeof num === 'string' ? 6 : num
                          })}
                          className={`w-8 h-8 flex items-center justify-center rounded border ${num === travellerSelections.infants || (num === '>6' && travellerSelections.infants > 6) ? 'bg-blue-500 text-white border-blue-500' : 'border-gray-300 text-gray-700 hover:border-blue-500'}`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Travel Class Selection */}
                  <div>
                    <div className="font-medium text-gray-900 mb-3">CHOOSE TRAVEL CLASS</div>
                    <div className="space-y-2">
                      {[
                        'Economy/Premium Economy',
                        'Premium Economy',
                        'Business',
                        'First Class'
                      ].map((className) => (
                        <button
                          key={className}
                          type="button"
                          onClick={() => setTravellerSelections({
                            ...travellerSelections,
                            travelClass: className
                          })}
                          className={`w-full px-3 py-2 text-left rounded border ${className === travellerSelections.travelClass ? 'bg-blue-500 text-white border-blue-500' : 'border-gray-300 text-gray-700 hover:border-blue-500'}`}
                        >
                          {className}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Apply Button */}
                  <div className="flex justify-end pt-2 border-t">
                    <button
                      type="button"
                      className="bg-blue-500 text-white px-6 py-2 rounded font-medium hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
                      onClick={() => {
                        const dropdown = document.getElementById('travellersDropdown');
                        if (dropdown) {
                          dropdown.classList.add('hidden');
                          const button = dropdown.parentElement?.querySelector('button:first-of-type');
                          if (button) {
                            button.classList.remove('ring-2', 'ring-blue-500', 'bg-white/30');
                          }
                        }
                      }}
                    >
                      APPLY
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Special Fare Selection */}
        <div className="space-y-4">
          <div className="flex items-center">
            <span className="text-sm font-medium text-white mr-2">Select a special fare</span>
            <span className="px-2 py-1 text-xs font-semibold bg-green-500 text-white rounded">EXTRA SAVINGS</span>
          </div>
          <div className="flex flex-wrap gap-4">
            <label className="flex-1 min-w-[150px] p-3 border border-white/20 rounded-lg cursor-pointer bg-white/20 hover:bg-white/30">
              <div className="flex items-start space-x-3">
                <input 
                  type="radio" 
                  name="fare" 
                  value="regular" 
                  defaultChecked 
                  className="mt-1.5 form-radio text-blue-500 focus:ring-blue-500 border-white/50" 
                />
                <div>
                  <div className="text-white font-medium">Regular</div>
                  <div className="text-sm text-white/70">Regular fares</div>
                </div>
              </div>
            </label>
            <label className="flex-1 min-w-[150px] p-3 border border-white/20 rounded-lg cursor-pointer bg-white/20 hover:bg-white/30">
              <div className="flex items-start space-x-3">
                <input 
                  type="radio" 
                  name="fare" 
                  value="student" 
                  className="mt-1.5 form-radio text-blue-500 focus:ring-blue-500 border-white/50" 
                />
                <div>
                  <div className="text-white font-medium">Student</div>
                  <div className="text-sm text-white/70">Extra discounts/baggage</div>
                </div>
              </div>
            </label>
            <label className="flex-1 min-w-[150px] p-3 border border-white/20 rounded-lg cursor-pointer bg-white/20 hover:bg-white/30">
              <div className="flex items-start space-x-3">
                <input 
                  type="radio" 
                  name="fare" 
                  value="senior" 
                  className="mt-1.5 form-radio text-blue-500 focus:ring-blue-500 border-white/50" 
                />
                <div>
                  <div className="text-white font-medium">Senior Citizen</div>
                  <div className="text-sm text-white/70">Up to ₹ 600 off</div>
                </div>
              </div>
            </label>
            <label className="flex-1 min-w-[150px] p-3 border border-white/20 rounded-lg cursor-pointer bg-white/20 hover:bg-white/30">
              <div className="flex items-start space-x-3">
                <input 
                  type="radio" 
                  name="fare" 
                  value="armed" 
                  className="mt-1.5 form-radio text-blue-500 focus:ring-blue-500 border-white/50" 
                />
                <div>
                  <div className="text-white font-medium">Armed Forces</div>
                  <div className="text-sm text-white/70">Up to ₹ 600 off</div>
                </div>
              </div>
            </label>
            <label className="flex-1 min-w-[150px] p-3 border border-white/20 rounded-lg cursor-pointer bg-white/20 hover:bg-white/30">
              <div className="flex items-start space-x-3">
                <input 
                  type="radio" 
                  name="fare" 
                  value="medical" 
                  className="mt-1.5 form-radio text-blue-500 focus:ring-blue-500 border-white/50" 
                />
                <div>
                  <div className="text-white font-medium">Doctor and Nurses</div>
                  <div className="text-sm text-white/70">Up to ₹ 600 off</div>
                </div>
              </div>
            </label>
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
      </div>
    </form>
  )
} 