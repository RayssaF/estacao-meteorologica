'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Controlador',{
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idModelo:{
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: 'Modelo',
          key: 'id',
        }
      },
      descricao:{
        allowNull: false,
        type: Sequelize.STRING,
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return  queryInterface.dropTable('Controlador');
  }
};
