const db  = require("../models");
const Estacao = db.estacao;
const Evento = db.evento;

exports.getAll = async (param) => {
    try {
        if(!param){
            param = {
                attributes: [
                    'id',
                    'descricao',
                    'dataInstalacao',
                ],
            }
        }
        return data = await Estacao.findAll(param);
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
            attributes: [
                'id',
                'descricao',
                'dataInstalacao',
            ],
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