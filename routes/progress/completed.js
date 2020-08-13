var express = require('express');
var router = express.Router();
const localStorage = require('../../controller/local');

router.post("/completed/:id", function (req, res) {
  params = req.params;
  if (params) {
    data = newData(params);
    filteredArray = removeOldData(params);
    localStorage.writeFile('in-progress.txt', filteredArray, true);
    completedArray = localStorage.readFile("completed.txt");
    completedArray.push(data);
    localStorage.writeFile("completed.txt", completedArray, true);
    return res.redirect("/");
  }
  todoData = localStorage.readFile('data.txt');
  return res.render("/");
});

function newData(parm) { 
  array = localStorage.readFile("in-progress.txt");
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
