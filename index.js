import express from 'express';


const app = express();
let port = 3000;
const listItems = [];
const workListItems = [];

//link static files making sure the css works properly
app.use(express.static("public"));

app.use(express.urlencoded()); //use this to avoid "Cannot read properties of undefined ..." error. It parses URL-encoded bodies

app.get("/", (req, res) => {
  //generate a string that represents the current date in the format "Weekday, Month Day," where "Weekday" is the full weekday name, "Month" is the full month name, and "Day" is the numeric day of the month.
  let date = new Date().toLocaleDateString("en-us", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }); 
  res.render("index.ejs", {
    todaysDate: date,
    todoList: listItems,
    isHome: true,
  });
});

app.post("/", (req, res) => {
  const item = req.body.newItem;
  listItems.push(item);
  console.log("List Items: " + listItems);
  res.redirect("/");
});

app.get("/work", (req, res) => {
  res.render("work.ejs", { 
    workList: workListItems,
    isHome: false,
   });
});

app.post("/work", (req, res) => {
  const workItem = req.body.newItem;
  workListItems.push(workItem);
  console.log("Work Items: " + workListItems);
  res.redirect("/work");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
})