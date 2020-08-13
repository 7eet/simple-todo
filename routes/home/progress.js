var express = require("express");
var router = express.Router();
const localStorage = require("../../controller/local");
const logic = require("../../controller/logic")
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
    data = logic.getTask(params, "data.txt", "in-progress");

    filteredArray = logic.removeOldData(params, "data.txt");
    localStorage.writeFile("data.txt", filteredArray, true);

    progData = localStorage.readFile("in-progress.txt");
    progData.push(data);
    localStorage.writeFile("in-progress.txt", progData, true);
    
    return res.redirect("/");
  }
  return res.redirect("/");
});

module.exports = router;
