import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTask, toggleTask } from "../redux/taskSlice";

export default function TaskList() {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Task List</h2>
      {tasks.length === 0 && <p>No tasks yet!</p>}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                cursor: "pointer"
              }}
              onClick={() => dispatch(toggleTask(task.id))}
            >
              {task.text}
            </span>
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => dispatch(removeTask(task.id))}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
