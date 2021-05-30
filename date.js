let today = new Date();
const options = {
  weekday: "long",
  day: "numeric",
  month: "long",
};

let day = today.toLocaleDateString("en-US", options);

module.exports=day;