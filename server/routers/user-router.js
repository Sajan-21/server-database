const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/user-controller');

router.get('/users',userControllers.getUsers);
router.post('/user',userControllers.createUser);

module.exports = router;