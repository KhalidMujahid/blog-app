const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

// Fetch All Users Posts and comments
module.exports.indexPage = async (req, res, next) => {
  try {
    await User.find()
      .select("fname lname profile_image")
      .populate({ path: "Post" })
      .sort({ updatedAt: -1 })
      .then((result) => {
        return res.status(200).send(result);
      })
      .catch((error) => {
        throw new Error(error);
      });
  } catch (error) {
    next(error);
  }
};

// View my profile
module.exports.getMyProfile = async (req, res) => {
  try {
    const { id } = req.params;

    await User.findById({ _id: id })
      .select("fname lname email profile_image bio")
      .exec((error, result) => {
        if (error) throw new Error("Error");

        res.status(200).send(result);
      });
  } catch (error) {
    res.status(501).send(error.message);
  }
};

// Fetch post and comment of selected post

module.exports.getPostOnSelect = async (req, res) => {
  try {
    // The post id
    const { id } = req.params;

    // Verify if the post still exits
    const verifyPostIfExit = await Post.findById({ _id: id });
    if (verifyPostIfExit) {
      Post.findById({ _id: id })
        .populate({ path: "Comment" })
        .exec((error, result) => {
          if (error) throw new Error("Error occure please try again later");

          res.status(200).send(result);
        });
    } else {
      return res
        .status(401)
        .send(
          "This post has been does not exits or has been deleted by the author"
        );
    }
  } catch (error) {
    return res.status(501).send(error.message);
  }
};
