const express = require('express');
const router = express.Router();

router.get('/',(request, response) =>{
    estacoes = [{
            id:1,
            descricao:"Estação 01",
            ultimoEvento:{
                velocidadeVento:"3",
                direcaoVento:"SW",
                preciptacaoChuva:"2.3",
                temperatura:"23",
                umidade:"64"
            }
        },
        {
            id:2,
            descricao:"Estação 02",
            ultimoEvento:{
                velocidadeVento:"3",
                direcaoVento:"SW",
                preciptacaoChuva:"2.3",
                temperatura:"23",
                umidade:"64"
            }
        }
    ];
    response.status(200).send(estacoes);
});

module.exports = router;