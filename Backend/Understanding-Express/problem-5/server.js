const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

const readData = () => {
  try {
    const data = fs.readFileSync("./db.json", "utf-8");
    return JSON.parse(data || "[]");
  } catch (err) {
    return [];
  }
};

const writeData = (data) => {
  fs.writeFileSync("./db.json", JSON.stringify(data, null, 2));
};

app.post("/students", (req, res) => {
  const students = readData();
  const { name, course, batch } = req.body;

  if (!name || !course || !batch) {
    return res.status(400).json({ message: "Name, course, and batch are required" });
  }

  const newStudent = { id: Date.now(), name, course, batch };
  students.push(newStudent);
  writeData(students);

  res.json(newStudent);
});

app.get("/students", (req, res) => {
  res.json(readData());
});

app.get("/students/:id", (req, res) => {
  const students = readData();
  const student = students.find((s) => s.id == req.params.id);

  if (student) res.json(student);
  else res.status(404).json({ message: "Student not found" });
});

app.put("/students/:id", (req, res) => {
  let students = readData();
  let index = students.findIndex((s) => s.id == req.params.id);

  if (index !== -1) {
    students[index] = { ...students[index], ...req.body };
    writeData(students);
    res.json(students[index]);
  } else {
    res.status(404).json({ message: "Student not found" });
  }
});

app.delete("/students/:id", (req, res) => {
  let students = readData();
  let filtered = students.filter((s) => s.id != req.params.id);

  if (filtered.length !== students.length) {
    writeData(filtered);
    res.json({ message: "Student deleted" });
  } else {
    res.status(404).json({ message: "Student not found" });
  }
});

app.get("/students/search", (req, res) => {
  const { course } = req.query;
  const students = readData();

  if (!course) return res.json({ message: "Please provide a course" });

  const matches = students.filter((s) =>
    s.course.toLowerCase().includes(course.toLowerCase())
  );

  if (matches.length > 0) res.json(matches);
  else res.json({ message: "No students found" });
});

app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});


app.listen(3000, () => {
  console.log("✅ Server started on port 3000");
});
