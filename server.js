const express = require("express");
const dotenv = require("dotenv");
const router = require("./routers/router.js");
dotenv.config({ path: "./config.env" });
app = express();
app.use("/", router);
const port = process.env.PORT || 8888;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
