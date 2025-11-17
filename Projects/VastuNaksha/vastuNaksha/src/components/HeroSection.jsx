export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden transform-3d"
    >
      {/* 3D Background with Multiple Layers */}
      <div className="absolute inset-0 perspective-1500">
        {/* Base Background Image */}
        <div className="absolute inset-0 translate-z-neg-20">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&h=800&fit=crop"
            alt="Modern architectural design"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 3D Gradient Overlays */}
        <div className="absolute inset-0 bg-3d-gradient translate-z-10"></div>
        <div className="absolute inset-0 bg-black/50 translate-z-5"></div>

        {/* Animated 3D Mesh */}
        <div className="absolute inset-0 bg-3d-mesh animate-morph-3d translate-z-15"></div>

        {/* Additional 3D Floating Gradients */}
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-primary-600/20 via-transparent to-accent-600/20 animate-parallax-3d translate-z-20"></div>
      </div>

      {/* 3D Floating Geometric Elements */}
      <div
        className="absolute top-20 left-10 animate-float-3d preserve-3d"
        style={{ animationDelay: "0s" }}
      >
        <div className="w-32 h-32 bg-gradient-primary/30 rounded-full blur-xl animate-morph-3d shadow-3d-lg particle-3d"></div>
      </div>
      <div
        className="absolute top-40 right-20 animate-float-3d preserve-3d"
        style={{ animationDelay: "2s" }}
      >
        <div
          className="w-24 h-24 bg-gradient-accent/40 rounded-full blur-lg animate-morph-3d shadow-3d particle-3d"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>
      <div
        className="absolute bottom-32 left-1/4 animate-float-3d preserve-3d"
        style={{ animationDelay: "4s" }}
      >
        <div
          className="w-20 h-20 bg-gradient-secondary/35 rounded-full blur-md animate-morph-3d shadow-3d particle-3d"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Additional 3D Floating Cubes */}
      <div
        className="absolute top-1/3 right-1/4 animate-cube-rotate preserve-3d"
        style={{ animationDelay: "1s" }}
      >
        <div className="w-16 h-16 bg-gradient-primary/20 rounded-lg shadow-3d-lg transform rotate-x-12 rotate-y-12"></div>
      </div>
      <div
        className="absolute bottom-1/3 left-1/3 animate-cube-rotate preserve-3d"
        style={{ animationDelay: "3s" }}
      >
        <div className="w-12 h-12 bg-gradient-accent/25 rounded-lg shadow-3d transform rotate-x-12 rotate-y-12"></div>
      </div>

      {/* 3D Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none perspective-1000">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/40 rounded-full animate-float-3d preserve-3d shadow-3d"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 6}s`,
              transform: `translateZ(${Math.random() * 50}px)`,
            }}
          >
            <div className="absolute inset-0 bg-white/60 rounded-full animate-depth-pulse"></div>
          </div>
        ))}
      </div>

      {/* 3D Hero Content */}
      <div className="relative min-h-screen flex items-center justify-center preserve-3d">
        <div className="mx-auto px-6 w-full max-w-7xl perspective-1000">
          <div className="text-center transform translate-z-30">
            {/* 3D Premium Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/15 backdrop-blur-2xl border border-white/30 rounded-full text-white text-sm font-semibold mb-8 animate-fade-in shadow-3d-lg hover-3d preserve-3d">
              <div className="w-3 h-3 bg-gradient-primary rounded-full animate-depth-pulse shadow-3d"></div>
              <span className="bg-linear-to-r from-white to-white/90 bg-clip-text text-transparent font-['Gilroy']">
                3D Architectural Designs
              </span>
              <div
                className="w-3 h-3 bg-gradient-accent rounded-full animate-depth-pulse shadow-3d"
                style={{ animationDelay: "0.5s" }}
              ></div>
            </div>

            {/* 3D Enhanced Typography */}
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 sm:mb-8 animate-slide-up preserve-3d hover-tilt-3d transition-transform duration-700 font-['Gilroy']"
              style={{ lineHeight: "1.1" }}
            >
              <span className="block bg-linear-to-r from-white via-primary-200 to-accent-200 bg-clip-text text-transparent drop-shadow-2xl animate-depth-pulse">
                Design Your
              </span>
              <br />
              <span
                className="block bg-linear-to-r from-white via-primary-200 to-accent-200 bg-clip-text text-transparent drop-shadow-2xl animate-depth-pulse font-black"
                style={{ animationDelay: "0.2s" }}
              >
                3D Dream Space
              </span>
            </h1>

            <p
              className="text-sm sm:text-base md:text-lg lg:text-xl text-white mb-8 sm:mb-12 animate-fade-in leading-relaxed max-w-3xl mx-auto font-light px-4 sm:px-6 md:px-8"
              style={{ animationDelay: "0.2s" }}
            >
              Transform your vision into reality with cutting-edge architectural
              designs that blend{" "}
              <span className="font-semibold text-white">innovation</span>,{" "}
              <span className="font-semibold text-white">functionality</span>,
              and{" "}
              <span className="font-semibold text-white">
                timeless elegance
              </span>
              .
            </p>

            {/* 3D Premium CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center animate-fade-in preserve-3d px-4 sm:px-0"
              style={{ animationDelay: "0.4s" }}
            >
              <button
                onClick={() =>
                  document
                    .getElementById("designs")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-white text-surface-900 rounded-3xl font-bold text-base sm:text-lg overflow-hidden transition-all duration-700 hover-lift-3d active:scale-95 focus:outline-none focus:ring-4 focus:ring-white/30 shadow-3d-xl font-['Gilroy'] preserve-3d"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <span>Explore 3D Designs</span>
                  <svg
                    className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-2"
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
                </span>
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl translate-z-5"></div>
                <div className="absolute inset-0 bg-linear-to-r from-primary-500/20 to-accent-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl -z-10 translate-z-neg-10"></div>
              </button>

              <button
                onClick={() =>
                  document
                    .getElementById("contact")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-white/15 backdrop-blur-2xl border-2 border-white/40 text-white hover:bg-white/25 rounded-3xl font-bold text-base sm:text-lg overflow-hidden transition-all duration-700 hover-lift-3d active:scale-95 focus:outline-none focus:ring-4 focus:ring-white/30 shadow-3d-lg font-['Gilroy'] preserve-3d"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <svg
                    className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <span>Get 3D Consultation</span>
                </span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl translate-z-5"></div>
                <div className="absolute inset-0 bg-gradient-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl -z-10 translate-z-neg-10"></div>
              </button>
            </div>

            {/* 3D Stats Section */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-12 sm:mt-16 max-w-2xl mx-auto preserve-3d px-4 sm:px-0">
              {[
                {
                  number: "500+",
                  label: "3D Projects Completed",
                  color: "primary",
                },
                { number: "50+", label: "Happy Clients", color: "accent" },
                { number: "5+", label: "Years Experience", color: "secondary" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center group preserve-3d hover-3d transition-transform duration-500"
                >
                  <div
                    className={`text-2xl sm:text-4xl font-black text-white mb-1 sm:mb-2 bg-linear-to-r from-${stat.color}-200 to-${stat.color}-100 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 animate-depth-pulse font-['Gilroy']`}
                  >
                    {stat.number}
                  </div>
                  <div className="text-white/70 text-xs sm:text-sm font-medium group-hover:text-white/90 transition-colors font-['Gilroy'] leading-tight">
                    {stat.label}
                  </div>
                  <div
                    className={`w-6 sm:w-8 h-0.5 sm:h-1 bg-linear-to-r from-${stat.color}-400 to-${stat.color}-600 mx-auto mt-1 sm:mt-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-3d`}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3D Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle preserve-3d hover-3d transition-transform duration-500">
        <div className="relative preserve-3d">
          <div className="w-8 h-14 border-2 border-white/40 rounded-full flex justify-center bg-white/10 backdrop-blur-2xl shadow-3d-lg">
            <div className="w-1.5 h-4 bg-gradient-primary rounded-full mt-3 animate-depth-pulse shadow-3d"></div>
          </div>
          <div className="absolute -inset-2 bg-gradient-primary/20 rounded-full blur-md opacity-0 animate-pulse-gentle translate-z-neg-10"></div>
        </div>
      </div>
    </section>
  );
}
