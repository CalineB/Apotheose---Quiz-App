const {
  Quiz,
  Answer,
  Question,
  Tag,
  Level,
} = require('../models');

const quizController = {
  // Send all quiz
  async getAllQuizzes(req, res) {
    const quizzes = await Quiz.findAll({
      attributes: ['id', 'name', 'tag_id', 'level_id'],
      order: [['created_at', 'DESC']],
      include: [{ association: 'scores', attributes: ['score'] }],
    });
    // console.log(quizzes)
    const formattedQuizzes = quizzes.map((quiz) => ({
      id: quiz.id,
      name: quiz.name,
      level_id: quiz.level_id,
      tag_id: quiz.tag_id,
      played: quiz.scores.length,
    }));
    res.json(formattedQuizzes);
  },

  // Send quiz list with other tables data - GET
  async getQuizById(req, res) {
    try {
      const quizId = parseInt(req.params.id, 10);
      const quiz = await Quiz.findOne({
        where: { id: quizId },
        attributes: ['id', 'name'],
        include: [
          { association: 'tag', attributes: ['name'] },
          { association: 'level', attributes: ['name'] },
          {
            association: 'questions',
            attributes: ['id', 'description'],
            include: [
              {
                association: 'answers',
                attributes: ['id', 'description', 'is_good_answer'],
              }],
          },
        ],
        order: [['questions', 'id', 'ASC']],
      });

      if (!quiz) {
        throw new Error(`Quiz with ID ${quizId} not found`);
      }

      const {
        id, name, level, tag, questions,
      } = quiz;

      const quizData = {
        id,
        name,
        level: level.name,
        tag: tag.name,
        questions,
      };

      res.json(quizData);
    } catch (error) {
      console.log(error);
      throw new Error('Failed to fetch quiz by ID');
    }
  },

  // Add new quiz - POST
  async addQuiz(req, res, next) {
    try {
      const {
        name, question: questions, tag, level,
      } = req.body;

      const bodyErrors = [];
      if (!name) {
        bodyErrors.push('title can not be empty');
      }
      if (!questions.length) {
        bodyErrors.push('questions can not be empty');
      }
      if (bodyErrors.length) {
        res.status(400).json(bodyErrors);
      } else {
        const newQuiz = Quiz.build({ name, tag_id: tag, level_id: level });
        await newQuiz.save();

        questions.forEach(async (question) => {
          const { description, answers } = question;
          if (!description) {
            bodyErrors.push('description can not be empty');
          }
          if (bodyErrors.length) {
            res.status(400).json(bodyErrors);
          } else {
            const newQuestions = Question.build({ description, quiz_id: newQuiz.id });
            await newQuestions.save();
            answers.forEach(async (answer) => {
              const text = answer.description;
              let { isgoodanswer } = answer;
              if (!isgoodanswer) {
                isgoodanswer = false;
              }
              if (!text) {
                bodyErrors.push('description can not be empty');
              }
              if (bodyErrors.length) {
                res.status(400).json(bodyErrors);
              } else {
                const newAnswer = Answer.build(
                  { description: text, is_good_answer: isgoodanswer, question_id: newQuestions.id },
                );
                newAnswer.save();
              }
            });
          }
        });
        req.body.data = newQuiz.dataValues;
        next();
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },
  async addQuestion(req, res, next) {
    const quiz_id = parseInt(req.params.id, 10);
    const { description, answers } = req.body;
    const bodyErrors = [];
    try {
      const { description, answers } = req.body;
      if (!description) {
        bodyErrors.push('description can not be empty');
      }
      if (bodyErrors.length) {
        res.status(400).json(bodyErrors);
      } else {
        const newQuestion = Question.build({ description, quiz_id });
        await newQuestion.save();
        answers.forEach(async (answer) => {
          const text = answer.description;
          let { isgoodanswer } = answer;
          if (!isgoodanswer) {
            isgoodanswer = false;
          }
          if (!text) {
            bodyErrors.push('description can not be empty');
          }
          if (bodyErrors.length) {
            res.status(400).json(bodyErrors);
          } else {
            const newAnswer = Answer.build(
              { description: text, is_good_answer: isgoodanswer, question_id: newQuestion.id },
            );
            newAnswer.save();
            req.body.data = newQuestion.dataValues;
            next();
          }
        });
      }
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  },

  // Change quiz parameters - PATCH
  async modifyQuiz(req, res, next) {
    try {
      const quizId = req.params.id;
      const quiz = await Quiz.findByPk(quizId);
      if (!quiz) {
        res.status(404).send(`Can't find quiz ${quizId}`);
      } else {
        const { name, tag, level } = req.body;
        if (name) {
          quiz.name = name;
        }
        if (!Number.isNaN(tag)) {
          quiz.tag_id = tag;
        }
        if (!Number.isNaN(level)) {
          quiz.level_id = level;
        }
        await quiz.save();
        req.body.data = quiz.dataValues;
        next();
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  // Remove quizz from database - DELETE
  async deleteQuiz(req, res, next) {
    try {
      const quizId = req.params.id;
      const quiz = await Quiz.findByPk(quizId);
      if (quiz) {
        await quiz.destroy();
        req.body.data = { status: 'success' };
        next();
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  // Remove question from database - DELETE
  async deleteQuestion(req, res, next) {
    try {
      const reqId = req.params.id;
      const question = await Question.findByPk(reqId);
      if (question) {
        await question.destroy();
        req.body.data = { status: 'success' };
        next();
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  // Update questions in quiz - PATCH
  async modifyQuestion(req, res, next) {
    const questionId = req.params.id;
    const { description, answers } = req.body;
    const question = await Question.findByPk(questionId);

    if (!question) {
      res.status(404).send(`Can't find question ${questionId}`);
    } else {
      try {
        if (answers) {
          await quizController.mofifyAnswer(answers, question);
        }

        if (description) {
          question.description = description;
        }

        await question.save();
        req.body.data = question.dataValues;
        next();
      } catch (error) {
        console.trace(error);
        res.status(500).json(error.toString());
      }
    }
  },

  // Update quizzes answers - PATCH

  async mofifyAnswer(answers) {
    await answers.forEach(async (answer) => {
      const answerToUpdtate = await Answer.findByPk(answer.id);

      if (answerToUpdtate) {
        const { description: AnswerDescription, is_good_answer } = answer;
        if (AnswerDescription && AnswerDescription !== answerToUpdtate.description) {
          answerToUpdtate.description = AnswerDescription;
        }
        if (is_good_answer !== answerToUpdtate.is_good_answer) {
          answerToUpdtate.is_good_answer = is_good_answer;
        }
      }
      await answerToUpdtate.save();
    });
  },

  // Find categories and levels to attribuate to quiz - GET
  async getTagsAndLevels(req, res) {
    const tags = await Tag.findAll({});
    const levels = await Level.findAll({});
    const filters = { tags, levels };
    res.json(filters);
  },

  // Creates a new tag(category) - CREATE
  async addTag(req, res, next) {
    try {
      const { name } = req.body;

      const bodyErrors = [];

      if (!name) {
        bodyErrors.push('name can not be empty');
      } else {
        const newTag = Tag.build({ name });
        await newTag.save();
        req.body.data = newTag.dataValues;
        next();
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },

  // Update tag name - PATCH
  async modifyTag(req, res, next) {
    try {
      const tagId = req.params.id;
      const tag = await Tag.findByPk(tagId);
      if (!tag) {
        res.status(404).send(`Can't find tag ${tagId}`);
      } else {
        const { name } = req.body;
        tag.name = name;
        await tag.save();
        req.body.data = tag.dataValues;
        next();
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  // Remove tag from database - DELETE
  async deleteTag(req, res, next) {
    try {
      const tagId = req.params.id;
      const tag = await Tag.findByPk(tagId);
      if (tag) {
        await tag.destroy();
        req.body.data = { status: 'success' };
        next();
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  // Create new level - CREATE
  async addLevel(req, res, next) {
    try {
      const {
        name,
      } = req.body;
      console.log(name);

      const bodyErrors = [];
      if (!name) {
        bodyErrors.push('name can not be empty');
      } else {
        const newLevel = Level.build({ name });
        await newLevel.save();
        req.body.data = newLevel.dataValues;
        next();
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },

  // Update existing level - PATCH
  async modifyLevel(req, res, next) {
    try {
      const levelId = req.params.id;
      const level = await Level.findByPk(levelId);
      if (!level) {
        res.status(404).send(`Can't find tag ${levelId}`);
      } else {
        const { name } = req.body;
        level.name = name;
        await level.save();
        req.body.data = level.dataValues;
        next();
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  // Remove level from database - DELETE
  async deleteLevel(req, res, next) {
    try {
      const levelId = req.params.id;
      const level = await Level.findByPk(levelId);
      if (level) {
        await level.destroy();
        req.body.data = { status: 'success' };
        next();
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },
};

module.exports = quizController;
