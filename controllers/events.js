const { response } = require("express");
const Event = require("../models/Event");

const getEvents = async (req, res = response) => {
  const events = await Event.find()
                            .populate('user', 'name');
  
  return res.status(200).json({
    ok: true,
    events
  });
};

const addEvent = async(req, res = response) => {
  const event = new Event(req.body);

  try {
    event.user = req.uid;
    const eventSaved = await event.save()

    res.status(201).json({
      ok: true,
      event: eventSaved
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    });
  }
};

const updateEvent = async(req, res = response) => {
  const uid = req.uid;
  const eventId = req.params.id;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un evento por ese ID'
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No tiene privilegio de modificar este evento'
      })
    }

    const newEvent = {
      ... req.body,
      user: uid
    }

    const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, { new: true});

    res.status(201).json({
      ok: true,
      eventUpdated
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    });
  }
};

const deleteEvent = async(req, res = response) => {
  const uid = req.uid;
  const eventId = req.params.id;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un evento por ese ID'
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No tiene privilegios para elimiar ese evento'
      });
    }

    await Event.findByIdAndDelete(eventId);

    res.status(201).json({
      ok: true
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    });
  }
};

module.exports = {
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent
};
