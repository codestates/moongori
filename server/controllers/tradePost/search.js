const { tradePost, user, like } = require("../../models");
const { verify } = require("jsonwebtoken");
const { Op } = require("sequelize");

module.exports = async (req, res) => {
  const cookie = req.cookies.accesstoken;
  const category = req.params.category;
  const { search, page } = req.query;
  let offset = 0;
  try {

    if (page > 1) {
      offset = 10 * (page - 1);
    }
    // 전체
    if (!category) {
      const allPostCount = await tradePost.count({
        where: {
          content: { [Op.like]: `%${search}%` },
        },
      });
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
          { model: user, attributes: ["nickname", "town"] },
          { model: like, attributes: ["user_Id"] },
        ],
        order: [["createdAt", "DESC"]],
        limit: 10,
        offset: offset,
      });
      if (!cookie) {
        if (searchTrade.length === 0) {
          return res.status(204).json({ message: "no data" });
        }
        return res.status(200).json({ data: searchTrade, message: "ok" });
      } else {
        await verify(cookie, process.env.ACCESS_SECRET, async (err, data) => {
          if (err) {
            return res
              .status(403)
              .json({ message: "invalid cookie. retry signin" });
          }
          const town = data.town;
          searchTrade = await tradePost.findAll({
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
              { model: user, attributes: ["nickname", "town"], where: { town: { [Op.like]: `${town}%` } } },
              { model: like, attributes: ["user_Id"] },
            ],
            order: [["createdAt", "DESC"]],
            limit: 10,
            offset: offset,
          });
          if (searchTrade.length === 0) {
            return res.status(204).json({ message: "no data" });
          }
          return res.status(200).json({ data: searchTrade, message: "ok!!" });
        });
      }
    }
    // 카테고리 있는 경우
    else {
      const allPostCount = await tradePost.count({
        where: {
          normalOrNot: category, [Op.or]: [
            {
              content: { [Op.like]: `%${search}%` },
            },
            {
              title: { [Op.like]: `%${search}%` },
            },
          ],
        },
      });
      if (offset >= allPostCount) {
        return res.status(204).json({ message: "no more data" });
      }

      let searchTrade = await tradePost.findAll({
        where: {
          normalOrNot: category,
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
            attributes: ["nickname", "town"],
          },
          { model: like, attributes: ["user_Id"] },
        ],
        order: [["createdAt", "DESC"]],
        limit: 10,
        offset: offset,
      });
      if (!cookie) {
        if (searchTrade.length === 0) {
          return res.status(204).json({ message: "no data" });
        }
        return res.status(200).json({ data: searchTrade, message: "ok" });
      } else {
        await verify(cookie, process.env.ACCESS_SECRET, async (err, data) => {
          if (err) {
            return res
              .status(403)
              .json({ message: "invalid cookie. retry signin" });
          }
          const town = data.town;
          searchTrade = await tradePost.findAll({
            where: {
              normalOrNot: category,
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
                attributes: ["nickname", "town"],
                where: { town: { [Op.like]: `${town}%` } },
              },
              { model: like, attributes: ["user_Id"] },
            ],
            order: [["createdAt", "DESC"]],
            limit: 10,
            offset: offset,
          });
          if (searchTrade.length === 0) {
            return res.status(204).json({ message: "no data" });
          }
          return res.status(200).json({ data: searchTrade, message: "ok!!" });
        });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ data: err, message: 'error' });
  }
};
