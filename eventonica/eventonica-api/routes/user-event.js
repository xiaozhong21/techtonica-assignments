const express = require('express');
const cors = require('cors');
const router = express.Router();
const UserEvents = require('../models/user_event');

router.use(express.json());
router.use(cors());
router.use(express.urlencoded({ extended: true }))

//GET list of events for all users
router.get('/', (req, res) => {
  console.log("this is the user-event page")
  UserEvents.findAll()
  .then(events => res.json(events))
  .catch(error => {
    console.log('ERROR:', error)
  });
});

//ADD list of events for newly added users
router.post('/add/:chosenUser', (req, res) => {
  UserEvents.create()
})

router.get('/:chosenUser', (req, res) => {
  UserEvents.findAll({
    where: {
      UserId: req.params.chosenUser
    }
  })
  .then(events => res.json(events))
  .catch(error => {
    console.log('ERROR:', error)
  });
});

module.exports = router;