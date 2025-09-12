import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const todos = useSelector((state) => state);

  const dispatch = useDispatch();
  return (
    <>
      <h1>Todo List</h1>
      <input type="text" onChange={(e) => setTask(e.target.value)} />
      <button onClick={() => dispatch({ type: "Add", payload: task })}>
        Add Task
      </button>

      <ul>
        {todos.map((task) => (
          <li key={task.id}>
            <span
              style={{
                cursor: "pointer",
                textDecoration: task.completed ? "line-through" : "none",
              }}
              onClick={() => dispatch({ type: "Toggle", payload: task.id })}
            >
              {task.text}
            </span>
            <button onClick={() => dispatch({ type: "Del", payload: task.id })}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
