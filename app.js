const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;

const app = express();

app.get("/",function(req,res)
{
     var today = new Date();
     if (today.getDay()=== 6 || today.getDay()===0)
    res.send("Todo List");
});

app.listen(PORT, ()=>
{
    console.log("Server is started at port 3000");
});