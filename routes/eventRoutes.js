const router = require('express').Router();
const eventController = require('../controllers/eventController');
const { protect } = require('../middlewares/protect');

router.post('/' ,protect, eventController.createEvent);
router.put('/:id' ,protect, eventController.updateEvent);
router.get('/' ,protect, eventController.getAllEvent);
router.get('/recent' ,protect, eventController.getAllRecentEvent);
router.get('/past' ,protect, eventController.getAllPastEvent);
router.get('/:id' ,protect, eventController.getByIdEvent);
router.delete('/:id' ,protect, eventController.deleteEvent);
// router.post('/login' , authController.login)

module.exports = router;