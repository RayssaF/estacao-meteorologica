'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../../config/database.js');
const db = {};

let sequelize= new Sequelize(config);
sequelize.authenticate()
  .then(function(){
    console.log("Conexão com o POSTGRES realizada com sucesso!");
  })
  .catch(function(err){
    console.error("Não foi possível se conectar ao banco de dados POSTGRES");
    
  });
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
