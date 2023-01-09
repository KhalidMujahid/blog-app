// POST ROUTES

const {
  loginUser,
  createAccount,
  makePost,
  makeComment,
} = require("../controllers/postController");
const { uploads } = require("../middleware/uploadImage");

const postRouter = require("express").Router();

// Login Route
postRouter.post("/auth/login", loginUser);

// Register route

postRouter.post("/auth/register", createAccount);

// Post Route (Blog)

postRouter.post("/new/blog/:id", uploads.single("image"), makePost);

// Comment Route

postRouter.post("/add/comment", makeComment);

module.exports = postRouter;
