// const { sign } = require("jsonwebtoken");

// module.exports = (req, res) => {

//     const payload = {
//         email: req.body.email,
//         password: req.body.password
//     };
//     const token = sign(payload, process.env.ACCESS_SECRET, { expiresIn: "1d" })

//     return res.cookie("accesstoken", token, {
//         maxAge: 24 * 6 * 60 * 10000,
//         domain: `moongori.shop`,
//         sameSite: "None",
//         httpOnly: true,
//         secure: true,
//     }).json({ message: "ok" })
// }