const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    user_id: {
        type : mongoose.Schema.ObjectId ,
        ref : "User" ,
        required : [true]
    },
    eventType: {
      type: String,
      enum: ["online", "inPerson"],
      required: true,
    },
    onlineType: {
      type: String,
      enum: ["general", "class"],
    },
    eventName: {
      type: String,
      required: true,
    },
    startDateAndTime: {
      type: String,
      required: true,
    },
    endDateAndTime: {
      type: String,
      required: true,
    },
    privacy: {
      type: String,
      enum: ["Public", "Private", "Friends", "Groups"],
      required: true,
    },
    messengerRoom: {
      type: Boolean,
      default: false,
    },
    facebookLive: {
      type: Boolean,
      default: false,
    },
    inPersonLocation: {
      type: String,
    },
    classLocation: {
      type: String,
      enum: ["videoRoom", "link"],
    },
    link: {
      type: String,
    },
    classDetails: {
      expect: {
        type: String,
      },
      category: {
        type: String,
      },
      requirements: {
        type: String,
      },
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
