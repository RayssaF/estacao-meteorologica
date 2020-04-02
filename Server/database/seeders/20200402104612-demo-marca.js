'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Marca', 
      [
        {
          id: 1,
          descricao: 'Arduino',
        },
        {
          id: 2,
          descricao: 'OEM',
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Marca', null, {});
  }
};
