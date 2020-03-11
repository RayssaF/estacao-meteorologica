'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Modelo',{
      idModelo:{
        allowNull:false,
        autoIncrement: true,
        primaryKey:true,
        type: Sequelize.INTEGER,
      },
      descricao:{
        allowNull:false,
        type:Sequelize.STRING
      },
      idMarca:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'Marca',
          key: 'idMarca'
        }
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
