const { newsPost, user } = require("../../models");
const { verify } = require("jsonwebtoken");
const sequelize = require("sequelize");
const Op = sequelize.Op;
const { getDistance } = require("./../function");

module.exports = async (req, res) => {
  const cookie = req.cookies.accesstoken;
  const page = req.query.page;
  let offset = 0;
  try {
    if (page > 1) {
      offset = 10 * (page - 1);
    }

    if (!cookie) {
      const allPostCount = await newsPost.count();

      if (offset >= allPostCount) {
        return res.status(204).json({ message: "no more data" });
      }

      const list = await newsPost.findAll({
        include: [{ model: user, attributes: ["nickname", "town"] }],
        order: [["createdAt", "DESC"]],
        limit: 10,
        offset: offset,
      });

      return res.status(200).json({ data: list, message: "ok" });
    } else {
      await verify(cookie, process.env.ACCESS_SECRET, async (err, data) => {
        if (err) {
          return res
            .status(403)
            .json({ message: "invalid cookie. retry signin" });
        }
        const allPosts = await newsPost.findAll({
          include: [{ model: user, attributes: ["nickname", "town"] }],
          order: [["createdAt", "DESC"]],
        });

        const filterPosts = allPosts.filter((post) => {
          return (
            getDistance(
              data.latitude,
              data.longitude,
              post.latitude,
              post.longitude
            ) <= 5000
          );
        });

        const allPostCount = filterPosts.length;

        if (offset >= allPostCount) {
          return res.status(204).json({ message: "no more data" });
        }

        const list = filterPosts.slice(offset, offset + 10);

        return res.status(200).json({ data: list, message: "ok" });
      });
    }
  } catch (err) {
    return res.status(500).json({ data: err, message: "error" });
  }
};
