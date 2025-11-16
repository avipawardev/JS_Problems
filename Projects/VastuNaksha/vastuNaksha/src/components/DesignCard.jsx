import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DesignCard({ design, index = 0 }) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/design/${design.id}`);
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer h-full animate-fade-in-up w-full max-w-sm mx-auto transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 h-full flex flex-col border border-gray-100">
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden bg-gray-50">
          <img
            src={design.image}
            alt={design.title}
            className={`w-full h-full object-cover transition-all duration-500 ${
              isHovered ? "scale-105" : "scale-100"
            }`}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-sm font-semibold rounded-xl shadow-sm">
              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
              {design.category}
            </span>
          </div>

          {/* Size badge */}
          {design.size && (
            <div className="absolute bottom-4 right-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-sm font-semibold rounded-xl shadow-sm">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                {design.size}
              </span>
            </div>
          )}

          {/* Hover overlay */}
          <div
            className={`absolute inset-0 bg-linear-to-br from-primary-500/90 to-accent-500/90 flex items-center justify-center transition-all duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="text-center text-white">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <p className="text-lg font-bold font-['Gilroy']">View Details</p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 flex-1 flex flex-col bg-white">
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300 leading-tight line-clamp-2 font-['Gilroy']">
            {design.title}
          </h3>

          <p className="text-gray-600 text-sm mb-4 flex-1 leading-relaxed line-clamp-3">
            {design.description}
          </p>

          {/* Highlights */}
          <div className="flex flex-wrap gap-2 mb-4">
            {design.highlights &&
              Object.entries(design.highlights)
                .slice(0, 2)
                .map(([key, value]) => (
                  <span
                    key={key}
                    className="inline-flex items-center gap-1 text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-lg font-medium"
                  >
                    <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                    {typeof value === "object" ? key : `${key}: ${value}`}
                  </span>
                ))}
          </div>

          {/* CTA Button */}
          <button className="group/btn relative w-full py-3 px-4 bg-linear-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary-500/20 shadow-md hover:shadow-lg font-['Gilroy']">
            <span className="relative z-10 flex items-center justify-center gap-2">
              <span>View Details</span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
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
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
