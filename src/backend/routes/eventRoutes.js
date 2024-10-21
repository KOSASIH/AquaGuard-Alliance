const express = require('express');
const { createEvent, getEvents } = require('../controllers/eventController');
const router = express.Router();

router.post('/events', createEvent);
router.get('/events', getEvents);

module.exports = router;
