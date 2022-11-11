const router = require('express').Router();
const aboutController = require('../controllers/aboutController');
const { protect } = require('../middlewares/protect');

router.post('/' ,protect, aboutController.createAbout);
router.put('/:id' ,protect, aboutController.updateAbout);
router.get('/' ,protect, aboutController.getAbout);
router.delete('/:id' ,protect, aboutController.deleteAbout);


module.exports = router;