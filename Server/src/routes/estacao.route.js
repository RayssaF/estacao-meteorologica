const express = require('express');
const router = express.Router();
const estacaoController = require('../controllers/estacao.controller');
const eventoController = require('../controllers/evento.controller')

router.get('/',estacaoController.getAllLastEvents);
router.get('/estacao',estacaoController.getAll);
router.get('/estacao/:id',estacaoController.getAllById);
router.get('/estacao/:id/eventos',eventoController.getAllByEstacao);


module.exports = router;