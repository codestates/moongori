const { tradePost, user, like } = require("../../models");
const { verify } = require("jsonwebtoken");
const sequelize = require("sequelize");
const Op = sequelize.Op;

module.exports = async (req, res) => {
  const cookie = req.cookies.accesstoken;
  const page = req.query.page;
  let offset = 0;
  if (page > 1) {
    offset = 10 * (page - 1);
  }

  // 제시글 중에서 endDate가 지난 게시글 상태변경
  const suggestionPosts = await tradePost.findAll({
    where: {
      state: 4,
    },
  });
  for (let post of suggestionPosts) {
    const today = new Date();
    const timeValue = new Date(post.endDate);
    if (post.endDate !== null && today.getTime() >= timeValue.getTime()) {
      await tradePost.update({ state: 5 }, { where: { id: post.id } });
    }
  }

  const allPostCount = await tradePost.count();
  if (offset >= allPostCount) {
    return res.status(204).json({ message: "no more data" });
  }

  let list = await tradePost.findAll({
    include: [
      { model: user, attributes: ["town"] },
      { model: like, attributes: ["user_Id"] },
    ],
    order: [["createdAt", "DESC"]],
    limit: 10,
    offset: offset,
  });

  if (!cookie) {
    return res.status(200).json({ data: list, message: "ok" });
  } else {
    await verify(cookie, process.env.ACCESS_SECRET, async (err, data) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "invalid cookie. retry signin" });
      }
      const town = data.town;
      list = await tradePost.findAll({
        include: [
          {
            model: user,
            attributes: ["town"],
            where: { town: { [Op.like]: `${town}%` } },
          },
          { model: like, attributes: ["user_Id"] },
        ],
        order: [["createdAt", "DESC"]],
        limit: 10,
        offset: offset,
      });
      return res.status(200).json({ data: list, message: "ok" });
    });
  }
};
