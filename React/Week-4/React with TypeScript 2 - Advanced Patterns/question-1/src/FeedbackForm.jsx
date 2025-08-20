import React, { useState } from "react";

const FeedbackForm = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: "",
    feedback: "",
  });

  // State for confirmation message
  const [submittedData, setSubmittedData] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: check if all fields filled
    if (!formData.name || !formData.email || !formData.rating || !formData.feedback) {
      alert("Please fill out all fields!");
      return;
    }

    // Save submitted data
    setSubmittedData(formData);

    // Reset form
    setFormData({
      name: "",
      email: "",
      rating: "",
      feedback: "",
    });
  };

  return (
    <div style={{ width: "400px", margin: "auto", padding: "20px", border: "1px solid #ccc" }}>
      <h2>Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label> <br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Email:</label> <br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Rating (1–5):</label> <br />
          <input
            type="number"
            name="rating"
            min="1"
            max="5"
            value={formData.rating}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Feedback:</label> <br />
          <textarea
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
          ></textarea>
        </div>

        <button type="submit" style={{ marginTop: "10px" }}>Submit</button>
      </form>

      {/* Confirmation Message */}
      {submittedData && (
        <div style={{ marginTop: "20px", background: "#e0ffe0", padding: "10px" }}>
          <h3>Thank you for your feedback!</h3>
          <p><strong>Name:</strong> {submittedData.name}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Rating:</strong> {submittedData.rating}</p>
          <p><strong>Feedback:</strong> {submittedData.feedback}</p>
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;
