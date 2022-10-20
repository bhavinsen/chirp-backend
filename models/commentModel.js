const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    post_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Post",
      required:true
    },
    user_id: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },

    comments: {
      type: String,
      required:true
    },

    reply: [
      {
        
            reply_id: {
              type: mongoose.Schema.ObjectId,
              ref: "User",
            },
            reply_comment:{
                    type:String
            }
        
      },
    ],
  },

  { timestamps: true }
);

const Comments = mongoose.model("Comments", commentSchema);
module.exports = Comments;
