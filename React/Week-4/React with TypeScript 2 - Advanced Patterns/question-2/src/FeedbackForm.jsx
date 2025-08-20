import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FeedbackContext } from "./FeedbackContext";

const FeedbackForm = () => {
  const { feedback, setFeedback } = useContext(FeedbackContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation before navigating
    if (!feedback.name || !feedback.email || !feedback.comments) {
      alert("All fields are required!");
      return;
    }

    navigate("/summary");
  };

  return (
    <div>
      <h2>Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={feedback.name}
          onChange={handleChange}
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={feedback.email}
          onChange={handleChange}
        />
        <br />
        <textarea
          name="comments"
          placeholder="Your Comments"
          value={feedback.comments}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Go to Summary</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
