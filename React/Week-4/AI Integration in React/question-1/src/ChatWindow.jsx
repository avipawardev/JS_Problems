import React, { useContext, useEffect, useRef } from "react";
import { ChatContext } from "./ChatContext";

const ChatWindow = () => {
  const { messages } = useContext(ChatContext);
  const endRef = useRef();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div style={{ height: "300px", overflowY: "auto", border: "1px solid #ccc", padding: "10px" }}>
      {messages.map((msg, i) => (
        <div
          key={i}
          style={{
            textAlign: msg.role === "user" ? "right" : "left",
            margin: "5px 0",
          }}
        >
          <strong>{msg.role === "user" ? "You" : "AI"}:</strong> {msg.text}
        </div>
      ))}
      <div ref={endRef}></div>
    </div>
  );
};

export default ChatWindow;
