import React from "react";
import Card from "./components/Card";
import "./index.css";

export default function App() {
  return (
    <div style={{ padding: "20px" }}>
      <Card
        title="Beautiful Mountain"
        image="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
        description="Experience the serene beauty of the mountains with fresh air, calm landscapes, and breathtaking views."
      />
    </div>
  );
}
