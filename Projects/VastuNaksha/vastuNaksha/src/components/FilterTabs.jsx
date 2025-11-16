export default function FilterTabs({
  categories,
  selectedCategory,
  onCategoryChange,
}) {
  const getCategoryIcon = (category) => {
    const icons = {
      All: (
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
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
      "House Designs": (
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
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
      "3D Front Designs": (
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
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      "Interior Designs": (
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
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
          />
        </svg>
      ),
      "Floor Plans": (
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
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    };
    return icons[category] || icons["All"];
  };

  return (
    <div className="w-full">
      {/* Premium Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-semibold border border-primary-100">
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
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
            />
          </svg>
          Design Categories
        </div>
      </div>

      {/* Premium Filter Tabs */}
      <div className="w-full overflow-x-auto pb-4">
        <div className="flex gap-4 md:justify-center md:flex-wrap min-w-max md:min-w-0 px-4 md:px-0">
          {categories.map((category, index) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`group relative flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-500 whitespace-nowrap overflow-hidden min-w-max transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-primary-500/20 ${
                  isSelected
                    ? "bg-linear-to-r from-primary-500 to-accent-500 text-white shadow-2xl shadow-primary-500/25 hover:shadow-primary-500/40"
                    : "bg-white/80 backdrop-blur-sm text-gray-700 hover:text-primary-600 border border-gray-200/50 hover:border-primary-200 hover:bg-white hover:shadow-lg"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div
                  className={`transition-all duration-300 ${
                    isSelected
                      ? "text-white"
                      : "text-primary-500 group-hover:scale-110"
                  }`}
                >
                  {getCategoryIcon(category)}
                </div>

                {/* Text */}
                <span className="relative z-10 font-['Gilroy'] text-sm md:text-base">
                  {category}
                </span>

                {/* Background Effects */}
                {isSelected && (
                  <div className="absolute inset-0 bg-linear-to-r from-accent-500 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                )}

                {/* Hover Glow Effect */}
                <div
                  className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
                    isSelected
                      ? "bg-white/10 opacity-0 group-hover:opacity-100"
                      : "bg-primary-50 opacity-0 group-hover:opacity-100"
                  }`}
                ></div>

                {/* Active Indicator */}
                {isSelected && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white rounded-full animate-pulse-gentle"></div>
                )}

                {/* Subtle Border Animation */}
                <div
                  className={`absolute inset-0 rounded-2xl border-2 transition-all duration-500 ${
                    isSelected
                      ? "border-white/30 opacity-0 group-hover:opacity-100"
                      : "border-primary-200 opacity-0 group-hover:opacity-100"
                  }`}
                ></div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Premium Stats Bar */}
      <div className="mt-8 flex justify-center">
        <div className="bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-2xl px-6 py-3 shadow-sm">
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse-gentle"></div>
              <span className="font-medium">
                {categories.length} Categories
              </span>
            </div>
            <div className="w-px h-4 bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 bg-accent-500 rounded-full animate-pulse-gentle"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <span className="font-medium">Premium Designs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
