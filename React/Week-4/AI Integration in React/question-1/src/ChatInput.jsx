import React, { useContext, useState } from "react";
import { ChatContext } from "./ChatContext";

const ChatInput = () => {
  const { sendMessage, loading } = useContext(ChatContext);
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    sendMessage(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "10px" }}>
      <input
        type="text"
        value={text}
        disabled={loading}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message..."
        style={{ width: "70%" }}
      />
      <button type="submit" disabled={loading} style={{ marginLeft: "5px" }}>
        {loading ? "..." : "Send"}
      </button>
    </form>
  );
};

export default ChatInput;
