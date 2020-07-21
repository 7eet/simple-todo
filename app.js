const express = require('express');
const app = express();
var path = require('path');
var bodyParser = require('body-parser');
const port = 3000

// add static files support
app.use(express.static(path.join(__dirname, 'public')))

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

app.get('/', function (req, res, next) {
  return res.render('index', {title: "TO-DO"});
})

app.listen(port, () => { 
  console.log(`Server started at port ${port}`);
})