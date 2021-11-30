const { user } = require("../../models");

module.exports = async (req, res) => {
    const { email } = req.params;
    console.log(email);

    await user.update({ authState: 1 }, {
        where: { email: email }
    })
    res.redirect("http://localhost:3000")
    //.status(200).json({ message: "successful email auth" })
}