'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Marca',{
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      descricao: {
        allowNull: false,
        type: Sequelize.STRING,
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface => queryInterface.dropTable('Marca');
  }
};
