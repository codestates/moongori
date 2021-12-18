module.exports = (req, res) => {
  try {
    return res
      .clearCookie("accesstoken")
      .status(205)
      .json({ message: "signout successfully" });
  } catch {
    return res.status(500).json({ message: "server error" });
  }
};
