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
          descricao: 'OEM',
        },
        {
          id: 3,
          descricao: 'PLLS',
          descricao: 'Arduino',
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Marca', null, {});
  }
};
