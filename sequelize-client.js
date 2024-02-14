const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  username: process.env.PGUSERNAME,
  port: process.env.PGPORT,
  password: process.PGPASSWORD,
  define: {
    createdAt: false,
    updatedAt: false,
  },
});

module.exports = sequelize;
