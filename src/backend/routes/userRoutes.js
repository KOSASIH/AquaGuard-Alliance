const express = require('express');
const { getUserProfile } = require('../controllers/userController');
const router = express.Router();

router.get('/profile', getUserProfile);

module.exports = router;
