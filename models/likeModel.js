const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    isLike : {
        type : Boolean ,
        default:true,
    } ,
    
    user_id : {
        type : mongoose.Schema.ObjectId ,
        ref : "User" ,
        required : [true]
    } ,

    post_id : {
        type : mongoose.Schema.ObjectId ,
        ref : "Post" ,
        required : [true]
    } ,
}, { timestamps : true });

const Like = mongoose.model('Like' , likeSchema);
module.exports = Like;