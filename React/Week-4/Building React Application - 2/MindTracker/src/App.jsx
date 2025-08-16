import React, { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [logs, setLogs] = useState(() => {
    return JSON.parse(localStorage.getItem("logs")) || [];
  });

  const [formData, setFormData] = useState({
    studyHours: "",
    breakTime: "",
    sleepHours: "",
    stressLevel: "",
    focus: "",
    reflection: ""
  });

  // Save to localStorage whenever logs update
  useEffect(() => {
    localStorage.setItem("logs", JSON.stringify(logs));
  }, [logs]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLog = {
      date: new Date().toLocaleDateString(),
      ...formData
    };
    setLogs([...logs, newLog]);
    setFormData({
      studyHours: "",
      breakTime: "",
      sleepHours: "",
      stressLevel: "",
      focus: "",
      reflection: ""
    });
  };

  // Generate insights after 7 days
  const generateInsights = () => {
    if (logs.length < 7) return "Log at least 7 days to see insights.";

    let avgSleep =
      logs.reduce((sum, l) => sum + Number(l.sleepHours), 0) / logs.length;
    let avgBreak =
      logs.reduce((sum, l) => sum + Number(l.breakTime), 0) / logs.length;
    let avgStress =
      logs.reduce((sum, l) => sum + Number(l.stressLevel), 0) / logs.length;

    let insights = [];
    if (avgSleep >= 8) insights.push("✅ You focus better after 8+ hours of sleep.");
    if (avgBreak >= 30) insights.push("✅ Longer breaks seem to reduce stress levels.");
    if (avgStress > 3) insights.push("⚠️ Try relaxation to manage stress.");

    return insights.join(" ");
  };

  return (
    <div className="container">
      <h1>📖 MindTrack</h1>

      {/* Daily Log Form */}
      <section>
        <h2>Daily Log</h2>
        <form onSubmit={handleSubmit}>
          <input
            id="studyHours"
            type="number"
            placeholder="Study Hours"
            value={formData.studyHours}
            onChange={handleChange}
          />
          <input
            id="breakTime"
            type="number"
            placeholder="Break Time (min)"
            value={formData.breakTime}
            onChange={handleChange}
          />
          <input
            id="sleepHours"
            type="number"
            placeholder="Sleep Hours"
            value={formData.sleepHours}
            onChange={handleChange}
          />
          <input
            id="stressLevel"
            type="number"
            placeholder="Stress Level (1-5)"
            value={formData.stressLevel}
            onChange={handleChange}
          />
          <input
            id="focus"
            type="number"
            placeholder="Focus (1-5)"
            value={formData.focus}
            onChange={handleChange}
          />
          <textarea
            id="reflection"
            placeholder="Reflection..."
            value={formData.reflection}
            onChange={handleChange}
          />
          <button type="submit">Save Log</button>
        </form>
      </section>

      {/* Journal List */}
      <section>
        <h2>My Journal</h2>
        <ul>
          {logs.map((log, index) => (
            <li key={index}>
              <b>{log.date}</b> | Study: {log.studyHours}h | Sleep: {log.sleepHours}h | Stress: {log.stressLevel}/5
              <br /> Reflection: {log.reflection}
            </li>
          ))}
        </ul>
      </section>

      {/* Mentor Dashboard */}
      <section>
        <h2>Mentor Dashboard</h2>
        <ul>
          {logs.map((log, index) => (
            <li key={index}>
              📌 Date: {log.date} | Study: {log.studyHours}h | Sleep: {log.sleepHours}h
              <br />
              <i>"{log.reflection}"</i>
            </li>
          ))}
        </ul>
      </section>

      {/* Insights */}
      <section>
        <h2>Insights</h2>
        <p>{generateInsights()}</p>
      </section>
    </div>
  );
}
