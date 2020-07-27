const router = require('express').Router();

const customerController = require('../controllers/customerController');

router.get('/b', customerController.list);
router.post('/anadir', customerController.save);
router.post('/register', customerController.register);

// router.get('/update/:id', customerController.edit);
// router.post('/update/:id', customerController.update);
// router.get('/delete/:id', customerController.delete);

module.exports = router;

