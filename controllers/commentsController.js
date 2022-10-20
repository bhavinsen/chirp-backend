const catchAsync = require("../utils/catchAsync");
const Comment = require("../models/commentModel");

exports.createComment = catchAsync(async (req, res, next) => {
  user_id = req.user._id;
 const {comments,post_id} = req.body;
      const about = await Comment.create({ comments,post_id, user_id: user_id });
      if(about){
        return res.status(201).json({
            status: "Success",
            success: true,
            data: about,
          })
      }
      return res.status(400).json({
        status: "Fail",
        success: false,
        data: '',
      })
  
});



exports.replyComments = catchAsync(async (req, res, next) => {
    user_id = req.user._id;
    const {id} = req.body;
    const reply=req.body.reply
    const commentReply = await Comment.findOneAndUpdate({_id:id},{$push:{reply:reply} },{new:true});
    return res.status(200).json({
      status: "Success",
      success: true,
      data: commentReply,
    });
  });
  

  exports.getComments = catchAsync(async (req, res, next) => {
    const {post_id} = req.params
    const commentGet = await Comment.find({post_id:post_id});
    return res.status(200).json({
      status: "Success",
      success: true,
      data: commentGet,
    });
  });
  

  exports.deleteComment = catchAsync(async (req, res, next) => {
    const {id}= req.params

        const deleteComments = await Comment.findByIdAndRemove({_id:id});
        if(deleteComments){

            return res.status(200).json({
                status: "Success",
                success: true,
                data: deleteComments,
              });
       
        }

        return res.status(400).json({
            status: "fail",
            success: false,
            data: `no  comment with id ${id} found`,
          });
   

  });
  


  exports.deleteReplyComment = catchAsync(async (req, res, next) => {
    const {id, comment_id}= req.body
    
    const comment = await Comment.findOne({_id:comment_id});
        
    const replyUpdate = comment.reply.filter((item) =>{return  id != item._id } )
       
    const update = await Comment.findOneAndUpdate({_id:comment_id},{reply:[...replyUpdate]} ,{new:true} );
        if(update){

            return res.status(200).json({
                status: "Success",
                success: true,
                data: update,
              });
        }

        return res.status(400).json({
            status: "fail",
            success: false,
            data: "no record found",
          });
   

  });


  exports.updateComment = catchAsync(async (req, res, next) => {
    const {id}= req.params

        const updateComment = await Comment.findByIdAndUpdate({_id:id}, {...req.body}, {new:true});
        if(updateComment){

            return res.status(200).json({
                status: "Success",
                success: true,
                data: updateComment,
              });
       
        }

        return res.status(400).json({
            status: "fail",
            success: false,
            data: `no  comment with id ${id} found`,
          });
   

  });
  



  exports.updateReply = catchAsync(async (req, res, next) => {
    const {id, comment_id, reply_comment}= req.body
    
    const comment = await Comment.findOne({_id:comment_id});
    const data =comment.reply
    for (const obj of data) {
        if (obj._id == id) {
            obj.reply_comment=reply_comment;
            break
        }}
       
    const update = await Comment.findOneAndUpdate({_id:comment_id},{reply:[...data]} ,{new:true} );
        if(update){

            return res.status(200).json({
                status: "Success",
                success: true,
                data: update,
              });
        }

        return res.status(400).json({
            status: "fail",
            success: false,
            data: "Record not found",
          });
   

  });