const express = require("express");
const router = express.Router();
const userCtrl = require("./user/userCtrl");

//user
router.get("/user/info", userCtrl.info);
router.post("/user/signup", userCtrl.signUp);
router.post("/user/signin", userCtrl.signIn);
router.get("/user/kakao", userCtrl.kakao);
router.get("/user/kakaoCallback", userCtrl.kakaoCallback);
router.get("/user/google", userCtrl.google);
router.get("/user/googleCallback", userCtrl.googleCallback);

module.exports = router;
