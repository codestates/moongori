const { newsPost, user, comment } = require("../../models");
const { verify } = require("jsonwebtoken");

module.exports = async (req, res) => {
  const postId = req.params.id;
  const cookie = req.cookies.accesstoken;

  let postInfo = await newsPost.findOne({
    where: { id: postId },
    include: [
      { model: user, attributes: ["nickname", "town", "img"] },
      {
        model: comment,
        include: { model: user, attributes: ["nickname", "town", "img"] },
      },
    ],
  });

  //글을 쓴 작성자가 자신의 글을 클릭하는 경우 조회수 증가 X
  if (cookie) {
    const verified = verify(cookie, process.env.ACCESS_SECRET);
    if (postInfo.user_Id !== verified.id) {
      await newsPost.update(
        { view: postInfo.view + 1 },
        {
          where: { id: postId },
        }
      );
      postInfo = await newsPost.findOne({
        where: { id: postId },
        include: [
          { model: user, attributes: ["nickname", "town", "img"] },
          {
            model: comment,
            include: {
              model: user,
              attributes: ["nickname", "town", "img"],
            },
          },
        ],
      });
      return res.status(200).json({ data: postInfo });
    } else {
      return res.status(200).json({ data: postInfo });
    }
  }
  await newsPost.update(
    { view: postInfo.view + 1 },
    {
      where: { id: postId },
    }
  );
  postInfo = await newsPost.findOne({
    where: { id: postId },
    include: [
      { model: user, attributes: ["nickname", "town", "img"] },
      {
        model: comment,
        include: { model: user, attributes: ["nickname", "town", "img"] },
      },
    ],
  });
  return res.status(200).json({ data: postInfo });
};
