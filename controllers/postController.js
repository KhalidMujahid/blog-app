const User = require("../models/User");
const { comparePassword } = require("../utils/comparePassword");
const { hashedPassword } = require("../utils/hashedPassword");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const { generateToken } = require("../utils/generateToken");

// Login
module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) return res.status(401).send("Email is required!");
    if (!password) return res.status(401).send("Password is required!");

    const findUserByEmail = await User.findOne({ email });
    if (findUserByEmail) {
      if (await comparePassword(password, findUserByEmail.password)) {
        const { password, ...others } = findUserByEmail._doc;
        const token = await generateToken(findUserByEmail._id);

        res.status(200).send({ others, token });
      } else {
        return res.status(403).send("Invalid Password");
      }
    } else {
      return res.status(403).send("Invalid Email");
    }
  } catch (error) {
    res.status(501).send(error);
  }
};

// Register
module.exports.createAccount = async (req, res) => {
  try {
    const { fname, lname, email, password } = req.body;

    if (!fname) return res.status(401).send("First name is required");
    if (!lname) return res.status(401).send("Last name is required");
    if (!email) return res.status(401).send("Email name is required");
    if (!password) return res.status(401).send("Password name is required");

    // Check if email already exits

    const checkEmail = await User.findOne({ email });
    if (!checkEmail) {
      // Hashed password
      const hashed = await hashedPassword(password);

      const newUser = await new User({
        fname,
        lname,
        email,
        password: hashed,
      });

      await newUser.save();

      if (newUser) return res.status(200).send("Account created!");
      else return res.status(401).send("Error occure please try again later");
    } else {
      res.status(401).send("Email already exits please login!");
    }
  } catch (error) {
    res.status(501).send(error);
  }
};

// Create a post(Blog Post)

module.exports.makePost = async (req, res) => {
  try {
    const { title, content, cat } = req.body;
    const { id } = req.params;

    if (!title || !content || !cat)
      return res.status(401).send("All field are required!");

    // Validate the id

    const validateID = await User.findById({ _id: id });
    if (!validateID) {
      return res.status(401).send("Error: Invalid ID");
    }

    // Save Post

    const savePost = new Post({
      author: id,
      post_title: title,
      post_image: req.file.filename,
      post_content: content,
      post_category: cat,
    });

    await savePost.save();
    if (savePost) {
      return res.status(200).send("Post created!");
    } else {
      res.status(401).send("Error occure please try again later");
    }
  } catch (error) {
    res.status(501).send(error);
  }
};

// Comment

module.exports.makeComment = async (req, res, next) => {
  try {
    const { post_id, author, comment } = req.body;

    // Check if Post exits
    const checkIfPostExit = await Post.findById({ _id: post_id });
    if (checkIfPostExit) {
      const saveComment = new Comment({
        post_id,
        author,
        comment,
      });

      await saveComment.save();

      if (saveComment) {
        return res.status(200).send("Comment uploaded!");
      } else {
        return res
          .status(401)
          .send("Opps something went wrong.. please try again later");
      }
    } else {
      return res.status(401).send("This post has been deleted!");
    }
  } catch (error) {
    res.status(501).send(error);
  }
};
