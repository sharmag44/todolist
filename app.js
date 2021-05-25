const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const ejs = require("ejs");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
let items = ["Eat", "Read", "Sleep"];
let workitems = [];
app.set("view engine", "ejs");
app.get("/", function (req, res) {
  let today = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  let day = today.toLocaleDateString("en-US", options);

  res.render("list", { todoList: day, Additem: items });
});

app.post("/", function (req, res) {
  let item = req.body.item;
  if (req.body.list === "Work") {
    workitems.push(item);
    res.redirect("/");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { todoList: "Work", Additem: workitems });
});

app.post("/work", function (req, res) {
  let workData = req.body.item;
  workitems.push(item);
  res.redirect("/work");
});
app.listen(port, () => {
  console.log("Server is started at port 3000");
});
