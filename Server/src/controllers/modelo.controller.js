const db = require("../../models");
const Modelo = db.modelo;

exports.getAll = async () => {
    data = await Modelo.findAll();
    return data;
}

exports.getById = async (idModelo) => {
    data = await Modelo.findOne({where: {id:idModelo}});
    return data;
}

exports.getByMarca = async (idMarca) => {
    data = await Modelo.findAll({where: {id:idMarca}});
    return data;
}
