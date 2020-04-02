'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Modelo', 
      [
        {
          id:1,
          descricao:"Uno",
          idMarca:1,
        },
        {
          id:2,
          descricao:"WH2081",
          idMarca:2,
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Modelo', null, {});
  }
};
