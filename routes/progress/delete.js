var express = require("express");
var router = express.Router();
const localStorage = require("../../controller/local");

router.post("/delete/:id", function (req, res) {
  params = req.params;
  if (params) {
    filteredArray = removeOldData(params)
    localStorage.writeFile("in-progress.txt", filteredArray, true);
    return res.redirect("/");
  }
  return res.redirect("/");
});

function removeOldData(parm) {
  filteredArray = localStorage
    .readFile("in-progress.txt")
    .filter((item) => item.id != parm.id);
  return filteredArray;
}
module.exports = router;
