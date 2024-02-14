const debug = require('debug')('app:auth');

const jwt = require('jsonwebtoken');

const users = process.env.PGUSER;

const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env;
const ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION ?? '15m';
const REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION ?? '7d';

const auth = {
  /**
   * Authenticates users
   *
   * @param {string} username - the user's name
   * @param {string} password - the user's password
   * @returns {boolean} the user authentification status
   */
  authentify(username, password) {
    const foundUser = users.find((user) => user.username === username);
    if (foundUser) {
      if (foundUser.password === password) {
        return true;
      }
    }
    return false;
  },

  /**
   * generates an access token
   *
   * @param {string} ip
   * @param {string} username
   * @returns {string} an access jwt token
   */
  generateAccessToken(id, pseudo, email, role) {
    debug('generateAccessToken');
    return jwt.sign(
      {
        data: {
          id,
          pseudo,
          email,
          role,
        },
      },
      JWT_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRATION },
    );
  },

  /**
   * generates a refresh token
   *
   * @param {string} username - the user's name
   * @returns {string} a refresh jwt token
   */
  generateRefreshToken(id) {
    /* const foundUser = users.find((user) => user.username === username); */
    const refreshToken = jwt.sign(
      {
        data: {
          id,
        },
      },
      JWT_REFRESH_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRATION },
    );
    /* foundUser.refreshToken = refreshToken; */
    return refreshToken;
  },

  /**
   * Authorization middleware
   *
   * @param {object} request
   * @param {object} response
   * @param {function} next
   */
  authorize(request, response, next) {
    debug('authorize');
    try {
      // try to get token
      /* console.log(request.body); */
      const token = auth.getAccessJWT(request);
      debug(token);
      const decodedToken = jwt.verify(token, JWT_SECRET);
      // if token is valid, check for matching authentification and request ip
      /* if (decodedToken.data.ip === request.ip) {
        // it's a go, you are now authorized !
        return next();
      }
      throw (new Error('invalid token')); */
      if (decodedToken) {
        const { pseudo, email } = request.body;
        if (pseudo) {
          delete decodedToken.data.pseudo;
        }

        if (email) {
          delete decodedToken.data.email;
        }
        request.body = { ...request.body, ...decodedToken.data };
        next();
      }
    } catch (err) {
      // if an error occurs (invalid token, or unmatching ips)
      response.status(401).json({ status: 'error', message: err.message });
    }
  },
  isAuthorized(request, response, next) {
    /* console.table(request.params); */
    if (request.body.id === parseInt(request.params.id, 10) || request.body.role.name === 'Admin') {
      next();
    } else {
      response.status(403).json({ status: 'error', message: 'Forbidden' });
    }
  },
  isAdmin(request, response, next) {
    if (request.body.role.name === 'Admin') {
      next();
    } else {
      response.status(403).json({ status: 'error', message: 'Forbidden' });
    }
  },

  /**
   * Gets user from access token
   *
   * @param {request} request
   * @returns the user the jwt was issued for
   */
  getAccessTokenUser(request) {
    const token = auth.getAccessJWT(request);
    const decodedToken = jwt.verify(token, JWT_SECRET, { ignoreExpiration: true });
    const user = users.find((value) => decodedToken.data.username === value.username);
    return user;
  },

  /**
   * gets access JWT
   *
   * @param {*} request
   * @returns {(string | false)} the JWT or false if there is no jwt
   */
  getAccessJWT(request) {
    const authHeader = request.headers.authorization;
    if (authHeader) {
      const token = authHeader.split('Bearer ')[1];
      return token;
    }
    throw (new Error('jwt must be provided'));
  },

  /**
   * Checks validity of a refresh token
   *
   * @param {object} request
   * @param {object} user
   * @returns {boolean} token is valid
   */
  isValidRefreshToken(request, user) {
    const { refreshToken } = request.body;
    if (refreshToken) {
      const decodedRefreshToken = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
      const foundUser = users.find((value) => decodedRefreshToken.data.id === value.id);
      if (foundUser.username === user.username && refreshToken === foundUser.refreshToken) {
        return true;
      }
      throw (new Error('Unmatching users between acess an refresh tokens'));
    }
    throw (new Error('No refresh token found'));
  },
  regenerateAccessToken(request, response) {
    try {
      const {
        id, pseudo, email, role,
      } = request.body;
      const accessToken = auth.generateAccessToken(id, pseudo, email, role);
      /* console.log(request.body); */
      response.status(200).json({
        /* id, pseudo, email, role, accessToken, */
        ...request.body.data, accessToken,
      });
    } catch (error) {
      response.status(401).json({ status: 'error', message: error.message });
    }
  },
};

module.exports = auth;
