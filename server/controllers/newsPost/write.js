const { newsPost, user } = require("../../models");

module.exports = async (req, res) => {
  const id = req.cookies.id;
  const userInfo = await user.findOne({
    where: { id: id },
  });
  try {
    if (req.file) {
      const img = req.file.location;
      const { category, content, location, latitude, longitude } = req.body;
      console.log("!!!!!!!!!", latitude);
      const payload = {
        category,
        content,
        location: location || null,
        town: userInfo.town,
        latitude: Number(latitude),
        longitude: Number(longitude),
        img,
        user_Id: id,
      };
      const createPost = await newsPost.create(payload);
      const updatePost = await newsPost.findOne({
        where: { id: createPost.id },
      });
      return res.status(201).json({ data: updatePost, message: "create" });
    } else {
      const { category, content, location, latitude, longitude } = req.body;
      const payload = {
        category,
        content,
        location: location || null,
        town: userInfo.town,
        latitude: Number(latitude),
        longitude: Number(longitude),
        user_Id: id,
      };
      const createPost = await newsPost.create(payload);
      const updatePost = await newsPost.findOne({
        where: { id: createPost.id },
      });
      return res.status(201).json({ data: updatePost, message: "create" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error" });
  }
};
