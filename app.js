const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
require("dotenv").config();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

//Routes
const homeRoute = require("./Routes/homeRoutes");

app.use("/", homeRoute);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
