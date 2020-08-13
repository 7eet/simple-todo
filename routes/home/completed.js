var express = require('express');
var router = express.Router();
const localStorage = require('../../controller/local');
const logic = require("../../controller/logic")
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
    data = logic.getTask(params, "data.txt", "completed");
    filteredArray = logic.removeOldData(params, "data.txt");
    localStorage.writeFile('data.txt', filteredArray, true);
    completedArray = localStorage.readFile("completed.txt");
    completedArray.push(data);
    localStorage.writeFile("completed.txt", completedArray, true);
    return res.redirect("/");
  }
  todoData = localStorage.readFile('data.txt');
  return res.render("/");
});

module.exports = router;
