// Env
require("dotenv").config();

// connect to DB
require("../config/db");

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const app = express();

// routes imports
const getRouter = require("../routes/getRoute");
const postRouter = require("../routes/postRoute");
const deleteRouter = require("../routes/deleteRoute");
const updateRouter = require("../routes/updateRoute");

// PORT
const PORT = process.env.PORT || process.env.MY_PORT;

// Middlewares
app.use(express.static("public"));

app.use(
  cors({
    origin: "*",
  })
);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/", getRouter);
app.use("/", postRouter);
app.use("/", deleteRouter);
app.use("/", updateRouter);
app.listen(PORT, () => console.log("Server running on port", PORT));
