var express = require("express");
var router = express.Router();
const localStorage = require("../controller/local");

router.get("/:id", function (req, res) {
  params = req.params;
  console.log("--- req.param ---> " + JSON.stringify(req.params));
  if (params) {
    data = newData(params);
    console.log("--New data:-> " + JSON.stringify(data));
    filteredArray = removeOldData(params);
    console.log("filted ->>> " + JSON.stringify(filteredArray));
    localStorage.writeFile("data.txt", filteredArray, true);
    progData = localStorage.readFile("in-progress.txt");
    progData.push(data);
    localStorage.writeFile("in-progress.txt", progData, true);
    return res.redirect("/");
  }
  return res.redirect("/");
});

function newData(parm) {
  array = localStorage.readFile("data.txt");
  oldData = array.find((item) => item.id == parm.id);
  oldData.status = "in-progress";
  result = oldData;
  return result;
}

function removeOldData(parm) {
  filteredArray = localStorage
    .readFile("data.txt")
    .filter((item) => item.id != parm.id);
  console.log("filteredArray -> " + JSON.stringify(filteredArray));
  return filteredArray;
}

module.exports = router;
