const Repository = require('../repository/evento.repository');

exports.getAllByEstacao = async (request, response) =>{
    try {
        const page = (request.query.page - 1);
        const pageSize = request.query.pageSize;
        
        const data = await Repository.getAllByEstacao(request.params.id,page,pageSize);
        response.header('X-Total-Count', data.count)
        response.status(200).send(data.eventos);
    } catch (error) {
        console.error("Erro ao consultar evento!" + error);
        response.status(400).send(
            {
                message: 'Falha ao consultar dados!'
            }
        );
    }
}