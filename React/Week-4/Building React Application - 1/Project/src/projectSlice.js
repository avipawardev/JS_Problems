import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://YOUR_FIREBASE_URL/projects.json";

// Fetch projects
export const fetchProjects = createAsyncThunk("projects/fetch", async () => {
  const res = await axios.get(BASE_URL);
  return res.data || {};
});

// Add project
export const addProject = createAsyncThunk("projects/add", async (project) => {
  await axios.post(BASE_URL, project);
  return project;
});

const projectSlice = createSlice({
  name: "projects",
  initialState: { list: {}, status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        const id = Date.now();
        state.list[id] = action.payload;
      });
  }
});

export default projectSlice.reducer;
