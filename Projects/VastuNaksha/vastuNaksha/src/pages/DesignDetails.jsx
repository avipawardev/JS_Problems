import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { designsData } from "../data/designsData";

export default function DesignDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [design, setDesign] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [userFormData, setUserFormData] = useState(null);

  useEffect(() => {
    const selectedDesign = designsData.find((d) => d.id === parseInt(id));
    if (selectedDesign) {
      setDesign(selectedDesign);
    }
  }, [id]);

  useEffect(() => {
    // Retrieve user form data from localStorage if available
    const storedData = localStorage.getItem("userFormData");
    if (storedData) {
      setUserFormData(JSON.parse(storedData));
    }
  }, []);

  if (!design) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">Design not found</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-900 transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const imageVariations = [
    design.image,
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop",
  ];

  const sendWhatsAppMessage = () => {
    const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "917070580889"; // Fallback for development

    let message = `Hi, I am interested in "${design.title}" (Design ID: ${design.id}). `;

    if (userFormData) {
      message += `Name: ${userFormData.name}, Location: ${userFormData.location}.`;
    } else {
      message += `Please provide me more details about this design and the pricing.`;
    }

    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
      "_blank"
    );
  };

  const relatedDesigns = designsData
    .filter((d) => d.category === design.category && d.id !== design.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <button
              onClick={() => navigate("/")}
              className="hover:text-black transition-colors"
            >
              Home
            </button>
            <span>/</span>
            <button
              onClick={() => navigate("/")}
              className="hover:text-black transition-colors"
            >
              Designs
            </button>
            <span>/</span>
            <span className="text-black font-medium">{design.title}</span>
          </div>
        </div>
      </div>

      {/* Hero Image - Full Width */}
      <div className="relative h-96 md:h-[600px] lg:h-[700px] overflow-hidden bg-gray-200">
        <img
          src={design.image}
          alt={design.title}
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-6 pb-12 w-full">
            <div className="text-white">
              <div className="inline-block px-4 py-2 bg-black/80 text-white text-sm font-semibold rounded-full backdrop-blur-sm mb-4">
                {design.category}
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 animate-slide-up">
                {design.title}
              </h1>
              {design.size && (
                <div className="inline-block px-6 py-3 bg-white/90 text-black text-lg font-semibold rounded-full backdrop-blur-sm">
                  Plot Size: {design.size}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Grid Layout */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Description Column */}
          <div className="lg:col-span-1">
            <p className="text-lg text-gray-600 leading-relaxed">
              {design.description}
            </p>
          </div>

          {/* Highlights Column */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-black mb-6">
                Key Features
              </h3>
              <div className="grid grid-cols-2 gap-6">
                {design.highlights &&
                  Object.entries(design.highlights).map(([key, value]) => (
                    <div key={key} className="border-l-4 border-black pl-4">
                      <p className="text-gray-600 text-sm capitalize">
                        {key.replace(/_/g, " ")}
                      </p>
                      <p className="text-xl font-bold text-black">
                        {typeof value === "boolean"
                          ? value
                            ? "Yes"
                            : "No"
                          : value}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* CTA Buttons Column */}
          <div className="lg:col-span-1">
            <div className="flex flex-col gap-4 pt-8">
              <button
                onClick={sendWhatsAppMessage}
                className="group relative w-full px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 focus:outline-none focus:ring-4 focus:ring-green-500/20 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-3 text-lg">
                  <svg
                    className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="#25D366"
                      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
                    />
                  </svg>
                  Connect via WhatsApp
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-green-600 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button
                onClick={() => navigate("/")}
                className="group relative w-full px-8 py-4 border-2 border-black text-black hover:text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 focus:outline-none focus:ring-4 focus:ring-black/20 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Back to Designs
                </span>
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* Info Box */}
            {!userFormData && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mt-6">
                <p className="text-blue-900 font-medium">
                  💡 Tip: Fill the form on the home page to auto-fill your
                  details in WhatsApp messages!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Designs */}
      {relatedDesigns.length > 0 && (
        <section className="py-16 bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-black mb-12">
              Similar Designs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedDesigns.map((relatedDesign) => (
                <div
                  key={relatedDesign.id}
                  onClick={() => navigate(`/design/${relatedDesign.id}`)}
                  className="cursor-pointer group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all"
                >
                  <div className="relative h-40 overflow-hidden bg-gray-200">
                    <img
                      src={relatedDesign.image}
                      alt={relatedDesign.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-black mb-2">
                      {relatedDesign.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                      {relatedDesign.description}
                    </p>
                    <div className="flex items-center gap-2 text-black font-semibold text-sm">
                      View
                      <svg
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2025 VastuNaksha. Premium architectural designs for modern living.
          </p>
        </div>
      </footer>
    </div>
  );
}
