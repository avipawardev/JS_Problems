import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
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
    let message = "Hi VastuNaksha! I am interested in your designs.";

    if (userFormData) {
      message = `Hi VastuNaksha! I am ${userFormData.name} from ${userFormData.location}. I am interested in your designs.`;
    }

    return `https://wa.me/917070580889?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section
        id="home"
        className="relative h-screen md:h-[600px] overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&h=800&fit=crop"
            alt="Modern house"
            className="w-full h-full object-cover"
          />
          {/* Enhanced Overlay for better text readability */}
          <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/40 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="max-w-2xl lg:pl-20">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
                Design Your Dream Home
              </h1>
              <p className="text-lg md:text-xl text-gray-100 mb-10 animate-fade-in-delay leading-relaxed">
                Modern, minimalist architectural designs tailored to your vision
                and budget.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 space-x-0 sm:space-x-4 animate-fade-in-delay-2">
                <button
                  onClick={() =>
                    document
                      .getElementById("designs")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                  className="px-8 py-4 bg-black text-white rounded-xl font-semibold hover:bg-gray-900 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl"
                >
                  Explore Designs
                </button>
                <button
                  onClick={() =>
                    document
                      .getElementById("contact")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                  className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-black transition-all duration-300 hover:scale-105"
                >
                  Get Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="designs" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 animate-slide-up">
            <h2 className="text-4xl font-bold text-black mb-4 animate-bounce-in">
              Our Collections
            </h2>
            <div className="h-1 w-24 bg-black rounded-full animate-scale-in" />
          </div>

          {/* Category Filters */}
          <div
            className="flex flex-wrap gap-4 overflow-x-auto pb-3 justify-center p-4 rounded-lg animate-slide-left"
            style={{ marginBottom: "60px" }}
          >
            {categories.map((category, index) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-7 py-3 rounded-lg font-bold transition-all whitespace-nowrap text-sm border-2 animate-stagger-${
                  index + 1
                } ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white border-blue-700 shadow-lg scale-105"
                    : "bg-black text-white border-gray-600 hover:bg-gray-800"
                }`}
                style={{
                  backgroundColor:
                    selectedCategory === category ? "#2563eb" : "#000000",
                  color: "#ffffff",
                  borderColor:
                    selectedCategory === category ? "#1d4ed8" : "#4b5563",
                  minWidth: "120px",
                  minHeight: "44px",
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Designs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDesigns.map((design, index) => (
              <DesignCard key={design.id} design={design} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-left">
              <h2 className="text-4xl font-bold text-black mb-6 animate-bounce-in">
                Why Choose Us
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4 animate-stagger-1">
                  <div className="shrink-0 w-10 h-10 bg-black rounded-lg flex items-center justify-center animate-rotate-in">
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-black">
                      Modern Designs
                    </h3>
                    <p className="text-gray-600">
                      Contemporary architecture that matches current trends
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 animate-stagger-2">
                  <div className="shrink-0 w-10 h-10 bg-black rounded-lg flex items-center justify-center animate-rotate-in">
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-black">
                      Expert Team
                    </h3>
                    <p className="text-gray-600">
                      Experienced architects and designers
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 animate-stagger-3">
                  <div className="shrink-0 w-10 h-10 bg-black rounded-lg flex items-center justify-center animate-rotate-in">
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-black">
                      Affordable Pricing
                    </h3>
                    <p className="text-gray-600">
                      Quality designs at competitive prices
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="animate-slide-up">
              <img
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=600&fit=crop"
                alt="Team"
                className="rounded-2xl shadow-xl animate-scale-in"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6 text-center animate-slide-up">
          <h2 className="text-4xl font-bold text-black mb-6 animate-bounce-in">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-600 mb-8 animate-fade-in-delay">
            Connect with our team via WhatsApp to discuss your design
            requirements and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-black text-white rounded-lg font-semibold hover:bg-gray-900 transition-all transform hover:scale-105 shadow-md animate-pulse-gentle"
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#25D366"
                  d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
                />
              </svg>
              Connect via WhatsApp
            </a>
            <a
              href="mailto:connect@vastunaksha.online"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-black text-black rounded-lg font-semibold hover:bg-black hover:text-white transition-all transform hover:scale-105 animate-float"
            >
              <svg
                className="w-6 h-6"
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
              Email Us
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-black font-bold text-lg">V</span>
                </div>
                <span className="font-bold text-lg">VastuNaksha</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Modern architectural designs crafted with precision and
                innovation for your dream home.
              </p>
              <div className="mt-6 flex gap-4">
                <a
                  href="https://wa.me/917070580889"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                  title="WhatsApp"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="#25D366"
                      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
                    />
                  </svg>
                </a>
                <a
                  href="mailto:connect@vastunaksha.online"
                  className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors"
                  title="Email"
                >
                  <svg
                    className="w-5 h-5 text-white"
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
            <div>
              <h4 className="font-bold text-white mb-6">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href="#home"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#designs"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Designs
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Design Categories */}
            <div>
              <h4 className="font-bold text-white mb-6">Categories</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href="#designs"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    House Designs
                  </a>
                </li>
                <li>
                  <a
                    href="#designs"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Commercial
                  </a>
                </li>
                <li>
                  <a
                    href="#designs"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    3D Designs
                  </a>
                </li>
                <li>
                  <a
                    href="#designs"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Interior Design
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-bold text-white mb-6">Get in Touch</h4>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-gray-400 mb-1">Email</p>
                  <a
                    href="mailto:connect@vastunaksha.online"
                    className="text-white hover:text-gray-300 transition-colors break-all"
                  >
                    connect@vastunaksha.online
                  </a>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Phone</p>
                  <a
                    href="tel:+917070580889"
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    +91 7070 580 889
                  </a>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Location</p>
                  <p className="text-white">Bangalore, India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                © 2025 VastuNaksha. All rights reserved.
              </p>
              <p className="text-gray-400 text-sm">
                Crafted with <span className="text-red-500">❤️</span> for modern
                living
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50 animate-bounce-gentle"
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
