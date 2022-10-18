const router = require('express').Router();
const upload  = require('../middlewares/upload');
const { protect } = require('../middlewares/protect');
const postController = require('../controllers/postController');
const { fields } = require('../middlewares/upload');

const postUploads = upload.fields([
        { name : 'backgroundImage', maxCount: 1 }, 
        { name : 'gif', maxCount: 1 }, 
        { name : 'media' }
       
    ]);


router.post('/' , protect , postUploads , postController.createPost);
router.post('/like' , protect ,  postController.LikePost);
router.put('/:id' , protect , postUploads , postController.updatePost);
router.delete('/:id' , protect ,  postController.deletePost);
router.get('/' , protect , postController.getPosts);
router.get('/media' , protect , postController.getAllMedia);
router.get('/:id' , protect , postController.getPostsById);
router.get('/like/:post_id' , protect , postController.LikePostByCount);

module.exports = router;