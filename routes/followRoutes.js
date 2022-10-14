const router = require('express').Router();
const followController = require('../controllers/followController');
const { protect } = require('../middlewares/protect');


router.post('/' ,protect, followController.follow);
router.get('/' ,protect, followController.getFollowers);
// router.post('/login' , followController.login)

module.exports = router;