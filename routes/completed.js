var express = require('express');
var router = express.Router();
const localStorage = require('../controller/local');

router.get("/:id", function (req, res) {
  params = req.params;
  console.log("--- req.param ---> " + JSON.stringify(req.params))
  if (params) {
    data = newData(params);
    console.log("--New data:-> " + JSON.stringify(data));
    filteredArray = removeOldData(params);
    console.log("filted ->>> " + JSON.stringify(filteredArray))
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
  console.log("filteredArray -> " + JSON.stringify(filteredArray))
  return filteredArray;
}

module.exports = router;
