import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FeedbackProvider } from "./FeedbackContext";
import FeedbackForm from "./FeedbackForm";
import FeedbackSummary from "./FeedbackSummary";

const App = () => {
  return (
    <FeedbackProvider>
      <Router>
        <Routes>
          <Route path="/" element={<FeedbackForm />} />
          <Route path="/summary" element={<FeedbackSummary />} />
        </Routes>
      </Router>
    </FeedbackProvider>
  );
};

export default App;
