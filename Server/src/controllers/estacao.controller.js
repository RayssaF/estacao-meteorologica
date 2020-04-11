const Repository = require('../repository/estacao.repository');

exports.getAll = async (request, response) => {
    try {
        data = await Repository.getAll();
        response.status(200).send(data);
    } catch (error) {
        console.error(error);
        response.status(400).send(
            {
                message: 'Falha ao consultar dados!'
            }
        );
    }
};

exports.getAllLastEvents = async (request, response) => {
    try {
        data = await Repository.getAllLastEvents();
        response.status(200).send(data);
    } catch (error) {
        console.error(error);
        response.status(400).send(
            {
                message: 'Falha ao consultar dados!'
            }
            
        );
    }
};

exports.getAllById = async (request, response) => {
    try {
        data = await Repository.getById(request.params.id);
        response.status(200).send(data);
    } catch (error) {
        console.error(error);
        response.status(400).send(
            {
                message: 'Falha ao consultar dados!'
            }
            
        );
    }
};
