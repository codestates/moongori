const express = require("express");
const router = express.Router();
const userCtrl = require("./user/userCtrl");
const newsPostCtrl = require("./newsPost/newsPostCtrl");

//user
router.get("/user/info", userCtrl.info);
router.post("/user/signup", userCtrl.signUp);
router.post("/user/signin", userCtrl.signIn);
router.get("/user/kakao", userCtrl.kakao);
router.get("/user/kakaoCallback", userCtrl.kakaoCallback);
router.get("/user/google", userCtrl.google);
router.get("/user/googleCallback", userCtrl.googleCallback);
router.post("/user/signout", userCtrl.signOut);
router.delete("/user", userCtrl.withdrawal);
router.patch("/user", userCtrl.img, userCtrl.modifyUser);
router.patch("/user/password", userCtrl.password);
router.post("/user/nickname", userCtrl.nickname);
router.post("/user/email", userCtrl.email);
router.post("/email", userCtrl.sendEmail);
router.get("/cert/:email", userCtrl.cert);

//router.post("/uplod", userCtrl.img);
// router.post("/user/test", userCtrl.test);

//newsPost
router.get("/news/list", newsPostCtrl.list);
router.get("/news/list/:category", newsPostCtrl.category);
router.get("/news/post/:id", newsPostCtrl.read);
router.post("/news/post", newsPostCtrl.write);
router.delete("/news/post/:id", newsPostCtrl.withdrawal);
router.patch("/news/post/:id", newsPostCtrl.modification);
router.post("/news/comment", newsPostCtrl.writeComment);
router.patch("/news/comment/:id", newsPostCtrl.modifyComment);
//tradePost

module.exports = router;
