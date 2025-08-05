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

<Head>
<title>Corporate Cab Services in Surat | Reliable Employee Transport</title>
    <meta name="description" content="WTL Tourism Pvt. Ltd. offers trusted corporate cab services in Surat. Ensure safe, on-time, and hassle-free employee transportation with our professional cab solutions."/>
    <link rel="canonical" href="https://www.worldtriplink.com/corporate/Corporate-Cab-Services-Surat"/>
    <meta name="author" content="WTL Tourism"/>
    <meta name="keywords" content="corporate cab services in Surat, employee transportation services in Surat"/>
    <meta name="robots" content="index, follow"/>
</Head>

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
export default function SuratCorporateCabServicePage() {
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
  const personalCabsCounter = useCounter(30);
  const registeredCabsCounter = useCounter(500);
  const citiesCounter = useCounter(100);
  const officesCounter = useCounter(50);

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
              src="/images/surat.jpg"
              alt="Surat Corporate Cab Service"
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
                  Corporate Cab Services in Surat
                </h1>
                <p className="text-xl text-white/90 max-w-3xl mx-auto">
                  Professional Corporate Employee Transport Solutions
                </p>
                <p className="text-lg text-white/80 max-w-3xl mx-auto mt-4">
                  Reliable & Affordable Corporate Cab Services in Surat by WTL Tourism Pvt. Ltd.
                </p>
              </div>
              
              {renderBookingForm()}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="bg-gray-50 w-full">
          {/* Introduction Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 w-full mx-auto bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="w-full max-w-7xl mx-auto">
              <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-100">
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 relative inline-block">
                    Looking for Cab In Surat?
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                  </h2>
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 md:p-8 shadow-lg">
                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                      Surat Cab Booking at Affordable fare. We WTL Providing Quality Services for Cab Booking for OutStation, OneWay, Airport Cab and Round Trip From Surat and Other Cities. Book your next Cab with WTL and get discount on total fare to Surat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Our Corporate Cab Service in Surat?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-blue-600 mb-4">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Fair Pricing</h3>
                  <p className="text-gray-600">Clear and competitive rates with no hidden costs.</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-green-600 mb-4">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Multiple Vehicle Options</h3>
                  <p className="text-gray-600">Choose from sedans, SUVs, tempo travelers, and luxury cabs.</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-purple-600 mb-4">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Punctual & Reliable</h3>
                  <p className="text-gray-600">Guaranteed on-time pickups and drop-offs.</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-yellow-600 mb-4">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Experienced Chauffeurs</h3>
                  <p className="text-gray-600">Trained, verified, and professional drivers.</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-red-600 mb-4">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Availability</h3>
                  <p className="text-gray-600">Flexible bookings for corporate employees.</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-indigo-600 mb-4">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Safety & Hygiene</h3>
                  <p className="text-gray-600">Well-maintained and sanitized vehicles.</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-pink-600 mb-4">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Custom Corporate Plans</h3>
                  <p className="text-gray-600">Tailored cab solutions based on company requirements.</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-teal-600 mb-4">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Dedicated Support</h3>
                  <p className="text-gray-600">24/7 customer assistance for corporate clients.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Statistics Section */}
          <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                  <div className="text-blue-600 mb-4">
                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2" ref={personalCabsCounter.elementRef}>
                    {personalCabsCounter.count}+
                  </h3>
                  <p className="text-gray-600">Personal Cabs</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                  <div className="text-purple-600 mb-4">
                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2" ref={registeredCabsCounter.elementRef}>
                    {registeredCabsCounter.count}+
                  </h3>
                  <p className="text-gray-600">Registered Cabs</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                  <div className="text-green-600 mb-4">
                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2" ref={citiesCounter.elementRef}>
                    {citiesCounter.count}+
                  </h3>
                  <p className="text-gray-600">Cities Covered</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                  <div className="text-yellow-600 mb-4">
                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2" ref={officesCounter.elementRef}>
                    {officesCounter.count}+
                  </h3>
                  <p className="text-gray-600">Corporate Offices</p>
                </div>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Corporate Cabs in Surat: Affordable & Convenient Travel Solutions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <div className="text-blue-600 mb-4">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Convenient Travel for Business Executives</h3>
                  <p className="text-gray-600">
                    Our corporate cabs in Surat are the perfect solution for busy executives and employees who need a reliable, safe, and comfortable mode of transportation. Whether for airport transfers, client meetings, or corporate events, our vehicles ensure that your staff and guests travel in style.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <div className="text-purple-600 mb-4">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Efficient Group Travel</h3>
                  <p className="text-gray-600">
                    For group travel, we offer larger vehicles such as MPVs and SUVs that can accommodate multiple passengers. Whether you're organizing a corporate outing or transporting employees to a business conference, we have the right vehicle to meet your needs.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <div className="text-green-600 mb-4">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Tailored Solutions for Companies</h3>
                  <p className="text-gray-600">
                    We offer corporate cab/taxi services that can be customized to suit your company's requirements. Whether it's daily pick-ups, scheduled trips, or last-minute bookings, we provide flexible solutions to ensure your employees and clients travel without any hassle.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Table Section */}
          <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Route-wise Pricing & Vehicle Options</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-xl shadow-lg">
                  <thead>
                    <tr className="bg-blue-600 text-white">
                      <th className="py-4 px-6 text-left">Route</th>
                      <th className="py-4 px-6 text-left">Distance (km)</th>
                      <th className="py-4 px-6 text-left">Vehicle Type</th>
                      <th className="py-4 px-6 text-left">Price (INR)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-4 px-6">Pune to Surat</td>
                      <td className="py-4 px-6">270 km</td>
                      <td className="py-4 px-6">Sedan (Standard)</td>
                      <td className="py-4 px-6">₹6,500</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 px-6">Pune to Surat</td>
                      <td className="py-4 px-6">270 km</td>
                      <td className="py-4 px-6">Sedan (Luxury)</td>
                      <td className="py-4 px-6">₹9,000</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 px-6">Pune to Surat</td>
                      <td className="py-4 px-6">270 km</td>
                      <td className="py-4 px-6">SUV (Luxury)</td>
                      <td className="py-4 px-6">₹11,500</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 px-6">Surat to Pune</td>
                      <td className="py-4 px-6">270 km</td>
                      <td className="py-4 px-6">Sedan (Standard)</td>
                      <td className="py-4 px-6">₹6,500</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 px-6">Surat to Pune</td>
                      <td className="py-4 px-6">270 km</td>
                      <td className="py-4 px-6">Sedan (Luxury)</td>
                      <td className="py-4 px-6">₹9,000</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 px-6">Surat to Pune</td>
                      <td className="py-4 px-6">270 km</td>
                      <td className="py-4 px-6">SUV (Luxury)</td>
                      <td className="py-4 px-6">₹11,500</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 px-6">Local Car Booking in Surat</td>
                      <td className="py-4 px-6">10-20 km</td>
                      <td className="py-4 px-6">Sedan (Standard)</td>
                      <td className="py-4 px-6">₹1,000-1,500</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 px-6">Local Car Booking in Surat</td>
                      <td className="py-4 px-6">10-20 km</td>
                      <td className="py-4 px-6">SUV (Luxury)</td>
                      <td className="py-4 px-6">₹2,000-2,500</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6">Local Car Booking in Surat</td>
                      <td className="py-4 px-6">20-50 km</td>
                      <td className="py-4 px-6">MPV (Group Travel)</td>
                      <td className="py-4 px-6">₹3,000-4,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* About Us Section */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{ 
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zM22.344 0L13.858 8.485 15.272 9.9l7.9-7.9h-.828zm5.656 0L19.515 8.485 17.343 10.657 28 0h-2.83zM32.656 0L26.172 6.485 24 8.657 34.657 0h-2zM38.315 0L29.828 8.485 27.657 10.657 38.315 0zm5.657 0l-5.657 5.657L36.485 7.828 42.142 0h2.83zM53.657 0l3.657 3.657L43.828 17.143l-1.414-1.414L53.657 0zM17.143 42.414l3.657 3.657-.828.828-3.657-3.657.828-.828zM0 22.344l3.657 3.657L0 29.657V22.344zM54.627 60l.83-.828-1.415-1.415L51.8 60h2.827zM5.373 60l-.83-.828L5.96 57.757 8.2 60H5.374zM48.97 60l3.657-3.657-1.414-1.414L46.143 60h2.828zM11.03 60L7.372 56.343 8.787 54.93 13.857 60H11.03zm32.284 0L49.8 53.515l-1.415-1.414-7.9 7.9h2.83zM16.686 60L10.2 53.515l1.415-1.414 7.9 7.9h-2.83zm5.657 0L13.857 51.515l1.415-1.414 7.9 7.9h-.828zM28 60l-8.485-8.485L17.343 49.343 28 60zm4.657 0l-6.485-6.485L24 51.343 34.657 60h-2zm5.657 0l-8.485-8.485L27.657 49.343 38.315 60zm5.657 0l-5.657-5.657 1.414-1.415 5.657 5.657h-1.414zM53.657 60l3.657-3.657L43.828 42.857l-1.414 1.414L53.657 60zM17.143 17.586l3.657-3.657-.828-.828-3.657 3.657.828.828zM0 37.656l3.657-3.657L0 30.343v7.313z\' fill=\'%23000\' fill-opacity=\'1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
                backgroundSize: '24px 24px'
              }}></div>
            </div>

            <div className="relative">
              <h2 className="text-4xl font-bold text-gray-900 text-center mb-12 relative inline-block">
                About Us – WTL Tourism Pvt. Ltd. (World Trip Link)
                <div className="absolute bottom--4 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              </h2>
              <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 transform hover:scale-[1.02] transition-all duration-300">
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Worldtriplink (WTL) was established in 2016 in Pune, and since then, we have been committed to providing top-tier transportation services across India. We specialize in outstation cabs, employee transportation services, daily pick-up & drop services, and hotel & flight bookings.
                  </p>
                  <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                    With over 30 personal cabs and a network of 500+ registered cabs, we have built a reputation for reliability and customer satisfaction. We proudly operate across 100+ cities, serving more than 50 corporate offices. Our professional drivers, diverse fleet of vehicles, and commitment to punctuality make us the ideal choice for your corporate travel needs.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 w-full mx-auto bg-white">
            <div className="w-full max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 relative inline-block">
                  Frequently Asked Questions (FAQs)
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                </h2>
                <p className="text-xl text-gray-600">
                  Find answers to common questions about our corporate cab services in Surat
                </p>
              </div>
              <div className="space-y-6">
                <FaqItem
                  question="How do I book corporate cabs in Surat?"
                  answer="You can easily book a corporate cab in Surat through our online platform, where you can choose the type of vehicle and schedule your trip. Alternatively, you can contact our customer support for assistance."
                />
                <FaqItem
                  question="Are there any discounts available for corporate cab bookings?"
                  answer="Yes! We offer competitive pricing, and special discounts are available for bulk bookings or long-term corporate accounts. Contact us to inquire about the best offers."
                />
                <FaqItem
                  question="What types of vehicles are available for corporate cab bookings?"
                  answer="We offer a range of vehicles including sedans, SUVs, MPVs, and larger vehicles for group travel, ensuring that we have the right option for every corporate need."
                />
                <FaqItem
                  question="What is included in the corporate cab service?"
                  answer="Our corporate cab services include punctual pick-up and drop-off, well-maintained vehicles, experienced drivers, and 24/7 customer support. We ensure a smooth travel experience for all business trips."
                />
                <FaqItem
                  question="What are the corporate cab/taxi services available in Surat for group travel?"
                  answer="We offer SUVs and MPVs for group travel, providing ample space and comfort for multiple passengers. These vehicles are ideal for corporate events, group meetings, or team-building trips."
                />
                <FaqItem
                  question="How much does car booking in Surat cost?"
                  answer="The cost of car booking in Surat depends on the vehicle type and distance traveled. Our car booking in Surat rates start from INR 1,000 for short trips and can go up to INR 4,000 for longer distances or group travel."
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
                <a href="tel:+919112085055" className="group">
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">📞</div>
                    <h3 className="text-2xl font-semibold mb-2">Phone</h3>
                    <p className="text-lg text-white/90">+91 9112085055</p>
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
            serviceName="Corporate Cab Services in Surat"
            serviceSlug="Corporate-Cab-Services-Surat"
          />
          <InquiryForm
            isOpen={isInquiryFormOpen}
            onClose={handleInquiryClose}
            serviceName="Corporate Cab Services in Surat"
            serviceSlug="Corporate-Cab-Services-Surat"
          />
        </main>
      </div>
    );
  } catch (error) {
    setHasError(true);
    return null;
  }
}
