const mongoose = require("mongoose");

const mixesSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true],
    },

    mixesImage: {
      type: String,
    },
    mixesTitle:{
        type:String,
    },
    mixesAudio:{
        type:Object,
    }
  },
  { timestamps: true }
);

const Mixes = mongoose.model("Mixes", mixesSchema);
module.exports = Mixes;
