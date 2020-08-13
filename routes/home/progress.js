var express = require("express");
var router = express.Router();
const localStorage = require("../../controller/local");
var uniqid = require("uniqid");

router.post("/", function (req, res, next) {
  let data = req.body;
  data["id"] = uniqid();
  data["date"] = new Date();
  data["status"] = "in-progress";
  localStorage.writeFile("in-progress.txt", data);
  return res.redirect("/");
});

router.post("/:id", function (req, res) {
  params = req.params;
  if (params) {
    data = newData(params);
    filteredArray = removeOldData(params);
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
  return filteredArray;
}

module.exports = router;
