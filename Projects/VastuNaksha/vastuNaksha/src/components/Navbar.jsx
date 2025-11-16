import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WhatsAppModal from "./WhatsAppModal";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 overflow-hidden preserve-3d">
      {/* Seamless Integration with Hero Background */}
      <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-transparent preserve-3d" />
      <div className="absolute inset-0 bg-linear-to-r from-primary-500/5 via-transparent to-accent-500/5 preserve-3d" />

      {/* 3D Floating Elements */}
      <div
        className="absolute top-4 right-20 w-16 h-16 bg-gradient-primary/10 rounded-full blur-xl animate-float-3d opacity-60 preserve-3d particle-3d"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute top-6 left-32 w-12 h-12 bg-gradient-accent/15 rounded-full blur-lg animate-float-3d opacity-40 preserve-3d particle-3d"
        style={{ animationDelay: "3s" }}
      />

      <div className="relative mx-auto px-6 py-4 preserve-3d">
        <div className="flex items-center justify-between">
          {/* 3D Integrated Logo */}
          <div
            onClick={() => navigate("/")}
            className="cursor-pointer flex items-center gap-3 shrink-0 group preserve-3d hover-3d"
          >
            <div className="relative preserve-3d">
              <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-3d group-hover:shadow-3d-lg transition-all duration-500 group-hover:scale-110 preserve-3d">
                <span className="text-surface-800 font-bold text-xl font-['Gilroy']">
                  V
                </span>
              </div>
              <div className="absolute -inset-1 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm preserve-3d"></div>
            </div>
            <div className="hidden sm:block preserve-3d">
              <h3 className="text-2xl font-bold text-white drop-shadow-lg font-['Gilroy']">
                VastuNaksha
              </h3>
              <p className="text-xs text-white/80 font-medium drop-shadow font-['Gilroy']">
                3D Architectural Excellence
              </p>
            </div>
          </div>

          {/* Seamlessly Integrated Menu */}
          <div className="hidden md:flex items-center justify-center gap-8 flex-1 preserve-3d">
            {[
              { id: "home", label: "Home" },
              { id: "designs", label: "Designs" },
              { id: "about", label: "About" },
              { id: "contact", label: "Contact" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative px-4 py-2 text-white/90 hover:text-white transition-all duration-300 font-medium group drop-shadow-sm preserve-3d hover-3d"
              >
                <span className="relative z-10 font-['Gilroy']">
                  {item.label}
                </span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300 backdrop-blur-sm preserve-3d"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-linear-to-r from-primary-400 to-accent-400 group-hover:w-full transition-all duration-300 rounded-full preserve-3d"></div>
              </button>
            ))}
          </div>

          {/* 3D Integrated CTA Button */}
          <div className="hidden md:block shrink-0 preserve-3d">
            <button
              onClick={() => setShowWhatsAppModal(true)}
              className="group relative px-6 py-3 bg-white/90 backdrop-blur-sm text-surface-900 rounded-2xl font-semibold transition-all duration-500 hover:scale-105 hover:shadow-3d active:scale-95 focus:outline-none focus:ring-4 focus:ring-white/30 shadow-3d preserve-3d hover-3d"
            >
              <span className="relative z-10 flex items-center gap-2 font-['Gilroy']">
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#25D366"
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
                  />
                </svg>
                <span>Start Project</span>
              </span>
              <div className="absolute inset-0 bg-gradient-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl preserve-3d"></div>
            </button>
          </div>

          {/* 3D Integrated Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-3 hover:bg-white/10 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 group backdrop-blur-sm preserve-3d hover-3d"
          >
            <div className="relative w-6 h-6 preserve-3d">
              <span
                className={`absolute inset-0 transition-all duration-300 preserve-3d ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                <span
                  className={`block absolute h-0.5 w-6 bg-white transform transition duration-300 preserve-3d ${
                    isOpen ? "rotate-90" : "-translate-y-2"
                  }`}
                ></span>
                <span
                  className={`block absolute h-0.5 w-6 bg-white transform transition duration-300 preserve-3d ${
                    isOpen ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`block absolute h-0.5 w-6 bg-white transform transition duration-300 preserve-3d ${
                    isOpen ? "-rotate-90" : "translate-y-2"
                  }`}
                ></span>
              </span>
            </div>
          </button>
        </div>

        {/* 3D Integrated Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-6 animate-fade-in-up preserve-3d">
            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 shadow-3d-lg preserve-3d">
              <div className="space-y-4 preserve-3d">
                {[
                  { id: "home", label: "Home" },
                  { id: "designs", label: "Designs" },
                  { id: "about", label: "About" },
                  { id: "contact", label: "Contact" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left px-4 py-3 text-white hover:text-surface-900 hover:bg-white/90 rounded-2xl transition-all duration-300 hover:translate-x-2 font-medium backdrop-blur-sm preserve-3d hover-3d"
                  >
                    <span className="font-['Gilroy']">{item.label}</span>
                  </button>
                ))}

                <div className="pt-4 border-t border-white/30 preserve-3d">
                  <button
                    onClick={() => setShowWhatsAppModal(true)}
                    className="group relative w-full px-6 py-4 bg-white text-surface-900 rounded-2xl font-semibold hover:scale-105 hover:shadow-3d active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 shadow-3d preserve-3d hover-3d"
                  >
                    <svg
                      className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="#25D366"
                        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
                      />
                    </svg>
                    <span className="font-['Gilroy']">Start Your Project</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* WhatsApp Modal */}
      <WhatsAppModal
        isOpen={showWhatsAppModal}
        onClose={() => setShowWhatsAppModal(false)}
      />
    </nav>
  );
}
