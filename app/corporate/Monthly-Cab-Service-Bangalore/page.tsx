"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";
import CabBookingForm from "@/components/CabBookingForm";
import BusBookingForm from "@/components/BusBookingForm";
import HotelBookingForm from "@/components/HotelBookingForm";
import FlightBookingForm from "@/components/FlightBookingForm";
import HomestaysBookingForm from "@/components/HomestaysBookingForm";
import HolidayBookingForm from "@/components/HolidayBookingForm";
import FloatingIcons from "@/components/FloatingIcons";
import InquiryPopup from "@/components/InquiryPopup";
import InquiryForm from "@/components/InquiryForm";
import Head from "next/head";

{/* <Head>
<title>Monthly Cab Service in Bangalore | Corporate Cab Services</title>
    <meta name="description" content="WTL Tourism Pvt. Ltd. offers reliable monthly cab service in Bangalore. Get hassle-free corporate cab services for employees with safety and affordability."/>
    <link rel="canonical" href="https://www.worldtriplink.com/corporate/Monthly-Cab-Service-Bangalore"/>
    <meta name="author" content="WTL Tourism"/>
    <meta name="keywords" content="corporate cab services in bangalore, commercial cabs service in bangalore corporate, corporate employee cab services in bangalore, safe corporate cabs in bangalore, what is the average cab price for corporate in bangalore, monthly cab service in bangalore, employee transportation services in bangalore, daily cab services in bangalore, corporate transport service"/>
    <meta name="robots" content="index, follow"/>
</Head> */}

// Counter hook for animated numbers
const useCounter = (target: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const startTime = Date.now();
            const animate = () => {
              const currentTime = Date.now();
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              setCount(Math.floor(target * progress));
              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setCount(target);
              }
            };
            animate();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target, duration]);

  return { count, elementRef };
};

// FAQ Item Component
function FaqItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <button
        className="w-full text-left p-4 focus:outline-none flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-gray-900">{question}</h3>
        <svg
          className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4 pt-0 border-t border-gray-200">
          <p className="text-gray-600">{answer}</p>
        </div>
      </div>
    </div>
  );
}

