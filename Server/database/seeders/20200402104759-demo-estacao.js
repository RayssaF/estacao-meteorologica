'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Estacao', 
    [{
      id: 1,
      keyAuth: 'ef6c94',
      descricao: 'Estação Teste WebSocket Chrome',
      dataInstalacao: new Date(),
      idModelo: 2,
      idProprietario: 1,
      idControlador: 1,
    },
    {
      id: 2,
      keyAuth: '3fb944',
      descricao: 'Estação Teste',
      dataInstalacao: new Date(),
      idModelo: 2,
      idProprietario: 1,
      idControlador: 2,
    }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Estacao', null, {});
  }
};
