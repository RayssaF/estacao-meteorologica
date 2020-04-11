const express = require('express');
const router = express.Router();
const estacaoController = require('../controllers/estacao.controller');
const eventoController = require('../controllers/evento.controller')
const { celebrate, Joi, Segments } = require('celebrate');

router.get('/',estacaoController.getAllLastEvents);
router.get('/estacao',estacaoController.getAll);
router.get('/estacao/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().required(),
        }
    })
,estacaoController.getAllById);

router.get('/estacao/:id/eventos',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().required(),
        },
        [Segments.QUERY]: {
            page: Joi.number().required(),
            pageSize: Joi.number().required()
        }
    }),
    eventoController.getAllByEstacao);


module.exports = router;