const router = require('express').Router();
const friendController = require('../controllers/friendController');
const { protect } = require('../middlewares/protect');


router.post('/' ,protect, friendController.friendRequest);
router.get('/' ,protect, friendController.getAllRequest);
router.get('/sentRequest' ,protect, friendController.getAllSendRequest);
router.get('/friendList' ,protect, friendController.getFriendList);
router.put('/accept' ,protect, friendController.acceptRequest);
router.put('/reject' ,protect, friendController.rejectRequest);
router.get('/suggestion' ,protect, friendController.getSuggestion);
// router.post('/login' , followController.login)

module.exports = router;