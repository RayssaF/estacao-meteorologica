'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Proprietario', 
      [
        {
          id: 1,
          nome: "IFRO"
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Proprietario', null, {});
  }
};
