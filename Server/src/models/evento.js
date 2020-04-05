const {DataTypes} = require('sequelize')
module.exports = (sequelize) => {
    const evento = sequelize.define('Evento',
        {
            id: DataTypes.INTEGER,
            velocidadeVento: DataTypes.FLOAT,
            direcaoVento: DataTypes.STRING,
            preciptacaoChuva: DataTypes.FLOAT,
            temperatura: DataTypes.INTEGER,
            umidade: DataTypes.INTEGER,
            tempoInclusao: DataTypes.DATE,
            statusBateria: DataTypes.STRING,
            idEstacao: DataTypes.INTEGER,            
        });

    return evento;
}