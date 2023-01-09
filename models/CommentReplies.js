const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommentReplies = new Schema({
  comment_id: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
    required: [true, "Comment ID is required!"],
  },
  comment_author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Comment Author ID is required!"],
  },
  comment_content: {
    type: String,
    trim: true,
    required: [true, "Comment Content is required!"],
  },
});

CommentReplies.virtual("CommentSchema", {
  ref: "CommentSchema",
  localField: "_id",
  foreignField: "author",
});

module.exports = mongoose.model(
  "CommentReplies",
  CommentReplies,
  "CommentReplies"
);
