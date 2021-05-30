const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
// const day = require("./date");
const app = express();
const port = process.env.PORT || 3000;

//DB conectivity
mongoose.connect(
  "mongodb://localhost:27017/todolistdb",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log("Successfully connected to db");
    }
  }
);

const itemsSchema = mongoose.Schema({
  name: String,
});

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Welcome to todolist",
});
const item2 = new Item({
  name: "Click + button to add new item",
});
const item3 = new Item({
  name: "<---- to delete the item",
});

const defaultItem = [item1, item2, item3];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.get("/", function (req, res) {
  //Reading Data
  Item.find({}, function (err, foundItems) {
    if (foundItems.length === 0) {
      ///Inserting Many items or Data
      Item.insertMany(defaultItem, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Sucessfully inserted items");
        }
      });
      res.redirect("/");
    } else {
      res.render("list", { todoList: "Today", Additem: foundItems });
    }
  });
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
