const { Sequelize } = require('sequelize');

const database = new Sequelize(process.env['DATABASE_URL']);

module.exports = database;