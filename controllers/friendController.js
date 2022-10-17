const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Friend = require("../models/friendModel");

const sendCreatePostResponse = (res, post) => {
  return res.status(201).json({
    status: "Success",
    success: true,
    data: {
      post,
    },
  });
};

// sent friend request
exports.friendRequest = catchAsync(async (req, res, next) => {
  const { following_id } = req.body;
  const follower_id = req.user._id;
  const request = await Friend.findOne({ following_id, follower_id });
  if (request) {
    const cancelRequest = await Friend.findOneAndRemove({
      follower_id,
      following_id,
    });
    res.status(200).json({
      status: "Success",
      success: true,
      data: "Request Cancelled",
    });
  } else {
    const friendRequest = await Friend.create({ follower_id, following_id });
    res.status(200).json({
      status: "Success",
      success: true,
      data: friendRequest,
    });
  }
});
// get all friend request
exports.getAllRequest = catchAsync(async (req, res, next) => {
  const user_id = req.user._id;
  const request = await Friend.find({ following_id: user_id,isFriend:false });
  if (request.length > 0) {
    res.status(200).json({
      status: "Success",
      success: true,
      data: request,
    });
  } else {
    res.status(400).json({
      status: "Fail",
      success: false,
      data: "No Friend Request Found",
    });
  }
});
// get all sent request
exports.getAllSendRequest = catchAsync(async (req, res, next) => {
  const user_id = req.user._id;
  console.log("🚀 ~ file: friendController.js ~ line 60 ~ exports.getAllSendRequest=catchAsync ~ user_id", user_id)
  const request = await Friend.find({ follower_id:user_id,isFriend:false });
  console.log("🚀 ~ file: friendController.js ~ line 61 ~ exports.getAllSendRequest=catchAsync ~ request", request)
  if (request.length>0) {
    res.status(200).json({
      status: "Success",
      success: true,
      data: request,
    });
  } else {
    res.status(400).json({
      status: "Fail",
      success: false,
      data: "No sent request found",
    });
  }
});
// accept friend request
exports.acceptRequest = catchAsync(async (req, res, next) => {
  const { _id } = req.body;
  const user_id = req.user._id;
  const request = await Friend.findOneAndUpdate(
    { following_id: user_id, _id },
    { isFriend: true },
    { new: true }
  );
  if (request) {
    res.status(200).json({
      status: "Success",
      success: true,
      data: request,
    });
  } else {
    res.status(400).json({
      status: "Fail",
      success: false,
      data: `No Request with id:${_id}`,
    });
  }
});
// reject friend request
exports.rejectRequest = catchAsync(async (req, res, next) => {
  const { _id } = req.body;
  const user_id = req.user._id;
  const cancelRequest = await Friend.findOneAndRemove({
    following_id: user_id,
    _id,
  });
  if (cancelRequest) {
    res.status(200).json({
      status: "Success",
      success: true,
      data: "Friend Request Rejected",
    });
  }else{
    res.status(400).json({
      status: "Fail",
      success: false,
      data: `No Request with id:${_id}`,
    });
  }
});
// get friend list
exports.getFriendList = catchAsync(async (req, res, next) => {
  const user_id = req.user._id;
  const result = await Friend.find({$or: [{following_id: user_id}, {follower_id: user_id}], isFriend : true}).populate("follower_id").populate("following_id")
  if (result.length > 0) {
    res.status(200).json({
      status: "Success",
      success: true,
      data: result,
    });
  } else {
    res.status(400).json({
      status: "Fail",
      success: false,
      data: "No Friend Found",
    });
  }
});
// friend suggestion
exports.getSuggestion = catchAsync(async (req, res, next) => {
  const user_id = req.user._id;
  const request = await Friend.find({ following_id: user_id });
  if (request.length > 0) {
    const data = request.map((result) => {
      return id = result.follower_id.toString().split(",").join("");
    });
    
  const suggestion = await Friend.find({'following_id':{$in:data}}).populate("follower_id")
    res.status(200).json({
      status: "Success",
      success: true,
      data: suggestion,
    });
  } else {
    res.status(400).json({
      status: "Fail",
      success: false,
      data: "No Friend Request Found",
    });
  }
});


