const db = require("../models");
const Proprietario = db.proprietario;

exports.getAll = async () => {
    data = await Proprietario.findAll();
    return data;
}

exports.getById = async (idProprietario) => {
    data = await Proprietario.findOne({where: {id:idProprietario}});
    return data;
}