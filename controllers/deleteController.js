const Post = require("../models/Post");

module.exports.deletePost = async (req, res, next) => {
  try {
    // Verify the id
    const { id } = req.body;
    const verifyPostID = await Post.findById({ _id: id });
    if (verifyPostID) {
      Post.findByIdAndDelete({ _id: id }).exec((error, _result) => {
        if (error)
          throw new Error("Something went wrong please try again later!");

        res.status(200).send("Post Deleted!");
      });
    } else {
      throw new Error("No post found");
    }
  } catch (error) {
    next(error.message);
    res.status(501).send(error);
  }
};
