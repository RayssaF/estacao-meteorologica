const db = require("../models");
const Marca = db.marca;

exports.getAll = async () => {
    data = await Marca.findAll();
    return data;
}


exports.getById = async (idMarca) => {
    data = await Marca.findOne({where: {id: idMarca}});
    return data;
}