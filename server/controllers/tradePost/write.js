const { tradePost } = require("../../models");

module.exports = async (req, res) => {
  const id = req.cookies.id;

  try {
    req.files.length > 0;
    const img = req.files.map((el) => el.location).join(",");
    const { title, content, sCost, normalOrNot, endDate } = req.body;
    let payload = {
      title,
      content,
      img,
      normalOrNot,
      sCost,
      state: 1,
      user_Id: id,
    };
    if (req.body.normalOrNot) {
      payload = {
        title,
        content,
        img,
        normalOrNot,
        sCost,
        state: 1,
        endDate,
        user_Id: id,
      };
    }

    console.log("!!!!", payload);
    await tradePost.create(payload);
    return res.status(201).json({ message: "create" });
  } catch (err) {
    return res.status(500).json({ message: "error" });
  }
};
