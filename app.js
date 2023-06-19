const express = require("express");
const path = require("path");
const cookie = require("cookie-parser");


const getRouter = require("./src/router/getReq");
const postRouter = require("./src/router/postReq");
const app = express();

const staticPath = path.join(__dirname, "src", "public");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(staticPath));

app.set("view engine", "hbs");
app.use(cookie());

app.use('', postRouter);
app.use('', getRouter);

app.listen(2125);