import React from "react";
import "./Card.css";

export default function Card({ title, image, description }) {
  return (
    <div className="card">
      <h2 className="card-title">{title}</h2>
      <img src={image} alt="Card visual" className="card-image" />
      <p className="card-description">{description}</p>
    </div>
  );
}
