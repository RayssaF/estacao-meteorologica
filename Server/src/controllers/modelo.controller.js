const db = require("../../models");
const Modelo = db.modelo;

exports.getModelos = async (idMarca) => {
    data = await Modelo.findAll({where: {id:idMarca}});
    return data;
}

