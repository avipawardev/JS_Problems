import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./TodoSlice";

export const Store = configureStore({
  reducer: {
    todos: todoReducer
  }
});
