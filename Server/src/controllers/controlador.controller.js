const db = require("../../models");
const Controlador = db.controlador;

exports.getControladores = async (idModelo) => {
    data = await Controlador.findAll({where: {id: idModelo}});
    return data;
}

