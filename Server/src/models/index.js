'use strict';

const dbConfig = require('../../config/database');

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig);
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Carregando Models
db.evento = require('./evento.model')(sequelize, Sequelize);
db.estacao = require('./estacao.model')(sequelize,Sequelize);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = db;