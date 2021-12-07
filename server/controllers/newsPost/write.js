const { newsPost, user } = require("../../models");

module.exports = async (req, res) => {
  const id = req.cookies.id;
  console.log("@@@@@", req.body);
  const imgs = req.files.map((el) => el.location).join(",");
  console.log(`$$$$$news`, imgs);
  const userInfo = await user.findOne({
    where: { id: id },
  });

  const { category, content, location } = req.body;
  const payload = {
    category,
    content,
    location,
    town: userInfo.town,
    img: imgs,
    user_Id: id,
  };
  try {
    const createPost = await newsPost.create(payload);
    const updatePost = await newsPost.findOne({
      where: { id: createPost.id },
    });
    return res.status(201).json({ data: updatePost, message: "create" });
  } catch (err) {
    return res.status(500).json({ message: "error" });
  }
};
