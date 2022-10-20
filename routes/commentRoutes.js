const router = require('express').Router();
const commentController = require('../controllers/commentsController');
const { protect } = require('../middlewares/protect');

router.put('/reply' ,protect, commentController.updateReply);
router.post('/' ,protect, commentController.createComment);
router.put('/' ,protect, commentController.replyComments);
router.get('/:post_id' ,protect, commentController.getComments);
router.delete('/' ,protect, commentController.deleteComment);
router.delete('/reply' ,protect, commentController.deleteReplyComment);
router.put('/:id' ,protect, commentController.updateComment);



module.exports = router;