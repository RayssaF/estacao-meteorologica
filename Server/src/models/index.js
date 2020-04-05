'use strict';

const dbConfig = require('../../config/database');

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig);
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Carregando Models
db.marca = require('./marca.model')(sequelize, Sequelize);
db.modelo = require('./modelo.model')(sequelize, Sequelize);
db.controlador = require('./controlador.model')(sequelize, Sequelize);
db.estacao = require('./estacao.model')(sequelize, Sequelize);
db.proprietario = require('./proprietario.model')(sequelize, Sequelize);
db.evento = require('./evento.model')(sequelize, Sequelize);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = db;