const express = require('express');
const cors = require('cors');
const router = express.Router();
const Event = require('../models/event');
const { Op } = require("sequelize");

router.use(express.json());
router.use(cors());
router.use(express.urlencoded({ extended: true }))

//GET list of events
router.get('/', (req, res) => {
  Event.findAll()
  .then(events => res.json(events))
  .catch(error => {
    console.log('ERROR:', error)
  });
});

//ADD new event
router.post('/add', (req, res) => {
  const newEvent = req.body;
  Event.create({ 
    id: newEvent.id, 
    name: newEvent.name, 
    date: newEvent.date,
    description: newEvent.description,
    category: newEvent.category
   });
  res.json(events);
});

//DELETE an existing event
router.delete('/:deleteEventId', (req, res) => {
  const deleteEventId = req.params.deleteEventId;
  Event.destroy({
    where: {
      id: deleteEventId
    }
  });
  res.send({ message: 'Event deleted' });
});

//SEARCH for events
router.get('/search1/:searchDate', (req, res) => {
  Event.findAll({
    where: {
      date: req.params.searchDate
    }
  })
  .then(events => res.json(events))
  .catch(error => {
    console.log('ERROR:', error)
  });
});

router.get('/search2/:searchCategory', (req, res) => {
  Event.findAll({
    where: {
      category: req.params.searchCategory
    }
  })
  .then(events => res.json(events))
  .catch(error => {
    console.log('ERROR:', error)
  });
});

module.exports = router;