const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    fname: {
      type: String,
      trim: true,
      required: [true, "First name is required"],
    },
    lname: {
      type: String,
      trim: true,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    profile_image: {
      type: String,
      default: "default.jpeg",
    },
    bio: {
      type: String,
    },
    token: {
      type: String,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// User post
UserSchema.virtual("Post", {
  ref: "Post",
  localField: "_id",
  foreignField: "author",
});

// User comment
UserSchema.virtual("Comment", {
  ref: "Comment",
  localField: "_id",
  foreignField: "author",
});

module.exports = mongoose.model("User", UserSchema, "User");
