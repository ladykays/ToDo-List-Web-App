import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/work", (req, res) => {
  res.render("work.ejs");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
