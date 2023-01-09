// DELETE ROUTES

const { deletePost } = require("../controllers/deleteController");

const deleteRouter = require("express").Router();

deleteRouter.delete("/remove", deletePost);

module.exports = deleteRouter;
