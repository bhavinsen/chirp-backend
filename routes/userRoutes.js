const router = require('express').Router();
const userController = require('../controllers/userController');
const  { protect } = require('../middlewares/protect');
const upload = require('../middlewares/upload');
const postUploads =  upload.fields([
    { name : 'profile', maxCount: 1 }, 
    { name : 'cover', maxCount: 1 }, 
   
]);
router.get('/profile' , protect , userController.getProfile)
router.get('/all' , protect , userController.getAllUsers);
router.get('/photosOfYou' , protect , userController.getPhotosOfYou);
router.get('/profilePictures' , protect , userController.GetAllProfilePicture);
router.get('/coverPictures' , protect , userController.getAllCoverPicturer);
router.post('/profile' , protect,postUploads , userController.uploadProfileOrCoverPicture)
router.delete('/deleteProfile/:id' , protect,postUploads , userController.deleteProfilePicture)
router.delete('/deleteCover/:id' , protect,postUploads , userController.deleteCoverPicture)


module.exports = router;