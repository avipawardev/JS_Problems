import React from "react";
import { ChatProvider } from "./ChatContext";
import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";

const App = () => {
  return (
    <ChatProvider>
      <div style={{ width: "400px", margin: "50px auto", fontFamily: "Arial" }}>
        <h2>Gemini Chat</h2>
        <ChatWindow />
        <ChatInput />
      </div>
    </ChatProvider>
  );
};

export default App;
