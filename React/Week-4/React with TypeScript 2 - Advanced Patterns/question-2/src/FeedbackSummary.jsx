import React, { useContext } from "react";
import { FeedbackContext } from "./FeedbackContext";

const FeedbackSummary = () => {
  const { feedback } = useContext(FeedbackContext);

  return (
    <div>
      <h2>Feedback Summary</h2>
      <p><strong>Name:</strong> {feedback.name}</p>
      <p><strong>Email:</strong> {feedback.email}</p>
      <p><strong>Comments:</strong> {feedback.comments}</p>
    </div>
  );
};

export default FeedbackSummary;
