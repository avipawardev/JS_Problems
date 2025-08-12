import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTodo, deleteTodo } from "../store/TodoSlice";

export default function TodoList() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  return (
    <div>
      {todos.map((todo) => (
        <div
          key={todo.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "8px",
            border: "1px solid #ccc",
            padding: "5px 10px"
          }}
        >
          <div>
            <input
              type="checkbox"
              checked={todo.status}
              onChange={() => dispatch(toggleTodo(todo.id))}
            />
            <span
              style={{
                marginLeft: "8px",
                textDecoration: todo.status ? "line-through" : "none"
              }}
            >
              {todo.title}
            </span>
          </div>
          <button
            onClick={() => dispatch(deleteTodo(todo.id))}
            style={{ padding: "3px 8px", background: "red", color: "white", border: "none" }}
          >
            Delete
          </button>
        </div>
      ))}
      <h3>State as JSON:</h3>
      <pre>{JSON.stringify(todos, null, 2)}</pre>
    </div>
  );
}
