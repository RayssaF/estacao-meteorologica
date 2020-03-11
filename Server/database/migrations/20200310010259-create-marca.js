'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Marca',{
      idMarca:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      descricao: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      }
    });
  },

  down: (queryInterface, Sequelize) => {
  }
};
