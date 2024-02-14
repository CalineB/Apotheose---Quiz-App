const {
  Quiz,
  Score,
  User,
} = require('../models');

const scoreController = {
  async getScoresByID(req, res, next) {
    try {
      const user = parseInt(req.params.id, 10);
      const scores = await Score.findAll({
        attributes: ['score', 'max_score', 'quiz_id', 'id'],
        where: {
          user_id: user,
        },
      });
      const formattedScores = scores.map((score) => score.dataValues);
      req.body.data = { scores: formattedScores };
      next();
      /* res.status(200).json(scores); */
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async postScore(req, res, next) {
    const {
      score, max_score, user_id, quiz_id,
    } = req.body;
    console.log(req.body);
    const bodyError = [];
    if (score < 0 || Number.isNaN(score)) {
      bodyError.push('score can not be less than 0 and must be a number');
    }
    if (max_score < 0 || Number.isNaN(max_score)) {
      bodyError.push('Max score can not be less than 0 and must be a number');
    }

    if (user_id < 0 || Number.isNaN(user_id)) {
      bodyError.push('user_id can not be less than 0 and must be a number');
    }
    if (quiz_id < 0 || Number.isNaN(quiz_id)) {
      bodyError.push('quiz_id can not be less than 0 and must be a number');
    }
    const user = await User.findByPk(user_id);
    if (!user) {
      bodyError.push(`User at id ${user_id} not found`);
    }
    const quiz = await Quiz.findByPk(quiz_id);
    if (!quiz) {
      bodyError.push(`Quiz at id ${quiz_id} not found`);
    }

    if (bodyError.length) {
      res.status(400).json(bodyError);
    } else {
      console.log({
        score, max_score, user_id, quiz_id,
      });
      const newScore = await Score.build({
        score, max_score, user_id, quiz_id,
      });
      await newScore.save();
      req.body.data = newScore.dataValues;
      next();
      /* res.status(200).json({
        id: newScore.id, score, max_score, quiz_id,
      }); */
    }
  },
};

module.exports = scoreController;
/*
  async  getAverageScoresByQuiz(req, res) {
    try {
      const averageScores = await Score.findAll({
        attributes: [
          'quiz_id',
          [Sequelize.fn('avg', Sequelize.col('score')), 'average_score'],
        ],
        include: [
          {
            model: Quiz,
            as: 'quizzes',
            attributes: ['name'],
          },
        ],
        group: ['quiz_id', 'quizzes.id'],
      });

      const formattedScores = averageScores.map((score) => ({
        quizId: score.quiz_id,
        quizName: score.quizzes.name,
        averageScore: score.dataValues.average_score,
      }));

      res.json(formattedScores);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to fetch average scores by quiz' });
    } */
