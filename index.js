require('dotenv').config();
const debug = require('debug')('app:server');
const cors = require('cors');

const express = require('express');
const session = require('express-session');
const expressSwagger = require('express-jsdoc-swagger');

// Extended: https://swagger.io/specification/#infoObject

const swaggerOptions = {
  info: {
    title: 'Quiz Game API',
    summary: 'Quiz Culture Générale',
    version: 1.0,
    description: 'Apotheose project',
  },
  baseDir: `${__dirname}/app`,
  filesPattern: './**/*.js',
  swaggerUIPath: '/api-quiz',
  exposeSwaggerUI: true,
};

const app = express();

app.use(cors({ origin: '*' }));

/* app runs on .env variable or default PORT */
const port = process.env.PORT || 4000;

expressSwagger(app)(swaggerOptions);

/* require router file */
const router = require('./app/routers');

app.use(cors({ origin: '*' }));

/* send bodies in json format */
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(router);

// Session middleware
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
}));

app.listen(port, () => {
  debug(`Server ready: http://localhost:${port}`);
});
