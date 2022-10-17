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
// follow user
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
// get all followers
exports.getFollowers = catchAsync(async (req, res,next) => {
  const following_id =req.user._id;
  console.log("🚀 ~ file: followController.js ~ line 50 ~ exports.getFollowers=catchAsync ~ following_id", following_id)
  const followers = await Follow.find({ isFollow: true, following_id:following_id }).populate("follower_id");
  console.log("🚀 ~ file: followController.js ~ line 52 ~ exports.getFollowers=catchAsync ~ followers", followers)
  if (followers.length>0){
    return res.status(200).json({
      status: "Success",
      success: true,
      data: followers,
    });
  }
  res.status(200).json({
    status: "Success",
    success: true,
    data: "No Followers Found",
  });
});
