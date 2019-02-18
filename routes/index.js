var express = require("express");
var router = express.Router();
var excelRouter = require("./excel.js");

// excel
router.post("/excel", excelRouter);

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
