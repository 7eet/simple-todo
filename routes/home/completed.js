var express = require('express');
var router = express.Router();
const localStorage = require('../../controller/local');
var uniqid = require("uniqid");

router.post("/", function (req, res, next) {
  let data = req.body;
  data["id"] = uniqid();
  data["date"] = new Date();
  data["status"] = "completed";
  localStorage.writeFile("completed.txt", data);
  return res.redirect("/");
});

router.post("/:id", function (req, res) {
  params = req.params;
  if (params) {
    data = newData(params);
    filteredArray = removeOldData(params);
    localStorage.writeFile('data.txt', filteredArray, true);
    completedArray = localStorage.readFile("completed.txt");
    completedArray.push(data);
    localStorage.writeFile("completed.txt", completedArray, true);
    return res.redirect("/");
  }
  todoData = localStorage.readFile('data.txt');
  return res.render("/");
});

function newData(parm) { 
  array = localStorage.readFile('data.txt');
  oldData = array.find(item => item.id == parm.id);
  oldData.status = 'completed'
  result = oldData;
  return result;
}

function removeOldData(parm) { 
  filteredArray = localStorage
    .readFile("data.txt")
    .filter((item) => item.id != parm.id);
  return filteredArray;
}

module.exports = router;
