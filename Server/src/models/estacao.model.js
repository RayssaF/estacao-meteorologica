const db  = require("../models");

module.exports = (sequelize, DataTypes) => {
    const Estacao = sequelize.define("Estacao",{
          keyAuth:{
            type: DataTypes.STRING,
          },
          descricao:{
            type: DataTypes.STRING,
          },
          dataInstalacao:{
            type: DataTypes.DATE,
          },
          idModelo:{
            allowNull: false,
            type: DataTypes.INTEGER,
            references:{
              model: 'Modelo',
              key: 'id',
              deferrable: DataTypes.Deferrable.INITIALLY_IMMEDIATE
            }
          },
          idProprietario:{
            allowNull: false,
            type: DataTypes.INTEGER,
            references:{
              model: 'Proprietario',
              key: 'id',
              deferrable: DataTypes.Deferrable.INITIALLY_IMMEDIATE
            }
          },
          idControlador:{
            allowNull: false,
            type: DataTypes.INTEGER,
            references:{
              model: 'Controlador',
              key: 'id',
              deferrable: DataTypes.Deferrable.INITIALLY_IMMEDIATE
            }
          }
    },{
        freezeTableName: true,
        timestamps: false,
    });

    Estacao.associate = function(models) {
      models.estacao.hasMany(models.evento, {foreignKey: 'idEstacao'})
    };

    return Estacao;
}