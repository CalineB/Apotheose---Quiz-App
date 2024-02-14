const express = require('express');

const userRouter = express.Router();

const {

  userController,
  scoreController,

} = require('../controllers');
const auth = require('../auth');

userRouter.get('/user/:id', auth.isAuthorized, userController.getUserById);
userRouter.get('/score/:id', scoreController.getScoresByID);
userRouter.get('/info', userController.getAuthorizedInfo);

userRouter.post('/relog', userController.relog);
userRouter.post('/score', scoreController.postScore);
userRouter.post('/user/:id', userController.modifyUser);
userRouter.post('/tokenrefresh', userController.refreshToken);
userRouter.get('/token', (req, res, next) => {
  next();
});

userRouter.delete('/user/:id', userController.deleteUser);

module.exports = userRouter;
