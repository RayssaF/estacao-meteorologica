module.exports = (sequelize, DataTypes) => {
    const Marca = sequelize.define("Marca",{
        descricao: {
            type: DataTypes.STRING,
        }
    },{
        freezeTableName: true,
        timestamps: false,
    });
    return Marca;
}