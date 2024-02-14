const { Model, DataTypes } = require('sequelize');

const sequelize = require('../../sequelize-client');

class Quiz extends Model {}

Quiz.init({
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

}, {
  sequelize,
  tableName: 'quiz',
});

module.exports = Quiz;
