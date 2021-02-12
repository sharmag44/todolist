const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;

const app = express();
app.set('view engine','ejs');
app.get("/",function(req,res)
{
            var today = new Date();
            var currentDay = today.getDay();
     
            var day = "";
           switch(currentDay){
             case 1:
                 day ="Monday";
                 break;
              case 2:
                    day ="Tuesday";
                    break;
            case 3:
                day ="Wednesday";
                 break;
                 case 4:
                    day ="Thursday";
                    break;
                    case 5:
                        day ="Friday";
                        break;
                    case 6:
                        day="Saturday";
                        break;
                    default:
                       console.log("Error: Current day is not available${currentDay}");
           }
            res.render('list',{TypeofDay:day});
}       );

app.listen(port, ()=>
{
    console.log("Server is started at port 3000");
});