const Estacao = require('./estacao.model');
module.exports = (sequelize, DataTypes) => {
    const Evento = sequelize.define("Evento",{
        velocidadeVento: {
            type: DataTypes.FLOAT,
        },
        direcaoVento: {
            type: DataTypes.STRING,
        },
        preciptacaoChuva: {
            type: DataTypes.FLOAT,
        },
        temperatura: {
            type: DataTypes.INTEGER,
        },
        umidade: {
            type: DataTypes.INTEGER,
        },
        tempoInclusao: {
            type: DataTypes.DATE,
        },
        statusBateria: {
            type: DataTypes.STRING,
        },
        idEstacao: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references:{
              model: Estacao,
              key: 'id',
              deferrable: DataTypes.Deferrable.INITIALLY_IMMEDIATE
            }
        }
    },{
        freezeTableName: true,
        timestamps: false,
    });
    return Evento;
}