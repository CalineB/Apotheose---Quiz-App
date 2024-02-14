const express = require('express');

const adminRouter = express.Router();

const {
  quizController,
  userController,

} = require('../controllers');
const auth = require('../auth');

adminRouter.use(auth.isAdmin);

adminRouter.get('/users', userController.renderAllUsers);

adminRouter.post('/level', quizController.addLevel);
adminRouter.post('/quiz', quizController.addQuiz);
adminRouter.post('/tag', quizController.addTag);
adminRouter.post('/quiz/:id', quizController.addQuestion);

adminRouter.patch('/level/:id', quizController.modifyLevel);
adminRouter.patch('/quiz/:id', quizController.modifyQuiz);
adminRouter.patch('/question/:id', quizController.modifyQuestion);
adminRouter.patch('/tag/:id', quizController.modifyTag);

adminRouter.delete('/tag/:id', quizController.deleteTag);
adminRouter.delete('/level/:id', quizController.deleteLevel);
adminRouter.delete('/quiz/:id', quizController.deleteQuiz);
adminRouter.delete('/question/:id', quizController.deleteQuestion);

module.exports = adminRouter;
