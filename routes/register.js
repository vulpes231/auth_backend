const express = require("express");
const createNewUser = require("../controllers/register-controller");
const router = express.Router();

router.route("/").post(createNewUser);

module.exports = router;
