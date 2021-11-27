const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

module.exports = app.listen(PORT, () => {
  console.log(`this server listening on: ${PORT}/`);
});
