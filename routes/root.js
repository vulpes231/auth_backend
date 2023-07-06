const express = require("express");
const router = express.Router();
const path = require("path");

router.route("/").get((req, res) => {
  res.status(200);
  let filePath = path.join(__dirname, "..", "views", "index.html");
  res.sendFile(filePath);
});

module.exports = router;