// Main Page Component
export default function BangaloreMonthlyCabServicePage() {
  const [hasError, setHasError] = useState(false);
  const [activeTab, setActiveTab] = useState('cabs');
  const [isInquiryFormOpen, setIsInquiryFormOpen] = useState(false);

  // Handler for opening inquiry form
  const handleInquiryClick = () => {
    setIsInquiryFormOpen(true);
  };

  // Handler for closing inquiry form
  const handleInquiryClose = () => {
    setIsInquiryFormOpen(false);
  };

  // Initialize counters at component level
  const personalCabsCounter = useCounter(500);
  const registeredCabsCounter = useCounter(1000);
  const citiesCounter = useCounter(24);
  const officesCounter = useCounter(98);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const renderBookingForm = () => {
    switch (activeTab) {
      case 'cabs':
        return <CabBookingForm />;
      case 'buses':
        return <BusBookingForm />;
      case 'flights':
        return <FlightBookingForm />;
      case 'hotels':
        return <HotelBookingForm />;
      case 'homestays':
        return <HomestaysBookingForm />;
      case 'holiday':
        return <HolidayBookingForm />;
      default:
        return <CabBookingForm />;
    }
  };

  if (hasError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 max-w-lg w-full">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                There was an error loading this page. Please try again later.
              </p>
            </div>
          </div>
        </div>
        <Link href="/" className="text-blue-500 hover:underline">
          Return to Home
        </Link>
      </div>
    );
  }

  try {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar onTabChange={handleTabChange} disableForm={true} />
        
        {/* Hero Section with Background */}
        <div className="relative h-[550px] w-full">
          <div className="absolute inset-0">
            <Image
              src="/images/banglore.jpg"
              alt="Bangalore Corporate Cab Service"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>

          <div className="relative z-10 h-full">
            <div className="pt-16 pb-8 px-4 sm:px-6 lg:px-8 w-full mx-auto h-full flex flex-col justify-center">
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Corporate Cab Services in Bangalore
                </h1>
                <p className="text-xl text-white/90 max-w-3xl mx-auto">
                  Professional Corporate Employee Transport Solutions
                </p>
                <p className="text-lg text-white/80 max-w-3xl mx-auto mt-4">
                  Reliable & Affordable Corporate Cab Services in Bangalore by WTL Tourism Pvt. Ltd.
                </p>
              </div>
              
              {renderBookingForm()}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="bg-gray-50 w-full">
          {/* Available Cabs Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 w-full mx-auto bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="w-full max-w-7xl mx-auto">
              <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-100">
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 relative inline-block">
                    Looking for Cab In Bangalore?
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                  </h2>
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 md:p-8 shadow-lg">
                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                      Bangalore Cab Booking at Affordable fare. We WTL Providing Quality Services for Cab Booking for OutStation, OneWay, Airport Cab and Round Trip from Bangalore and Other Cities. Book your next Cab with WTL and get discount on total fare to Bangalore.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white transform hover:scale-105 transition-transform duration-300 shadow-lg">
                    <div className="text-2xl mb-3">🚗</div>
                    <h3 className="font-semibold mb-2">OutStation</h3>
                    <p className="text-sm opacity-90">Long distance travel</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white transform hover:scale-105 transition-transform duration-300 shadow-lg">
                    <div className="text-2xl mb-3">🔄</div>
                    <h3 className="font-semibold mb-2">OneWay</h3>
                    <p className="text-sm opacity-90">Single direction trips</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white transform hover:scale-105 transition-transform duration-300 shadow-lg">
                    <div className="text-2xl mb-3">✈️</div>
                    <h3 className="font-semibold mb-2">Airport Cab</h3>
                    <p className="text-sm opacity-90">Airport transfers</p>
                  </div>
                  <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-6 text-white transform hover:scale-105 transition-transform duration-300 shadow-lg">
                    <div className="text-2xl mb-3">🎯</div>
                    <h3 className="font-semibold mb-2">Round Trip</h3>
                    <p className="text-sm opacity-90">Return journey included</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 w-full mx-auto bg-gray-50">
            <div className="w-full max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                Why Choose Our Corporate Cab Services in Bangalore?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="group bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-xl">✔</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">Fair Pricing</h3>
                  <p className="text-gray-600">Clear and upfront rates with no hidden costs.</p>
                </div>
                <div className="group bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-full w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-xl">✔</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">Multiple Vehicle Options</h3>
                  <p className="text-gray-600">Choose from sedans, SUVs, tempo travelers, and luxury cabs.</p>
                </div>
                <div className="group bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-full w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-xl">✔</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">Punctual & Reliable</h3>
                  <p className="text-gray-600">Guaranteed on-time pickups and drop-offs.</p>
                </div>
                <div className="group bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                  <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-full w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-xl">✔</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">Experienced Chauffeurs</h3>
                  <p className="text-gray-600">Verified and professionally trained drivers.</p>
                </div>
                <div className="group bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                  <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-full w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-xl">✔</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">24/7 Availability</h3>
                  <p className="text-gray-600">Round-the-clock bookings for corporate employees.</p>
                </div>
                <div className="group bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                  <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-xl">✔</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">Safety & Hygiene</h3>
                  <p className="text-gray-600">Well-maintained and sanitized vehicles.</p>
                </div>
                <div className="group bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                  <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-full w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-xl">✔</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">Custom Corporate Plans</h3>
                  <p className="text-gray-600">Tailored cab solutions based on business requirements.</p>
                </div>
                <div className="group bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                  <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-full w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-xl">✔</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors">Dedicated Support</h3>
                  <p className="text-gray-600">24/7 customer assistance for corporate clients.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Monthly Cab Service Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 w-full mx-auto bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="w-full max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 relative inline-block">
                  Monthly Cab Service in Bangalore
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                </h2>
                <p className="text-xl text-gray-600">
                  For companies looking for cost-effective long-term transport solutions, we offer a monthly cab service in Bangalore tailored to corporate needs.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="group bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-xl">✔</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">Fixed Routes</h3>
                  <p className="text-gray-600">Fixed routes and schedules for consistent service.</p>
                </div>
                <div className="group bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-full w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-xl">✔</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">Personalized Solutions</h3>
                  <p className="text-gray-600">Personalized transport solutions for employees.</p>
                </div>
                <div className="group bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-full w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-xl">✔</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">Affordable Plans</h3>
                  <p className="text-gray-600">Affordable monthly subscriptions.</p>
                </div>
                <div className="group bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                  <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-full w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-xl">✔</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">Well-maintained Fleet</h3>
                  <p className="text-gray-600">Well-maintained fleet with reliable drivers.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Corporate Employee Cab Services Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 w-full mx-auto bg-gray-50">
            <div className="w-full max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 relative inline-block">
                  Corporate Employee Cab Services in Bangalore
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                </h2>
                <p className="text-xl text-gray-600">
                  Our corporate employee cab services in Bangalore are designed to enhance employee convenience and productivity.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="group bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-xl">✔</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">Hassle-free Commutes</h3>
                  <p className="text-gray-600">Hassle-free daily commutes with planned routes.</p>
                </div>
                <div className="group bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-full w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-xl">✔</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">Affordable Packages</h3>
                  <p className="text-gray-600">Affordable corporate cab packages.</p>
                </div>
                <div className="group bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-full w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-xl">✔</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">Safe Vehicles</h3>
                  <p className="text-gray-600">Safe, GPS-tracked vehicles.</p>
                </div>
                <div className="group bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                  <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-full w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-xl">✔</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">Customizable Locations</h3>
                  <p className="text-gray-600">Customizable pick-up and drop locations.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Daily Cab Services Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 w-full mx-auto bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="w-full max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 relative inline-block">
                  Daily Cab Services in Bangalore
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                </h2>
                <p className="text-xl text-gray-600">
                  For companies requiring daily cab services in Bangalore, we offer comprehensive solutions.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="group bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-xl">✔</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">Exclusive Options</h3>
                  <p className="text-gray-600">Exclusive or shared cab options.</p>
                </div>
                <div className="group bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-full w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-xl">✔</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">Door-to-Door Service</h3>
                  <p className="text-gray-600">Door-to-door pickup and drop facilities.</p>
                </div>
                <div className="group bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-full w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-xl">✔</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">Comfortable Vehicles</h3>
                  <p className="text-gray-600">Comfortable AC vehicles with professional drivers.</p>
                </div>
                <div className="group bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                  <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-full w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-xl">✔</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">Flexible Plans</h3>
                  <p className="text-gray-600">Flexible corporate travel plans for daily commutes.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 w-full mx-auto bg-gray-50">
            <div className="w-full max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 relative inline-block">
                  Corporate Transport Service – Route-wise Pricing & Cab Options
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                </h2>
                <p className="text-xl text-gray-600">
                  Transparent and competitive pricing for all your corporate transportation needs
                </p>
              </div>
              <div className="overflow-x-auto rounded-lg shadow-lg">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                      <th className="py-4 px-6 text-left">Route</th>
                      <th className="py-4 px-6 text-left">Distance (KM)</th>
                      <th className="py-4 px-6 text-left">Hatchback</th>
                      <th className="py-4 px-6 text-left">Sedan</th>
                      <th className="py-4 px-6 text-left">SUV</th>
                      <th className="py-4 px-6 text-left">Tempo Traveler</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-gray-50 transition-colors duration-150">
                      <td className="py-4 px-6">Bangalore to Electronic City</td>
                      <td className="py-4 px-6">20 km</td>
                      <td className="py-4 px-6">₹450</td>
                      <td className="py-4 px-6">₹600</td>
                      <td className="py-4 px-6">₹900</td>
                      <td className="py-4 px-6">₹1500</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50 transition-colors duration-150">
                      <td className="py-4 px-6">Bangalore to Whitefield</td>
                      <td className="py-4 px-6">15 km</td>
                      <td className="py-4 px-6">₹400</td>
                      <td className="py-4 px-6">₹550</td>
                      <td className="py-4 px-6">₹850</td>
                      <td className="py-4 px-6">₹1400</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50 transition-colors duration-150">
                      <td className="py-4 px-6">Bangalore to Manyata Tech Park</td>
                      <td className="py-4 px-6">18 km</td>
                      <td className="py-4 px-6">₹430</td>
                      <td className="py-4 px-6">₹580</td>
                      <td className="py-4 px-6">₹880</td>
                      <td className="py-4 px-6">₹1450</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50 transition-colors duration-150">
                      <td className="py-4 px-6">Bangalore to Marathahalli</td>
                      <td className="py-4 px-6">12 km</td>
                      <td className="py-4 px-6">₹350</td>
                      <td className="py-4 px-6">₹500</td>
                      <td className="py-4 px-6">₹800</td>
                      <td className="py-4 px-6">₹1350</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50 transition-colors duration-150">
                      <td className="py-4 px-6">Bangalore to Koramangala</td>
                      <td className="py-4 px-6">10 km</td>
                      <td className="py-4 px-6">₹300</td>
                      <td className="py-4 px-6">₹450</td>
                      <td className="py-4 px-6">₹750</td>
                      <td className="py-4 px-6">₹1250</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50 transition-colors duration-150">
                      <td className="py-4 px-6">Bangalore to Yelahanka</td>
                      <td className="py-4 px-6">22 km</td>
                      <td className="py-4 px-6">₹500</td>
                      <td className="py-4 px-6">₹650</td>
                      <td className="py-4 px-6">₹950</td>
                      <td className="py-4 px-6">₹1550</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50 transition-colors duration-150">
                      <td className="py-4 px-6">Bangalore to Devanahalli</td>
                      <td className="py-4 px-6">30 km</td>
                      <td className="py-4 px-6">₹650</td>
                      <td className="py-4 px-6">₹800</td>
                      <td className="py-4 px-6">₹1100</td>
                      <td className="py-4 px-6">₹1800</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="py-4 px-6">Bangalore to Hebbal</td>
                      <td className="py-4 px-6">35 km</td>
                      <td className="py-4 px-6">₹700</td>
                      <td className="py-4 px-6">₹850</td>
                      <td className="py-4 px-6">₹1200</td>
                      <td className="py-4 px-6">₹1900</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* About Us Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 w-full mx-auto bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="w-full max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 relative inline-block">
                  About Us
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                </h2>
                <p className="text-xl text-gray-600">
                  Your trusted partner in corporate transportation
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <p className="text-gray-600 leading-relaxed">
                    We are a leading corporate cab service provider in Bangalore, offering reliable and comfortable transportation solutions for businesses of all sizes. With years of experience in the industry, we understand the unique needs of corporate clients and provide customized solutions to meet their requirements.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Our fleet consists of well-maintained vehicles with professional drivers who are trained to provide excellent service. We prioritize safety, punctuality, and comfort in all our services.
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-2xl font-bold text-blue-600 mb-2">
                        <span ref={personalCabsCounter.elementRef}>{personalCabsCounter.count}</span>+
                      </h3>
                      <p className="text-gray-600">Corporate Clients</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-2xl font-bold text-purple-600 mb-2">
                        <span ref={registeredCabsCounter.elementRef}>{registeredCabsCounter.count}</span>+
                      </h3>
                      <p className="text-gray-600">Vehicles</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-2xl font-bold text-green-600 mb-2">
                        <span ref={citiesCounter.elementRef}>{citiesCounter.count}</span>/7
                      </h3>
                      <p className="text-gray-600">Support</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-2xl font-bold text-amber-600 mb-2">
                        <span ref={officesCounter.elementRef}>{officesCounter.count}</span>%
                      </h3>
                      <p className="text-gray-600">Satisfaction</p>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-xl">
                    <img
                      src="/images/banglore.jpg"
                      alt="Corporate Cab Service Bangalore"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 w-full mx-auto bg-gray-50">
            <div className="w-full max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 relative inline-block">
                  Frequently Asked Questions
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                </h2>
                <p className="text-xl text-gray-600">
                  Find answers to common questions about our corporate cab services
                </p>
              </div>
              <div className="space-y-6">
                <FaqItem
                  question="What are the benefits of using corporate cab services in Bangalore?"
                  answer="Our services offer safe, timely, and cost-effective employee transportation, reducing commute stress and improving productivity."
                />
                <FaqItem
                  question="How can I book a monthly cab service in Bangalore?"
                  answer="You can book through our website, call us, or send a WhatsApp message for instant bookings."
                />
                <FaqItem
                  question="Do you provide daily cab services in Bangalore for employees?"
                  answer="Yes, we offer daily cab services for corporate employees with flexible weekly and monthly plans."
                />
                <FaqItem
                  question="What is the average cab price for corporate transport in Bangalore?"
                  answer="Prices vary based on route, distance, and vehicle type. Check our pricing table above for details."
                />
                <FaqItem
                  question="Are your corporate cabs equipped with real-time tracking?"
                  answer="Yes, all our corporate cabs have GPS tracking for enhanced safety and efficiency."
                />
                <FaqItem
                  question="Can we book a customized corporate cab service?"
                  answer="Absolutely! We offer fully customized cab services to suit your company's needs."
                />
                <FaqItem
                  question="Do you provide employee transportation services for large teams?"
                  answer="Yes, we offer shuttle services and bulk bookings for large corporate teams."
                />
                <FaqItem
                  question="What safety measures are in place for corporate cabs?"
                  answer="Our vehicles are sanitized regularly, and all drivers are verified and trained for passenger safety."
                />
                <FaqItem
                  question="Can companies set up a long-term corporate cab contract?"
                  answer="Yes, we provide monthly and annual contracts tailored to corporate transportation needs."
                />
                <FaqItem
                  question="What are the cancellation policies for corporate cab bookings?"
                  answer="We offer flexible cancellation policies with prior notice. Reach out to our support team for further details."
                />
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="py-20 w-full bg-gradient-to-br from-blue-600 to-purple-700 text-white relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{ 
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                backgroundSize: '30px 30px'
              }}></div>
            </div>
            
            {/* Animated circles */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-64 h-64 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h2>
                <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                  Get in touch with us for your corporate transportation needs
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <a href="tel:+919130030053" className="group">
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">📞</div>
                    <h3 className="text-2xl font-semibold mb-2">Phone</h3>
                    <p className="text-lg text-white/90">+91 9130030053</p>
                    <div className="mt-4 text-sm text-white/70 group-hover:text-white transition-colors duration-300">
                      Click to call us directly
                    </div>
                  </div>
                </a>
                
                <a href="mailto:contact@worldtriplink.com" className="group">
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">📧</div>
                    <h3 className="text-2xl font-semibold mb-2">Email</h3>
                    <p className="text-lg text-white/90">contact@worldtriplink.com</p>
                    <div className="mt-4 text-sm text-white/70 group-hover:text-white transition-colors duration-300">
                      Click to send us an email
                    </div>
                  </div>
                </a>
                
                <div className="group">
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">📍</div>
                    <h3 className="text-2xl font-semibold mb-2">Address</h3>
                    <p className="text-lg text-white/90">Kharadi, Pune</p>
                    <div className="mt-4 text-sm text-white/70 group-hover:text-white transition-colors duration-300">
                      Visit our office
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-16 text-center">
                {/* Responsive Button Container */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center max-w-md mx-auto">
                  <a
                    href="/"
                    className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-blue-600 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-blue-50 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 min-w-[140px]"
                  >
                    Book Now
                  </a>
                  <button
                    onClick={handleInquiryClick}
                    className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-blue-600 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-blue-50 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer min-w-[140px]"
                  >
                    Enquiry Now
                  </button>
                </div>
              </div>
            </div>
          </section>
        <Footer />
        <FloatingIcons />
        <InquiryPopup
          serviceName="Monthly Cab Service in Bangalore"
          serviceSlug="Monthly-Cab-Service-Bangalore"
        />
        <InquiryForm
          isOpen={isInquiryFormOpen}
          onClose={handleInquiryClose}
          serviceName="Monthly Cab Service in Bangalore"
          serviceSlug="Monthly-Cab-Service-Bangalore"
        />
        </main>
      </div>
    );
  } catch (error) {
    console.error("Error rendering BangaloreMonthlyCabServicePage:", error);
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 max-w-lg w-full">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                There was an error loading this page. Please try again later.
              </p>
            </div>
          </div>
        </div>
        <Link href="/" className="text-blue-500 hover:underline">
          Return to Home
        </Link>
      </div>
    );
  }
}
