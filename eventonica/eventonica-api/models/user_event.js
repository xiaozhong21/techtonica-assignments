const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('postgres://localhost:5432/eventonica');
const User = require('./user');
const Event = require('./event');

class UserEvents extends Model {}

UserEvents.init({
  // Model attributes are defined here
  UserId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  EventId: {
    type: DataTypes.INTEGER,
    references: {
      model: Event,
      key: 'id'
    }
  },
  favorite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'UserEvent', 
  tableName: 'UserEvents',
  timestamps: false
});

User.belongsToMany(Event, { through: UserEvents });
Event.belongsToMany(User, { through: UserEvents });

module.exports = UserEvents;
