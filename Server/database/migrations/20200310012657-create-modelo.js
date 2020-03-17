'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Modelo',{
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      descricao:{
        allowNull: false,
        type: Sequelize.STRING,
      },
      idMarca:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'Marca',
          key: 'id'
        }
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface => queryInterface.dropTable('Modelo');
  }
};
