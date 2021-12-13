const { newsPost, user } = require("../../models");
const { verify } = require("jsonwebtoken");
const { Op } = require("sequelize");

module.exports = async (req, res) => {
  const cookie = req.cookies.accesstoken;
  const category = req.params.category;
  const { search, page } = req.query;
  let offset = 0;
  if (page > 1) {
    offset = 10 * (page - 1);
  }
  // 전체
  if (!category) {
    const allPostCount = await newsPost.count({
      where: { content: { [Op.like]: `%${search}%` } },
    });
    if (offset >= allPostCount) {
      return res.status(204).json({ message: "no more data" });
    }

    let searchNews = await newsPost.findAll({
      where: {
        content: { [Op.like]: `%${search}%` },
      },
      include: [{ model: user, attributes: ["nickname", "town"] }],
      order: [["createdAt", "DESC"]],
      limit: 10,
      offset: offset,
    });
    if (!cookie) {
      if (searchNews.length === 0) {
        return res.status(204).json({ message: "no data" });
      }
      return res.status(200).json({ data: searchNews, message: "ok" });
    } else {
      await verify(cookie, process.env.ACCESS_SECRET, async (err, data) => {
        if (err) {
          return res
            .status(403)
            .json({ message: "invalid cookie. retry signin" });
        }
        const town = data.town;
        searchNews = await newsPost.findAll({
          where: {
            town: { [Op.like]: `${town}%` },
            content: { [Op.like]: `%${search}%` },
          },
          include: [{ model: user, attributes: ["nickname", "town"] }],
          order: [["createdAt", "DESC"]],
          limit: 10,
          offset: offset,
        });
        if (searchNews.length === 0) {
          return res.status(204).json({ message: "no data" });
        }
        return res.status(200).json({ data: searchNews, message: "ok!!" });
      });
    }
  }
  // 카테고리 있는 경우
  else {
    const allPostCount = await newsPost.count({
      where: { category: category, content: { [Op.like]: `%${search}%` } },
    });
    if (offset >= allPostCount) {
      return res.status(204).json({ message: "no more data" });
    }

    let searchNews = await newsPost.findAll({
      where: {
        category: category,
        content: { [Op.like]: `%${search}%` },
      },
      include: [{ model: user, attributes: ["nickname", "town"] }],
      order: [["createdAt", "DESC"]],
      limit: 10,
      offset: offset,
    });
    if (!cookie) {
      if (searchNews.length === 0) {
        return res.status(204).json({ message: "no data" });
      }
      return res.status(200).json({ data: searchNews, message: "ok" });
    } else {
      await verify(cookie, process.env.ACCESS_SECRET, async (err, data) => {
        if (err) {
          return res
            .status(403)
            .json({ message: "invalid cookie. retry signin" });
        }
        const town = data.town;
        searchNews = await newsPost.findAll({
          where: {
            category: category,
            town: { [Op.like]: `${town}%` },
            content: { [Op.like]: `%${search}%` },
          },
          include: [{ model: user, attributes: ["nickname", "town"] }],
          order: [["createdAt", "DESC"]],
          limit: 10,
          offset: offset,
        });
        if (searchNews.length === 0) {
          return res.status(204).json({ message: "no data" });
        }
        return res.status(200).json({ data: searchNews, message: "ok!!" });
      });
    }
  }
};
