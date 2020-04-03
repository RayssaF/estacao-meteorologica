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
            type: DataTypes.INTEGER,
        }
    },{
        freezeTableName: true,
        timestamps: false,
    });
    return Evento;
}