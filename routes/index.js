var express = require('express');
var router = express.Router();
const localStorage = require('../controller/local');

router.get("/", function (req, res, next) {
  todoData = localStorage.readFile('data.txt');
  progessData = localStorage.readFile("in-progress.txt");
  completedData = localStorage.readFile('completed.txt');
  return res.render('index', { title: "TO-DO" , data: todoData, progress: progessData, completed: completedData});
});

router.post("/", function (req, res, next) {
  let data = req.body;
  data['date'] = new Date();
  if (data.status == "notStarted") {
    console.log("not started");
    localStorage.writeFile("data.txt", data);
  } else if (data.status == "progress") {
    console.log("progess");
    localStorage.writeFile("in-progress.txt", data);
  } else { 
    console.log("completed");
    localStorage.writeFile("completed.txt", data);
  }
  console.log(data);
  return res.redirect("/");
});


module.exports = router;
