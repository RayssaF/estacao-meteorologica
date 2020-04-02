'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Controlador', [
        {
          id:1,
          idModelo:1,
          descricao:"Controlador Teste",
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Controlador', null, {});
  }
};
