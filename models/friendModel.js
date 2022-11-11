const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema({
    friends: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
    following_id: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true],
    },
    follower_id: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true],
    },
    isFriend: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Friend = mongoose.model("Friend", friendSchema);
module.exports = Friend;
