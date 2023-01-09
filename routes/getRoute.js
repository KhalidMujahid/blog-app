// GET ROUTES

const {
  indexPage,
  getMyProfile,
  getPostOnSelect,
} = require("../controllers/getCotroller");

const getRouter = require("express").Router();

// Get all Posts
getRouter.get("/", indexPage);

// My profile
getRouter.get("/profile/:id", getMyProfile);

// Get post and comment of selected post
getRouter.get("/get/select/:id", getPostOnSelect);

module.exports = getRouter;
