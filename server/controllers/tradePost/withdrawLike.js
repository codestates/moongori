const { like, tradePost } = require("../../models");


module.exports = async (req, res) => {
    const id = req.cookies.id;
    const { tradePost_Id } = req.body;

    await like.destroy({ where: { tradePost_Id, user_Id: id } })
    const like_cnt = await like.findAll({
        where: { tradePost_Id }
    });
    await tradePost.update(
        { likes_cnt: like_cnt.length },
        { where: { id: tradePost_Id } }
    );

    return res.status(200).json({ data: like_cnt.length, message: "delete!!" })
}