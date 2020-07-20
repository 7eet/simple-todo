const express = require('express');
const app = express();
var path = require("path");
const port = 3000

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.locals.loggedIn = false;

app.get('/', function (req, res, next) {
  console.log('App started!!!');
  return res.render('index', {title: "TO-DO"});
})

app.listen(port, () => { 
  console.log(`Server started at port ${port}`);
})