'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Estacao',{
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      keyAuth:{
        allowNull: false,
        type: Sequelize.STRING,
      },
      descricao:{
        allowNull: false,
        type: Sequelize.STRING,
      },
      dataInstalacao:{
        allowNull: false,
        type: Sequelize.DATE,
      },
      idModelo:{
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: 'Modelo',
          key: 'id',
        }
      },
      idProprietario:{
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: 'Proprietario',
          key: 'id',
        }
      },
      idControlador:{
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: 'Controlador',
          key: 'id',
        }
      }
    });    


  },

  down: (queryInterface, Sequelize) => {
    queryInterface => queryInterface.dropTable('Estacao');
  }
};
