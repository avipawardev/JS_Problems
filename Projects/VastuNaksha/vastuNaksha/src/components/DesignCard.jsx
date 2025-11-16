import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DesignCard({ design }) {
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
      className="group cursor-pointer h-full"
    >
      <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col hover:scale-105 border border-gray-100">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gray-200 rounded-lg mb-4">
          <img
            src={design.image}
            alt={design.title}
            className={`w-full h-full object-cover transition-transform duration-500 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="inline-block px-3 py-1 bg-black/80 text-white text-xs font-semibold rounded-full">
              {design.category}
            </span>
          </div>

          {/* Overlay */}
          <div
            className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Size Badge */}
          {design.size && (
            <div className="absolute bottom-4 right-4">
              <span className="inline-block px-3 py-1 bg-white text-black text-xs font-semibold rounded-full">
                {design.size}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-black mb-2 group-hover:text-gray-800 transition-colors">
            {design.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-2">
            {design.description}
          </p>

          {/* Highlights Preview */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {design.highlights &&
              Object.entries(design.highlights)
                .slice(0, 2)
                .map(([key, value]) => (
                  <span
                    key={key}
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full"
                  >
                    {typeof value === "object" ? key : `${key}: ${value}`}
                  </span>
                ))}
          </div>

          {/* CTA */}
          <div className="mt-4 flex items-center gap-2 text-black font-semibold text-sm group-hover:gap-3 transition-all">
            View Details
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
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
    </div>
  );
}
