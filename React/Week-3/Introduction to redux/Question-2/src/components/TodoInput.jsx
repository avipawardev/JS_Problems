import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../store/TodoSlice";
import { v4 as uuidv4 } from "uuid";

export default function TodoInput() {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (title.trim() === "") return;
    dispatch(addTodo({ id: uuidv4(), title, status: false }));
    setTitle("");
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Enter todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ padding: "5px", width: "200px" }}
      />
      <button onClick={handleAdd} style={{ marginLeft: "10px", padding: "5px 10px" }}>
        Add
      </button>
    </div>
  );
}
