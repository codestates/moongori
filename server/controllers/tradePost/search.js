const { tradePost, user } = require("../../models");
const { Op } = require('sequelize');

module.exports = async (req, res) => {
    const { search } = req.query;

    if (!search) {
        return res.status(400).json({ message: "not correct search!!" });
    } else {
        const searchTrade = await tradePost.findAll({
            where: { content: { [Op.like]: `%${search}%` } },
            include: [{ model: user, attributes: ["nickname", "town"] }]
        })
        return res.status(200).json({ data: searchTrade, message: "ok!!" });
    }
}