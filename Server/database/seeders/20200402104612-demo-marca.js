'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Marca', 
      [
        {
          id: 1,
          descricao: 'Station Ex',
        },
        {
          id: 2,
          descricao: 'PLLS',
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Marca', null, {});
  }
};
