const express = require("express");
const router = express.Router();
const userCtrl = require("./user/userCtrl");

//user
router.get("/user/info", userCtrl.info);
router.post("/user/signup", userCtrl.signUp);
router.post("/user/signin", userCtrl.signIn);
router.get("/user/kakao", userCtrl.kakao);
router.get("/user/kakaoCallback", userCtrl.kakaoCallback);

module.exports = router;
