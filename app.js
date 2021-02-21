const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
 var items = [];
app.set('view engine','ejs');
app.get("/",function(req,res)
{
            var today = new Date();
            const  options = {
                weekday: "long",
                 day:"numeric",
                 month : "long"
            };

            const day = today.toLocaleDateString("en-US",options);

            res.render('list',{TypeofDay:day, Additem: items});
}       );

app.post("/",function(req,res)
{
    var task =req.body.item;
      items.push(task);
    res.redirect("/");
})
app.listen(port, ()=>
{
    console.log("Server is started at port 3000");
});

