var express = require('express');
var router = express.Router();
const localStorage = require('../../controller/local');
const logic = require("../../controller/logic")

router.post("/completed/:id", function (req, res) {
  params = req.params;
  if (params) {
    data = logic.getTask(params, "in-progress.txt", "completed");

    filteredArray = logic.removeOldData(params, "data.txt");
    localStorage.writeFile('in-progress.txt', filteredArray, true);

    completedArray = localStorage.readFile("completed.txt");
    completedArray.push(data);
    localStorage.writeFile("completed.txt", completedArray, true);
    
    return res.redirect("/");
  }
  todoData = localStorage.readFile('data.txt');
  return res.render("/");
});

module.exports = router;
