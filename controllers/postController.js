const catchAsync = require("../utils/catchAsync");
const AppError = require("./../utils/appError");
const Post = require("../models/postModel");
const Like = require("../models/likeModel");
const User = require("../models/userModel");

const sendCreatePostResponse = (res, post) => {
  return res.status(201).json({
    status: "Success",
    success: true,
    data: {
      post,
    },
  });
};

//delete response
const sendDeleteResponse = (res, post) => {
  return res.status(200).json({
    status: "success",
    success: true,
    data: {
      post: "Delete successfully",
    },
  });
};

const sendResponseRecordsNotFound = (res, post) => {
  return res.status(404).json({
    success: false,
    data: {
      post: "Records not found ",
    },
  });
};
///createPost
exports.createPost = catchAsync(async (req, res, next) => {
  if (typeof req.files !== "undefined" && req.files.gif) {
    const newPost = await Post.create({
      ...req.body,
      gif: {
        mimetype: req.files.gif[0].mimetype,
        filename: req.files.gif[0].filename,
      },
      user: req.user._id,
    });
    sendCreatePostResponse(res, newPost);
  } else if (typeof req.files !== "undefined" && req.files.backgroundImage) {
    const newPost = await Post.create({
      ...req.body,
      backgroundImage: {
        mimetype: req.files.backgroundImage[0].mimetype,
        filename: req.files.backgroundImage[0].filename,
      },
      user: req.user._id,
    });
    sendCreatePostResponse(res, newPost);
  } else if (typeof req.files !== "undefined" && req.files.media) {
    const newPost = await Post.create({
      ...req.body,
      media: req.files.media.map((file) => ({
        mimetype: file.mimetype,
        filename: file.filename,
      })),
      user: req.user._id,
    });
    sendCreatePostResponse(res, newPost);
  } else {
    const newPost = await Post.create({
      ...req.body,
      user: req.user._id,
    });
    sendCreatePostResponse(res, newPost);
  }
});

//getAll Post
exports.getPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find().populate(
    "user",
    "firstName lastName email profileImage"
  );
  return res.status(200).json({
    status: "success",
    success: true,
    data: {
      posts: posts.length > 0 ? posts : "No Post found.",
    },
  });
});
//get Post by ID
exports.getPostsById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const posts = await Post.findOne({ _id: id }).populate("user");
  if (!posts) {
    return res.status(200).json({
      status: "success",
      success: true,
      data: `No post with id:${id}`,
    });
  }
  return res.status(200).json({
    status: "success",
    success: true,
    data: {
      posts,
    },
  });
});
//update post
exports.updatePost = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findOne({ _id: id });
  if (post) {
    if (typeof req.files !== "undefined" && req.files.gif) {
      const newPost = await Post.findOneAndUpdate(
        { _id: id },
        {
          ...req.body,
          gif: {
            mimetype: req.files.gif[0].mimetype,
            filename: req.files.gif[0].filename,
          },
        },
        { new: true }
      );
      sendCreatePostResponse(res, newPost);
    } else if (typeof req.files !== "undefined" && req.files.backgroundImage) {
      const newPost = await Post.findOneAndUpdate(
        { _id: id },
        {
          ...req.body,
          backgroundImage: {
            mimetype: req.files.backgroundImage[0].mimetype,
            filename: req.files.backgroundImage[0].filename,
          },
        },
        { new: true }
      );
      sendCreatePostResponse(res, newPost);
    } else if (typeof req.files !== "undefined" && req.files.media) {
      const newPost = await Post.findOneAndUpdate(
        { _id: id },
        {
          ...req.body,
          media: req.files.media.map((file) => ({
            mimetype: file.mimetype,
            filename: file.filename,
          })),
        },
        { new: true }
      );
      sendCreatePostResponse(res, newPost);
    } else {
      const newPost = await Post.findOneAndUpdate(
        { _id: id },
        {
          ...req.body,
        },
        { new: true }
      );
      sendCreatePostResponse(res, newPost);
    }
  }
});

//deletePost
exports.deletePost = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findOneAndRemove({ _id: id });
  if (post) {
    sendDeleteResponse(res, post);
  }
  sendResponseRecordsNotFound(res, post);
});

//add like
exports.LikePost = catchAsync(async (req, res, next) => {
  const { post_id } = req.body;
  const post = await Like.findOne({ user_id: req.user._id, post_id });

  if (post) {
    const updateLike = await Like.findOneAndRemove({
      user_id: post.user_id,
      post_id: post.post_id,
      isLike: true,
    });

    return res.status(200).send({
      status: "success",
      success: true,
      message: "post disliked",
    });
  } else {
    const newLike = await Like.create({
      post_id,
      user_id: req.user._id,
    });

    return res.status(201).send({
      status: "success",
      success: true,
      data: newLike,
      message: "like added",
    });
  }
});

//post by count user
exports.LikePostByCount = catchAsync(async (req, res, next) => {
  const { post_id } = req.params;

  // const findOne = await Like.aggregate([
  //     { $lookup:
  //         {
  //             from: "User",
  //             localField: "_id",
  //             foreignField: "user_id",
  //             as: "user"
  //         }
  //     },
  //   //  { $match: {"post_id":post_id}},

  // ])
  const likeCount_Post = await Like.find({ post_id, isLike: true }).populate(
    "user_id"
  );
  const count = likeCount_Post.length;
  return res.status(200).send({
    status: "success",
    success: true,
    count: count,
    data: likeCount_Post,
    message: "Likes for this post",
  });
});
