const estacaoRoute = require('../routes/estacao.route');

module.exports = app => {
    app.use('/api/v1',estacaoRoute);
}


