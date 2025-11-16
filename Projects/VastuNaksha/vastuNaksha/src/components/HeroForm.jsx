import { useState } from "react";

export default function HeroForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.location) {
      onSubmit(formData);
      setSubmitted(true);
      setTimeout(() => {
        setFormData({ name: "", location: "" });
        setSubmitted(false);
      }, 2000);
    }
  };

  return (
    <div className="absolute right-6 top-1/2 -translate-y-1/2 w-full max-w-md">
      {/* Desktop Form */}
      <div className="hidden md:block bg-white/85 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20">
        <h3 className="text-2xl font-bold text-black mb-2">Get Your Design</h3>
        <p className="text-gray-600 text-sm mb-6">
          Share your details to connect with us
        </p>

        {submitted ? (
          <div className="text-center py-8">
            <div className="mb-4">
              <svg
                className="w-16 h-16 text-green-500 mx-auto"
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
            <p className="text-gray-700 font-medium">
              Thank you! We'll contact you soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors placeholder-gray-500"
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Your Location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors placeholder-gray-500"
              required
            />
            <button
              type="submit"
              className="w-full px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-900 transition-all transform hover:scale-105 active:scale-95"
            >
              Get in Touch
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
