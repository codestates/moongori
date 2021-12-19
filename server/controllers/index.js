const express = require("express");
const router = express.Router();
const userCtrl = require("./user/userCtrl");
const newsPostCtrl = require("./newsPost/newsPostCtrl");
const tradePost = require("./tradePost/tradePostCtrl");
const auth = require("./auth/accessToken");
const tradePostCtrl = require("./tradePost/tradePostCtrl");
const chatCtrl = require("./chat/chatCtrl");

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
router.post("/user", auth.accessToken, userCtrl.img, userCtrl.modifyUser);
router.patch("/user/password", auth.accessToken, userCtrl.password);
router.post("/user/nickname", userCtrl.nickname);
router.post("/user/email", userCtrl.email);
router.post("/email", userCtrl.sendEmail);
router.get("/cert/:email", userCtrl.cert);

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
router.post(
  "/news/post/:id",
  auth.accessToken,
  newsPostCtrl.img,
  newsPostCtrl.modification
);
router.post("/news/comment", auth.accessToken, newsPostCtrl.writeComment);
router.patch("/news/comment/:id", auth.accessToken, newsPostCtrl.modifyComment);
router.delete(
  "/news/comment/:id",
  auth.accessToken,
  newsPostCtrl.withdrawalComment
);
router.get("/news", newsPostCtrl.search);
router.get("/news/:category", newsPostCtrl.search);

//마이페이지
router.get("/mypage/newsList", auth.accessToken, newsPostCtrl.myList);
router.get("/mypage/comment", auth.accessToken, newsPostCtrl.myComment);
router.get("/mypage/tradeList", auth.accessToken, tradePostCtrl.myList);
router.get("/mypage/myLike", auth.accessToken, tradePostCtrl.myLike);
router.get("/mypage/mySale", auth.accessToken, tradePostCtrl.mySale);

//tradePost
router.get("/trade/list", tradePost.list);
router.get("/trade/list/:normalOrNot", tradePost.normalOrNot);
router.get("/trade/post/:id", tradePost.read);
router.post("/trade/post", auth.accessToken, tradePost.img, tradePost.write);
router.post(
  "/trade/normal/:id",
  auth.accessToken,
  tradePost.img,
  tradePost.modifynormal
);
router.delete("/trade/post/:id", auth.accessToken, tradePostCtrl.delete);
router.patch("/trade/state/:id", auth.accessToken, tradePostCtrl.state);
router.post(
  "/trade/post/:id",
  auth.accessToken,
  tradePost.img,
  tradePostCtrl.modifyTrade
);
router.post("/trade/suggestion", auth.accessToken, tradePostCtrl.suggestion);
router.patch(
  "/trade/suggestion/:id",
  auth.accessToken,
  tradePostCtrl.modifyCost
);
router.delete(
  "/trade/suggestion/:id",
  auth.accessToken,
  tradePostCtrl.suggestionDelete
);
router.post("/trade/like", auth.accessToken, tradePostCtrl.like);
router.delete("/trade/like", auth.accessToken, tradePostCtrl.deleteLike);
router.get("/trade", tradePostCtrl.search);
router.get("/trade/:normalOrNot", tradePostCtrl.search);

//  chatRoom
router.post("/room", auth.accessToken, chatCtrl.create);
router.get("/room", auth.accessToken, chatCtrl.list);
router.get("/room/:roomId", auth.accessToken, chatCtrl.room);

module.exports = router;
