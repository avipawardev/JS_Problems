import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DesignDetails from "./pages/DesignDetails";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/design/:id" element={<DesignDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
