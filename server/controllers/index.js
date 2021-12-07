const express = require("express");
const router = express.Router();
const userCtrl = require("./user/userCtrl");
const newsPostCtrl = require("./newsPost/newsPostCtrl");
const tradePost = require("./tradePost/tradePostCtrl");
const auth = require("./auth/accessToken");
const tradePostCtrl = require("./tradePost/tradePostCtrl");

//user
router.get("/user/info", auth.accessToken, userCtrl.info);
router.post("/user/signup", userCtrl.signUp);
router.post("/user/signin", userCtrl.signIn);
router.get("/user/kakao", userCtrl.kakao);
router.get("/user/kakaoCallback", userCtrl.kakaoCallback);
router.get("/user/google", userCtrl.google);
router.get("/user/googleCallback", userCtrl.googleCallback);
router.post("/user/signout", auth.accessToken, userCtrl.signOut);
router.delete("/user", auth.accessToken, userCtrl.withdrawal);
router.patch("/user", auth.accessToken, userCtrl.img, userCtrl.modifyUser);
router.patch("/user/password", auth.accessToken, userCtrl.password);
router.post("/user/nickname", userCtrl.nickname);
router.post("/user/email", userCtrl.email);
router.post("/email", userCtrl.sendEmail);
router.get("/cert/:email", userCtrl.cert);

// router.post("/uplod", userCtrl.img);
// router.post("/user/test", userCtrl.test);

//newsPost
router.get("/news/list", newsPostCtrl.list);
router.get("/news/list/:category", newsPostCtrl.category);
router.get("/news/post/:id", newsPostCtrl.read);
router.post(
  "/news/post",
  auth.accessToken,
  newsPostCtrl.img,
  newsPostCtrl.write
);
router.delete("/news/post/:id", auth.accessToken, newsPostCtrl.withdrawal);
router.patch("/news/post/:id", auth.accessToken, newsPostCtrl.modification);
router.post("/news/comment", auth.accessToken, newsPostCtrl.writeComment);
router.patch("/news/comment/:id", auth.accessToken, newsPostCtrl.modifyComment);
router.delete(
  "/news/comment/:id",
  auth.accessToken,
  newsPostCtrl.withdrawalComment
);
router.get("/news/mylist", auth.accessToken, newsPostCtrl.myList);

//tradePost
router.get("/trade/list", tradePost.list);
router.get("/trade/list/:nomalOrNot", tradePost.nomalOrNot);
router.get("/trade/post", tradePost.read);
router.post("/trade/post", auth.accessToken, tradePost.write);
router.patch("/trade/nomal/:id", auth.accessToken, tradePost.modifynomal);
router.delete("/trade/post/:id", auth.accessToken, tradePostCtrl.delete);
router.patch("/trade/state/:id", auth.accessToken, tradePostCtrl.state);
router.patch(
  "/trade/suggestion/:id",
  auth.accessToken,
  tradePostCtrl.modifyTrade
);
module.exports = router;
