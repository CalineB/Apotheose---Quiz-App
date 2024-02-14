const { Model, DataTypes } = require('sequelize');

const sequelize = require('../../sequelize-client');

class Score extends Model {}

Score.init({
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  max_score: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'score',
});

module.exports = Score;
