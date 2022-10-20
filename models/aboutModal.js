const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema(
  {
    user_id: {  
      type: String,
    },
    overReview: {
      type: String,
      max: 100,
    },
   
    work: [
      {
        companyName: { type: String },
        jobTitle: { type: String },
        location: { type: String },
        description: { type: String },
        startDate: { type: String },
        endDate: { type: String },
        privacy: { type: String, enum: ["onlyMe", "public", "friends"] },
        working: { type: Boolean, default: true },
      },
    ],
    education: [
      {
        instituteName: { type: String },
        startDate: { type: String },
        endDate: { type: String },
        privacy: { type: String, enum: ["onlyMe", "public", "friends"] },
        type: { type: String, enum: ["school", "university", "friends"] },
      },
    ],
    homeTown: {
      type: String,
    },
    relationship: {
      status: {
        type: String,
        enum: [
          "Single",
          "Married",
          "Engaged",
          "In a relationship",
          "Divorced",
          "It's complicated",
          "Widowed",
        ],
      },
      privacy: { type: String, enum: ["onlyMe", "public", "friends"] },
    },
  },

  { timestamps: true }
);

const About = mongoose.model("About", aboutSchema);
module.exports = About;




