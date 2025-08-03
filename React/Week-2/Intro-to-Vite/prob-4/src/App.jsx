import React from 'react'
import CorrectedText from './CorrectedText';
import { useState } from 'react';

const corrections = {
  "teh": "the",
  "recieve": "receive",
  "adress": "address",
  "wierd": "weird",
  "thier": "their"
};
const App = () => {
   const [inputText, setInputText] = useState("");

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  return (
    <div>
      <h2>AutoCorrect App</h2>
      {console.log(inputText)}
      <input
        type="text"
        placeholder="Type here..."
        value={inputText}
        onChange={handleChange}
        style={{ width: "100%", padding: "10px", fontSize: "16px" }}
      />

      {/* Basic Version: Uncomment below if not doing Bonus Challenge */}
      {/* <p style={{ marginTop: "20px" }}>
        {inputText.split(" ").map(word => corrections[word] || word).join(" ")}
      </p> */}

      {/* Bonus Challenge */}
      <CorrectedText text={inputText} corrections={corrections} />
    </div>
  );
}

export default App