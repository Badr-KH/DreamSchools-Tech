const http = require("http");
require("dotenv").config();
const app = require("../app");
const server = http.createServer(app);
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3001;
mongoose
  .connect(process.env.connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("Connected to the database");
    server.listen(PORT, console.log("Listening on port 3001"));
  });
