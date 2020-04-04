module.exports = (sequelize, DataTypes) => {
    const Proprietario = sequelize.define("Proprietario",{
        nome: {
            type: DataTypes.STRING,
        },
    },{
        freezeTableName: true,
        timestamps: false,
    });

    return Proprietario;
}