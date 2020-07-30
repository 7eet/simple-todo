var express = require('express');
var router = express.Router();
const localStorage = require('../controller/local');
var uniqid = require("uniqid");


router.get("/", function (req, res, next) {
  todoData = localStorage.readFile('data.txt');
  return res.render('content/home', { title: "TO-DO" , data: todoData});
});

router.post("/", function (req, res, next) {
  let data = req.body;
  data['id'] = uniqid();
  data['date'] = new Date();
  data['status'] = "In-Progress";
  localStorage.writeFile("data.txt", data);
  return res.redirect("/");
});


module.exports = router;
