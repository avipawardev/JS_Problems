import { useState } from "react";

export default function useToggleItems(initialValue, initialPosition = 0) {
  if (!Array.isArray(initialValue) || initialValue.length === 0) {
    throw new Error("initialValue must be a non-empty array");
  }

  const [index, setIndex] = useState(initialPosition);

  // Toggle function
  const toggle = () => {
    setIndex((prevIndex) => (prevIndex + 1) % initialValue.length);
  };

  return [initialValue[index], toggle];
}
