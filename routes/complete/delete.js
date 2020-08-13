var express = require("express");
var router = express.Router();
const localStorage = require("../../controller/local");
const logic = require("../../controller/logic")

router.post("/:id", function (req, res) {
  params = req.params;
  if (params) {
    filteredArray = logic.removeOldData(params, "completed.txt");
    localStorage.writeFile("completed.txt", filteredArray, true);
    return res.redirect("/");
  }
  return res.redirect("/");
});

module.exports = router;
