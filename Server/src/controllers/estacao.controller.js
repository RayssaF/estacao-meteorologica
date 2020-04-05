const db = require("../models");
const Estacao = db.estacao;

exports.getAll = async () => {
    data = await Estacao.findAll();
    return data;
}

exports.getById = async (idEstacao) => {
    data = await Estacao.findOne({where: {id:idEstacao}});
    return data;
}

exports.getByKeyAuth = async (keyAuth) =>{
    data = await Estacao.findOne({where: {keyAuth}});
    return data;
}

exports.getByProprietario = async (idProprietario) => {
    data = await Estacao.findAll({where: {id:idProprietario}});
    return data;
}

exports.getByModelo = async (idModelo) => {
    data = await Estacao.findAll({where: {id:idModelo}});
    return data;
}

exports.getEventos = async (idEstacao) => {
    data = await Estacao.findAll({where: {id:idEstacao}});
    return data;
}
