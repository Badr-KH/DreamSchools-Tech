const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const schoolRoute = require("./routes/school");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/school", schoolRoute);
module.exports = app;
