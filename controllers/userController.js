const catchAsync = require("../utils/catchAsync");
const AppError = require("./../utils/appError");
const User = require("../models/userModel");
const Post = require("../models/postModel");
const Profile = require("../models/profilePicture");
const Cover = require("../models/coverPicture");
const { ObjectId } = require("mongodb");

// get profile details
exports.getProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return next(new AppError("User not found.", 404));
  }
  return res.status(200).json({
    status: "success",
    success: true,
    data: {
      user,
    },
  });
});

// get All User
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  return res.status(200).json({
    status: "success",
    success: true,
    data: {
      users: users.length > 0 ? users : "No user found.",
    },
  });
});

//upload profile & cover picture
exports.uploadProfileOrCoverPicture = catchAsync(async (req, res, next) => {
  const id = req.user._id;
  if (typeof req.files !== "undefined" && req.files.profile) {
    const profileImage = await Profile.create({
      user_id: id,
      profileImage: req.files.profile[0].filename,
    });
    const userProfile = await User.findOneAndUpdate(
      { _id: id },
      { profileImage: profileImage.profileImage }
    );
    if (userProfile) {
      const data = {
        postType: "bg",
      };
      const newPost = await Post.create({
        ...data,
        backgroundImage: {
          mimetype: req.files.profile[0].mimetype,
          filename: req.files.profile[0].filename,
          profile_id: profileImage._id,
        },
        user: req.user._id,
      });
    }
    res.status(200).json({
      status: "success",
      success: true,
      data: profileImage,
    });
  } else if (typeof req.files !== "undefined" && req.files.cover) {
    const coverImage = await Cover.create({
      user_id: id,
      coverImage: req.files.cover[0].filename,
    });
    const userProfile = await User.findOneAndUpdate(
      { _id: id },
      { coverImage: coverImage.coverImage }
    );
    if (userProfile) {
      const data = {
        postType: "bg",
      };
      const newPost = await Post.create({
        ...data,
        backgroundImage: {
          mimetype: req.files.cover[0].mimetype,
          filename: req.files.cover[0].filename,
          cover_id: coverImage._id,
        },
        user: req.user._id,
      });
    }
    res.status(200).json({
      status: "success",
      success: true,
      data: coverImage,
    });
  } else {
    res.status(200).json({
      status: "success",
      success: true,
      data: "Please select image",
    });
  }
});

//getAllProfilePicturer

exports.GetAllProfilePicture = catchAsync(async (req, res, next) => {
  const user_id = req.user._id;
  const profilePicturers = await Profile.find({ user_id: user_id });
  return res.status(200).json({
    status: "success",
    success: true,
    data: profilePicturers,
    count:profilePicturers.length
  });
});

//getAllCoverPicturer

exports.getAllCoverPicturer = catchAsync(async (req, res, next) => {
  const user_id = req.user._id;
  const coverPicturers = await Cover.find({ user_id: user_id });
  return res.status(200).json({
    status: "success",
    success: true,
    data: coverPicturers,
  });
});

//delete profile picture
exports.deleteProfilePicture = catchAsync(async (req, res, next) => {
  const user_id = req.user._id;
  const { id } = req.params;
  const profile = await Profile.findOne({ _id: id });
  const user = await User.findOne({
    _id: user_id,
  });

  if (profile.profileImage === user.profileImage) {
    const newUser = await User.findOneAndUpdate(
      { _id: user_id },
      {
        profileImage:
          "https://uwswpa.org/wp-content/uploads/2015/07/default_profile_pic.jpg",
      },
      { new: true }
    );
  }
  const deleteProfile = await Profile.findOneAndRemove({ _id: id });
  const deletePost = await Post.findOneAndRemove({
    "backgroundImage.profile_id": ObjectId(id),
  });
  res.status(200).json({
    status: "success",
    success: true,
    data: "Profile Image Deleted Successfully",
  });
});

//delete cover picture
exports.deleteCoverPicture = catchAsync(async (req, res, next) => {
  const user_id = req.user._id;
  const { id } = req.params;
  const cover = await Cover.findOne({ _id: id });
  const user = await User.findOne({
    _id: user_id,
  });
  if (cover.coverImage === user.coverImage) {
    const newUser = await User.findOneAndUpdate(
      { _id: user_id },
      {
        coverImage: "shorturl.at/iCGO8",
      },
      { new: true }
    );
  }
  const deleteCover = await Cover.findOneAndRemove({ _id: id });
  const deletePost = await Post.findOneAndRemove({
    "backgroundImage.cover_id": ObjectId(id),
  });
  res.status(200).json({
    status: "success",
    success: true,
    data: "Cover Image Deleted Successfully",
  });
});
// photos of you
exports.getPhotosOfYou = catchAsync(async (req, res, next) => {
  const user_id = req.user._id;
  const posts = await Post.find({ tags: user_id }).populate(
    "tags",
    "firstName lastName"
  );
  return res.status(200).json({
    status: "success",
    success: true,
    data: posts,
  });
});
