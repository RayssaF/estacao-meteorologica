const db = require("../models");
const Estacao = db.estacao;

exports.getByKeyAuth = async (keyAuth) =>{
    data = await Estacao.findOne({where: {keyAuth}});
    return data;
}

exports.getEventos = async (idEstacao) => {
    data = await Estacao.findAll({where: {id:idEstacao}});
    return data;
}