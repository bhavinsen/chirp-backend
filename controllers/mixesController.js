const catchAsync = require("../utils/catchAsync");
const Mixes = require("../models/mixesModal");
const path = require("path");
const fs = require('fs')

const sendCreatePostResponse = (res, post) => {
  return res.status(201).json({
    status: "Success",
    success: true,
    data: {
      post,
    },
  });
};

///createPost
exports.createMixes = catchAsync(async (req, res, next) => {
  const user_id = req.user._id;
  const limit = await Mixes.find({ user_id: user_id });
  if (limit.length !== 10) {
    if (typeof req.files !== "undefined" && req.files.audio) {
      const newPost = await Mixes.create({
        ...req.body,
        mixesAudio: {
          mimetype: req.files.audio[0].mimetype,
          filename: req.files.audio[0].filename,
        },
        mixesImage: req.files.image[0].filename,
        user_id: user_id,
      });
      sendCreatePostResponse(res, newPost);
    }
    return res.status(200).json({
      status: "Failed",
      success: false,
      data: "Please add files",
    });
  }
  return res.status(200).json({
    status: "Failed",
    success: false,
    data: "Limit exists",
  });
});
exports.getMixes = catchAsync(async (req, res, next) => {
  const user_id = req.user._id;
  const mixes = await Mixes.find({ user_id: user_id });
  if (mixes.length>0) {
    return res.status(200).json({
      status: "success",
      success: true,
      count:mixes.length,
      data: mixes,

    });
  }
  return res.status(200).json({
    status: "Failed",
    success: false,
    data: "No Records found",
  });
});

exports.deleteMixes = catchAsync(async (req, res, next) => {
  const{id}=req.params
  const mixes = await Mixes.findOne({ _id: id });

  if (mixes) {
    const deleteMixes = await Mixes.findOneAndRemove({ _id: id });
    const imagePath=path.join(`uploads/${mixes.mixesImage}`)
    fs.unlinkSync(imagePath)
    const audioPath=path.join(`uploads/${mixes.mixesAudio.filename}`)
    fs.unlinkSync(audioPath)
    return res.status(200).json({
      status: "success",
      success: true,
      data: "Deleted successfully",
    });
  }
  return res.status(200).json({
    status: "Failed",
    success: false,
    data: "No Records found",
  });
});


