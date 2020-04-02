'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Estacao', 
    [{
      id: 1,
      keyAuth: 'JxRQYOAUZUKWxdkw1lA0aA==',
      descricao: 'Estação Teste',
      dataInstalacao: new Date(),
      idModelo: 2,
      idProprietario: 1,
      idControlador: 1,
    }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Estacao', null, {});
  }
};
