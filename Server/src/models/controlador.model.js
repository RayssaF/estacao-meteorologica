module.exports = (sequelize, DataTypes) => {
    const Controlador = sequelize.define("Controlador",{
        descricao: {
            type: DataTypes.STRING
        },
        idModelo: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references:{
                model: 'Modelo',
                key: 'id',
                deferrable: DataTypes.Deferrable.INITIALLY_IMMEDIATE
            }
        },
    },{
        freezeTableName: true,
        timestamps: false,
    });

    return Controlador;
}