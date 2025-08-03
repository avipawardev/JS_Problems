import React from "react";

const CorrectedText = ({ text, corrections }) => {
  const words = text.split(" ");
  let correctedCount = 0;
// eth receive ['teh','receive']
  const correctedWords = words.map(word => {
    if (corrections[word]) {
      correctedCount++;
      return corrections[word];
    }
    return word;
  });

  return (
    <div style={{ marginTop: "20px" }}>
      <p><strong>Corrected:</strong> {correctedWords.join(" ")}</p>
      <p><strong>Corrections Made:</strong> {correctedCount}</p>
    </div>
  );
};

export default CorrectedText;
