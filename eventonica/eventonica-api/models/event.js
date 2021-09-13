const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('postgres://localhost:5432/eventonica');

class Event extends Model {}

Event.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
  },
  description: {
    type: DataTypes.STRING
  },
  category: {
    type: DataTypes.STRING
  },
}, {
  sequelize,
  modelName: 'Event', 
  tableName: 'Events',
  timestamps: false
});

module.exports = Event;