const express = require('express');
const cors = require('cors');
const router = express.Router();
const User = require('../models/user');

router.use(express.json());
router.use(cors());
router.use(express.urlencoded({ extended: true }))

// const pgp = require('pg-promise')(/* options */)
// const db = pgp('postgres://localhost:5432/eventonica')

//GET list of users
router.get('/', (req, res) => {
  // db.any('SELECT * FROM users')--> using pg-promise
  User.findAll() //--> using Sequelize
  .then(users => res.json(users))
  .catch(error => {
    console.log('ERROR:', error)
  });
});

//ADD new user
router.post('/add', (req, res) => {
  const newUser = req.body;
  User.create({ //-->using Sequelize
    id: newUser.id, 
    name: newUser.name, 
    email: newUser.email 
  })
  // db.one('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id, name, email', [newUser.name, newUser.email]);-->using pg-promise
  // users.push(newUser);--> using hardcodes users
  res.json(users);
});

//DELETE an existing user
router.delete('/:deleteId', (req, res) => {
  const deleteId = req.params.deleteId;
  User.destroy({ //-->using Sequelize
    where: {
      id: deleteId
    }
  });
  // db.result('DELETE FROM users WHERE id = $1', deleteId) --> using pg-promise
  // users = users.filter(user => user.id !== deleteId); --> using hardcoded users
  res.send({ message: 'User deleted' });
});

module.exports = router;
