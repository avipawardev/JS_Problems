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

app.post("/books", (req, res) => {
  const books = readData();
  const { title, author, year } = req.body;

  if (!title || !author || !year) {
    return res.status(400).json({ message: "Title, author, and year are required" });
  }

  const newBook = { id: Date.now(), title, author, year };
  books.push(newBook);
  writeData(books);

  res.json(newBook);
});

app.get("/books", (req, res) => {
  res.json(readData());
});

app.get("/books/:id", (req, res) => {
  const books = readData();
  const book = books.find((b) => b.id == req.params.id);
  if (book) res.json(book);
  else res.status(404).json({ message: "Book not found" });
});

app.put("/books/:id", (req, res) => {
  let books = readData();
  let index = books.findIndex((b) => b.id == req.params.id);

  if (index !== -1) {
    books[index] = { ...books[index], ...req.body };
    writeData(books);
    res.json(books[index]);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

app.delete("/books/:id", (req, res) => {
  let books = readData();
  let filtered = books.filter((b) => b.id != req.params.id);

  if (filtered.length !== books.length) {
    writeData(filtered);
    res.json({ message: "Book deleted" });
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

app.get("/books/search", (req, res) => {
  const { author, title } = req.query;
  const books = readData();

  let matches = books;

  if (author) {
    matches = matches.filter((b) =>
      b.author.toLowerCase().includes(author.toLowerCase())
    );
  }

  if (title) {
    matches = matches.filter((b) =>
      b.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  if (matches.length > 0) res.json(matches);
  else res.json({ message: "No books found" });
});


app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});


app.listen(3000, () => {
  console.log("server is started on port 3000");
});
