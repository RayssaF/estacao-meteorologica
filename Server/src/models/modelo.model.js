module.exports = (sequelize, DataTypes) => {
    const Modelo = sequelize.define("Modelo",{
        descricao: {
            type: DataTypes.STRING
        },
        idMarca: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references:{
                model: 'Marca',
                key: 'id',
                deferrable: DataTypes.Deferrable.INITIALLY_IMMEDIATE
            }
        },
    },{
        freezeTableName: true,
        timestamps: false,
    });

    return Modelo;
}