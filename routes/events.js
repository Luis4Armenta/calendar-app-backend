const { Router } = require('express');
const { getEvents, addEvent, updateEvent, deleteEvent } = require('../controllers/events');

const router = Router();

router.get('/', getEvents);

router.post('/', addEvent);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router;