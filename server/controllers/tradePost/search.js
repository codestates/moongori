const { tradePost, user, like } = require("../../models");
const { verify } = require("jsonwebtoken");
const { Op } = require("sequelize");
const { getDistance } = require("./../function");

module.exports = async (req, res) => {
  const cookie = req.cookies.accesstoken;
  const normalOrNot = req.params.normalOrNot;
  const { search, page } = req.query;
  let offset = 0;
  try {
    if (page > 1) {
      offset = 10 * (page - 1);
    }
    // 전체
    if (!normalOrNot) {
      if (!cookie) {
        const allPostCount = await tradePost.count({
          where: {
            content: { [Op.like]: `%${search}%` },
          },
        });
        if (allPostCount === 0) {
          return res.status(204).json({ message: "no data" });
        }
        if (offset >= allPostCount) {
          return res.status(204).json({ message: "no more data" });
        }

        let searchTrade = await tradePost.findAll({
          where: {
            [Op.or]: [
              {
                content: { [Op.like]: `%${search}%` },
              },
              {
                title: { [Op.like]: `%${search}%` },
              },
            ],
          },
          include: [
            { model: user, attributes: ["town"] },
            { model: like, attributes: ["user_Id"] },
          ],
          order: [["createdAt", "DESC"]],
          limit: 10,
          offset: offset,
        });
        return res.status(200).json({ data: searchTrade, message: "ok" });
      } else {
        await verify(cookie, process.env.ACCESS_SECRET, async (err, data) => {
          if (err) {
            return res
              .status(403)
              .json({ message: "invalid cookie. retry signin" });
          }

          const allPosts = await tradePost.findAll({
            where: {
              [Op.or]: [
                {
                  content: { [Op.like]: `%${search}%` },
                },
                {
                  title: { [Op.like]: `%${search}%` },
                },
              ],
            },
            include: [
              {
                model: user,
                attributes: ["town", "latitude", "longitude"],
              },
              { model: like, attributes: ["user_Id"] },
            ],
            order: [["createdAt", "DESC"]],
          });
          if (allPosts.length === 0) {
            return res.status(204).json({ message: "no data" });
          }

          const filterPosts = allPosts.filter((post) => {
            return (
              getDistance(
                data.latitude,
                data.longitude,
                post.user.latitude,
                post.user.longitude
              ) <= 5000
            );
          });

          const allPostCount = filterPosts.length;

          if (offset >= allPostCount) {
            return res.status(204).json({ message: "no more data" });
          }

          const list = filterPosts.slice(offset, offset + 10);

          return res.status(200).json({ data: list, message: "ok!!" });
        });
      }
    }
    // 카테고리 있는 경우
    else {
      if (!cookie) {
        const allPostCount = await tradePost.count({
          where: {
            normalOrNot: normalOrNot,
            [Op.or]: [
              {
                content: { [Op.like]: `%${search}%` },
              },
              {
                title: { [Op.like]: `%${search}%` },
              },
            ],
          },
        });
        if (allPostCount === 0) {
          return res.status(204).json({ message: "no data" });
        }
        if (offset >= allPostCount) {
          return res.status(204).json({ message: "no more data" });
        }

        let searchTrade = await tradePost.findAll({
          where: {
            normalOrNot: normalOrNot,
            [Op.or]: [
              {
                content: { [Op.like]: `%${search}%` },
              },
              {
                title: { [Op.like]: `%${search}%` },
              },
            ],
          },
          include: [
            {
              model: user,
              attributes: ["town"],
            },
            { model: like, attributes: ["user_Id"] },
          ],
          order: [["createdAt", "DESC"]],
          limit: 10,
          offset: offset,
        });
        return res.status(200).json({ data: searchTrade, message: "ok" });
      } else {
        await verify(cookie, process.env.ACCESS_SECRET, async (err, data) => {
          if (err) {
            return res
              .status(403)
              .json({ message: "invalid cookie. retry signin" });
          }
          const allPosts = await tradePost.findAll({
            where: {
              normalOrNot: normalOrNot,
              [Op.or]: [
                {
                  content: { [Op.like]: `%${search}%` },
                },
                {
                  title: { [Op.like]: `%${search}%` },
                },
              ],
            },
            include: [
              {
                model: user,
                attributes: ["town", "latitude", "longitude"],
              },
              { model: like, attributes: ["user_Id"] },
            ],
            order: [["createdAt", "DESC"]],
          });
          if (allPosts.length === 0) {
            return res.status(204).json({ message: "no data" });
          }

          const filterPosts = allPosts.filter((post) => {
            return (
              getDistance(
                data.latitude,
                data.longitude,
                post.user.latitude,
                post.user.longitude
              ) <= 5000
            );
          });

          const allPostCount = filterPosts.length;

          if (offset >= allPostCount) {
            return res.status(204).json({ message: "no more data" });
          }

          const list = filterPosts.slice(offset, offset + 10);

          return res.status(200).json({ data: list, message: "ok!!" });
        });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ data: err, message: "error" });
  }
};
