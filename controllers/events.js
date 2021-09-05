const { response } = require("express");

const getEvents = (req, res = response) => {
  return res.status(200).json({
    ok: true,
    msg: 'getEvents'
  });
};
const addEvent = (req, res = response) => {
  return res.status(200).json({
    ok: true,
    msg: 'addEvent'
  });
};
const updateEvent = (req, res = response) => {
  return res.status(200).json({
    ok: true,
    msg: 'updateEvent'
  });
};
const deleteEvent = (req, res = response) => {
  return res.status(200).json({
    ok: true,
    msg: 'deleteEvent'
  });
};

module.exports = {
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent
};
