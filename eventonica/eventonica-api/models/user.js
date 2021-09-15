const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('postgres://localhost:5432/eventonica')

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    // autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING
  },
}, {
  sequelize,
  modelName: 'User', 
  tableName: 'Users',
  timestamps: false,
  // initialAutoIncrement: 4
});

module.exports = User;
