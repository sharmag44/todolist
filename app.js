const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const _ = require("lodash");
// const day = require("./date");
const app = express();
const port = process.env.PORT || 3000;

//DB conectivity
mongoose.connect(
  "mongodb+srv://m001-student:m001-student@todolist.upinf.mongodb.net/todolistdb",
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

const listSchema = mongoose.Schema({
  name: String,
  items: [itemsSchema],
});

const List = mongoose.model("List", listSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

//main route
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

//customlist like home,work

app.get("/:customListName", function (req, res) {
  const customListName = _.capitalize(req.params.customListName);
  List.findOne({ name: customListName }, function (err, foundList) {
    if (!err) {
      if (!foundList) {
        const list = new List({
          name: customListName,
          items: defaultItem,
        });
        list.save();
        res.redirect("/" + customListName);
      } else {
        res.render("list", {
          todoList: foundList.name,
          Additem: foundList.items,
        });
      }
    }
  });
});

app.post("/delete", function (req, res) {
  //console.log(req.body.value);

  let checkitemId = req.body.value;
  let listName = req.body.listName;
  if (listName === "Today") {
    Item.findByIdAndRemove(checkitemId, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Sucessfully deleted");
      }
      res.redirect("/");
    });
  } else {
    List.findOneAndUpdate(
      { name: listName },
      { $pull: { items: { _id: checkitemId } } },
      function (err, foundItem) {
        if (!err) {
          res.redirect("/" + listName);
        }
      }
    );
  }
});

app.post("/", function (req, res) {
  let itemName = req.body.item;
  let listName = req.body.todolist;
  const item = new Item({ name: itemName });

  if (listName === "Today") {
    item.save();
    res.redirect("/");
  }

  List.find({ name: listName }, function (err, foundList) {
    foundList.items.push(item);
    foundList.save();
    res.render("/" + listName);
  });
});

app.post("/work", function (req, res) {
  let workData = req.body.item;
  workitems.push(item);
  res.redirect("/work");
});
app.listen(port, () => {
  console.log("Server is started at port 3000");
});
