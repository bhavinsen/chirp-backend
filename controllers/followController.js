const catchAsync = require("../utils/catchAsync");
const AppError = require("./../utils/appError");
const Follow = require("../models//followModel");
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

exports.follow = catchAsync(async (req, res,next) => {
  const { following_id } = req.body;
  const follower_id = req.user._id;
  const alreadyFollowing = await Follow.findOne({ follower_id, following_id });
  if (alreadyFollowing && alreadyFollowing.isFollow === true) {
    const updateFollowing = await Follow.findOneAndUpdate(
      { follower_id, following_id },
      { isFollow: false },
      { new: true }
    );
    res.status(200).json({
      status: "Success",
      success: true,
      data: updateFollowing,
    });
  } else if (alreadyFollowing && alreadyFollowing.isFollow === false) {
    const updateFollowing = await Follow.findOneAndUpdate(
      {follower_id, following_id  },
      { isFollow: true },
      { new: true }
    );
    res.status(200).json({
      status: "Success",
      success: true,
      data: updateFollowing,
    });
  } else {
    const following = await Follow.create({ follower_id, following_id  });
    sendCreatePostResponse(res, following);
  }
});
exports.getFollowers = catchAsync(async (req, res,next) => {
  const following_id =req.user._id;
  const followers = await Follow.find({ isFollow: true, following_id:following_id }).populate("follower_id");
  res.status(200).json({
    status: "Success",
    success: true,
    data: followers,
  });
});
