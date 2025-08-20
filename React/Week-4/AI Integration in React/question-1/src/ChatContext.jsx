import React, { createContext, useEffect, useState } from "react";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState(() => {
    // Load from localStorage
    const saved = localStorage.getItem("chat");
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);

  // Save to localStorage whenever messages change
  useEffect(() => {
    localStorage.setItem("chat", JSON.stringify(messages));
  }, [messages]);

  const addMessage = (role, text) => {
    setMessages((prev) => [...prev, { role, text }]);
  };

  const sendMessage = async (userText) => {
    addMessage("user", userText);
    setLoading(true);
    try {
      const res = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_GEMINI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gemini-1.5-flash",
            messages: [{ role: "user", content: userText }],
          }),
        }
      );

      const data = await res.json();
      const reply =
        data.choices?.[0]?.message?.content ||
        "⚠️ No response from Gemini API.";
      addMessage("assistant", reply);
    } catch (err) {
      addMessage("assistant", "❌ Error fetching response.");
    }
    setLoading(false);
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage, loading }}>
      {children}
    </ChatContext.Provider>
  );
};
