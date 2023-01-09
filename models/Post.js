const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    post_title: {
      type: String,
      trim: true,
      required: [true, "Title is required"],
    },
    post_image: {
      type: String,
      // required: [true, "Image is required"],
    },
    post_content: {
      type: String,
      required: [true, "Content is required"],
    },
    post_category: {
      type: String,
      trim: true,
      required: [true, "Category is required"],
    },
    love: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// User
PostSchema.virtual("User", {
  ref: "User",
  localField: "_id",
  foreignField: "blogs",
});

// Comment
PostSchema.virtual("Comment", {
  ref: "Comment",
  localField: "_id",
  foreignField: "post_id",
});

module.exports = mongoose.model("Post", PostSchema, "Post");
