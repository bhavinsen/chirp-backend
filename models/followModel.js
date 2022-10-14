const mongoose = require("mongoose");

const followSchema = new mongoose.Schema(
  {
    follower_id: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true],
    },
    following_id: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true],
    }, 
    isFollow: {
        type: Boolean,        
        default:true,
      },
  },
  { timestamps: true }
);

const Follow = mongoose.model("Follow", followSchema);
module.exports = Follow;
