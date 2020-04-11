const db  = require("../models");
const Estacao = db.estacao;
const Evento = db.evento;

exports.getAll = async (filter) => {
    try {
        return data = await Estacao.findAll(filter);
    } catch (error) {
        console.error(error);
    }
}

exports.getAllLastEvents = async () => {
    try {
        return this.getAll(
            {
                attributes: [
                    'id'
                    ,'keyAuth'
                    ,'descricao'
                ],
                include: [{
                    model:Evento,
                    order: [
                        ['tempoInclusao', 'desc']
                    ],
                    limit: 1,
                }],
            }
        )
    } catch (error) {
        console.error(error);
    }
}

exports.getById = async (id) => {
    try {
        data = await Estacao.findOne({
            where: {id},
            include: [
                {
                    model:db.modelo,
                    attributes: ['descricao'],
                },
                {
                    model:db.controlador,
                    attributes: ['descricao'],
                },
                {
                    model:db.proprietario,
                    attributes: ['nome']
                }
            ]
        });
        return data;
    } catch (error) {
        console.error(error);
    }
}

exports.getByKeyAuth = async (keyAuth) => {
    try {
        data = await Estacao.findOne({where: {keyAuth}});
        return data;
    } catch (error) {
        console.error(error);
    }
}

exports.getByProprietario = async (idProprietario) => {
    try {
        data = await Estacao.findAll({where: {id:idProprietario}});
        return data;
    } catch (error) {
        console.error(error);
    }
}

exports.getByModelo = async (idModelo) => {
    try {
        data = await Estacao.findAll({where: {id:idModelo}});
        return data;
    } catch (error) {
        console.error(error);
    }
}

exports.getEventos = async (idEstacao) => {
    try {
        data = await Estacao.findAll({where: {id:idEstacao}});
        return data;
    } catch (error) {
        console.error(error);
    }
}