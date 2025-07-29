import { useState } from "react";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [input, SetInput] = useState("");
  const [prio, SetPrio] = useState("");

  const addTask = () => {
    setTasks([...tasks, { task: input, priority: prio, completed: false }]);
  };

  const deleteTask = (index) => {
    let newTasks = tasks.filter((ele, i) => i !== index);
    setTasks(newTasks);
  };

  let toggle = (index) => {
    let newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <input type="text" onChange={(e) => SetInput(e.target.value)} />
        <select name="" id="" onChange={(e) => SetPrio(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button onClick={addTask}>Add Task</button>
      </div>
      <div style={{ textAlign: "center", padding: "10px" }}>
        <ul style={{ border: "1px solid", padding: "5px" }}>
          {console.log(tasks)}
          {tasks.map((task, i) => (
            <li key={i}>
              <span
                style={{
                  cursor: "pointer",
                  textDecoration: task.completed ? "line-through" : "none",
                  color: task.priority === "high" ? "red" : "black",
                  fontWeight: task.priority === 'high' ? 'bold' : 'normal'
                }}
                onClick={() => toggle(i)}
              >
                {task.task} ({task.priority})
              </span>
              <button onClick={() => deleteTask(i)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default App;

