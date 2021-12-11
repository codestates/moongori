const { tradePost } = require("../../models");

module.exports = async (req, res) => {
  const id = req.cookies.id;
  console.log("!!!!!", req.files);
  res.status(200).send("ok");
  // try {
  //   if (req.files.length > 0) {
  //     const img = req.files.map((el) => el.location).join(",");
  //     const { title, content, sCost, nomalOrNot, endTime } = req.body;
  //     const payload = {
  //       title,
  //       content,
  //       sCost,
  //       nomalOrNot,
  //       endTime,
  //       img,
  //       user_Id: id,
  //     };
  //     const createPost = await tradePost.create(payload);
  //     const updatePost = await tradePost.findOne({
  //       where: { id: createPost.id },
  //     });
  //     return res.status(201).json({ data: updatePost, message: "create" });
  //   } else {
  //     const { title, content, sCost, nomalOrNot, endTime } = req.body;
  //     const payload = {
  //       title,
  //       content,
  //       sCost,
  //       nomalOrNot,
  //       endTime,
  //       user_Id: id,
  //     };
  //     const createPost = await tradePost.create(payload);
  //     const updatePost = await tradePost.findOne({
  //       where: { id: createPost.id },
  //     });
  //     return res.status(201).json({ data: updatePost, message: "create" });
  //   }
  // } catch (err) {
  //   return res.status(500).json({ message: "error" });
  // }
};
