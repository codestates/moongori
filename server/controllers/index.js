const express = require("express");
const router = express.Router();
const userCtrl = require("./user/userCtrl");

//user
router.post("/user/signup", userCtrl.signUp);

module.exports = router;