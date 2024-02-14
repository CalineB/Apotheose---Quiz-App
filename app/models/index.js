// Le nom de ce fichier est michélisable. On pourrait même mettre tout cela dans l'index.js

const User = require('./User');
const Quiz = require('./Quiz');
const Question = require('./Question');
const Level = require('./Level');
const Tag = require('./Tag');
const Answer = require('./Answer');
const Score = require('./Score');
const Role = require('./Role');

// Quiz <-> Question (One-to-Many)
Quiz.hasMany(Question, {
  foreignKey: 'quiz_id',
  as: 'questions',
});
Question.belongsTo(Quiz, {
  foreignKey: 'quiz_id',
  as: 'quiz',
});

// User <-> Role (One-to-Many)
Role.hasMany(User, {
  foreignKey: 'role_id',
  as: 'users',
});
User.belongsTo(Role, {
  foreignKey: 'role_id',
  as: 'role',
});

// Tag <-> Quiz (One-to-Many)
Tag.hasMany(Quiz, {
  foreignKey: 'tag_id',
  as: 'quizzes',
});
Quiz.belongsTo(Tag, {
  foreignKey: 'tag_id',
  as: 'tag',
});

// Question <-> Answer (One-To-Many : une question a plusieurs propositions)
Question.hasMany(Answer, {
  foreignKey: 'question_id',
  as: 'answers',
});
Answer.belongsTo(Question, {
  foreignKey: 'question_id',
  as: 'question',
});

// Quiz <-> Score (One-to-Many)
Quiz.hasMany(Score, {
  foreignKey: 'quiz_id',
  as: 'scores',
});
Score.belongsTo(Quiz, {
  foreignKey: 'quiz_id',
  as: 'quizzes',
});

// Quiz <-> Score (One-to-Many)
User.hasMany(Score, {
  foreignKey: 'user_id',
  as: 'scores',
});
Score.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
});

Level.hasMany(Quiz, {
  foreignKey: 'level_id',
  as: 'quizzes',
});

Quiz.belongsTo(Level, {
  foreignKey: 'level_id',
  as: 'level',
});

module.exports = {
  User,
  Quiz,
  Question,
  Level,
  Tag,
  Answer,
  Score,
};
