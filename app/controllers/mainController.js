const debug = require('debug')('app:mainController');
const bcrypt = require('bcrypt');
const dataMapper = require('../dataMappers/db');
const auth = require('../auth');

const mainController = {

  logUser(request, response) {
    const { username, password } = request.body;
    debug(`logUser (${username}, ${password})`);
    if (auth.authentify(username, password)) {
      debug('  - user authentified');
      const accessToken = auth.generateAccessToken(request.ip, username);
      const refreshToken = auth.generateRefreshToken(username);
      return response.status(200).json({
        status: 'success',
        data: { accessToken, refreshToken },
      });
    }
    debug('  - user not authentified');
    return response.status(403).json({ status: 'error', message: 'Forbidden' });
  },

  async login(request, response, next) {
    debug('login', request.body);
    const { username } = request.body;
    // retrieve user from db
    const user = await dataMapper.findUserByUsername(username);
    if (user) {
      // check if provided password match with hash
      if (await bcrypt.compare(username, user.username)) {
        return mainController.sendTokens(response, user);
      }
    }
    return next(Error());
  },

  async tokenRefresh(request, response, next) {
    debug('tokenRefresh');
    const { refreshToken } = request.body;
    const authHeader = request.headers.authorization;

    if (!authHeader || !refreshToken) {
      return next(new Error());
    }
    // check if refreshToken is valid
    if (await auth.isValidRefreshToken(refreshToken)) {
      // get expired access token
      const token = authHeader.split('Bearer ')[1];
      // get user from expired access token
      const user = await auth.getTokenUser(token);
      // send new tokens
      return mainController.sendTokens(response, request.ip, user);
    }
    return next(new Error());
  },

  async sendTokens(response, ip, user) {
    // create an access token
    const accessToken = auth.generateAccessToken(ip, user);
    // create a refresh token
    const refreshToken = auth.generateRefreshToken(user.id);
    // save refresh token to db
    await dataMapper.setRefreshToken(user.id, refreshToken);
    // send tokens to client
    return response.status(200).json({
      status: 'success',
      data: {
        accessToken,
        refreshToken,
      },
    });
  },
};

module.exports = mainController;
