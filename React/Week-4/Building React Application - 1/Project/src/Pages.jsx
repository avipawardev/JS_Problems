import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects, addProject } from "./projectSlice";
import { useAuth } from "./AuthContext";
import { Link, useNavigate, useParams } from "react-router-dom";

// ---------- Dashboard ----------
export const Dashboard = () => {
  const dispatch = useDispatch();
  const projects = useSelector((s) => s.projects.list || {});

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  return (
    <div>
     <h1>Projects</h1>
{Object.entries(projects).length === 0 ? (
  <p>No projects found.</p>
) : (
  Object.entries(projects).map(([id, p]) => (
    <div key={id}>
      <Link to={`/project/${id}`}>{p.title}</Link>
    </div>
  ))
)}

      <Link to="/add">➕ Add Project</Link>
    </div>
  );
};

// ---------- Project Details ----------
export const ProjectDetails = () => {
  const { id } = useParams();
  const project = useSelector((s) => s.projects.list?.[id]);

  if (!project) return <p>Loading project...</p>;

  return (
    <div>
      <h2>{project.title}</h2>
      <p>{project.description || "No description provided."}</p>
      {/* Later: Add task management here */}
      <Link to="/">⬅ Back</Link>
    </div>
  );
};

// ---------- Add Project ----------
export const AddProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!title.trim()) {
      alert("Project title is required!");
      return;
    }
    dispatch(
      addProject({
        title,
        description,
        createdAt: new Date().toISOString(),
      })
    );
    navigate("/");
  };

  return (
    <div>
      <h2>Add Project</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <br />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <br />
      <button onClick={handleSubmit}>Save</button>
    </div>
  );
};

// ---------- Login ----------
export const Login = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const login = () => {
    setUser({ name: "Test User" });
    navigate("/");
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={login}>Login</button>
    </div>
  );
};
