var express = require("express");
var router = express.Router();
const localStorage = require("../../controller/local");

router.post("/:id", function (req, res) {
  params = req.params;
  if (params) {
    filteredArray = removeOldData(params);
    localStorage.writeFile("data.txt", filteredArray, true);
    return res.redirect("/");
  }
  return res.redirect("/");
});

function removeOldData(parm) {
  filteredArray = localStorage
    .readFile("data.txt")
    .filter((item) => item.id != parm.id);
  return filteredArray;
}
module.exports = router;
