const mongoose = require("mongoose");

const coverSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true],
    },

    coverImage: {
      type: String,
    },
  },
  { timestamps: true }
);

const Cover = mongoose.model("Cover", coverSchema);
module.exports = Cover;
