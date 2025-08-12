import React from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

export default function App() {
  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h1>Redux Todo App</h1>
      <TodoInput />
      <TodoList />
    </div>
  );
}
