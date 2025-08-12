import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div>
      <h1>About Page</h1>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/contact">Contact</Link>
      </nav>
    </div>
  );
}
