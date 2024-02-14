const { Model, DataTypes } = require('sequelize');

const sequelize = require('../../sequelize-client');

class Answer extends Model {}

Answer.init({
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  is_good_answer: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },

}, {
  sequelize,
  tableName: 'answer',
});

module.exports = Answer;
