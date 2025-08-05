"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";

// Define interfaces for TypeScript type safety
const driverrate=300;
interface CarData {
  name: string;
  image: string;
  price: number;
  features: string[];
  category: string;
  pickupLocation: string;
  dropLocation: string;
  date: string;
  returnDate: string;
  time: string;
  tripType: string;
  distance: string;
  days: number;
  packageName: string;
  estimatedTravelTime: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
}

interface FormErrors {
  phone: string;
}

interface PricingData {
  driverrate: number;
  gst: number;
  service: number;
  total: number;
  isCalculated: boolean;
}

// Ensure the Razorpay script is loaded in your root layout or document file.
declare global {
  interface Window {
    Razorpay: any;
  }
}

function InvoiceContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Car data loaded via URL parameters
  const [carData, setCarData] = useState<CarData>({
    name: "",
    image: "",
    price: 0,
    features: [],
    category: "",
    pickupLocation: "",
    dropLocation: "",
    date: "",
    returnDate: "",
    time: "",
    tripType: "oneWay",
    distance: "0",
    days: 0,
    packageName: "",
    estimatedTravelTime: "",
  });

  // Booking form state
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
  });

  // Field error state for form validations (phone field)
  const [formErrors, setFormErrors] = useState<FormErrors>({ phone: "" });

  // Pricing state coming from the pricing API (invoice1 endpoint)
  const [pricing, setPricing] = useState<PricingData>({
    driverrate: 0,
    gst: 0,
    service: 0,
    total: 0,
    isCalculated: false,
  });

  // State for payment selection
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [paymentType, setPaymentType] = useState(""); // 'full' or 'partial'
  const [partialAmount, setPartialAmount] = useState(0);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // Razorpay public key from environment variables
  const razorpayKeyId = "rzp_test_ZzKJz2egIV36gC";

  // Parse URL parameters on component mount
  useEffect(() => {
    const name = searchParams.get("name") || "";
    const image = searchParams.get("image") || "/images/sedan-premium.jpg";
    const price = Number(searchParams.get("price")) || 0;
    const features = searchParams.get("features")?.split(",") || [];
    const category = searchParams.get("category") || "";
    const pickupLocation = searchParams.get("pickupLocation") || "";
    const dropLocation = searchParams.get("dropLocation") || "";
    const date = searchParams.get("date") || "";
    const returnDate = searchParams.get("Returndate") || "";
    const time = searchParams.get("time") || "";
    const tripType = searchParams.get("tripType") || "oneWay";
    const distance = searchParams.get("distance") || "0";
    const days = Number(searchParams.get("days")) || 0;
    const packageName = searchParams.get("packageName") || "";
    const estimatedTravelTime = searchParams.get("estimatedTravelTime") || "";

    const calculatedTotal =
      price + Math.round(price * 0.1) + Math.round(price * 0.05);

    setCarData({
      name,
      image,
      price,
      features,
      category,
      pickupLocation,
      dropLocation,
      date,
      returnDate,
      time,
      tripType,
      distance,
      days,
      packageName,
      estimatedTravelTime,
    });
    
    setPricing((prev) => ({
      ...prev,
      total: calculatedTotal,
    }));
    
    setPartialAmount(Math.round(calculatedTotal * 0.25));

    // Prefill form fields if user is logged in
    if (typeof window !== "undefined") {
      const userStr = Cookies.get("user");
      if (userStr) {
        try {
          const userObj = JSON.parse(userStr);
          setFormData((prev) => ({
            name: userObj.username || userObj.name || prev.name || "",
            email: userObj.email || prev.email || "",
            phone: userObj.phone || userObj.mobileNo || prev.phone || "",
          }));
        } catch (err) {
          console.log("Failed to parse user from cookie", err);
        }
      }
    }
  }, [searchParams]);

  const userId = Cookies.get("userId");

  // Phone number validation: exactly 10 digits required
  const validatePhone = (value: string) => {
    if (!value) {
      return "Phone number is required";
    }
    if (!/^\d{10}$/.test(value)) {
      return "Phone number must be exactly 10 digits";
    }
    return "";
  };

  // Update phone value and validate on change
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const digitsOnly = value.replace(/\D/g, "");
    setFormData({ ...formData, phone: digitsOnly });
    setFormErrors({ ...formErrors, phone: validatePhone(digitsOnly) });
  };
  
  // Handles booking submission for cash payments
  const handleCashBooking = async () => {
    setIsSubmitting(true);
    
    // Build URL-encoded booking data to submit
    const formDataToSubmit = new URLSearchParams({
        cabId: carData.name,
        modelName: carData.name,
        modelType: carData.category,
        seats: carData.category === "SUV" || carData.category === "muv" ? "6+1" : "4+1",
        fuelType: "CNG-Diesel",
        availability: "Available",
        price: carData.price.toString(), // Base price
        pickupLocation: carData.pickupLocation,
        dropLocation: carData.dropLocation,
        date: carData.date,
        returndate:
            carData.tripType === "roundTrip" || carData.tripType === "round-trip"
                ? carData.returnDate || ""
                : "",
        time: carData.time,
        tripType: carData.tripType,
        distance: carData.distance,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: Math.round(carData.price * 0.1).toString(),
        gst: Math.round(carData.price * 0.05).toString(),
        total: pricing.total.toString(),
        days: carData.days.toString(),
        driverrate: "0",
        userId: userId?.toString() || "",
        packageName: carData.packageName,
        paymentMethod: "cash",
        paymentType: "full", // Cash is always considered a full payment for booking
        paymentStatus: "pending",
        amountPaid: "0",
        remainingAmount: pricing.total.toString(),
        // Note: Razorpay details are not sent for cash payments
        razorpayOrderId: "",
        razorpayPaymentId: "",
    });

    try {
        const response = await fetch(
            "https://api.worldtriplink.com/api/bookingConfirm",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formDataToSubmit,
            }
        );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error response:", errorText);
        throw new Error("Server responded with an error");
      }

      const data = await response.json();
      console.log("Booking response:", data);

      if (data.status === "success") {
        setBookingId(data.bookingId);
        setBookingSuccess(true);
        setShowSuccessPopup(true);

        // Hide success popup after 3 seconds and redirect
        setTimeout(() => {
          setShowSuccessPopup(false);
          router.push("/");
        }, 3000);
      } else {
        throw new Error(data.error || "Booking failed");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("Failed to complete booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);  

  // Main handler for all payment types
  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    // Validate form fields
    const phoneError = validatePhone(formData.phone);
    setFormErrors({ ...formErrors, phone: phoneError });

    if (!formData.name || !formData.email || phoneError || !selectedPaymentMethod) {
      alert("Please fill in all required fields and select a payment option.");
      return;
    }

    if (selectedPaymentMethod !== "Cash" && !paymentType) {
      alert("Please select a payment type (Full or Partial).");
      return;
    }

    setIsSubmitting(true);

    // Handle cash payments separately
    if (selectedPaymentMethod === "Cash") {
      await handleCashBooking();
      return;
    }

    // Razorpay flow for online payments
    if (!razorpayKeyId) {
      alert("Razorpay key is not configured.");
      setIsSubmitting(false);
      return;
    }
    
    // Determine the amount to be paid
    const amountToPay = paymentType === "partial" ? partialAmount : pricing.total;

    try {
      // Step 1: Create a Razorpay Order on your backend
      

      const orderResponse = await axios.post("https://api.worldtriplink.com/api/payments/create-razorpay-order", {
        amount: amountToPay,
      });

      
      const { orderId, keyId } = orderResponse.data;

    if (!keyId || !orderId) {
      console.error("Razorpay not configured properly. Please try again later.");
      return;
    }

     
      console.log("keyId:", keyId);
console.log("orderId:", orderId);


      
      // Step 2: Configure Razorpay options and open the popup with modern UI
      const options = {
        key: keyId,
        amount: amountToPay * 100,
        currency: "INR",
        name: "WTL Tourism Private Limited",
        description: `Premium ${carData.category} Booking - ${carData.name}`,
        order_id: orderId,
        image: "/images/wtl.jpg", // WTL logo
        theme: {
          color: "#4F46E5",
          hide_topbar: false,
          backdrop_color: "rgba(0, 0, 0, 0.95)",
          components: {
            header: {
              backgroundColor: "#1E293B",
              borderRadius: "16px 16px 0 0",
              padding: "20px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.2)",
              background: "linear-gradient(45deg, #1E293B, #2D3748)",
              backgroundImage: `url(${carData.image || "/images/luxury-car.jpg"})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundBlendMode: "overlay",
              height: "180px",
              position: "relative"
            },
            form: {
              textColor: "#1F2937",
              fontSize: "16px",
              inputBackgroundColor: "#F8FAFC",
              inputBorderColor: "#E2E8F0",
              inputBorderRadius: "12px",
              inputHeight: "48px",
              padding: "24px",
              background: "#FFFFFF",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
              containerStyle: {
                borderRadius: "0 0 16px 16px",
                padding: "24px",
                background: "linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%)"
              }
            },
            button: {
              backgroundColor: "#3B82F6",
              textColor: "#ffffff",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: "600",
              height: "48px",
              boxShadow: "0 4px 6px -1px rgba(59, 130, 246, 0.3)",
              transform: "translateY(0)",
              transition: "all 0.2s ease",
              hover: {
                backgroundColor: "#2563EB",
                transform: "translateY(-1px)",
                boxShadow: "0 6px 8px -1px rgba(59, 130, 246, 0.4)"
              }
            },
            spinner: {
              color: "#4F46E5"
            },
            paymentMethods: {
              padding: "20px",
              borderRadius: "12px",
              backgroundColor: "#F8FAFC",
              marginBottom: "16px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
              border: "1px solid #E2E8F0",
              hover: {
                backgroundColor: "#F1F5F9",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)"
              }
            },
            summary: {
              position: "relative",
              marginTop: "-60px",
              marginBottom: "20px",
              padding: "16px",
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(8px)",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
              color: "#1E293B",
              fontSize: "15px"
            }
          }
        },
        modal: {
          confirm_close: true,
          animation: true,
          backdropClose: false,
          handleBack: true,
          escape: true,
          ondismiss: function() {
            setIsSubmitting(false);
          }
        },
        retry: {
          enabled: true,
          max_count: 3
        },
        timeout: 300, // 5 minutes
        notes: {
          trip_type: carData.tripType,
          pickup: carData.pickupLocation,
          drop: carData.dropLocation,
          payment_type: paymentType,
          booking_summary: `${carData.category} ${carData.name} | ${carData.tripType} Trip`
        },
        config: {
          display: {
            custom_elements: {
              booking_summary: {
                html: `
                  <div style="
                    position: relative;
                    margin: -60px 16px 20px;
                    padding: 16px;
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(8px);
                    border-radius: 12px;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
                  ">
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                      <img src="${carData.image || "/images/car-placeholder.jpg"}" 
                           style="width: 64px; height: 64px; object-fit: cover; border-radius: 8px;" />
                      <div>
                        <div style="font-weight: 600; color: #1E293B;">${carData.category} - ${carData.name}</div>
                        <div style="color: #64748B; font-size: 14px;">
                          ${carData.tripType} Trip • ${carData.distance}km
                        </div>
                        <div style="color: #64748B; font-size: 14px;">
                          ${carData.pickupLocation} → ${carData.dropLocation}
                        </div>
                      </div>
                    </div>
                    <div style="display: flex; justify-content: space-between; padding-top: 12px; border-top: 1px solid #E2E8F0;">
                      <div style="color: #64748B;">Amount to Pay:</div>
                      <div style="font-weight: 600; color: #1E293B;">₹${amountToPay.toFixed(2)}</div>
                    </div>
                  </div>
                `
              }
            },
            blocks: {
              instant_payment: {
                name: "✨ Express Payment",
                instruments: [
                  {
                    method: "upi",
                    flows: ["collect", "qr"],
                    apps: ["google_pay", "phonepe", "paytm", "bhim"],
                    labels: {
                      header: "⚡ Pay Instantly with UPI",
                      qr_code: "📱 Scan QR & Pay Now",
                      collect: "💳 Pay using any UPI app",
                      description: "Fastest & most convenient way to pay"
                    }
                  }
                ]
              },
              cards: {
                name: "🔒 Secure Card Payment",
                instruments: [
                  {
                    method: "card",
                    priority: 1,
                    fields: {
                      network: {
                        type: "select",
                        title: "Select Card Type",
                        values: ["mastercard", "visa", "rupay"]
                      }
                    },
                    labels: {
                      header: "Pay Securely with Credit/Debit Card",
                      description: "All major cards accepted",
                      networkLabel: "Choose your card network"
                    }
                  }
                ]
              },
              other_methods: {
                name: "💼 More Payment Options",
                instruments: [
                  { 
                    method: "netbanking",
                    priority: 2,
                    labels: {
                      header: "🏦 Net Banking",
                      description: "Pay directly from your bank account",
                      bankList: "Choose from all major banks"
                    }
                  },
                  { 
                    method: "wallet",
                    priority: 3,
                    labels: {
                      header: "📱 Digital Wallets",
                      description: "Quick payment via digital wallets",
                      walletList: "All popular wallets supported"
                    }
                  }
                ]
              }
            },
            sequence: ["block.instant_payment", "block.cards", "block.other_methods"],
            preferences: {
              show_default_blocks: false,
              recommendations: true,
              use_custom_theme: true,
              animations: {
                payment_success: true,
                payment_error: true,
                method_selection: true
              }
            },
            labels: {
              back: "← Return to merchant",
              change: "Change Payment Method",
              retry: "Retry Payment",
              description: `Secure payment for ${carData.category} ${carData.name}`
            }
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
          method: "upi"
        },
        handler: async function (response: any) {
          // Step 3: Handle the payment success callback
          
            // This endpoint will verify the payment and save the booking to the DB
            
           // await handleCashBooking(response.razorpay_order_id, response.razorpay_payment_i,response.razorpay_signature);
                // razorpayOrderId: response.razorpay_order_id,
                // razorpayPaymentId: response.razorpay_payment_id,
                // razorpaySignature: response.razorpay_signature,

                setIsSubmitting(true);
    
    // Build URL-encoded booking data to submit
    const formDataToSubmit = new URLSearchParams({
        cabId: carData.name,
        modelName: carData.name,
        modelType: carData.category,
        seats: carData.category === "SUV" || carData.category === "muv" ? "6+1" : "4+1",
        fuelType: "CNG-Diesel",
        availability: "Available",
        price: carData.price.toString(), // Base price
        pickupLocation: carData.pickupLocation,
        dropLocation: carData.dropLocation,
        date: carData.date,
        returndate:
            carData.tripType === "roundTrip" || carData.tripType === "round-trip"
                ? carData.returnDate || ""
                : "",
        time: carData.time,
        tripType: carData.tripType,
        distance: carData.distance,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: Math.round(carData.price * 0.1).toString(),
        gst: Math.round(carData.price * 0.05).toString(),
        total: pricing.total.toString(),
        days: carData.days.toString(),
        driverrate: "0",
        userId: userId?.toString() || "",
        packageName: carData.packageName,
        paymentMethod: "online",
        paymentType: paymentType, // Can be "full" or "partial"
        paymentStatus: "paid",
        amountPaid: amountToPay.toString(),
        remainingAmount: (paymentType === "partial" ? (pricing.total - amountToPay) : 0).toString(),
        // Note: Razorpay details are sent for online payments
        razorpayOrderId: response.razorpay_order_id,
        razorpaypaymentId: response.razorpay_payment_id,
        razorpaySignature: response.razorpay_signature,
    });

    try {
        const response = await fetch(
            "https://api.worldtriplink.com/api/bookingConfirm",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formDataToSubmit,
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Server error response:", errorText);
            throw new Error("Server responded with an error");
        }

        const data = await response.json();
        console.log("Booking response:", data);

        if (data.status === "success") {
            setBookingId(data.bookingId);
            setBookingSuccess(true);
            setShowSuccessPopup(true);

            setTimeout(() => {
                setShowSuccessPopup(false);
                router.push("/");
            }, 3000);
        } else {
            throw new Error(data.error || "Booking failed");
        }
    } catch (error) {
        console.error("Error submitting booking:", error);
        alert("Failed to complete booking. Please try again.");
    } finally {
        setIsSubmitting(false);
    }
             
            
        },
      };

      const razorpay = new (window as any).Razorpay(options);

      // Enhanced payment failure handling
      razorpay.on("payment.failed", function (response: any) {
        console.error("Payment failed:", response.error);
        
        // Show an attractive error modal
        const errorCode = response.error.code;
        const errorDescription = response.error.description;
        const errorSource = response.error.source;
        const errorReason = response.error.reason;

        // Create and show error modal
        const errorModal = document.createElement('div');
        errorModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        errorModal.innerHTML = `
          <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4 animate-fade-in">
            <div class="relative w-24 h-24 mx-auto mb-6">
              <div class="absolute inset-0 bg-red-500 rounded-full animate-scale-in flex items-center justify-center">
                <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </div>
            </div>
            <h3 class="text-2xl font-bold text-gray-800 mb-2">Payment Failed</h3>
            <p class="text-red-600 font-medium mb-4">${errorReason || 'Transaction unsuccessful'}</p>
            <p class="text-gray-600 mb-6 text-sm">${errorDescription}</p>
            <div class="flex gap-3">
              <button onclick="location.reload()" class="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-all">
                Try Again
              </button>
              <button onclick="this.parentElement.parentElement.parentElement.remove()" class="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-all">
                Close
              </button>
            </div>
          </div>
        `;
        document.body.appendChild(errorModal);
        setIsSubmitting(false);
      });

      // Enhanced success handling in the modal
      razorpay.on("payment.success", function(response: any) {
        // Show an attractive success animation before proceeding
        const successModal = document.createElement('div');
        successModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        successModal.innerHTML = `
          <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center animate-fade-in">
            <div class="relative w-24 h-24 mx-auto mb-6">
              <div class="absolute inset-0 bg-green-500 rounded-full animate-scale-in"></div>
              <svg class="absolute inset-0 w-full h-full text-white animate-draw-check" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" 
                      d="M20 6L9 17L4 12" class="animate-draw-check"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h3>
            <p class="text-green-600 font-medium mb-2">Transaction completed securely</p>
            <div class="bg-gray-50 rounded-lg p-4 mb-4">
              <p class="text-sm text-gray-600 mb-1">Payment ID: ${response.razorpay_payment_id}</p>
              <p class="text-sm text-gray-600">Amount: ₹${(amountToPay).toFixed(2)}</p>
            </div>
            <p class="text-sm text-gray-500">Processing your booking...</p>
          </div>
        `;
        document.body.appendChild(successModal);
      });

      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Failed to initiate payment. Please try again.");
      setIsSubmitting(false);
    }
};

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Success Message */}
        {bookingSuccess && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded relative mb-4"
            role="alert"
          >
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline">
              {" "}
              Your booking has been confirmed! Your booking ID is:{" "}
              <strong>{bookingId}</strong>. An email has been sent with your
              booking details. Redirecting to home page...
            </span>
          </div>
        )}



        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Booking Invoice
          </h1>
          <p className="mt-2 text-gray-600">
            Complete your booking details below
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Left Column – Car Details */}
            <div className="p-6 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10"></div>
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-4 text-white">
                  Cab Information
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-center mb-4">
                    <div className="w-56 h-40 relative rounded-xl overflow-hidden shadow-2xl">
                      {carData.image ? (
                        <Image
                          src={carData.image}
                          alt={carData.name || "Car Image"}
                          fill
                          className="object-cover"
                          priority
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                          <span className="text-gray-400">
                            No image available
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                      <p className="text-blue-200 text-xs">Model Type</p>
                      <p className="font-semibold">{carData.category}</p>
                    </div>
                    <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                      <p className="text-blue-200 text-xs">Seats</p>
                      <p className="font-semibold">
                        {carData.category === "SUV" ||
                        carData.category === "muv"
                          ? "6+1"
                          : "4+1"}
                      </p>
                    </div>
                    <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                      <p className="text-blue-200 text-xs">Fuel Type</p>
                      <p className="font-semibold">CNG-Diesel</p>
                    </div>
                    <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                      <p className="text-blue-200 text-xs">Availability</p>
                      <p className="font-semibold">Available</p>
                    </div>
                  </div>
                  
                  <div className="border-t border-white/20 pt-4 mt-4">
                    <div className="space-y-2">
                      {/* Round Trip Invoice */}
                      {carData.tripType === "roundTrip" &&
                        (() => {
                          const baseFare = Number(carData.price);
                          const numberOfDays = Number(carData.days);
                          const driverCost = driverrate * numberOfDays;
                          const subTotal = driverCost + baseFare;
                          const gstAmount = subTotal * 0.05;
                          const serviceCharge = subTotal * 0.1;
                          const totalAmount = subTotal + gstAmount + serviceCharge;

                          return (
                            <>
                              <div className="flex justify-between items-center">
                                <span className="text-blue-200">
                                  Distance/Day:
                                </span>
                                <span className="font-semibold">300km</span>
                              </div>

                              <div className="flex justify-between items-center">
                                <span className="text-blue-200">
                                  Driver Bhata/Day
                                  <br />
                                  <small className="text-xs">
                                    (Fixed 300km/day in Round Trip)
                                  </small>
                                </span>
                                <span className="font-semibold">
                                  ₹{driverrate}
                                </span>
                              </div>

                              <div className="flex items-center justify-center gap-5 my-6">
                                <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"></div>
                                <h1 className="text-2xl font-bold text-white px-4">
                                  Invoice
                                </h1>
                                <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"></div>
                              </div>

                              <div className="flex justify-between items-center">
                                <span className="text-blue-200">
                                  Base Fare
                                </span>
                                <span className="font-semibold">
                                  ₹{baseFare}
                                </span>
                              </div>

                              <div className="flex justify-between items-center">
                                <span className="text-blue-200">
                                  Driver Rate (DriverRate * days)
                                </span>
                                <span className="font-semibold">
                                  ₹{driverCost}
                                </span>
                              </div>

                              <div className="flex justify-between items-center">
                                <span className="text-blue-200">
                                  Amount(DriverRate+BaseFare)
                                </span>
                                <span className="font-semibold">
                                  ₹{subTotal}
                                </span>
                              </div>

                              <div className="flex justify-between items-center">
                                <span className="text-blue-200">GST(5%)</span>
                                <span className="font-semibold">
                                  ₹{gstAmount.toFixed(2)}
                                </span>
                              </div>

                              <div className="flex justify-between items-center">
                                <span className="text-blue-200">
                                  Service Charge(10%)
                                </span>
                                <span className="font-semibold">
                                  ₹{serviceCharge.toFixed(2)}
                                </span>
                              </div>

                              <div className="flex justify-between items-center text-xl mt-3 pt-3 border-t border-white/20">
                                <span className="font-bold">
                                  Total Amount:
                                </span>
                                <span className="font-bold text-2xl">
                                  ₹ {totalAmount.toFixed(2)}
                                </span>
                              </div>
                            </>
                          );
                        })()}

                      {/* One Way Invoice */}
                      {carData.tripType === "oneWay" && (
                        <>
                          <div className="flex justify-between items-center">
                            <span className="text-blue-200">Base Fare</span>
                            <span className="font-semibold">
                              ₹{carData.price}
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-blue-200">
                              Service Charge:
                            </span>
                            <span className="font-semibold">
                              ₹
                              {pricing.isCalculated
                                ? pricing.service
                                : Math.round(carData.price * 0.1)}
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-blue-200">GST:</span>
                            <span className="font-semibold">
                              ₹
                              {pricing.isCalculated
                                ? pricing.gst
                                : Math.round(carData.price * 0.05)}
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center text-xl mt-3 pt-3 border-t border-white/20">
                            <span className="font-bold">Total Amount:</span>
                            <span className="font-bold text-2xl">
                              ₹
                              {pricing.isCalculated
                                ? pricing.total
                                : carData.price +
                                  Math.round(carData.price * 0.1) +
                                  Math.round(carData.price * 0.05)}
                            </span>
                          </div>
                        </>
                      )}

                      {/* Rental Invoice */}
                      {carData.tripType === "rental" && (
                        <>
                          <div className="flex justify-between items-center">
                            <span className="text-blue-200">Package:</span>
                            <span className="font-semibold">
                              {carData.packageName}
                            </span>
                          </div>
                          
                          {carData.estimatedTravelTime && (
                            <div className="flex justify-between items-center">
                              <span className="text-blue-200">
                                Estimated Travel Time:
                              </span>
                              <span className="font-semibold">
                                {carData.estimatedTravelTime}
                              </span>
                            </div>
                          )}

                          <div className="flex items-center justify-center gap-5 my-6">
                            <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"></div>
                            <h1 className="text-2xl font-bold text-white px-4">
                              Invoice
                            </h1>
                            <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"></div>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-blue-200">Base Amount:</span>
                            <span className="font-semibold">
                              ₹{carData.price}
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-blue-200">GST (5%):</span>
                            <span className="font-semibold">
                              ₹{Math.round(carData.price * 0.05)}
                            </span>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-blue-200">
                              Service Charge (10%):
                            </span>
                            <span className="font-semibold">
                              ₹{Math.round(carData.price * 0.1)}
                            </span>
                          </div>

                          <div className="flex justify-between items-center text-xl mt-3 pt-3 border-t border-white/20">
                            <span className="font-bold">Total Amount:</span>
                            <span className="font-bold text-2xl">
                              ₹
                              {carData.price +
                                Math.round(carData.price * 0.05) +
                                Math.round(carData.price * 0.1)}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column – Trip Information & Booking Form */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Trip Information
              </h2>
              <div className="mb-6">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Pickup Location</p>
                    <p className="font-medium text-gray-800">
                      {carData.pickupLocation}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Drop Location</p>
                    <p className="font-medium text-gray-800">
                      {carData.dropLocation}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Date</p>
                    <p className="font-medium text-gray-800">{carData.date}</p>
                  </div>
                  {carData.tripType === "roundTrip" && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">Return Date</p>
                      <p className="font-medium text-gray-800">
                        {carData.returnDate}
                      </p>
                    </div>
                  )}
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Time</p>
                    <p className="font-medium text-gray-800">{carData.time}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Trip Type</p>
                    <p className="font-medium text-gray-800">
                      {carData.tripType}
                    </p>
                  </div>
                  {carData.tripType === "rental" && carData.packageName && (
                    <div className="bg-gray-50 p-3 rounded-lg col-span-2">
                      <p className="text-xs text-gray-500">Package</p>
                      <p className="font-medium text-gray-800">
                        {carData.packageName}
                      </p>
                    </div>
                  )}
                  {carData.tripType === "rental" && carData.estimatedTravelTime && (
                    <div className="bg-gray-50 p-3 rounded-lg col-span-2">
                      <p className="text-xs text-gray-500">
                        Estimated Travel Time
                      </p>
                      <p className="font-medium text-gray-800">
                        {carData.estimatedTravelTime}
                      </p>
                    </div>
                  )}
                  <div className="bg-gray-50 p-3 rounded-lg col-span-2">
                    <p className="text-xs text-gray-500">Distance</p>
                    <p className="font-medium text-gray-800">
                      {carData.distance} km
                    </p>
                  </div>
                </div>
              </div>

              {/* Booking Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    required
                    className={`w-full px-3 py-2 border-2 ${
                      formErrors.phone ? "border-red-500" : "border-gray-200"
                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                    placeholder="Enter your 10-digit phone number"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    pattern="[0-9]{10}"
                    maxLength={10}
                    disabled={isSubmitting}
                  />
                  {formErrors.phone && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Payment Options */}
              <div className="mt-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Payment Options
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <label
                    htmlFor="payment-upi"
                    className={`cursor-pointer border-2 rounded-lg p-4 text-center transition-all duration-200 ${
                      selectedPaymentMethod === "UPI"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <input
                      type="radio"
                      id="payment-upi"
                      name="paymentMethod"
                      value="UPI"
                      checked={selectedPaymentMethod === "UPI"}
                      onChange={(e) => {
                        setSelectedPaymentMethod(e.target.value);
                        setPaymentType("");
                      }}
                      className="hidden"
                      disabled={isSubmitting}
                    />
                    <div className="text-sm font-semibold">Online</div>
                    <p className="text-xs text-gray-500">
                      RazorPay
                    </p>
                  </label>

                  
                  <label
                    htmlFor="payment-cash"
                    className={`cursor-pointer border-2 rounded-lg p-4 text-center transition-all duration-200 ${
                      selectedPaymentMethod === "Cash"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <input
                      type="radio"
                      id="payment-cash"
                      name="paymentMethod"
                      value="Cash"
                      checked={selectedPaymentMethod === "Cash"}
                      onChange={(e) => {
                        setSelectedPaymentMethod(e.target.value);
                        setPaymentType("full"); // Cash is always full payment
                      }}
                      className="hidden"
                      disabled={isSubmitting}
                    />
                    <div className="text-sm font-semibold">Cash</div>
                    <p className="text-xs text-gray-500">Pay to Driver</p>
                  </label>
                </div>
              </div>

              {/* Payment Type Options (visible only for online payments) */}
              {selectedPaymentMethod !== "" && selectedPaymentMethod !== "Cash" && (
                <div className="mt-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Payment Type
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <label
                      htmlFor="payment-full"
                      className={`cursor-pointer border-2 rounded-lg p-4 text-center transition-all duration-200 ${
                        paymentType === "full"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                    >
                      <input
                        type="radio"
                        id="payment-full"
                        name="paymentType"
                        value="full"
                        checked={paymentType === "full"}
                        onChange={(e) => setPaymentType(e.target.value)}
                        className="hidden"
                        disabled={isSubmitting}
                      />
                      <div className="text-sm font-semibold">Full Payment</div>
                      <p className="text-xs text-gray-500">
                        ₹{pricing.total.toFixed(2)}
                      </p>
                    </label>
                    <label
                      htmlFor="payment-partial"
                      className={`cursor-pointer border-2 rounded-lg p-4 text-center transition-all duration-200 ${
                        paymentType === "partial"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                    >
                      <input
                        type="radio"
                        id="payment-partial"
                        name="paymentType"
                        value="partial"
                        checked={paymentType === "partial"}
                        onChange={(e) => setPaymentType(e.target.value)}
                        className="hidden"
                        disabled={isSubmitting}
                      />
                      <div className="text-sm font-semibold">
                        Partial Payment (25%)
                      </div>
                      <p className="text-xs text-gray-500">
                        ₹{partialAmount.toFixed(2)}
                      </p>
                    </label>
                  </div>
                </div>
              )}

              <div className="mt-6">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !selectedPaymentMethod || (selectedPaymentMethod !== "Cash" && !paymentType)}
                  className={`w-full relative overflow-hidden ${
                    isSubmitting
                      ? "bg-blue-600"
                      : "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"
                  } text-white py-3 rounded-lg font-bold text-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    "Book Now"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer / Additional Information */}
        <div className="mt-4 text-center text-gray-600">
          <p className="text-xs">
            By clicking "Book Now" you agree to our{" "}
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Terms and Conditions
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Privacy Policy
            </a>
          </p>
        </div>

        {showSuccessPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 text-center animate-fade-in">
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="absolute inset-0 bg-green-500 rounded-full animate-scale-in"></div>
                <svg
                  className="absolute inset-0 w-full h-full text-white animate-draw-check"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6L9 17L4 12" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Booking Successful!
              </h3>
              <p className="text-gray-600 mb-4">Your booking ID: {bookingId}</p>
              <p className="text-sm text-gray-500">
                Redirecting to homepage...
              </p>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }

        @keyframes drawCheck {
          0% {
            stroke-dasharray: 0, 30;
            stroke-dashoffset: 30;
          }
          100% {
            stroke-dasharray: 30, 30;
            stroke-dashoffset: 0;
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-scale-in {
          animation: scaleIn 0.3s ease-out;
        }

        .animate-draw-check {
          animation: drawCheck 0.5s ease-out forwards;
          animation-delay: 0.3s;
        }
      `}</style>
    </div>
  );
}

export default function BookingInvoice() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InvoiceContent />
    </Suspense>
  );
}