const { Router } = require('express');
const userController = require('../controllers/userController');

const router = Router();

router.get('/user', userController.getUser);
router.put('/user', userController.updateUser);

module.exports = router;

