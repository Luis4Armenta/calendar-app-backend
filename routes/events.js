const { Router} = require('express');
const { check } = require('express-validator');
const { getEvents, addEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.get('/', getEvents);

router.post('/', [
  check('title', 'El titulo es obligatorio').notEmpty(),
  check('start', 'Fecha de inicio es obligatorio').custom(isDate),
  check('end', 'Fecha de finalización es obligatorio').custom(isDate),
  validateFields
], addEvent);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router;