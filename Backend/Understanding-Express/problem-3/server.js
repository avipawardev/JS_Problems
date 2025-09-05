const express = require('express');
const fs = require('fs')
const app = express();
app.use(express.json());

const readData = () => {
  try {
    const data = fs.readFileSync("./db.json", "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

app.post('/dishes',(req,res)=>{
    const dishes = readData();
        const newDish = req.body;
        dishes.push(newDish);
        fs.writeFileSync('./db.json',JSON.stringify(dishes))
        res.json(newDish)
})

app.get('/dishes',(req,res)=>{
    res.json(readData())
})

app.get('/dishes/:id',(req,res)=>{
    const dishes = readData();
    const dish = dishes.find((d)=> d.id == req.params.id);
    if(dish) res.json(dish)
        else res.status(404).send('dish not found')
})

app.put('/dishes/:id',(req,res)=>{
let dishes = readData();
  let index = dishes.findIndex((d) => d.id == req.params.id);

  if (index !== -1) {
    dishes[index] = { ...dishes[index], ...req.body };
    fs.writeFileSync('./db.json',JSON.stringify(dishes))
    res.json(dishes[index]);
  } else {
    res.status(404).json({ message: "Dish not found" });
  }
})

app.delete('/dishes/:id',(req,res)=>{
    let dishes = readData();
  let filtered = dishes.filter((d) => d.id != req.params.id);

  if (filtered.length !== dishes.length) {
    fs.writeFileSync('./db.json',JSON.stringify(dishes))
    res.json({ message: "Dish deleted" });
  } else {
    res.status(404).json({ message: "Dish not found" });
  }
})

app.get("/dishes/get", (req, res) => {
  const { name } = req.query;
  if (!name) return res.status(400).json({ message: "Name query is required" });

  const dishes = readData();
  const matches = dishes.filter((d) =>
    d.name.toLowerCase().includes(name.toLowerCase())
  );

  if (matches.length > 0) res.json(matches);
  else res.json({ message: "No dishes found" });
});

app.listen(3000,()=>{
    console.log('server is started')
})