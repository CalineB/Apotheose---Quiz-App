const express = require('express');

const router = express.Router();
const adminRouter = require('./admin');
const userRouter = require('./user');
const {
  quizController,
  userController,

} = require('../controllers');
const auth = require('../auth');

router.get('/quiz', quizController.getAllQuizzes);
router.get('/quiz/:id', quizController.getQuizById);
router.get('/filters', quizController.getTagsAndLevels);
router.post('/register', userController.addUser);
router.post('/login', userController.logUser);

router.use(auth.authorize);
router.use(userRouter);
router.use('/admin', adminRouter);
router.use(auth.regenerateAccessToken);
/*

router.get('/score/:id', scoreController.getScoreByID);
router.post('/score', scoreController.postScore);

*/

/**
 * GET /quiz
 * @tags Quiz
 * @summary Requests all quiz
 * @description Quiz ID, quiz name, quiz tag and quiz level
 * @param {integer} id.quiz.id - ID of the quiz
 * @param {string} quiz.name - Quiz name
 * @param {TagRequest} request.body - tag data to update
 * @return {TagResponse} 200 - Updated tag object
 * @throws {NotFoundError} 404 - User not found
 * @throws {InternalServerError} 500 - Internal server error 
*/
/**
 * GET /quiz/:id
 *  @tags Quiz
 *  @summary Requests quiz by ID
 *  @description Quiz ID, quiz name, quiz tag and quiz level
 */
/**
 * GET /user/:id
 *  @tags User
 *  @summary Requests user by ID
 *  @description User id, user pseudo
 */
/**
 * GET /filters
 *  @tags Filter
 *  @summary List filters name
 *  @description Lists all tags and all levels
 */
/**
 * GET /users/
 *  @tags User
 *  @summary Liste users
 *  @description Finds and lists all users from the DB (user with roles - needs to register)
 */
/**
 * GET /score/:id
 *  @tags Score
 *  @summary Users score
 *  @description Render user scores
 */

/**
 * POST /level
 *  @tags Filter
 *  @summary Create a new level
 *  @description Add new level to database you can attribuate to quiz
 */
/**
 * POST /quiz
 *  @tags Quiz
 *  @summary Create a new quiz
 *  @description Adds a new quiz to the database
 */
/**
 * POST /tag
 *  @tags Filter
 *  @summary Create a new level
 *   @description Adds new level in the database
 */

/**
 * POST /score
 *  @tags Score
 *  @summary Generate score
 *  @description Calculate and render final score
 *  @param {integer} id.score - Scores id
 *  @param {integer} score.score - Score is a number
 * @param {ScoreRequest} score.body - Score in number
 * @return {UserResponse} 200 - Updated user object
 * @throws {NotFoundError} 404 - User not found
 * @throws {InternalServerError} 500 - Internal server error
 */

/**
 * PATCH /user/:id
 * @tags User
 * @summary Update existing user
 * @description Update users pseudo, role, id
 * @param {integer} id.user.id - ID of the user to update
 * @param {string} pseudo.username - Updates users name
 * @param {integer} role.user.role - Update attribuated role
 * @param {UserRequest} request.body - User data to update
 * @return {UserResponse} 200 - Updated user object
 * @throws {NotFoundError} 404 - User not found
 * @throws {InternalServerError} 500 - Internal server error
 */
/**
 * PATCH /tag/:id
 * @tags Filter
 * @summary Update existing tag
 * @description Update tags name
 * @param {integer} id.tag.id - ID of the tag to update
 * @param {string} tag.name - Change tags name
 * @param {TagRequest} request.body - tag data to update
 * @return {TagResponse} 200 - Updated tag object
 * @throws {NotFoundError} 404 - User not found
 * @throws {InternalServerError} 500 - Internal server error
 */
/**
 * PATCH /level/:id
 *  @tags Filter
 *  @summary Update existing level
 *  @description Update levels name (&updated at)
 */
/**
 * PATCH /quiz/:id
 *  @tags Quiz
 *  @summary Update existing quiz
 *  @description Change name, tag, level, questions
 */
/**
 * PATCH /question/:id
 *  @tags Question
 *  @summary Update existing question
 *  @description Change question content
 */
/**
 * PATCH /tag/:id
 *  @tags Filter
 *  @summary Update existing tag
 *  @description Change tag name (&updated at)
 */

/**
 * DELETE /tag/:id
 *  @tags Filter
 *  @summary Delete existing tag
 *  @description Remove from DB - Can't access no info relative to delated object
 */
/**
 * DELETE /level/:id
 *  @tags Filter
 *  @summary Delete existing level
 *  @description Remove from DB - Can't access no info relative to delated object
 */
/**
 * DELETE /quiz/:id
 *  @tags Quiz
 *  @summary Deletes quiz
 *  @description Remove from DB - Can't access no info relative to delated object
 */
/**
 * DELETE /question/:id
 *  @tags Question
 *  @summary Deletes question
 *  @description Remove from DB - Can't access no info relative to delated object
 */
/**
 * DELETE /user/:id
 *  @tags User
 *  @summary Deletes user
 *  @description Remove from DB - Can't access no info relative to delated object
 */

/* IN CASE - Delete if not used when done

router.get('/playerscore/:id', scoreController.getPlayerScore);

router.get('/quizzesscores/:id', scoreController.getAverageScoresByQuiz);
*/

module.exports = router;
