import express from "express";
//import bodyParser from "body-parser"; //No need for this anymore as Express 4.16+ now has bodyparser included in its default package

const app = express();
const port = 3000;
let items = [];
let workItems = [];

//link static files making sure the css works properly
app.use(express.static("public"));

//app.use(bodyParser.urlencoded({ extended: true }));//No need for this anymore as Express 4.16+ now has bodyparser included in its default package
app.use(express.urlencoded()); //use this in place of the bodyparser code above. This code parses URL-encoded bodies


app.get("/", (req, res) => {
  const dayName = dayOfWeek();
  const monthName = month();
  res.render("index.ejs", { 
    day: dayName, 
    month: monthName,
    todoList: items,
  });
});

app.post("/", (req, res) => {
  const item = req.body.newItem;
  items.push(item);
  res.redirect("/");
});

app.get("/work", (req, res) => {
  res.render("work.ejs", {
    workTodoList: workItems,
  });
});

app.post("/work", (req, res) => { 
  let workItem = req.body.newItem;
  workItems.push(workItem);
  res.redirect("/work");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

function dayOfWeek() {
  let daysArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const today = new Date();
  let dayIndex = today.getDay();
  
  return daysArr[dayIndex];
};

function month() {
  let monthsArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  let monthIndex = new Date().getMonth();

  return monthsArr[monthIndex];
  
};
