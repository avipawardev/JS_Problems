import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FilterTabs from "../components/FilterTabs";
import DesignCard from "../components/DesignCard";
import { designsData } from "../data/designsData";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [userFormData, setUserFormData] = useState(null);

  const categories = [
    "All",
    "House Designs",
    "3D Front Designs",
    "Interior Designs",
    "Floor Plans",
  ];

  const filteredDesigns =
    selectedCategory === "All"
      ? designsData
      : designsData.filter((design) => design.category === selectedCategory);

  useEffect(() => {
    // Retrieve user form data from localStorage if available
    const storedData = localStorage.getItem("userFormData");
    if (storedData) {
      setUserFormData(JSON.parse(storedData));
    }
  }, []);

  const getWhatsAppLink = () => {
    const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "917070580889"; // Fallback for development
    let message = "Hi VastuNaksha! I am interested in your designs.";

    if (userFormData) {
      message = `Hi VastuNaksha! I am ${userFormData.name} from ${userFormData.location}. I am interested in your designs.`;
    }

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <HeroSection />

      {/* Categories Section */}
      <section
        id="designs"
        className="py-16 sm:py-20 md:py-24 bg-linear-to-br from-white via-secondary-50/30 to-primary-50/20 relative"
      >
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="mx-auto px-6 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z"
                  clipRule="evenodd"
                />
              </svg>
              Our Design Collection
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-secondary-900 mb-4 sm:mb-6 leading-tight">
              Explore{" "}
              <span className="bg-linear-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                Architectural
              </span>{" "}
              Masterpieces
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-secondary-600 max-w-3xl mx-auto leading-relaxed">
              Discover our curated collection of modern architectural designs,
              from contemporary homes to innovative interiors. Each design tells
              a unique story of creativity and functionality.
            </p>
          </div>

          {/* Category Filters */}
          <div className="mb-16">
            <FilterTabs
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>

          {/* Designs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {filteredDesigns.map((design, index) => (
              <DesignCard key={design.id} design={design} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Modern About Section */}
      <section
        id="about"
        className="py-16 sm:py-20 md:py-24 bg-linear-to-br from-secondary-50 via-white to-primary-50/30 relative overflow-hidden"
      >
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent-200/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="mx-auto px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content Side */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Why Choose VastuNaksha
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary-900 leading-tight">
                  Crafting{" "}
                  <span className="bg-linear-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                    Exceptional
                  </span>{" "}
                  Architectural Experiences
                </h2>
                <p className="text-base sm:text-lg text-secondary-600 leading-relaxed max-w-xl">
                  We blend innovative design thinking with practical
                  functionality to create spaces that inspire, comfort, and
                  endure.
                </p>
              </div>

              {/* Feature Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="group p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 shadow-glass-sm hover:shadow-glass transition-all duration-300 hover:scale-105">
                  <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-secondary-900 mb-2">
                    Modern Designs
                  </h3>
                  <p className="text-secondary-600 text-sm leading-relaxed">
                    Contemporary architecture that matches current trends and
                    modern living standards.
                  </p>
                </div>

                <div className="group p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 shadow-glass-sm hover:shadow-glass transition-all duration-300 hover:scale-105">
                  <div className="w-12 h-12 bg-accent-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-secondary-900 mb-2">
                    Expert Team
                  </h3>
                  <p className="text-secondary-600 text-sm leading-relaxed">
                    Experienced architects and designers with years of industry
                    expertise.
                  </p>
                </div>

                <div className="group p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 shadow-glass-sm hover:shadow-glass transition-all duration-300 hover:scale-105">
                  <div className="w-12 h-12 bg-secondary-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-secondary-900 mb-2">
                    Affordable Pricing
                  </h3>
                  <p className="text-secondary-600 text-sm leading-relaxed">
                    Quality designs at competitive prices with transparent
                    pricing.
                  </p>
                </div>

                <div className="group p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 shadow-glass-sm hover:shadow-glass transition-all duration-300 hover:scale-105">
                  <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-secondary-900 mb-2">
                    Quality Assurance
                  </h3>
                  <p className="text-secondary-600 text-sm leading-relaxed">
                    Rigorous quality control and attention to detail in every
                    project.
                  </p>
                </div>
              </div>
            </div>

            {/* Image Side */}
            <div className="relative">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=600&fit=crop"
                  alt="Modern architectural workspace"
                  className="rounded-3xl shadow-modern-lg w-full object-cover"
                />

                {/* Floating stats card */}
                <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-glass border border-white/50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-secondary-900">
                        98%
                      </div>
                      <div className="text-sm text-secondary-600">
                        Client Satisfaction
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute top-6 right-6 bg-accent-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                  Award Winning
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Contact Section */}
      <section
        id="contact"
        className="py-16 sm:py-20 md:py-24 bg-linear-to-br from-white via-secondary-50/30 to-primary-50/20 relative"
      >
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        {/* Simple decorative background */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-100/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-100/30 rounded-full blur-3xl"></div>

        <div className="relative mx-auto px-6 w-full max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4 sm:mb-6 font-['Gilroy']">
                  Let's Create Something
                  <span className="block bg-linear-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                    Extraordinary
                  </span>
                </h2>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  Transform your architectural dreams into reality with our
                  expert team. From concept to completion, we bring unparalleled
                  creativity and technical excellence to every project.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-primary-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Phone</p>
                    <p className="text-gray-600">
                      {import.meta.env.VITE_COMPANY_PHONE || "+91 7070 580 889"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-accent-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <p className="text-gray-600">
                      {import.meta.env.VITE_COMPANY_EMAIL ||
                        "connect@vastunaksha.online"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-secondary-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Location</p>
                    <p className="text-gray-600">
                      {import.meta.env.VITE_COMPANY_LOCATION ||
                        "Bangalore, India"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600 mb-1">
                    24/7
                  </div>
                  <div className="text-sm text-gray-600">Support</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent-600 mb-1">
                    Free
                  </div>
                  <div className="text-sm text-gray-600">Consultation</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary-600 mb-1">
                    100%
                  </div>
                  <div className="text-sm text-gray-600">Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Contact Actions */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center font-['Gilroy']">
                  Ready to Start Your Project?
                </h3>

                <div className="space-y-4">
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-300 flex items-center justify-center gap-3 group"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="currentColor"
                        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
                      />
                    </svg>
                    Start Your 3D Project
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </a>

                  <a
                    href={`mailto:${
                      import.meta.env.VITE_COMPANY_EMAIL ||
                      "connect@vastunaksha.online"
                    }`}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-300 flex items-center justify-center gap-3 group"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Get 3D Consultation
                  </a>
                </div>
              </div>

              <div className="text-center text-gray-500 text-sm">
                We typically respond within 24 hours
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="bg-gray-900 text-white relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-gray-900 via-gray-800 to-gray-900"></div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent-500/5 rounded-full blur-3xl"></div>

        <div className="relative mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">V</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">VastuNaksha</h3>
                  <p className="text-gray-400 text-sm">
                    Architectural Excellence
                  </p>
                </div>
              </div>

              <p className="text-gray-300 text-base leading-relaxed max-w-lg">
                Crafting extraordinary architectural experiences that blend
                innovation, functionality, and timeless elegance. Transform your
                vision into reality with our expert team.
              </p>

              {/* Social Links */}
              <div className="flex gap-4">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-300"
                  title="WhatsApp"
                >
                  <svg
                    className="w-6 h-6 text-white"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="currentColor"
                      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
                    />
                  </svg>
                </a>
                <a
                  href={`mailto:${
                    import.meta.env.VITE_COMPANY_EMAIL ||
                    "connect@vastunaksha.online"
                  }`}
                  className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-300"
                  title="Email"
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { href: "#home", label: "Home" },
                  { href: "#designs", label: "Designs" },
                  { href: "#about", label: "About Us" },
                  { href: "#contact", label: "Contact" },
                ].map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white">Our Services</h4>
              <ul className="space-y-3">
                {[
                  "House Designs",
                  "3D Front Designs",
                  "Interior Designs",
                  "Floor Plans",
                  "Consultation",
                ].map((service, index) => (
                  <li key={index} className="text-gray-300">
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Info Bar */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              {[
                {
                  icon: (
                    <svg
                      className="w-6 h-6 text-primary-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  ),
                  title: "Phone",
                  content:
                    import.meta.env.VITE_COMPANY_PHONE || "+91 7070 580 889",
                  href: `tel:${
                    import.meta.env.VITE_COMPANY_PHONE || "+91 7070 580 889"
                  }`,
                },
                {
                  icon: (
                    <svg
                      className="w-6 h-6 text-accent-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  ),
                  title: "Email",
                  content:
                    import.meta.env.VITE_COMPANY_EMAIL ||
                    "connect@vastunaksha.online",
                  href: `mailto:${
                    import.meta.env.VITE_COMPANY_EMAIL ||
                    "connect@vastunaksha.online"
                  }`,
                },
                {
                  icon: (
                    <svg
                      className="w-6 h-6 text-secondary-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  ),
                  title: "Location",
                  content:
                    import.meta.env.VITE_COMPANY_LOCATION || "Bangalore, India",
                  href: "#",
                },
              ].map((item, index) => (
                <div key={index} className="group">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h5 className="font-semibold text-white mb-2">
                    {item.title}
                  </h5>
                  {item.href !== "#" ? (
                    <a
                      href={item.href}
                      className="text-gray-300 hover:text-white transition-colors duration-300"
                    >
                      {item.content}
                    </a>
                  ) : (
                    <p className="text-gray-300">{item.content}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                © 2025 VastuNaksha. All rights reserved.
              </p>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <span>Made with</span>
                <span className="text-red-500">❤️</span>
                <span>for modern living</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* 3D Floating WhatsApp Button */}
      <a
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-3d hover:shadow-3d-lg transition-all duration-300 hover:scale-[1.1] z-50 animate-pulse-gentle preserve-3d hover-3d"
        title="Chat with us on WhatsApp"
      >
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
          />
        </svg>
      </a>
    </div>
  );
}
