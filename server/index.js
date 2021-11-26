const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const cookieParser = require('cookie-parser');
const controllers = require("./controllers");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: true,
        credentials: true,
    })
);
app.use("/", controllers);
app.get("/", (req, res) => {
    res.status(200).send("Hello World!");
});

module.exports = app.listen(PORT, () => {
    console.log(`Server On: http://localhost:${PORT}/`)
})