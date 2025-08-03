import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './QuoteGenerator.css'; // 🔗 External CSS

function QuoteGenerator() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  const fetchQuote = async () => {
    try {
      const response = await axios.get('https://api.quotable.io/random');
      setQuote(response.data.content);
      setAuthor(response.data.author);
    } catch (error) {
      setQuote('Failed to load quote.');
      setAuthor('');
      console.error('Error fetching quote:', error);
    }
  };

  useEffect(() => {
    fetchQuote();

    const intervalId = setInterval(fetchQuote, 30000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="quote-container">
      <h2>📝 Daily Quote Generator</h2>
      <p className="quote">"{quote}"</p>
      <p className="author">— {author}</p>
      <button onClick={fetchQuote} className="get-quote-btn">Get New Quote</button>
    </div>
  );
}

export default QuoteGenerator;
