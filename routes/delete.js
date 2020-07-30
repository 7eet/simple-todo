var express = require("express");
var router = express.Router();
const localStorage = require("../controller/local");

router.get("/:id", function (req, res) {
  return res.redirect("/");
});

module.exports = router;
