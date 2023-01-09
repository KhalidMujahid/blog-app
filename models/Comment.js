const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommentSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post_id: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    comment: {
      type: String,
      trim: true,
      required: [true, "Field is required!"],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

CommentSchema.virtual("Post", {
  ref: "Post",
  localField: "_id",
  foreignField: "author",
});

module.exports = mongoose.model("Comment", CommentSchema, "Comment");
