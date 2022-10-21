const catchAsync = require("../utils/catchAsync");
const About = require("../models/aboutModal");

// Add about
exports.createAbout = catchAsync(async (req, res, next) => {
  user_id = req.user._id;
  const alreadyExists = await About.findOne({ user_id: user_id });
  if (!alreadyExists) {
    const about = await About.create({ ...req.body, user_id: user_id });
    return res.status(201).json({
      status: "Success",
      success: true,
      data: about,
    });
  }
  return res.status(201).json({
    status: "Failed",
    success: false,
    data: "Already Exists",
  });
});

// Update about
exports.updateAbout = catchAsync(async (req, res, next) => {
  user_id = req.user._id;
  const { id } = req.params;
  const updateAbout = await About.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  return res.status(201).json({
    status: "Success",
    success: true,
    data: updateAbout,
  });
});

exports.getAbout = catchAsync(async (req, res, next) => {
  const getAbout = await About.find({ user_id: req.user._id });
  return res.status(201).json({
    status: "Success",
    success: true,
    data: getAbout,
  });
});

// Delete about
exports.deleteAbout = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const getAbout = await About.findOneAndRemove({ _id: id });
  return res.status(201).json({
    status: "Success",
    success: true,
    data: getAbout,
  });
});
