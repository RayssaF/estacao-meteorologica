'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Evento',{
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      velocidadeVento:{
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      direcaoVento:{
        allowNull: false,
        type: Sequelize.STRING
      },
      preciptacaoChuva:{
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      temperatura:{
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      umidade:{
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      tempoInclusao:{
        allowNull: false,
        type: Sequelize.DATE,
      },
      statusBateria:{
        allowNull: false,
        type: Sequelize.STRING,
      },
      idEstacao:{
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: 'Estacao',
          key: 'id',
        }
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface => queryInterface.dropTable('Evento');
  }
};
