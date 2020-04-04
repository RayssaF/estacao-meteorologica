const db = require("../../models");
const Controlador = db.controlador;

exports.getAll = async () => {
    data = await Controlador.findAll();
    return data;
}

exports.getById = async (idControlador) => {
    data = await Controlador.findOne({where: {id:idControlador}});
    return data;
}

exports.getByModelo = async (idModelo) => {
    data = await Controlador.findAll({where: {id:idModelo}});
    return data;
}