const { sign } = require("jsonwebtoken");

module.exports = (req, res) => {

    const payload = {
        email: req.body.eemail,
        password: req.bodu.password
    };
    const token = sign(payload, process.env.ACCESS_SECRET, { expiresIn: "1d" })

    return res.cookie("accesstoken", token, {
        maxAge: 24 * 6 * 60 * 10000,
        sameSite: "None",
        httpOnly: true,
        secure: true,
    }).json({ message: "ok" })
}