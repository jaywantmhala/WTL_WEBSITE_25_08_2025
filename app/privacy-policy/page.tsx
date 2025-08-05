import Head from 'next/head'

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - WorldTripLink</title>
        <meta name="description" content="Privacy Policy for WTL Tourism Pvt. Ltd. (WorldTripLink.com)" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>

        {/* Header */}
        <header className="relative bg-white/80 backdrop-blur-md shadow-2xl border-b border-indigo-100">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="text-center">
              <div className="mb-6">
                <h1 className="text-6xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4 tracking-tight">
                  WorldTripLink
                </h1>
                <div className="w-32 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 mx-auto rounded-full"></div>
              </div>
              <p className="text-2xl text-gray-700 font-medium mb-6">Privacy Policy</p>
              <div className="inline-flex items-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300">
                <div className="w-3 h-3 bg-white rounded-full mr-3 animate-pulse"></div>
                <p className="font-semibold">Effective Date: June 3, 2025</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="relative max-w-7xl mx-auto px-6 py-12">
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 lg:p-16">
            
            {/* Hero Title Section */}
            <div className="text-center mb-16">
              <h1 className="text-5xl lg:text-6xl font-black text-gray-900 mb-8 leading-tight">
                Privacy Policy for 
                <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  WTL Tourism Pvt. Ltd.
                </span>
              </h1>
              <div className="w-32 h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mx-auto rounded-full mb-8"></div>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Your privacy is our priority. Learn how we protect and manage your personal information.
              </p>
            </div>

            {/* Introduction */}
            <section className="mb-20">
              <div className="relative bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 p-10 rounded-3xl border border-indigo-200 shadow-xl overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full blur-2xl opacity-20"></div>
                <div className="relative z-10">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                      <span className="text-white text-xl">🛡️</span>
                    </div>
                    Introduction
                  </h2>
                  <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                    <p>
                      At WTL Tourism Pvt. Ltd. ("we," "our," or "us"), accessible via{' '}
                      <a href="https://www.worldtriplink.com" className="text-indigo-600 hover:text-indigo-800 underline decoration-2 underline-offset-4 font-semibold transition-all duration-300 hover:decoration-indigo-300">
                        www.WorldTripLink.com
                      </a>
                      , we prioritize the protection and confidentiality of your personal information. This Privacy Policy explains how we collect, use, share, and safeguard your personal data when you interact with our website, mobile applications, and cab booking services.
                    </p>
                    <p className="p-6 bg-white/60 rounded-2xl border border-indigo-100">
                      <strong>By accessing or using our services, you agree to the practices described in this policy.</strong>
                    </p>
                    <p>
                      We recognize the importance of privacy and are committed to maintaining transparency in how we handle your information. We encourage you to read this Privacy Policy carefully to understand your rights and how your data is managed.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Information We Collect */}
            <section className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Information We Collect</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full mb-6"></div>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  We collect a range of information to provide seamless, secure, and personalized services to you.
                </p>
              </div>
              
              <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {[
                  {
                    title: "Personal Identification",
                    icon: "👤",
                    color: "from-emerald-400 to-teal-500",
                    bgColor: "from-emerald-50 to-teal-50",
                    borderColor: "border-emerald-200",
                    items: ["Full name", "Email address", "Postal address", "Phone number", "Identification numbers"]
                  },
                  {
                    title: "Booking Details",
                    icon: "📍",
                    color: "from-blue-400 to-indigo-500",
                    bgColor: "from-blue-50 to-indigo-50",
                    borderColor: "border-blue-200",
                    items: ["Pickup and drop-off locations", "Travel dates and times", "Preferred routes or vehicles", "Special instructions"]
                  },
                  {
                    title: "Payment Information",
                    icon: "💳",
                    color: "from-purple-400 to-pink-500",
                    bgColor: "from-purple-50 to-pink-50",
                    borderColor: "border-purple-200",
                    items: ["Credit/debit card details", "UPI information", "Billing address", "Payment history and status"]
                  },
                  {
                    title: "Technical Information",
                    icon: "⚙️",
                    color: "from-orange-400 to-red-500",
                    bgColor: "from-orange-50 to-red-50",
                    borderColor: "border-orange-200",
                    items: ["IP address", "Browser type and version", "Device identifiers", "Operating system", "Site usage data"]
                  },
                  {
                    title: "Location Data",
                    icon: "📍",
                    color: "from-red-400 to-pink-500",
                    bgColor: "from-red-50 to-pink-50",
                    borderColor: "border-red-200",
                    items: ["GPS coordinates (with consent)", "Approximate location from IP"]
                  },
                  {
                    title: "Communications",
                    icon: "💬",
                    color: "from-indigo-400 to-purple-500",
                    bgColor: "from-indigo-50 to-purple-50",
                    borderColor: "border-indigo-200",
                    items: ["Chat transcripts", "Email interactions", "Feedback and reviews"]
                  }
                ].map((category, index) => (
                  <div key={index} className={`group relative bg-gradient-to-br ${category.bgColor} p-8 rounded-3xl border-2 ${category.borderColor} hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/50 to-transparent rounded-full blur-xl"></div>
                    <div className="relative z-10">
                      <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <span className="text-2xl">{category.icon}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-6">{category.title}</h3>
                      <ul className="space-y-3">
                        {category.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-center text-gray-700">
                            <div className="w-2 h-2 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full mr-3 flex-shrink-0"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* How We Use Your Information */}
            <section className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mb-6"></div>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  We process your data for multiple legitimate purposes to enhance your experience.
                </p>
              </div>
              
              <div className="space-y-8">
                {[
                  {
                    title: "Service Provision",
                    icon: "🚗",
                    color: "from-emerald-500 to-teal-600",
                    bgColor: "from-emerald-50 to-teal-50",
                    items: ["Confirm and fulfill cab booking requests", "Dispatch nearest available vehicle and driver", "Send real-time ride updates and alerts"]
                  },
                  {
                    title: "Account Management",
                    icon: "👥",
                    color: "from-blue-500 to-indigo-600",
                    bgColor: "from-blue-50 to-indigo-50",
                    items: ["Create and manage user accounts", "Maintain historical data for tracking and improvement"]
                  },
                  {
                    title: "Payment Processing",
                    icon: "💰",
                    color: "from-purple-500 to-violet-600",
                    bgColor: "from-purple-50 to-violet-50",
                    items: ["Process secure transactions via trusted gateways", "Resolve payment issues, refunds, or disputes"]
                  },
                  {
                    title: "Service Improvement",
                    icon: "📈",
                    color: "from-orange-500 to-amber-600",
                    bgColor: "from-orange-50 to-amber-50",
                    items: ["Monitor booking patterns and analyze demand", "Optimize cab allocation and reduce wait times"]
                  },
                  {
                    title: "Personalization",
                    icon: "🎯",
                    color: "from-pink-500 to-rose-600",
                    bgColor: "from-pink-50 to-rose-50",
                    items: ["Offer trip recommendations based on history", "Customize marketing messages to preferences"]
                  },
                  {
                    title: "Legal Compliance",
                    icon: "⚖️",
                    color: "from-indigo-500 to-blue-600",
                    bgColor: "from-indigo-50 to-blue-50",
                    items: ["Comply with transport regulations", "Cooperate with legal obligations and audits"]
                  },
                  {
                    title: "Fraud Prevention",
                    icon: "🔒",
                    color: "from-red-500 to-pink-600",
                    bgColor: "from-red-50 to-pink-50",
                    items: ["Detect suspicious booking activities", "Maintain data integrity and security"]
                  },
                  {
                    title: "Customer Support",
                    icon: "🎧",
                    color: "from-teal-500 to-cyan-600",
                    bgColor: "from-teal-50 to-cyan-50",
                    items: ["Respond to inquiries and resolve complaints", "Enhance service quality through interaction analysis"]
                  },
                  {
                    title: "Research & Analytics",
                    icon: "📊",
                    color: "from-slate-500 to-gray-600",
                    bgColor: "from-slate-50 to-gray-50",
                    items: ["Conduct data analysis for business strategy", "Generate anonymous insights about travel behaviors"]
                  }
                ].map((usage, index) => (
                  <div key={index} className={`group relative bg-gradient-to-r ${usage.bgColor} p-8 rounded-3xl border-l-8 border-transparent bg-clip-padding hover:shadow-2xl transition-all duration-500 overflow-hidden`}>
                    <div className={`absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b ${usage.color} rounded-r-full`}></div>
                    <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-white/30 to-transparent rounded-full blur-xl"></div>
                    <div className="relative z-10">
                      <div className="flex items-center mb-6">
                        <div className={`w-14 h-14 bg-gradient-to-br ${usage.color} rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                          <span className="text-2xl text-white">{usage.icon}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">{usage.title}</h3>
                      </div>
                      <ul className="space-y-3 ml-20">
                        {usage.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-center text-gray-700 text-lg">
                            <div className="w-2 h-2 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full mr-4 flex-shrink-0"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Information Sharing */}
            <section className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Information Sharing</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 mx-auto rounded-full mb-6"></div>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  We maintain strict confidentiality and only share your data with trusted partners or as required by law.
                </p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {[
                  {
                    title: "Trusted Third-Party Service Providers",
                    icon: "🤝",
                    color: "from-amber-400 to-orange-500",
                    bgColor: "from-amber-50 to-orange-50",
                    content: [
                      "Payment processors: Securely handle payments (Razorpay, PayU)",
                      "SMS/email partners: Send trip updates and promotional messages",
                      "Analytics partners: Understand usage trends and improve services"
                    ]
                  },
                  {
                    title: "Government & Regulatory Authorities",
                    icon: "🏛️",
                    color: "from-red-400 to-pink-500",
                    bgColor: "from-red-50 to-pink-50",
                    content: [
                      "Law enforcement agencies in compliance with legal obligations",
                      "RTO or transport departments for verification or audits"
                    ]
                  },
                  {
                    title: "Business Transfers",
                    icon: "🏢",
                    color: "from-indigo-400 to-purple-500",
                    bgColor: "from-indigo-50 to-purple-50",
                    content: [
                      "In mergers, acquisitions, or restructuring events, your data may be transferred to a successor entity"
                    ]
                  },
                  {
                    title: "Consent-Based Sharing",
                    icon: "✅",
                    color: "from-emerald-400 to-teal-500",
                    bgColor: "from-emerald-50 to-teal-50",
                    content: [
                      "With your explicit consent, we may share data for marketing partnerships or collaborations"
                    ]
                  }
                ].map((sharing, index) => (
                  <div key={index} className={`group relative bg-gradient-to-br ${sharing.bgColor} p-8 rounded-3xl border-2 border-white/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/40 to-transparent rounded-full blur-xl"></div>
                    <div className="relative z-10">
                      <div className="flex items-center mb-6">
                        <div className={`w-14 h-14 bg-gradient-to-br ${sharing.color} rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                          <span className="text-2xl text-white">{sharing.icon}</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">{sharing.title}</h3>
                      </div>
                      <ul className="space-y-3">
                        {sharing.content.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start text-gray-700">
                            <div className="w-2 h-2 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Cookies Section */}
            <section className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Cookies & Technologies</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full mb-6"></div>
              </div>
              
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-10 rounded-3xl border-2 border-amber-200 mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-amber-300/30 to-orange-300/30 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-amber-800 mb-6 flex items-center">
                    <span className="text-3xl mr-4">🍪</span>
                    We use cookies and similar technologies to:
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      "Remember your preferences and settings",
                      "Analyze site usage to enhance functionality", 
                      "Personalize offers and advertisements"
                    ].map((purpose, index) => (
                      <div key={index} className="flex items-center p-4 bg-white/70 rounded-2xl">
                        <div className="w-3 h-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mr-3"></div>
                        <span className="text-amber-800 font-medium">{purpose}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Session Cookies",
                    icon: "⏰",
                    color: "from-blue-500 to-indigo-600",
                    description: "Deleted after you close your browser"
                  },
                  {
                    title: "Persistent Cookies", 
                    icon: "💾",
                    color: "from-emerald-500 to-teal-600",
                    description: "Remain for a defined period to remember preferences"
                  },
                  {
                    title: "Third-party Cookies",
                    icon: "🔗",
                    color: "from-purple-500 to-violet-600", 
                    description: "For analytics and advertising (e.g., Google Analytics)"
                  }
                ].map((cookie, index) => (
                  <div key={index} className="group bg-white p-8 rounded-3xl border-2 border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gray-100 to-transparent rounded-full blur-xl"></div>
                    <div className="relative z-10 text-center">
                      <div className={`w-16 h-16 bg-gradient-to-br ${cookie.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <span className="text-2xl text-white">{cookie.icon}</span>
                      </div>
                      <h4 className="text-xl font-bold text-gray-800 mb-4">{cookie.title}</h4>
                      <p className="text-gray-600">{cookie.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 bg-blue-50 border-2 border-blue-200 p-6 rounded-2xl">
                <p className="text-blue-800 font-medium text-center">
                  <strong>Note:</strong> You can control cookies through your browser settings, but disabling them may limit certain features.
                </p>
              </div>
            </section>

            {/* Security Measures */}
            <section className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Security Measures</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto rounded-full mb-6"></div>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  We take robust security measures to protect your data at every level.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-10 rounded-3xl border-2 border-emerald-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-60 h-60 bg-gradient-to-br from-emerald-300/20 to-teal-300/20 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                  <div className="grid md:grid-cols-2 gap-8">
                    {[
                      {
                        title: "Encryption",
                        icon: "🔐",
                        description: "SSL/TLS encryption for data in transit"
                      },
                      {
                        title: "Access Controls",
                        icon: "🔑",
                        description: "Limited access to data by authorized staff only"
                      },
                      {
                        title: "Secure Hosting", 
                        icon: "🛡️",
                        description: "Data stored on secure servers with multi-factor authentication"
                      },
                      {
                        title: "Regular Audits",
                        icon: "🔍",
                        description: "Security testing to identify and fix vulnerabilities"
                      }
                    ].map((security, index) => (
                      <div key={index} className="group flex items-center p-6 bg-white/80 rounded-2xl border border-emerald-100 hover:shadow-lg transition-all duration-300">
                        <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                          <span className="text-2xl text-white">{security.icon}</span>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-emerald-800 mb-2">{security.title}</h4>
                          <p className="text-emerald-700">{security.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 p-6 bg-emerald-100 rounded-2xl border border-emerald-200">
                    <p className="text-emerald-800 font-medium text-center text-lg">
                      <span className="text-2xl mr-2">🔒</span>
                      No security system is impenetrable, but we continually refine our practices to maintain high standards of data protection.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Data Retention */}
            <section className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Data Retention</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-slate-500 to-gray-500 mx-auto rounded-full mb-6"></div>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  We retain your personal information for specific periods based on data type and legal requirements.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-slate-50 to-gray-50 p-10 rounded-3xl border-2 border-slate-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-slate-300/20 to-gray-300/20 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <div className="space-y-6">
                    {[
                      { type: "Booking data", period: "5 years post-booking", color: "from-blue-500 to-indigo-600", bgColor: "bg-blue-100" },
                      { type: "Account data", period: "While account is active", color: "from-emerald-500 to-teal-600", bgColor: "bg-emerald-100" },
                      { type: "Customer support interactions", period: "Up to 2 years", color: "from-orange-500 to-amber-600", bgColor: "bg-orange-100" },
                      { type: "Anonymous data", period: "Indefinitely", color: "from-purple-500 to-violet-600", bgColor: "bg-purple-100" }
                    ].map((retention, index) => (
                      <div key={index} className="group flex justify-between items-center p-6 bg-white rounded-2xl border border-slate-100 hover:shadow-lg transition-all duration-300">
                        <span className="text-lg font-medium text-gray-700">{retention.type}</span>
                        <div className={`px-6 py-3 ${retention.bgColor} rounded-full`}>
                          <span className={`font-bold text-transparent bg-gradient-to-r ${retention.color} bg-clip-text`}>
                            {retention.period}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-200">
                    <p className="text-blue-800 font-medium text-center">
                      <span className="text-2xl mr-2">🗑️</span>
                      We securely delete or anonymize data when no longer needed for these purposes.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Your Rights */}
            <section className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Rights</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6"></div>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  You have several rights regarding your personal data under applicable laws.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                {[
                  {
                    title: "Access",
                    icon: "👁️",
                    color: "from-blue-500 to-indigo-600",
                    bgColor: "from-blue-50 to-indigo-50",
                    description: "Request a copy of the data we hold about you"
                  },
                  {
                    title: "Correction",
                    icon: "✏️",
                    color: "from-emerald-500 to-teal-600",
                    bgColor: "from-emerald-50 to-teal-50",
                    description: "Correct inaccurate or incomplete data"
                  },
                  {
                    title: "Deletion",
                    icon: "🗑️",
                    color: "from-red-500 to-pink-600",
                    bgColor: "from-red-50 to-pink-50",
                    description: "Request data deletion, unless we must retain it for legal reasons"
                  },
                  {
                    title: "Objection",
                    icon: "🚫",
                    color: "from-purple-500 to-violet-600",
                    bgColor: "from-purple-50 to-violet-50",
                    description: "Object to direct marketing communications"
                  },
                  {
                    title: "Data Portability",
                    icon: "📦",
                    color: "from-indigo-500 to-purple-600",
                    bgColor: "from-indigo-50 to-purple-50",
                    description: "Request a copy of your data in a machine-readable format (where applicable)",
                    span: "lg:col-span-2"
                  }
                ].map((right, index) => (
                  <div key={index} className={`group relative text-center p-8 bg-gradient-to-br ${right.bgColor} rounded-3xl border-2 border-white/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden ${right.span || ''}`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/40 to-transparent rounded-full blur-xl"></div>
                    <div className="relative z-10">
                      <div className={`w-20 h-20 bg-gradient-to-br ${right.color} rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl`}>
                        <span className="text-3xl text-white">{right.icon}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">{right.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{right.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 p-8 rounded-3xl text-center">
                <h3 className="text-2xl font-bold text-blue-800 mb-4">How to Exercise Your Rights</h3>
                <p className="text-blue-700 text-lg mb-6">
                  To exercise these rights, please email us at{' '}
                  <a href="mailto:support@worldtriplink.com" className="text-blue-600 hover:text-blue-800 underline decoration-2 underline-offset-4 font-semibold transition-all duration-300">
                    support@worldtriplink.com
                  </a>
                </p>
                <p className="text-blue-600">We may verify your identity to process your request.</p>
              </div>
            </section>

            {/* Additional Sections */}
            <div className="grid lg:grid-cols-3 gap-8 mb-20">
              {[
                {
                  title: "Minors",
                  icon: "👶",
                  color: "from-orange-500 to-red-600",
                  bgColor: "from-orange-50 to-red-50",
                  content: "We do not knowingly collect data from minors under 18. If you believe a child's data has been submitted to us, please contact us so we can promptly remove it."
                },
                {
                  title: "International Data Transfers",
                  icon: "🌍",
                  color: "from-purple-500 to-indigo-600",
                  bgColor: "from-purple-50 to-indigo-50",
                  content: "Your data may be processed or stored on servers in India or other countries. We take appropriate steps to ensure international data transfers are secure and lawful."
                },
                {
                  title: "Policy Updates",
                  icon: "📝",
                  color: "from-teal-500 to-cyan-600",
                  bgColor: "from-teal-50 to-cyan-50",
                  content: "We may update this Privacy Policy to reflect changes in the law or our practices. Updates will be posted with the revised date."
                }
              ].map((section, index) => (
                <div key={index} className={`group relative bg-gradient-to-br ${section.bgColor} p-8 rounded-3xl border-2 border-white/50 hover:shadow-xl transition-all duration-500 overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/40 to-transparent rounded-full blur-xl"></div>
                  <div className="relative z-10">
                    <div className={`w-16 h-16 bg-gradient-to-br ${section.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <span className="text-2xl text-white">{section.icon}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">{section.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{section.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Information */}
            <section className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-gray-500 to-slate-500 mx-auto rounded-full mb-6"></div>
              </div>
              
              <div className="relative bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white p-12 rounded-3xl overflow-hidden">
                <div className="absolute top-0 right-0 w-60 h-60 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-60 h-60 bg-gradient-to-tr from-teal-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold mb-10 text-center">WTL Tourism Pvt. Ltd. (WorldTripLink.com)</h3>
                  <div className="grid md:grid-cols-3 gap-8">
                    {[
                      {
                        title: "Address",
                        icon: "📍",
                        color: "from-blue-400 to-indigo-500",
                        content: "Office No. 016, Wing A, City Vista, Kharadi, Pune, India"
                      },
                      {
                        title: "Email",
                        icon: "📧",
                        color: "from-emerald-400 to-teal-500",
                        content: "Info@worldtriplink.com",
                        link: "mailto:Info@worldtriplink.com"
                      },
                      {
                        title: "Phone",
                        icon: "📞",
                        color: "from-yellow-400 to-orange-500",
                        content: "+91 9130030054",
                        link: "tel:+919130030054"
                      }
                    ].map((contact, index) => (
                      <div key={index} className="group text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                        <div className={`w-16 h-16 bg-gradient-to-br ${contact.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                          <span className="text-2xl text-white">{contact.icon}</span>
                        </div>
                        <h4 className="text-xl font-bold mb-3">{contact.title}</h4>
                        {contact.link ? (
                          <a href={contact.link} className="text-blue-300 hover:text-blue-100 underline decoration-2 underline-offset-4 transition-all duration-300">
                            {contact.content}
                          </a>
                        ) : (
                          <p className="text-gray-300">{contact.content}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Legal Terms */}
            <section className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Legal Terms</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-red-500 mx-auto rounded-full mb-6"></div>
              </div>
              
              <div className="space-y-8">
                {[
                  {
                    title: "Usage Restrictions",
                    icon: "⚠️",
                    color: "from-yellow-500 to-orange-600",
                    bgColor: "from-yellow-50 to-orange-50",
                    content: "You agree to use our services lawfully and responsibly. Misuse (e.g., using a booking for illegal purposes) may result in account suspension or legal action."
                  },
                  {
                    title: "Limitation of Liability",
                    icon: "⚖️",
                    color: "from-red-500 to-pink-600",
                    bgColor: "from-red-50 to-pink-50",
                    content: "While we strive to provide safe and reliable services, we are not liable for events beyond our control, such as traffic delays, accidents, or natural calamities."
                  },
                  {
                    title: "Jurisdiction",
                    icon: "🏛️",
                    color: "from-indigo-500 to-purple-600",
                    bgColor: "from-indigo-50 to-purple-50",
                    content: "This Privacy Policy is governed by Indian laws. Any disputes shall be subject to the exclusive jurisdiction of courts in Pune, Maharashtra."
                  }
                ].map((term, index) => (
                  <div key={index} className={`group relative bg-gradient-to-r ${term.bgColor} p-8 rounded-3xl border-l-8 border-transparent overflow-hidden hover:shadow-xl transition-all duration-500`}>
                    <div className={`absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b ${term.color} rounded-r-full`}></div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/30 to-transparent rounded-full blur-xl"></div>
                    <div className="relative z-10 flex items-center">
                      <div className={`w-16 h-16 bg-gradient-to-br ${term.color} rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <span className="text-2xl text-white">{term.icon}</span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-3">{term.title}</h3>
                        <p className="text-gray-700 leading-relaxed">{term.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Practical Examples */}
            <section className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Practical Examples</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full mb-6"></div>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  To provide full transparency, here are practical examples of how your data is used in real situations.
                </p>
              </div>
              
              <div className="space-y-8">
                {[
                  {
                    number: "1",
                    color: "from-blue-500 to-cyan-600",
                    bgColor: "from-blue-50 to-cyan-50",
                    content: "When you book a cab, we share your pickup location and contact info with the assigned driver to ensure prompt pickup."
                  },
                  {
                    number: "2", 
                    color: "from-emerald-500 to-teal-600",
                    bgColor: "from-emerald-50 to-teal-50",
                    content: "If you forget an item in the cab, we may use your data to coordinate its return."
                  },
                  {
                    number: "3",
                    color: "from-purple-500 to-violet-600",
                    bgColor: "from-purple-50 to-violet-50",
                    content: "We may send you special discounts based on your past trips to similar destinations."
                  }
                ].map((example, index) => (
                  <div key={index} className={`group relative bg-gradient-to-r ${example.bgColor} p-8 rounded-3xl border-2 border-white/50 hover:shadow-2xl transition-all duration-500 overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-white/40 to-transparent rounded-full blur-xl"></div>
                    <div className="relative z-10 flex items-start">
                      <div className={`w-16 h-16 bg-gradient-to-br ${example.color} rounded-full flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300 shadow-lg flex-shrink-0`}>
                        <span className="text-2xl text-white font-bold">{example.number}</span>
                      </div>
                      <p className="text-lg text-gray-800 leading-relaxed mt-2">{example.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Footer */}
            <footer className="relative">
              <div className="bg-gradient-to-br from-slate-50 to-gray-50 p-10 rounded-3xl border-t-4 border-gradient-to-r from-blue-500 to-purple-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-300/20 to-purple-300/20 rounded-full blur-2xl"></div>
                <div className="relative z-10 text-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Thank You for Reading</h3>
                  <p className="text-lg text-gray-700 mb-6 max-w-4xl mx-auto">
                    For questions or concerns about this policy, or to exercise your rights, contact us using the information provided above.
                  </p>
                  <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 mb-6">
                    <p className="text-gray-600 mb-2">
                      This Privacy Policy is governed by Indian laws. Any disputes shall be subject to the exclusive jurisdiction of courts in Pune, Maharashtra.
                    </p>
                  </div>
                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                    <p className="text-gray-500 font-medium">Last updated: June 3, 2025</p>
                    <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </>
  )
}