const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
     user_id : {
        type : mongoose.Schema.ObjectId ,
        ref : "User" ,
        required : [true]
    } ,

   profileImage : {
        type : String ,
    } ,
}, { timestamps : true });

const Profile = mongoose.model('Profile' , profileSchema);
module.exports = Profile;