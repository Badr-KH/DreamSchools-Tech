const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const schoolRoute = require("./routes/school");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/school", schoolRoute);

if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https")
      res.redirect(`https://${req.header("host")}${req.url}`);
    else next();
  });
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
  });
}
module.exports = app;
