const catchAsync = require("../utils/catchAsync");
const Event = require("../models/eventModel");

// Add event
exports.createEvent = catchAsync(async (req, res, next) => {
  user_id = req.user._id; 
 const newEvent = await Event.create({ ...req.body, user_id: user_id });
  return res.status(201).json({
    status: "Success",
    success: true,
    data:newEvent,    
  });
});
// Update event
exports.updateEvent = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const event = await Event.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!event) {
    return res.status(201).json({
      status: "Failed",
      success: false,
      data: `No Event with id:${id}`,
    });
  }
  return res.status(201).json({
    status: "Success",
    success: true,
    data:event,    
  });
});
//Get event by id
exports.getByIdEvent = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const event = await Event.findOne({ _id: id });
  if (!event) {
    return res.status(201).json({
      status: "Success",
      success: true,
      data: `No Event with id:${id}`,
    });
  }
  return res.status(201).json({
    status: "Success",
    success: true,
    data:event,    
  });
});
// Get all event
exports.getAllEvent = catchAsync(async (req, res, next) => {
  const user_id = req.user._id;
  const event = await Event.find({ user_id: user_id });
  if (!event) {
    return res.status(201).json({
      status: "Failed",
      success: false,
      data: `No Event with id:${id}`,
    });
  }
  return res.status(201).json({
    status: "Success",
    success: true,
    data:event,
    count:event.length   
  });
});
// Delete event
exports.deleteEvent = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const event = await Event.findOneAndRemove({ _id: id });
  if (!event) {
    return res.status(201).json({
      status: "Failed",
      success: false,
      data: `No Event with id:${id}`,
    });
  }
  return res.status(201).json({
    status: "Success",
    success: true,
    data:"Event Deleted successfully" 
  });
});
// Get all recent events
exports.getAllRecentEvent = catchAsync(async (req, res, next) => {
    const user_id = req.user._id;
    const event = await Event.find({ user_id: user_id }).sort("-createdAt");
    if (!event) {
      return res.status(201).json({
        status: "Failed",
        success: false,
        data: `No Event with id:${id}`,
      });
    }
    return res.status(201).json({
      status: "Success",
      success: true,
      data:event,
      count:event.length   
    });
  });
  // Get all past events
  exports.getAllPastEvent = catchAsync(async (req, res, next) => {
    const user_id = req.user._id;
    const event = await Event.find({ user_id: user_id }).sort("createdAt");
    if (!event) {
      return res.status(201).json({
        status: "Failed",
        success: false,
        data: `No Event with id:${id}`,
      });
    }
    return res.status(201).json({
      status: "Success",
      success: true,
      data:event,
      count:event.length   
    });
  });