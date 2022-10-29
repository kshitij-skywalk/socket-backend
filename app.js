const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://127.0.0.1:5500" }));
app.get("/home", (req, res, next) => {
  res.status(200).json({
    data: "okay",
  });
});
module.exports = app;
