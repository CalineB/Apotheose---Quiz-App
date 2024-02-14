const debug = require('debug')('app:userController');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { User } = require('../models');
const auth = require('../auth');

const userController = {

  // Create new user - POST
  async addUser(req, res) {
    try {
      debug('addUser', req.body);
      const {
        pseudo, password, email, role_id,
      } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const foundUser = await User.findOne({
        where: {
          [Op.or]: [{ pseudo }, { email }],
        },
      });
      const bodyErrors = [];
      if (foundUser?.email === email) {
        bodyErrors.push('email must be unique');
      }

      if (foundUser?.pseudo === pseudo) {
        bodyErrors.push('pseudo must be unique');
      }

      if (bodyErrors.length) {
        res.status(400).json(bodyErrors);
      } else {
        const user = User.build({
          pseudo, password: hashedPassword, email,
        });
        if (role_id) {
          user.role_id = role_id;
        }

        await user.save();

        res.status(200).json({ user });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async logUser(req, res) {
    const { pseudo, password } = req.body;
    if (!pseudo || !password) {
      res.status(403).json({ errorMessage: 'L\'une de vos saisie est incorrecte .' });
      return; // stops function
    }
    debug(`logUser (${pseudo}, ${password})`);
    const foundUser = await User.findOne({
      where: { pseudo },
      include: [{ association: 'role' }],
    });
    if (!foundUser) {
      res.status(403).json({ errorMessage: 'L\'une de vos saisie est incorrecte .' });
      return;
    }
    const authenticated = await bcrypt.compare(password, foundUser.password);
    if (authenticated) {
      debug('  - user authentified');
      const { id, email, role } = foundUser;
      const accessToken = auth.generateAccessToken(id, pseudo, email, role);
      const refreshToken = auth.generateRefreshToken(id);
      res.status(200).json({
        id, pseudo, email, role, accessToken, refreshToken, message: 'Vous etes bien connecté',
      });
    } else {
      debug('  - user not authentified');
      res.status(403).json({ errorMessage: 'L\'une de vos saisie est incorrecte .' });
    }
  },

  relog(req, res, next) {
    /*  try {
      const {
        id, pseudo, email, role,
      } = req.body;
      const accessToken = auth.generateAccessToken(id, pseudo, email, role);
      res.status(200).json({
        id, pseudo, email, role, accessToken,
      });
    } catch (error) {
      res.status(403).json({ status: 'error', message: 'Forbidden' });
    } */
    try {
      req.body.data = { ...req.body };
      next();
    } catch (error) {
      res.status(401).json({ status: 'error', message: error.message });
    }
  },

  // Remove user from database - DELETE
  async deleteUser(req, res) {
    try {
      const userId = req.params.id;
      const user = await User.findByPk(userId);
      if (user) {
        await user.destroy();
        res.status(200).json('User has been deleted');
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  // Update user - PATCH
  async modifyUser(req, res, next) {
    try {
      const userId = req.params.id;
      const user = await User.findByPk(userId);
      if (!user) {
        res.status(404).send(`Impossible de trouver l'utilisateur avec l'ID ${userId}`);
      } else {
        console.log(req.body);
        const {
          pseudo, email, password, role_id,
        } = req.body;
        if (pseudo) {
          user.pseudo = pseudo;
        }
        if (email) {
          user.email = email;
        }
        if (password) {
          user.password = password;
        }
        if (role_id) {
          user.role_id = role_id;
        }
        await user.save();
        console.log(user);
        req.body.data = user.dataValues;
        next();
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  // Find one user by its ID - GET
  async getUserById(req, res, next) {
    try {
      const userId = parseInt(req.params.id, 10);
      const user = await User.findOne({
        where: { id: userId },
        attributes: ['id', 'pseudo', 'role_id'],
        include: [{ association: 'scores', attributes: ['score'] }],
      });

      if (!user) {
        throw new Error(`User with ID ${userId} not found`);
      }
      req.body.data = user.dataValues;
      next();
      /* res.status(200).json(user); */
    } catch (error) {
      console.log(error);
      res.status(401).json({ error: error.message });
    }
  },

  // Find all users by its ID - GET
  async renderAllUsers(req, res, next) {
    try {
      const users = await User.findAll();
      const formattedUsers = users.map((user) => user.dataValues);
      req.body.data = { users: formattedUsers };
      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAuthorizedInfo(__, res) {
    debug('getAuthorizedInfo');
    res.json({ status: 'success', data: 'You are officialy authorized to see this content' });
  },

  refreshToken(request, response) {
    debug('refreshToken');
    try {
      const user = auth.getAccessTokenUser(request);
      if (user && auth.isValidRefreshToken(request, user)) {
        const accessToken = auth.generateAccessToken(request.ip, user.username);
        const refreshToken = auth.generateRefreshToken(user.username);
        response.status(200).json({
          status: 'success',
          data: { accessToken, refreshToken },
        });
      }
    } catch (err) {
      response.status(401).json({ status: 'error', message: err.message });
    }
  },

};
module.exports = userController;
