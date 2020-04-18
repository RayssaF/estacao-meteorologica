const db  = require("../models");
const Evento = db.evento;
const paginate = require('../utils/paginate');

exports.getAllByEstacao = async (idEstacao, page, pageSize) => {
    try {
        const data = {};
        data.count = await db.evento.count({ where: {idEstacao}})
        data.eventos = await db.evento.findAll({
            attributes: [
                'id',
                'velocidadeVento',
                'direcaoVento',
                'preciptacaoChuva',
                'temperatura',
                'umidade',
                'tempoInclusao',
                'statusBateria'
            ],
            where: {idEstacao}, 
            ...paginate({page, pageSize}),
            order: [['tempoInclusao', 'desc']],
        });
        return data;
    } catch (error) {
        console.error(error);
    }
}

exports.create = async (evento) =>{
    try {
        await Evento.create(evento);
    } catch (error) {
        console.error("Erro ao adicionar evento!" + error);
    }
}