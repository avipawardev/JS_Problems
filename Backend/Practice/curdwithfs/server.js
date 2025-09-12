const express = require("express");
const fs = require("fs");
const { json } = require("stream/consumers");

const app = express();
app.use(express.json());

app.get('/test',((req,res)=>{
    res.send("Home Page")
}))

//get request
app.get('/all-courses',(req,res)=>{
    let data = JSON.parse(fs.readFileSync('./db.json','utf-8'));
    console.log(data.courses);

    res.json({msg : "List of Courses"})
})

//post request
app.post("/add-course",(req,res)=>{
    //first read the data
 let newCourse = req.body;   
 let data = JSON.parse(fs.readFileSync('./db.json','utf-8'));
 let courses = data.courses;
 courses.push(newCourse);
 fs.writeFileSync("./db.json",JSON.stringify(data))
 res.json({msg:"New course added"})

})


app.listen(3000, ()=>{
    console.log("server running.....");
});