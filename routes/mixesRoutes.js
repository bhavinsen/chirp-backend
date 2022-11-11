const router = require('express').Router();
const upload  = require('../middlewares/upload');
const { protect } = require('../middlewares/protect');
const mixesController = require('../controllers/mixesController');
const { fields } = require('../middlewares/upload');

const postUploads = upload.fields([
        { name : 'image', maxCount: 1 }, 
        { name : 'audio', maxCount: 1 },        
    ]);


router.post('/' , protect , postUploads , mixesController.createMixes);
router.get('/' , protect , mixesController.getMixes);
router.delete('/:id' , protect ,  mixesController.deleteMixes);
// router.post('/like' , protect ,  postController.LikePost);
// router.put('/:id' , protect , postUploads , postController.updatePost);
// router.get('/media' , protect , postController.getAllMedia);
// router.get('/:id' , protect , postController.getPostsById);
// router.get('/like/:post_id' , protect , postController.LikePostByCount);

module.exports = router;